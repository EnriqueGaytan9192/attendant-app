import { useState } from "react";
import { useDispatch } from "react-redux";
import { previousStep } from "../../../../state/slices/openTurnSlice";

const useSummaryTurnHook = () => {
    const dispatch = useDispatch();
    const [baseCompleta, setBaseCompleta] = useState(true);

    const toggleBase = () => {
        setBaseCompleta(prev => !prev);
    }

    const handlePrevious = () => {
        dispatch(previousStep());
    };
    
    return {
        baseCompleta,
        toggleBase,
        handlePrevious,
    }
}

export default useSummaryTurnHook;