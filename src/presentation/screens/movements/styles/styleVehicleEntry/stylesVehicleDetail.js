import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "white",
        padding: 10,
    },
    title: {
        fontSize: 16,
        color: "#005A6D",
    },
    plateText: {
        fontSize: 16,
        color: "#005A6D",
        marginLeft: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    vehicleInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTicketeP: {
        backgroundColor: "#90D400",
        paddingVertical: 2,
        borderRadius: 10,
        width: "60%",
        marginTop: 15,
        borderRadius: 15,
    },
    timeInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 20,
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
        marginRight: 10
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#4DADB9",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "white",
        width: "80%"
    },
    text: {
        color: "#4DADB9",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        justifyContent: 'space-between',
        width: '80%'
    },
    input: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        height: 48,
    },
    addButton: {
        backgroundColor: "#90D400",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        height: 48,
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    exitButtons: {
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

    modalContainer: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        backgroundColor: "#F4F9FF",
        borderColor: "#008A9B",
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
        color: '#008A9B'
    },
    message: {
        marginBottom: 14,
        marginLeft: 35,
        color: '#8C8C8C'
    },
});

export default styles;
