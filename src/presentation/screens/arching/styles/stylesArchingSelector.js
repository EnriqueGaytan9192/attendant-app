import { StyleSheet } from "react-native";

const stylesArchingSelector = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    subContainer: {
        flex: 1,
        marginLeft: 65,
        marginRight: 45,
        marginVertical: 20,
        //borderColor: '#00d800ff',
        //borderWidth: 5,
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginLeft: 30,
        //borderColor: '#0000d8ff',
        //borderWidth: 3,
    },
    iconTitle: {
        height: 45,
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
    textParking: {
        fontSize: 18,
        marginTop: 50,
        color: "#005A6D",
    },
    dropdown: {
        width: "33%",
    },
    greyLine: {
        width: "100%",
        height: 2,
        backgroundColor: "#E5E5E5",
        borderRadius: 10,
        marginTop: 15,
        //marginBottom: 15,
    },
    titleMenu: {
        fontSize: 18,
        color: "#666666",
    },
    subtitleMenu: {
        color: "#8C8C8C",
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
    },
    iconInput: {
        width: 28,
        height: 28,
    },
    button: {
        backgroundColor: '#80C300',
        width: "15%",
        borderRadius: 6,
    },
})

export default stylesArchingSelector;