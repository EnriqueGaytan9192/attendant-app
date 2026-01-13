import AlertManager from "../../common/components/AlertManager";
import { OpenTurnScreen } from "../../presentation/screens/open_turn";
import { useAppSelector } from "../../state/hooks";

const OpenTurn = () => {
    const stateGlobal = useAppSelector((state) => state.openTurn);
    const { stepOne, stepTwo } = stateGlobal;

    return (
        <>
            {stepOne &&
                <OpenTurnScreen />
            }
            
            <AlertManager />
        </>
    )
}

export default OpenTurn;