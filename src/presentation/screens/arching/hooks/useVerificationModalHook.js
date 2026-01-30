import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { hideAlert } from "../../../../state/slices/archingSlice";

const useVerificationModal = () => {


    const { showAlert } = useAppSelector((state) => state.arching);
    const dispatch = useAppDispatch();
    const onClose = () => dispatch(hideAlert());


    return {
        showAlert,
        onClose
    }


}

export default useVerificationModal;
