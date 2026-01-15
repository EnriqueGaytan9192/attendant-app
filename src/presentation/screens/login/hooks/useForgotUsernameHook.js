import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../common/components/AlertManager";
import { useAppSelector } from "../../../../state/hooks";
import { changeValueFormRecovery, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useForgotUsernameHook = () => {
    const formTwo = useAppSelector((state) => state.auth.formTwo);
    const dispatch = useDispatch();
    const [showErrorsTwoModal, setShowErrorsTwoModal] = useState(false);
    const emailTwoModalRef = useRef(null);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            emailTwoModalRef?.current?.focus();
        }, 300);

        return () => clearTimeout(timeOut);
    }, []);

    const onChangeText = (formName, text) => {
        dispatch(changeValueFormRecovery({ name: formName, value: text }));
    };

    const handledEmailTwoChange = (text) => {
        const hasSpaces = /\s/.test(text);
        const noSpaces = text.replace(/\s/g, '');
        onChangeText('emailTwoModal', noSpaces);

        if (hasSpaces) {
            showAlert("warning", "El correo electrónico no puede contener espacios.");
        };
    };

    const onCloseTwoModal = () => {
        dispatch(showForgotUsernameModal(false));
        dispatch(changeValueFormRecovery({ name: "emailTwoModal", value: '' }))
    }

    const handleSend = () => {
        const isEmailEmpty = formTwo.emailTwoModal.trim() === '';

        if (isEmailEmpty) {
            setShowErrorsTwoModal(true);
            showAlert("error", "Por favor completa todos los campo obligatorios.");

            if (isEmailEmpty && emailTwoModalRef.current?.shake) {
                emailTwoModalRef.current.shake(600);
            }

            return;
        }
    };

    return {
        formTwo,
        showErrorsTwoModal,
        emailTwoModalRef,
        handledEmailTwoChange,
        onCloseTwoModal,
        handleSend,
    };
};

export default useForgotUsernameHook;