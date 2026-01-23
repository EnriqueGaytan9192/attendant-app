import { useDispatch, useSelector } from "react-redux";
import { nextStep, previousStep, updateCantidad, updateEstado, updateObservation } from "../../../../state/slices/openTurnSlice";

const useInfrastructureTurnHook = () => {
    const { dispositivos, seguridad, infraestructura } = useSelector((state) => state.openTurn);
    const dispatch = useDispatch();

    const handleCantidadChange = (category, index, value) => {
        dispatch(updateCantidad({ category, index, value }));
    };

    const handleEstadoChange = (category, index, value) => {
        dispatch(updateEstado({ category, index, value }));
    };

    const handleObservationChange = (category, index, value) => {
        dispatch(updateObservation({ category, index, value }));
    };

    const handlePrevious = () => {
        dispatch(previousStep());
    };

    const handleNextStep = async () => {
        dispatch(nextStep());
    };

    return {
        dispositivos,
        seguridad,
        infraestructura,
        handleCantidadChange,
        handleEstadoChange,
        handleObservationChange,
        handlePrevious,
        handleNextStep,
    };
};

export default useInfrastructureTurnHook;