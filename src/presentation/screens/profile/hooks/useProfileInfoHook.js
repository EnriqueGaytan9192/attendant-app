import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";

const useProfileInfoHook = () => {
    const user = useSelector((state) => state.profile.user);
    const { numeroIdentificacion } = useAppSelector((state) => state.auth);
    const { getDataFetch, loading } = useLazyFetch();
    const [userInfo, setUserInfo] = useState(null);
    const [loadingUser, setLoadingUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data: userInfoData, errorFetch } = await getDataFetch(
                    `/api/user/${numeroIdentificacion}`,
                    "GET"
                );

                if (errorFetch) {
                    console.error(errorFetch);
                    return;
                }

                setUserInfo(userInfoData?.datosUsuario);
            } catch (error) {
                console.log("Error obteniendo usuario: ", error);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUserInfo();
    }, []);

    const getInitialsFromFullName = (fullName = "") => {
        if (!fullName) return "";

        const parts = fullName
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }

        const firstNameInitial = parts[0][0];

        const firstLastNameInitial =
            parts.length === 2
                ? parts[1][0]
                : parts[parts.length - 2][0];

        return `${firstNameInitial}${firstLastNameInitial}`.toUpperCase();
    };



    const initials = getInitialsFromFullName(
        userInfo?.empleado || user?.empleado || ""
    );

    /*const getInitials = (firstName, lastName) => {
        const firstInitial = firstName?.trim().charAt(0) || "";
        const lastInitial = lastName?.trim().charAt(0) || "";

        return `${firstInitial}${lastInitial}`.toUpperCase();
    };*/

    //const initials = getInitials(user.firstName, user.lastName);

    return {
        userInfo,
        loadingUser,
        user,
        initials,
    };
};

export default useProfileInfoHook;