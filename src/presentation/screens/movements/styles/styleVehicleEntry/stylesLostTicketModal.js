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
        width: "30%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    inputTwo: {
        width: 310,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    dropdown: {
        height: 55,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        width: '30%',
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
    photoButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "100%", 
    },
    photoButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#666666",
    },
    photoButtonContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",  // Ocupar todo el ancho disponible
    },
})

export default styles;