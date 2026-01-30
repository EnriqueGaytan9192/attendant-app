import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    padding: 20,
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16,
    width: "40%",
    alignSelf: "flex-end",
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  activeTab: {
    borderBottomColor: "#90D400",
    backgroundColor: "#90D400",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  button: {
    backgroundColor: "#90D400",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 30,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    width: "35%",
    alignSelf: "flex-end",
  },
  textInput: {
    flex: 1,
    height: 50,
    marginRight: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E5E5E5",
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  iconInput: {
    width: 24,
    height: 24,
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 2,
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderBottomColor: "#A3D200",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  cell: {
    paddingVertical: 12,
  },
  status: {
    padding: 4,
    borderRadius: 4,
    color: "white",
    textAlign: "center",
  },
  active: {
    backgroundColor: "#90D400",
  },
  inactive: {
    backgroundColor: "red",
  },
  buttonContent: {
    flexDirection: "row",
  },
  iconImage: {
    width: 20, // Ajusta el tamaño según necesites
    height: 20, // Ajusta el tamaño según necesites
    marginRight: 5, // Espacio entre el icono y el texto
  },
  actionButtonLabel: {
    fontSize: 12, // Ajusta el tamaño del texto si es necesario
    color: "#000", // Color del texto
  },
});

export default styles;
