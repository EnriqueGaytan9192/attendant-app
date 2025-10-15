import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../state/hooks";
import { changeValueFormRecovery, showForgotUsernameModal } from "../../../../state/slices/authSlice";

const useForgotUsernameHook = (setShowTwoModalErrorAlert) => {
    const dispatch = useDispatch();
    const formTwo = useAppSelector((state) => state.auth.formTwo);
    const emailTwoModalRef = useRef(null);
    const [showErrorsTwoModal, setShowErrorsTwoModal] = useState(false);

    const onChangeText = (formName, text) => {
        dispatch(changeValueFormRecovery({ name: formName, value: text }));
    }

    const onCloseTwoModal = () => {
        dispatch(showForgotUsernameModal(false));
        dispatch(changeValueFormRecovery({ name: "emailTwoModal", value: '' }))
    }

    const handleSend = () => {
        const isEmailEmpty = formTwo.emailTwoModal.trim() === '';

        if (isEmailEmpty) {
            setShowErrorsTwoModal(true);
            setShowTwoModalErrorAlert(true)

            if (isEmailEmpty && emailTwoModalRef.current?.shake) {
                emailTwoModalRef.current.shake(600);
            }

            return;
        }
    };

    return {
        emailTwoModalRef,
        formTwo,
        handleSend,
        onChangeText,
        showErrorsTwoModal,
        onCloseTwoModal
    };
};

export default useForgotUsernameHook;