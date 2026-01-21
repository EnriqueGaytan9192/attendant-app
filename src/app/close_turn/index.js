import { CloseTurnScreen, SummaryCloseTurn } from "../../presentation/screens/close_turn";
import { useAppSelector } from "../../state/hooks";

const CloseTurn = () => {
    const stateGlobal = useAppSelector((state) => state.closeTurn);
    const { stepOne, stepTwo } = stateGlobal;

    return (
        <>
            {stepOne &&
                <CloseTurnScreen />
            }

            {stepTwo &&
                <SummaryCloseTurn />
            }
        </>
    )
}

export default CloseTurn;