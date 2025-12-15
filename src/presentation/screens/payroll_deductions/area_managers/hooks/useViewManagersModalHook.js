import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../state/hooks";
import { showModalManagers } from "../../../../../state/slices/payrollDeductionsSlice";

const useViewManagersModalHook = () => {
    const jefe = useAppSelector((state) => state.payrollDeductions.selectedManagers);
    const isVisibleModal = useAppSelector((state) => state.payrollDeductions.isModalManagersVisible);

    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOptionManagers, setSelectedOptionManagers] = useState('justificar');
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
        dispatch(showModalManagers(false));
    };
    const optionChange = (optionType) => {
        setSelectedOptionManagers(optionType === selectedOptionManagers ? null : optionType);
    };

    return {
        jefe,
        isVisibleModal,
        currentStep,
        selectedOptionManagers,
        justifyRef,
        declineRef,
        signRef,
        nextStep,
        prevStep,
        closeModal,
        optionChange,
    }
}

export default useViewManagersModalHook;