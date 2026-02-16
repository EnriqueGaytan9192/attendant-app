import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { changeValueFormRecovery, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useForgotUsernameHook = () => {
    const dispatch = useDispatch();
    const formTwo = useAppSelector((state) => state.auth.formTwo);
    const { getDataFetch, loading } = useLazyFetch();
    const [showErrorsTwoModal, setShowErrorsTwoModal] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const emailTwoModalRef = useRef(null);
    const emailRegexValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        const timeOut = setTimeout(() => {
            emailTwoModalRef?.current?.focus();
        }, 300);

        return () => clearTimeout(timeOut);
    }, []);

    const onChangeText = (formName, text) => {
        dispatch(changeValueFormRecovery({ name: formName, value: text }));
    };

    const isValidEmail = (email) => emailRegexValid.test(email);

    const handledEmailTwoChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const hasEmojis = /[\p{Extended_Pictographic}]/u.test(text);

        const noSpacesNoEmojis = text
            .replace(/\s/g, '')
            .replace(/[\p{Extended_Pictographic}]/gu, '');
        
        onChangeText('emailTwoModal', noSpacesNoEmojis);

        if (hasSpaces) {
            showAlert("warning", "El correo electrónico no puede contener espacios.");
        } else if (hasEmojis) {
            showAlert("warning", "El correo electrónico no puede contener emojis.");
        } else if (isEmailInvalid && isValidEmail(noSpacesNoEmojis)) {
            setIsEmailInvalid(false);
        };
    };

    const onCloseTwoModal = () => {
        dispatch(showForgotUsernameModal(false));
        dispatch(changeValueFormRecovery({ name: "emailTwoModal", value: '' }))
    }

    const handleSend = async () => {
        const email = formTwo.emailTwoModal.trim();

        const isEmailEmpty = email === '';
        const isEmailFormatInvalid = email !== "" && !isValidEmail(email);

        let hasError = false;

        setShowErrorsTwoModal(false);
        setIsEmailInvalid(false);

        if (isEmailEmpty) {
            setShowErrorsTwoModal(true);
            hasError = true;

            if (isEmailEmpty && emailTwoModalRef.current?.shake) {
                emailTwoModalRef.current.shake(600);
            };

            showAlert("error", "Por favor completa todos los campo obligatorios.");
        };

        if (isEmailFormatInvalid) {
            setIsEmailInvalid(true);
            hasError = true;

            if (emailTwoModalRef.current.shake(600)) {
                emailTwoModalRef.current.shake(600);
            };

            showAlert("error", "El correo electrónico no tiene un formato válido.");
        }

        if (hasError) return;

        const { data, errorFetch } = await getDataFetch(
            "/api/recoverUser",
            "POST",
            {
                rq: {
                    email: email,
                },
            },
        );

        if (errorFetch) {
            showAlert(
                "error",
                errorFetch?.msg || "No fue posible procesar la solicitud."
            );
            return;
        };

        if (data) {
            showAlert(
                "success",
                "Te hemos enviado un correo con tu nombre de usuario. Revisa tu bandeja de entrada."
            );
            onCloseTwoModal();
        };
    };

    return {
        formTwo,
        showErrorsTwoModal,
        isEmailInvalid,
        emailTwoModalRef,
        loading,
        handledEmailTwoChange,
        onCloseTwoModal,
        handleSend,
    };
};

export default useForgotUsernameHook;