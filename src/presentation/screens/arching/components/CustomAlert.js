import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const CustomAlert = ({ title, message, onClose, severity }) => {
  /* ---------- Paleta de colores / íconos ---------- */
  const colors = {
    success: {
      background: "#F3FFF4",
      border: "#90D400",
      text: "#90D400",
      button: "#80C300",
      icon: require("../../../../assets/images/successArching.png"),
    },
    info: {
      background: "#F4F9FF",
      border: "#008A9B",
      text: "#008A9B",
      button: "#4DADB9",
      icon: require("../../../../assets/images/infoArching.png"),
    },
    warning: {
      background: "#FFF8F0",
      border: "#FFA000",
      text: "#FFA000",
      button: "#FFA000",
      icon: require("../../../../assets/images/warningArching.png"),
    },
  };

  const currentColor = colors[severity] || colors.info;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: screenWidth * 0.05,
        width: screenWidth * 0.9,
        backgroundColor: currentColor.background,
        borderWidth: 1,
        borderColor: currentColor.border,
        borderRadius: 8,
        padding: 16,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
      }}
    >
      {/* ---------- Botón de cierre (“X”) ---------- */}
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: 4,
          zIndex: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#8C8C8C",
          }}
        >
          ×
        </Text>
      </TouchableOpacity>

      {/* ---------- Título con ícono ---------- */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Image
          source={currentColor.icon}
          style={{ width: 24, height: 24, marginRight: 8 }}
        />

        <Text
          style={{
            color: currentColor.text,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>

      {/* ---------- Mensaje ---------- */}
      <Text
        style={{
          color: "#8C8C8C",
          marginBottom: 16,
          marginLeft: 32, // alineado con texto debajo del icono
        }}
      >
        {message}
      </Text>

      {/* ---------- Botón Aceptar ---------- */}
      <TouchableOpacity
        onPress={onClose}
        style={{
          backgroundColor: currentColor.button,
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomAlert;
 