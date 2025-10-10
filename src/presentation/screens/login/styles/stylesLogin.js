import { StyleSheet } from "react-native";

const stylesLogin = StyleSheet.create({
    major: {
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: '#FFFFFF',
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    container: {
        flexDirection: "row",
        paddingHorizontal: 40,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    leftSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    rightSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingHorizontal: 20,
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    divider: {
        width: 2,
        height: '120%',
        backgroundColor: '#E5E5E5',
        marginHorizontal: 20,
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    device: {
        fontSize: 15,
        color: "#005A6D",
        textAlign: "left",
        marginLeft: 260,
    },
    logo: {
        width: '80%',
        height: 200,
    },
    title: {
        fontSize: 30,
        color: "#005A6D",
        textAlign: "center",
        marginBlockEnd: 50,
    },
    input: {
        width: '70%',
        marginBottom: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
    },
    iconInput: {
        width: 28,
        height: 28,
    },
    button: {
        backgroundColor: '#80C300',
        marginBottom: 20,
        width: "70%",
        borderRadius: 6,
    },
    dividerForm: {
        width: "65%",
        backgroundColor: "#E5E5E5",
        height: 2,
        marginTop: 35,
    },
    registerLink: {
        textAlign: "center",
        marginTop: 15,
        fontSize: 15,
        color: "#005A6D",
    },
    footer: {
        paddingHorizontal: 80,
        paddingVertical: 111,
        width: "100%",
        alignSelf: "center",
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
});

export default stylesLogin;
