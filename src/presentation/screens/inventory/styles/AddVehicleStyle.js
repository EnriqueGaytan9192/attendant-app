import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "white",
        padding: 15
    },
    title: {
        fontSize: 18,
        color: "#005A6D",
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10,
    },
    dropdown: {
        height: 60,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        width: '20%'
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
    dropdownLabel: {
        fontSize: 14,
        color: "#666666",
    },
    input: {
        width: "20%",
        marginLeft: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 25
    },
    leftSection: {
        width: "35%",
        marginRight: 25
    },
    rightSection: {
        justifyContent: "space-between",
        width: '55%',
        marginLeft: 25,
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
    dropdownTwo: {
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    dropdownThree: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10
    },
    cardPhoto: {
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
    },
    photo: {
        width: 160,
        height: 160,
        borderRadius: 10,
    },
    photoContainer: {
        width: 160,
        height: 160,
        justifyContent: "center",
        alignItems: "center",
    },
    observationsInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        minHeight: 190,
        textAlignVertical: "top",
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
    },
    photoWrapper: {
        alignItems: "center",
    },

})

export default styles;