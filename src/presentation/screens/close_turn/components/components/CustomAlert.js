import { Dimensions, Image, Modal, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

const CustomAlert = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      {/* Fondo oscuro */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Card */}
        <View
          style={{
            width: width * 0.85,
            backgroundColor: "#FFFFFF",
            borderRadius: 6,
            padding: 20,
            elevation: 10,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Image
              source={require("../../../../../assets/images/infoArching.png")}
              style={{ width: 18, height: 18, marginRight: 8 }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#008A9B",
                flex: 1,
              }}
            >
              {title}
            </Text>

            {/* Botón cerrar */}
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ fontSize: 16, color: "#9E9E9E" }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Mensaje */}
          <Text
            style={{
              fontSize: 13,
              color: "#7A7A7A",
              marginBottom: 20,
              lineHeight: 18,
            }}
          >
            {message}
          </Text>

          {/* Footer botones */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={onCancel}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#DADADA",
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 13, color: "#6F6F6F" }}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 4,
                backgroundColor: "#008A9B",
              }}
            >
              <Text style={{ fontSize: 13, color: "#FFFFFF" }}>
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
