import { StyleSheet } from "react-native";

const stylesOperatorsScreen = StyleSheet.create({
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
        marginLeft: 65,
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
        height: 38,
        width: 45,
        marginTop: 5
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    textTitle: {
        fontSize: 28,
        color: '#90D400',
        marginBottom: 2.5,
    },
    textSubtitle: {
        fontSize: 18,
        color: '#8C8C8C',
        marginTop: 2.5,
    },
    greenLine: {
        width: "50%",
        height: 4,
        backgroundColor: "#7ED957",
        borderRadius: 10,
        marginTop: 15,
        //marginBottom: 15,
    },
})

export default stylesOperatorsScreen;