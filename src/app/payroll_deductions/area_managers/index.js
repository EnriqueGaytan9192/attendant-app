import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import AlertManager from "../../../common/components/AlertManager";
import { AreaManagersScreen, ViewManagersModal } from "../../../presentation/screens/payroll_deductions/area_managers";
import { useAppSelector } from "../../../state/hooks";
import { closeManagersModal } from "../../../state/slices/payrollDeductionsSlice";

const AreaManagers = () => {
    const dispatch = useDispatch();
    const isModalManagersVisible = useAppSelector(
        (state) => state.payrollDeductions.isModalManagersVisible
    );

    const handleDismissManagers = () => {
        dispatch(closeManagersModal())
    };

    return (
        <>
            <AreaManagersScreen />

            <Portal>
                {isModalManagersVisible && (
                    <BlurView
                        intensity={75}
                        tint="dark"
                        style={StyleSheet.absoluteFill}
                    />
                )}

                <Modal
                    visible={isModalManagersVisible}
                    onDismiss={handleDismissManagers}
                    contentContainerStyle={styles.modalContent}
                    style={{ backgroundColor: "transparent" }}
                >
                    <ViewManagersModal />
                </Modal>

                <AlertManager />
            </Portal>
        </>
    )
};

const styles = StyleSheet.create({
    modalContent: {
        //borderColor: '#d80000ff',
        //borderWidth: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        width: '74%',
        height: 'auto',
        maxHeight: '80%',
        alignSelf: 'center',
    },
});

export default AreaManagers