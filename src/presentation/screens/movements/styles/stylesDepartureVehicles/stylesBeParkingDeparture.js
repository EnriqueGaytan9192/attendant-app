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
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 20,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  vehicleText: {
    fontSize: 18,
    color: "#005A6D",
  },
  timeInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
    marginTop: 10
  },
  timeColumn: {
    alignItems: "center",
  },
  timeTitle: {
    fontSize: 14,
    color: "#005A6D",
  },
  timeSubtitle: {
    fontSize: 12,
    color: "#9E9E9E",
    marginTop: 5,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#90D400",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginRight: 10,
  },
  divider: {
    width: "100%",
    backgroundColor: "rgba(229, 229, 229, 1)",
    height: 2,
    marginTop: 15
  },
  dividerTwo: {
    width: "100%",
    backgroundColor: "rgba(229, 229, 229, 1)",
    height: 2,
    marginTop: 10
  },
  searchContainer: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 35,
  },
  inputBase: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E5E5E5",
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top",
    width: "25%",
  },
  searchButton: {
    backgroundColor: "#90D400",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 30,
    height: "50",
  },
  priceSection: {
    backgroundColor: "#008B8B",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    marginTop: 60 
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  priceHeaderText: {
    color: "#fff",
    fontSize: 18,
  },
  priceHeaderAmount: {
    color: "#fff",
    fontSize: 18,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priceLabel: {
    color: "#fff",
    marginLeft: 20
  },
  priceAmount: {
    color: "#fff",
  },
  searchResult: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  clientId: {
    color: "#005A6D",
    fontSize: 16,
    marginRight: 25,
  },
  greenPill: {
    backgroundColor: "#99CC33",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  greenPillText: {
    color: "#fff",
    fontSize: 12,
  },
  bonusSection: {
    marginBottom: 20,
  },
  bonusTitle: {
    fontSize: 16,
    color: "#005A6D",
    marginBottom: 10,
  },
  bonusItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    marginTop: 10
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
  },
  bonusInfo: {
    flex: 1,
  },
  bonusName: {
    fontSize: 14,
    color: "#666666",
  },
  bonusDescription: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5
  },
  bonusValidity: {
    fontSize: 12,
    color: "#666666",
  },
  discountSection: {
    marginTop: 20,
  },
  discountTitle: {
    fontSize: 16,
    color: "#005A6D",
    marginBottom: 10,
  },
  discountInputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  continueButton: {
    backgroundColor: "#90D400",
    alignSelf: "flex-end",
    paddingHorizontal: 45,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 30,
  },
  cancelButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 45,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default styles;
