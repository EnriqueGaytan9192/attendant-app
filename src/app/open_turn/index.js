import AlertManager from "../../common/components/AlertManager";
import { InfrastructureTurn, OpenTurnScreen, SummaryTurn, WelcomeTurn } from "../../presentation/screens/open_turn";
import { useAppSelector } from "../../state/hooks";

const OpenTurn = () => {
    const stateGlobal = useAppSelector((state) => state.openTurn);
    const { stepOne, stepTwo, stepThree, stepFour } = stateGlobal;

    return (
        <>
            {stepOne &&
                <OpenTurnScreen />
            }

            {stepTwo &&
                <SummaryTurn />
            }

            {stepThree &&
                <InfrastructureTurn />
            }

            {stepFour &&
                <WelcomeTurn />
            }
            
            <AlertManager />
        </>
    )
}

export default OpenTurn;