import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../state/hooks";
import { showModalOperators } from "../../../../../state/slices/payrollDeductionsSlice";

const useViewOperatorsModalHook = () => {
    const operator = useAppSelector((state) => state.payrollDeductions.selectedOperator);
    const isVisibleModal = useAppSelector((state) => state.payrollDeductions.isModalOperatorsVisible);

    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };
    const prevStep = () => {
        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };
    const closeModal = () => {
        dispatch(showModalOperators(false));
    };

    return {
        operator,
        isVisibleModal,
        currentStep,
        nextStep,
        prevStep,
        closeModal,
    }
}

export default useViewOperatorsModalHook;