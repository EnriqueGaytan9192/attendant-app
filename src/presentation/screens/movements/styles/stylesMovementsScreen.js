import { StyleSheet } from "react-native";

const stylesMovementsScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    subContainer: {
        flex: 1,
        marginLeft: 45,
        marginRight: 45,
        marginVertical: 20,
        //borderColor: '#00d800ff',
        //borderWidth: 5,
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
        height: 40,
        width: 40,
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
    containerColumns: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    leftColumn: {
        //justifyContent: "space-between",
        width: "35%",
        marginRight: 20,
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    rightColumn: {
        //justifyContent: "space-between",
        width: "60%",
        marginLeft: 20,
        borderColor: '#0000d8ff',
        borderWidth: 2,
    }
});

export default stylesMovementsScreen;