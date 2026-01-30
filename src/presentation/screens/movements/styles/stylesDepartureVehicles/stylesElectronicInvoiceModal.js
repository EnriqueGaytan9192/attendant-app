import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
        width: "32%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
    },
    inputTwo: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
    },
    dropdown: {
        height: 50,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        width: '32%',
        marginTop: 6
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
})

export default styles;