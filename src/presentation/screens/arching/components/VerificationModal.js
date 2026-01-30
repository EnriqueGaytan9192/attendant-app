import React from "react";
import { Modal, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../../../state/slices/archingSlice";
import CustomAlert from "./CustomAlert";

const VerificationModal = ({ onConfirm }) => {
  const { showAlert } = useSelector((state) => state.arching);
  const dispatch = useDispatch();
  console.log("Estado de showAlert en VerificationModal:", showAlert);
  if (!showAlert.flag) return null;

  const handleClose = () => {
    dispatch(hideAlert());
    if (onConfirm) onConfirm();
  };

  return (
    <Modal visible={showAlert.flag} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <CustomAlert
          title={showAlert.title}
          message={showAlert.message}
          severity={showAlert.severity}
          onClose={handleClose}
        />
      </View>
    </Modal>
  );
};

export default VerificationModal;
