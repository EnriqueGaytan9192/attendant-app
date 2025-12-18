import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import AlertManager from "../../../common/components/AlertManager";
import { OperatorsScreen, ViewOperatorsModal } from "../../../presentation/screens/payroll_deductions/operators";
import { useAppSelector } from "../../../state/hooks";
import { closeOperatorsModal } from "../../../state/slices/payrollDeductionsSlice";

const Operators = () => {
    const dispatch = useDispatch();
    const isModalOperatorsVisible = useAppSelector(
        (state) => state.payrollDeductions.isModalOperatorsVisible
    );

    const handleDismissOperators = () => {
        dispatch(closeOperatorsModal())
    };

    return (
        <>
            <OperatorsScreen />

            <Portal>
                {isModalOperatorsVisible && (
                    <BlurView
                        intensity={75}
                        tint="dark"
                        style={StyleSheet.absoluteFill}
                    />
                )}

                <Modal
                    visible={isModalOperatorsVisible}
                    onDismiss={handleDismissOperators}
                    contentContainerStyle={styles.modalContent}
                    style={{ backgroundColor: "transparent" }}
                >
                    <ViewOperatorsModal />
                </Modal>

                <AlertManager />
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
        width: '74%',
        height: 'auto',
        maxHeight: '80%',
        alignSelf: 'center',
    },
});

export default Operators;