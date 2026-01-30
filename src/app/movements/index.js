import { Modal } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
    ApplyDescountsDeparture,
    BeParkingDeparture,
    ElectronicBillingDeparture,
    ElectronicInvoiceModal,
    LostTicketModal,
    MovementsScreens,
    ObjectsModal
} from "../../presentation/screens/movements";
import { useAppSelector } from "../../state/hooks";
import {
    showElectronicInvoiceModal,
    showLostTicketModal,
    showObjectsModal,
} from "../../state/slices/movementsSlice";

const movementsComponent = () => {
    /*const networkState = useNetworkState();
    const isOffline = true//!networkState.isConnected || networkState.isInternetReachable === false;
    console.log("Network State:", networkState);*/
    const dispatch = useDispatch();
    const stateGlobal = useAppSelector((state) => state.movements);
    const { stepOne, stepTwo, stepThree, stepFour, blockNavigation } = stateGlobal;
    const defaultDocNumber = useAppSelector(s => s.movements.electronicInvoiceNit);

    const isModalOneVisibleTicket = useAppSelector(
        (state) => state.movements.isModalOneVisibleTicket
    );
    const isModalTwoVisibleObjects = useAppSelector(
        (state) => state.movements.isModalTwoVisibleObjects
    );
    const isModalThreeVisibleBill = useAppSelector(
        (state) => state.movements.isModalThreeVisibleBill
    );

    return (
        <>
            {!blockNavigation && stepOne && <MovementsScreens />}
            {!blockNavigation && stepTwo && <BeParkingDeparture />}
            {!blockNavigation && stepThree && <ApplyDescountsDeparture />}
            {!blockNavigation && stepFour && <ElectronicBillingDeparture />}

            <Modal
                animationType="slices"
                transparent={true}
                visible={isModalOneVisibleTicket}
                onRequestClose={() => dispatch(showLostTicketModal(false))}
            >
                <LostTicketModal />
            </Modal>

            <Modal
                animationType="slices"
                transparent={true}
                visible={isModalTwoVisibleObjects}
                onRequestClose={() => dispatch(showObjectsModal(false))}
            >
                <ObjectsModal />
            </Modal>

            <Modal
                animationType="slices"
                transparent={true}
                visible={isModalThreeVisibleBill}
                onRequestClose={() => dispatch(showElectronicInvoiceModal(false))}
            >
                <ElectronicInvoiceModal defaultDocNumber={defaultDocNumber} />
            </Modal>

        </>
    );
};

export default movementsComponent;
