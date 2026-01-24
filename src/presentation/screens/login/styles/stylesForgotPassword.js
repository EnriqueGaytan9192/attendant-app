import { StyleSheet } from "react-native";

const styleForgotPassword = StyleSheet.create({
    titleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    leftGroup: {
        flexDirection: "row",
        alignItems: 'center',
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    icon: {
        width: 25,
        height: 25,
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
        //color: '#272727',
        //borderColor: '#d80000ff',
        //borderWidth: 2,
        fontFamily: "Montserrat_400Regular",
        lineHeight: 20
    },
    divider: {
        color: "#E5E5E5",
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    textModal: {
        fontSize: 16,
        color: '#00000099',
        marginTop: 40,
        marginBlockEnd: 20,
        fontFamily: "Montserrat_400Regular",
        lineHeight: 20
    },
    input: {
        width: '100%',
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        lineHeight: 20
    },
    iconInput: {
        width: 25,
        height: 25,
        marginBottom: 5
    },
    buttonContent: {
        //borderColor: '#d80000ff',
        //borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'flex-end',
        marginTop: 37,
        marginBottom: 1
    },
    cancelModal: {
        borderRadius: 6,
        borderColor: "#8C8C8C",
        backgroundColor: "#FFFFFF",
    },
    saveModal: {
        borderRadius: 6,
        backgroundColor: "#80C300",
        marginLeft: 17,
    }
})

export default styleForgotPassword;