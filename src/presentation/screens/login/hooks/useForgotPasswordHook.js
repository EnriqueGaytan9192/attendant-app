import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useAppSelector } from "../../../../state/hooks";
import { changeValueForm, showForgotPasswordModal } from "../../../../state/slices/authSlice";

const useForgotPasswordHook = () => {
    const form = useAppSelector((state) => state.auth.form);
    const dispatch = useDispatch();
    const [showErrorsOneModal, setShowErrorsOneModal] = useState(false);
    const usernameModalRef = useRef(null);
    const emailModalRef = useRef(null);

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

    const handledEmailChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const noSpaces = text.replace(/\s/g, '');
        onChangeText('emailOneModal', noSpaces);

        if (hasSpaces) {
            showAlert("warning", "El correo electrónico no puede contener espacios.");
        };
    };

    const onCloseOneModal = () => {
        dispatch(showForgotPasswordModal(false));
        dispatch(changeValueForm({ name: "usernameOneModal", value: '' }));
        dispatch(changeValueForm({ name: "emailOneModal", value: '' }));
    }

    const handleSend = () => {
        const isUsernameEmpty = form.usernameOneModal.trim() === '';
        const isEmailEmpty = form.emailOneModal.trim() === '';

        if (isUsernameEmpty || isEmailEmpty) {
            setShowErrorsOneModal(true);

            if (isUsernameEmpty && usernameModalRef.current?.shake) {
                usernameModalRef.current.shake(600);
            }
            if (isEmailEmpty && emailModalRef.current?.shake) {
                emailModalRef.current.shake(600);
            }
            showAlert("error", "Por favor completa todos los campos obligatorios.");
            return;
        }

        //Aquí contuara la logica del Modal
    };

    return {
        form,
        showErrorsOneModal,
        usernameModalRef,
        emailModalRef,
        handledUserChange,
        handledEmailChange,
        onCloseOneModal,
        handleSend,
    };
};

export default useForgotPasswordHook;