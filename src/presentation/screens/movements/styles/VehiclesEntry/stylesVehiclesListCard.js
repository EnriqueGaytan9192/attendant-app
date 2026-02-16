import { StyleSheet } from "react-native";

const stylesVehiclesListCard = StyleSheet.create({
    card: {
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "#FFFFFF",
        padding: 10,
        height: "100%"
    },
    title: {
        fontSize: 17,
        fontFamily: "Monterrat_500Medium",
        color: "#005A6D"
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16
    },
    iconInput: {
        width: 18,
        height: 18,
        marginBottom: 5
    },
    cameraIcon: {
        marginLeft: 16,
        marginTop: 3,
        height: 50,
        width: 70,
    },
    containerCounts: {
        flexDirection: "row",
        marginBlock: 10,
        justifyContent: "space-between",
        marginTop: 30,
    },
});

export default stylesVehiclesListCard;