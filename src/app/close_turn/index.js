import { CloseTurnScreen, InfrastructureCloseTurn, SummaryCloseTurn } from "../../presentation/screens/close_turn";
import { useAppSelector } from "../../state/hooks";

const CloseTurn = () => {
    const stateGlobal = useAppSelector((state) => state.closeTurn);
    const { stepOne, stepTwo, stepThree } = stateGlobal;

    return (
        <>
            {stepOne &&
                <CloseTurnScreen />
            }

            {stepTwo &&
                <SummaryCloseTurn />
            }

            {stepThree &&
                <InfrastructureCloseTurn />
            }

        </>
    )
}

export default CloseTurn;