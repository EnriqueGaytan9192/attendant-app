import { useDispatch, useSelector } from "react-redux";
import { useLazyFetch } from "../../../../common/hook/useFetch";
import { resetAuth } from "../../../../state/slices/authSlice";
import {
  nextStep,
  resetCloseTurn,
  setDescuento,
  setStepFive,
  setStepSix,
} from "../../../../state/slices/closeTurnSlice";
import { resetAuth as resetInventory } from "../../../../state/slices/inventorySlice";
import { resetAuth as resetMovements } from "../../../../state/slices/movementsSlice";
import { resetOpenTurn } from "../../../../state/slices/openTurnSlice";

const useMinorImbalanceCloseTurnHook = () => {
  const dispatch = useDispatch();

  const {
    dispositivos,
    seguridad,
    infraestructura,
    observationClose,
    isComplete,
    numTicket,
    iniTicket,
    finTicket,
    shifValidatorResponse,
  } = useSelector((state) => state.closeTurn);
  const reportedValue = useSelector((state) => state.closeTurn.reportedValue);

  const { numeroIdentificacion, terminalId } = useSelector(
    (state) => state.auth
  );

  const turnoId = useSelector((state) => state.movements.turnoIdObjects);
  const { getDataFetch: shiftCloseFetch } = useLazyFetch();

  const formatCurrency = (amount) => {
    const number = Number(amount);
    if (isNaN(number)) return "$ 0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(number);
  };

  const logout = () => {
    dispatch(resetAuth());
    dispatch(resetOpenTurn());
    dispatch(resetCloseTurn());
    dispatch(resetInventory());
    dispatch(resetMovements());
  };

  const handleShiftClose = async (closeType) => {
    const validatorPayload = {
      id: String(numeroIdentificacion),
      reportableValue: String(reportedValue),
      turnoId,
    };

    const { data: validatorRes, errorFetch } =
      await shiftCloseFetch("/api/shiftCloseValidator", "POST", {
        rq: validatorPayload,
      });

    if (errorFetch) {
      alert("Error al validar turno");
      return;
    }

    const ajuste = closeType === 1 ? validatorRes.ajuste : 0;

    const ballotStatus = isComplete ? 0 : 1;

    const infraPayload = [
      ...dispositivos,
      ...seguridad,
      ...infraestructura,
    ].map((item) => ({
      id: item.id || 0,
      turnoId,
      quantity: item.cantidad?.toString() ?? "0",
      status: item.estado,
      observations: item.observaciones,
      name: item.name,
    }));

    const reportableValue = reportedValue;

    const payload = {
      id: String(numeroIdentificacion),
      turnoId,
      reportableValue,
      observations: observationClose,
      ballotStatus,
      numberBallots: ballotStatus ? Number(numTicket) : 0,
      initialBallot: ballotStatus ? Number(iniTicket) : 0,
      finalBallot: ballotStatus ? Number(finTicket) : 0,
      infrastructure: infraPayload,
      adjustment: ajuste,
      terminalId,
    };

    const { data: response } = await shiftCloseFetch(
      "/api/shiftClose",
      "POST",
      { rq: payload }
    );

    if (!response) return;

    dispatch(setDescuento(response.descuento));

    if (response.statusShift === 0 || response.statusShift === 4) {
      dispatch(nextStep());
    } else if (response.statusShift === 1) {
      dispatch(setStepSix());
    } else {
      dispatch(setStepFive());
    }

    logout();
  };

  return {
    ajuste: shifValidatorResponse?.ajuste,
    formatCurrency,
    confirmComplete: () => handleShiftClose(1),
    confirmClose: () => handleShiftClose(0),
  };
};

export default useMinorImbalanceCloseTurnHook;
