import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    padding: 10,
  },
  container: {
    padding: 20
  },
  title: {
    fontSize: 18,
    color: "#005A6D",
  },
  dropdown: {
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: '30%'
  },
  dropdownText: {
    fontSize: 16,
    color: "#333333",
  },
  dropdownContainer: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Para sombra en Android
  },
  dropdownButton: {
    width: "40%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginTop: 25,
    //justifyContent: "center",
  },
  dropdownLabel: {
    fontSize: 14,
    color: "#666666",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    width: "100%",
    backgroundColor: "rgba(229, 229, 229, 1)",
    height: 2,
    marginTop: 25,
  },
  options: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  menu: {
    alignItems: "center",
    marginTop: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  titleMenu: {
    fontSize: 18,
    color: "#666666",
  },
  subtitleMenu: {
    color: "#8C8C8C",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
  inputBase: {
    marginTop: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E5E5E5",
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  continueButton: {
    backgroundColor: "#90D400",
    alignSelf: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 30,
  },
  cancelButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 10,
  },
  iconInput: {
    width: 24,
    height: 24,
  },
});

export default styles;
