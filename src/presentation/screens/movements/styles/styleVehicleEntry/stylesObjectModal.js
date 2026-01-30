import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    modalContainer: {
        justifyContent: "center",
        //backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 100,
        width: "85%",
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
        borderColor: "#8C8C8C"
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 22,
        marginLeft: 5
    },
    dividerModal: {
        marginVertical: 10,
    },
    subTitle: {
        fontSize: 18,
        marginTop: 25,
        color: "#005A6D"
    },
    input: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
    },
    inputTwo: {
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
    },
    iconButton: {
        backgroundColor: "#90D400",
        borderRadius: 8,
        marginLeft: 8,
        justifyContent: "center",
        alignSelf: "center",
    },
    table: {
        borderRadius: 5,
        backgroundColor: "white",
        elevation: 2,
    },
})

export default styles;