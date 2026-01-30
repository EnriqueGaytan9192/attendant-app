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
        padding: 5,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "semibold",
        marginBottom: 16,
        color: "#005A6D",
    },
    textInput: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
        width: 450
    },
    searchButton: {
        backgroundColor: "#90D400",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginLeft: 30,
        alignSelf: 'center'
    },
    userInfoText: {
        fontSize: 24,
        color: "#005A6D",
        marginTop: 16,
        marginLeft: 30
    },
    payTitle: {
        fontSize: 18,
        fontWeight: "semibold",
        color: "#005A6D",
    },
    priceTitle: {
        fontSize: 18,
        fontWeight: "semibold",
        color: "#8C8C8C",
    },
    divider: {
        width: "100%",
        backgroundColor: "rgba(229, 229, 229, 1)",
        height: 2,
        marginTop: 15,
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
    paymentContainer: {
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    paymentText: {
        marginLeft: 8,
        marginRight: 16,
    },
    payButton: {
        backgroundColor: "#90D400",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        height: 48,
        justifyContent: "center",
        paddingHorizontal: 15,
        width: '45%'
    },
    cancelButton: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        height: 48,
        justifyContent: "center",
        paddingHorizontal: 15,
        width: '45%'
    },
});

export default styles;