import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const verificationStyles = StyleSheet.create({
  modalContainer: {
    position: "absolute", // Permite posicionamiento absoluto
    bottom: 20, // Espacio desde la parte inferior
    left: screenWidth * 0.05, // Margen desde el lado izquierdo
    width: screenWidth * 0.9, // Ancho proporcional a la pantalla
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff", // Fondo blanco por defecto
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    marginBottom: 16,
    marginLeft: 35,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8C8C8C",
  },
});

export default verificationStyles;
