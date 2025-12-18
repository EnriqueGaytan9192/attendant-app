import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../state/hooks";
import { closeOperatorsModal } from "../../../../../state/slices/payrollDeductionsSlice";

const useViewOperatorsModalHook = () => {
    const operator = useAppSelector((state) => state.payrollDeductions.selectedOperator);
    const isVisibleModal = useAppSelector((state) => state.payrollDeductions.isModalOperatorsVisible);

    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOptionOperators, setSelectedOptionOperators] = useState('justificar');
    const justifyRef = useRef(null);
    const declineRef = useRef(null);
    const signRef = useRef(null);

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };
    const prevStep = () => {
        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };
    const closeModal = () => {
        dispatch(closeOperatorsModal());
    };
    const optionChange = (optionType) => {
        setSelectedOptionOperators(optionType === selectedOptionOperators ? null : optionType);
    };

    return {
        operator,
        isVisibleModal,
        currentStep,
        selectedOptionOperators,
        justifyRef,
        declineRef,
        signRef,
        nextStep,
        prevStep,
        closeModal,
        optionChange,
    }
}

export default useViewOperatorsModalHook;