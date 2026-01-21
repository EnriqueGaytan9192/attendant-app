import { useDispatch } from "react-redux";
import { nextStep } from "../../../../state/slices/closeTurnSlice";

const useCloseTurnHook = () => {
    const dispatch = useDispatch();

    const handledNext = () => {
        dispatch(nextStep());
    };
    
    return {
        handledNext,
    }
}

export default useCloseTurnHook;