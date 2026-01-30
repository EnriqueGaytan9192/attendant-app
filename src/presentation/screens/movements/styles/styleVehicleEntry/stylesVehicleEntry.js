import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "white",
        padding: 10,
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 16,
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
    button: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#FFA000",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#FFA000",
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    text: {
        color: "#FFA000",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 8,
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
    inputTicket: {
        backgroundColor: "#FFFFFF",
        borderRadius: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        height: 48,
        width: 300
    },
    addButton: {
        backgroundColor: "#90D400",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        height: 48,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    goParkingButton: {
        backgroundColor: "#90D400",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        height: 40,
        justifyContent: "center",
        paddingHorizontal: 10,
    },

    title: {
        fontSize: 16,
        color: "#005A6D",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: 'space-between'
    },
    inputTwo: {
        width: 210,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    inputThree: {
        width: 210,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    dropdown: {
        height: 50,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        width: 210,
        marginTop: 6
    },
    dropdownTwo: {
        width: 200,
        height: 35,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 50
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
    subtitle: {
        fontSize: 16,
        color: "#005A6D",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    photoButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#90D400",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "85%",
    },
    photoButtonText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "bold",
        color: "#90D400",
    },
    continueButton: {
        backgroundColor: "#90D400",
        paddingHorizontal: 30,
        paddingVertical: 2,
        borderRadius: 10,
        width: "100%"
    },
    ghostInput: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
    },
});

export default styles;
