import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import CustomAlert from "../../common/components/CustomAlert";
import { ForgotPasswordModal, ForgotUsernameModal, LoginScreen } from "../../presentation/screens/login";
import { useAppSelector } from "../../state/hooks";
import { changeValueForm, changeValueFormRecovery, showForgotPasswordModal, showForgotUsernameModal } from "../../state/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const isModalOneVisible = useAppSelector(
        (state) => state.auth.isModalOneVisible
    );
    const isModalTwoVisible = useAppSelector(
        (state) => state.auth.isModalTwoVisible
    );
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [showOneModalErrorAlert, setShowOneModalErrorAlert] = useState(false);
    const [showTwoModalErrorAlert, setShowTwoModalErrorAlert] = useState(false);
    const [showNoSpacesAlertOneModalUsername, setShowNoSpacesAlertOneModalUsername] = useState(false);
    const [showNoSpacesAlertOneModalEmail, setShowNoSpacesAlertOneModalEmail] = useState(false);
    const [showNoSpacesAlertTwoModalEmail, setShowNoSpacesAlertTwoModalEmail] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardOpen(true)
        );
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardOpen(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleDismissOneModal = () => {
        if (keyboardOpen) {
            Keyboard.dismiss();
        } else {
            dispatch(showForgotPasswordModal(false));
            dispatch(changeValueForm({ name: "usernameOneModal", value: '' }));
            dispatch(changeValueForm({ name: "emailOneModal", value: '' }));
        }
    };
    const handleDismissTwoModal = () => {
        if (keyboardOpen) {
            Keyboard.dismiss();
        } else {
            dispatch(showForgotUsernameModal(false));
            dispatch(changeValueFormRecovery({ name: "emailTwoModal", value: '' }))
        }
    };

    return (
        <>
            <LoginScreen />

            <Portal>
                {isModalOneVisible && (
                    <BlurView
                        intensity={75}
                        tint="dark"
                        style={StyleSheet.absoluteFill}
                    />
                )}
                {isModalTwoVisible && (
                    <BlurView
                        intensity={75}
                        tint="dark"
                        style={StyleSheet.absoluteFill}
                    />
                )}

                <Modal
                    visible={isModalOneVisible}
                    onDismiss={handleDismissOneModal}
                    contentContainerStyle={styles.modalContent}
                    dismissable
                    style={{ backgroundColor: "transparent" }}
                >
                    <ForgotPasswordModal
                        setShowOneModalErrorAlert={setShowOneModalErrorAlert}
                        setShowNoSpacesAlertOneModalUsername={setShowNoSpacesAlertOneModalUsername}
                        setShowNoSpacesAlertOneModalEmail={setShowNoSpacesAlertOneModalEmail}
                    />
                </Modal>
                <Modal
                    visible={isModalTwoVisible}
                    onDismiss={handleDismissTwoModal}
                    contentContainerStyle={styles.modalContent}
                    dismissable
                    style={{ backgroundColor: "transparent" }}
                >
                    <ForgotUsernameModal
                        setShowTwoModalErrorAlert={setShowTwoModalErrorAlert}
                        setShowNoSpacesAlertTwoModalEmail={setShowNoSpacesAlertTwoModalEmail}
                    />
                </Modal>
                <CustomAlert
                    visible={showOneModalErrorAlert}
                    onDismiss={() => setShowOneModalErrorAlert(false)}
                    type="error"
                    message="Por favor completa todos los campos obligatorios."
                />
                <CustomAlert
                    visible={showTwoModalErrorAlert}
                    onDismiss={() => setShowTwoModalErrorAlert(false)}
                    type="error"
                    message="Por favor completa todos los campos obligatorios."
                />
                <CustomAlert
                    visible={showNoSpacesAlertOneModalUsername}
                    onDismiss={() => setShowNoSpacesAlertOneModalUsername(false)}
                    type="warning"
                    message="El nombre de usuario no puede contener espacios."
                />
                <CustomAlert
                    visible={showNoSpacesAlertOneModalEmail}
                    onDismiss={() => setShowNoSpacesAlertOneModalEmail(false)}
                    type="warning"
                    message="El correo electrónico no puede contener espacios."
                />
                <CustomAlert
                    visible={showNoSpacesAlertTwoModalEmail}
                    onDismiss={() => setShowNoSpacesAlertTwoModalEmail(false)}
                    type="warning"
                    message="El correo electrónico no puede contener espacios."
                />
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        //borderColor: '#d80000ff',
        //borderWidth: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        width: '50%',
        height: 'auto',
        maxHeight: '54%',
        alignSelf: 'center',
    },
});

export default Login;
