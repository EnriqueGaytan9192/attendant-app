import { useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep, previousStep } from "../../../../state/slices/openTurnSlice";

const useSummaryTurnHook = () => {
    const dispatch = useDispatch();
    const [baseCompleta, setBaseCompleta] = useState(true);

    const toggleBase = () => {
        setBaseCompleta(prev => !prev);
    };

    const handlePrevious = () => {
        dispatch(previousStep());
    };

    const handleNextStep = async () => {
        dispatch(nextStep());
    };

    return {
        baseCompleta,
        toggleBase,
        handlePrevious,
        handleNextStep,
    };
};

export default useSummaryTurnHook;