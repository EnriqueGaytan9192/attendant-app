import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    justifyContent: "space-between",
    width: "35%",
    marginRight: 30,
  },
  rightSection: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 30,
  },
});

export default styles;
