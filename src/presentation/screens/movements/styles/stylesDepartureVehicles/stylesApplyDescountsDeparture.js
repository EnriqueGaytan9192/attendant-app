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
    vehicleSubText: {
        fontSize: 16,
        color: "#8C8C8C",
        marginTop: 10
    },
    timeInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        alignSelf: "center",
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
        marginTop: 15,
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 16,
        marginTop: 15
    },
    tab: {
        flex: 1,
        padding: 12,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
    },
    activeTab: {
        borderBottomColor: "#005A6D",
    },
    scannerContainer: {
        width: 250,
        height: 200,
        backgroundColor: "#F4F2F2",
        position: "relative",
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25
    },
    corner: {
        width: 50,
        height: 50,
        borderColor: "#005F6B",
        position: "absolute",
    },
    topLeft: {
        borderTopWidth: 4,
        borderLeftWidth: 4,
        top: 0,
        left: 0,
    },
    topRight: {
        borderTopWidth: 4,
        borderRightWidth: 4,
        top: 0,
        right: 0,
    },
    bottomLeft: {
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderBottomWidth: 4,
        borderRightWidth: 4,
        bottom: 0,
        right: 0,
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
    validateButton: {
        backgroundColor: "#90D400",
        alignSelf: "flex-end",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginLeft: 30,
    },
    priceSection: {
        backgroundColor: "#008B8B",
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        marginTop: 30
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
    dropdownLabel: {
        fontSize: 14,
        color: "#666666",
    },
    inputBase: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
        width: '30%',
        marginLeft: 25
    }, 
});

export default styles;
