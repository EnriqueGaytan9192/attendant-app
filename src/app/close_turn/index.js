import AlertManager from "../../common/components/AlertManager";
import { CloseTurnScreen, GoodCloseTurn, InfrastructureCloseTurn, MajorImbalanceCloseTurn, MinorImbalanceCloseTurn, SummaryCloseTurn, WelcomeCloseTurn } from "../../presentation/screens/close_turn";
import { useAppSelector } from "../../state/hooks";

const CloseTurn = () => {
    const stateGlobal = useAppSelector((state) => state.closeTurn);
    const { stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven } = stateGlobal;

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

            {stepFour &&
                <GoodCloseTurn />
            }

            {stepFive &&
                <MinorImbalanceCloseTurn />
            }

            {stepSix &&
                <MajorImbalanceCloseTurn />
            }

            {stepSeven &&
                <WelcomeCloseTurn />
            }

            <AlertManager />
        </>
    )
}

export default CloseTurn;