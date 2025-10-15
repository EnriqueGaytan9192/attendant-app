import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../state/hooks";
import { changeValueForm, showForgotPasswordModal } from "../../../../state/slices/authSlice";

const useForgotPasswordHook = (setShowOneModalErrorAlert) => {
    const dispatch = useDispatch();
    const form = useAppSelector((state) => state.auth.form);
    const usernameModalRef = useRef(null);
    const emailModalRef = useRef(null);
    const [showErrorsOneModal, setShowErrorsOneModal] = useState(false);

    const onChangeText = (formName, text) => {
        dispatch(changeValueForm({ name: formName, value: text }));
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
            setShowOneModalErrorAlert(true);

            if (isUsernameEmpty && usernameModalRef.current?.shake) {
                usernameModalRef.current.shake(600);
            }

            if (isEmailEmpty && emailModalRef.current?.shake) {
                emailModalRef.current.shake(600);
            }

            return;
        }
    };

    return {
        usernameModalRef,
        emailModalRef,
        form,
        handleSend,
        onChangeText,
        showErrorsOneModal,
        onCloseOneModal,
    };
};

export default useForgotPasswordHook;