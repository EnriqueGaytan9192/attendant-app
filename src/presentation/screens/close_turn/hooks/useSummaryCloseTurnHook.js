import { useDispatch } from "react-redux";
import { previousStep } from "../../../../state/slices/closeTurnSlice";

const useSummaryCloseTurnHook = () => {
    const dispatch = useDispatch();
    
    const handlePrevious = () => {
        dispatch(previousStep());
    };

    return {
        handlePrevious,
    };
}

export default useSummaryCloseTurnHook;