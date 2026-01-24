import { useDispatch } from "react-redux";
import { nextStep, previousStep } from "../../../../state/slices/closeTurnSlice";

const useSummaryCloseTurnHook = () => {
    const dispatch = useDispatch();
    
    const handlePrevious = () => {
        dispatch(previousStep());
    };

    const handledNextStep = () => {
        dispatch(nextStep());
    };

    return {
        handlePrevious,
        handledNextStep,
    };
}

export default useSummaryCloseTurnHook;