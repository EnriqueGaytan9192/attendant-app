import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    padding: 15,
  },
  title: {
    fontSize: 18,
    color: "#005A6D",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: "20%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E5E5E5",
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  inputTwo: {
    width: "20%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E5E5E5",
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top",
    marginLeft: 20
  },
  dropdown: {
    height: 55,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: '20%',
    marginLeft: 25
  },
  dropdownTwo: {
    height: 55,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: '80%',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: "#A0A0A0",
    textAlign: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333333"
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
    elevation: 5,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 25
  },
  leftSection: {
    width: "55%",
    marginRight: 25
  },
  rightSection: {
      justifyContent: "space-between",
      width: '35%',
      marginLeft: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#005A6D",
  },
  photoContainer: {
    width: 350,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  photo: {
    width: 500,
    height: 275,
    borderRadius: 10,
  },
  cardPhoto: {
    width: "100%",
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  inputObservation: {
    height: 150,
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
});

export default styles;
