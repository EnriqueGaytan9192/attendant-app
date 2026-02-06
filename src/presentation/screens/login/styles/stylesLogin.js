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
        marginLeft: 245,
        fontFamily: 'Montserrat_500Medium',
        lineHeight: 20
    },
    logo: {
        width: 225,
        height: 180,
    },
    title: {
        fontSize: 30,
        color: "#005A6D",
        textAlign: "center",
        marginBlockEnd: 50,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 25
    },
    input: {
        width: '70%',
        marginBottom: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
    },
    iconInput: {
        width: 25,
        height: 25,
        marginBottom: 5
    },
    iconVisible: {
        width: 22,
        height: 17,
        marginBottom: 5
    },
    iconHidden: {
        width: 25,
        height: 25,
        marginBottom: 5
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
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 20
    },
    footer: {
        //paddingHorizontal: 80,
        paddingVertical: 111,
        width: "100%",
        alignSelf: "center",
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
});

export default stylesLogin;
