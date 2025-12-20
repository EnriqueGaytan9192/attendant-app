import { useSelector } from "react-redux";

const useProfileInfoHook = () => {
    const user = useSelector((state) => state.profile.user);

    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName?.trim().charAt(0) || "";
        const lastInitial = lastName?.trim().charAt(0) || "";

        return `${firstInitial}${lastInitial}`.toUpperCase();
    };

    const initials = getInitials(user.firstName, user.lastName);

    return {
        user,
        initials,
    };
};

export default useProfileInfoHook;