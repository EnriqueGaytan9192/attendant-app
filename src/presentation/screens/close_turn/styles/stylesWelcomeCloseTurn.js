import { StyleSheet } from "react-native";

const stylesWelcomeCloseTurn = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    subContainer: {
        flex: 1,
        //borderColor: '#00d800ff',
        //borderWidth: 5,
        marginLeft: 45,
        marginRight: 45,
        marginVertical: 20,
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        //borderColor: '#0000d8ff',
        //borderWidth: 3,
        marginLeft: 30,
    },
    iconTitle: {
        height: 37,
        width: 28,
        marginTop: 5
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    textTitle: {
        fontSize: 25,
        color: '#90D400',
        marginBottom: 2.5,
        fontFamily: "Montserrat_400Regular"
    },
    textSubtitle: {
        fontSize: 17,
        color: '#8C8C8C',
        marginTop: 2.5,
        fontFamily: "Montserrat_400Regular"
    },
    greenLine: {
        width: "50%",
        height: 2,
        backgroundColor: "#90D400",
        borderRadius: 10,
        marginTop: 15,
        //marginBottom: 15,
    },
});

export default stylesWelcomeCloseTurn;