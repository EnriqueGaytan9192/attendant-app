import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ForgotPasswordModal, LoginScreen } from "../../presentation/screens/login";
import { useAppSelector } from "../../state/hooks";
import { showForgotPasswordModal } from "../../state/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();

    const isModalOneVisible = useAppSelector(
        (state) => state.auth.isModalOneVisible
    );

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

                <Modal
                    visible={isModalOneVisible}
                    onDismiss={() => dispatch(showForgotPasswordModal(false))}
                    contentContainerStyle={styles.modalContent}
                    dismissable
                    style={{ backgroundColor: "transparent" }}
                >
                    <ForgotPasswordModal />
                </Modal>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        borderColor: '#d80000ff',
        borderWidth: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        width: "50%",
        alignSelf: 'center'
    },
});

export default Login;
