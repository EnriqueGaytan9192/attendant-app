import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "white",
        padding: 10,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#005A6D",
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
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
    container: {
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between",
    },
    subTitle: {
        fontSize: 16,
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
        width: 480
    },
    textInputTwo: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
        width: "92%",
        marginLeft: 45
    },
    textInputThree: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    textInputFour: {
        width: 545,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
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
    dropdown: {
        height: 55,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        width: '48%',
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
    divider: {
        marginVertical: 16,
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    continueButton: {
        backgroundColor: "#90D400",
        paddingHorizontal: 30,
        paddingVertical: 2,
        borderRadius: 10,
        width: '48%'
    },
    cancelButton: {
        paddingHorizontal: 30,
        paddingVertical: 2,
        borderRadius: 10,
        borderColor: "#8C8C8C",
        width: '48%'
    },
})

export default styles;