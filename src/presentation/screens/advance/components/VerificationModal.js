import { Image, TouchableOpacity, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import styles from "../styles/verificationStyles";

/* ---------- Helper para formato de moneda (por si lo sigues usando) ---------- */
const formatCurrency = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "$ 0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // o "MXN"
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const VerificationModal = ({
  visible,
  hideModal,
  modalType,
  modalData,
  onConfirm,
}) => {
  /* ---------- Colores e iconos según tipo de modal ---------- */
  const colors = {
    success: {
      background: "#F3FFF4",
      border: "#90D400",
      text: "#90D400",
      button: "#80C300",
      icon: require("../../../../assets/images/successArching.png"),
    },
    warning: {
      background: "#FFF8F0",
      border: "#FFA000",
      text: "#FFA000",
      button: "#FFA000",
      icon: require("../../../../assets/images/warningArching.png"),
    },
    info: {
      background: "#F4F9FF",
      border: "#008A9B",
      text: "#008A9B",
      button: "#4DADB9",
      icon: require("../../../../assets/images/infoArching.png"),
    },
  };

  const currentColor = colors[modalType] || colors.info;

  /* ---------- Al pulsar aceptar o la “X” ---------- */
  const handleAccept = () => {
    hideModal();          // Ocultar el modal
    if (onConfirm) onConfirm(); // Ejecutar lógica adicional (si corresponde)
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: currentColor.background,
              borderColor: currentColor.border,
            },
          ]}
        >
          {/* ---------- Botón de cierre (“X”) ---------- */}
          <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          {/* ---------- Icono + título ---------- */}
          <View style={styles.iconContainer}>
            <Image source={currentColor.icon} style={styles.icon} />
            <Text style={[styles.title, { color: currentColor.text }]}>
              {modalData.title}
            </Text>
          </View>

          {/* ---------- Mensaje ---------- */}
          <Text style={[styles.message, { color: "#8C8C8C" }]}>
            {modalData.message}
          </Text>

          {/* ---------- Botón Aceptar ---------- */}
          <TouchableOpacity
            onPress={handleAccept}
            style={[
              styles.button,
              {
                backgroundColor: currentColor.button,
                alignSelf: "flex-start",
              },
            ]}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

export default VerificationModal;

 