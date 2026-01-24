import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { useAppSelector } from "../../../../state/hooks";
import { changeValueForm, showForgotPasswordModal } from "../../../../state/slices/authSlice";

const useForgotPasswordHook = () => {
    const dispatch = useDispatch();
    const form = useAppSelector((state) => state.auth.form);
    const { getDataFetch, loading } = useLazyFetch();
    const [showErrorsOneModal, setShowErrorsOneModal] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const usernameModalRef = useRef(null);
    const emailModalRef = useRef(null);
    const emailRegexValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        const timeOut = setTimeout(() => {
            usernameModalRef?.current?.focus();
        }, 300);

        return () => clearTimeout(timeOut);
    }, []);

    const onChangeText = (formName, text) => {
        dispatch(changeValueForm({ name: formName, value: text }));
    };

    const handledUserChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const noSpaces = text.replace(/\s/g, '');
        onChangeText('usernameOneModal', noSpaces);

        if (hasSpaces) {
            showAlert("warning", "El nombre de usuario no puede contener espacios.");
        };
    };

    const isValidEmail = (email) => emailRegexValid.test(email);

    const handledEmailChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const noSpaces = text.replace(/\s/g, '');
        onChangeText('emailOneModal', noSpaces);

        if (hasSpaces) {
            showAlert("warning", "El correo electrónico no puede contener espacios.");
        };

        if (isEmailInvalid && isValidEmail(noSpaces)) {
            setIsEmailInvalid(false);
        };
    };

    const onCloseOneModal = () => {
        dispatch(showForgotPasswordModal(false));
        dispatch(changeValueForm({ name: "usernameOneModal", value: '' }));
        dispatch(changeValueForm({ name: "emailOneModal", value: '' }));
    };

    const handleSend = async () => {
        const username = form.usernameOneModal.trim();
        const email = form.emailOneModal.trim();

        const isUsernameEmpty = username === '';
        const isEmailEmpty = email === '';
        const isEmailFormatInvalid = email !== '' && !isValidEmail(email);

        let hasError = false;

        setShowErrorsOneModal(false);
        setIsEmailInvalid(false);

        if (isUsernameEmpty || isEmailEmpty) {
            setShowErrorsOneModal(true);
            hasError = true;

            if (isUsernameEmpty && usernameModalRef.current?.shake) {
                usernameModalRef.current.shake(600);
            };
            if (isEmailEmpty && emailModalRef.current?.shake) {
                emailModalRef.current.shake(600);
            };

            showAlert("error", "Por favor completa todos los campos obligatorios.");
        }

        if (isEmailFormatInvalid) {
            setIsEmailInvalid(true);
            hasError = true;

            if (emailModalRef.current?.shake) {
                emailModalRef.current.shake(600);
            };

            showAlert("error", "El correo electrónico no tiene un formato válido.");
        }

        if (hasError) return;

        const { data, errorFetch } = await getDataFetch(
            "/api/recoverPassword",
            "POST",
            {
                rq: {
                    nombreUsuario: username,
                    correo: email,
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
                "Te hemos enviado un correo con tu nueva contraseña. Revisa tu bandeja de entrada."
            );
            onCloseOneModal();
        };
    };


    return {
        form,
        showErrorsOneModal,
        isEmailInvalid,
        usernameModalRef,
        emailModalRef,
        loading,
        handledUserChange,
        handledEmailChange,
        onCloseOneModal,
        handleSend,
    };
};

export default useForgotPasswordHook;