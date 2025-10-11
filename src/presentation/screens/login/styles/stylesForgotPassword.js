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
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    divider: {
        color: "#E5E5E5",
    },
})

export default styleForgotPassword;