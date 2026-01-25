const { StyleSheet } = require("react-native");

const stylesDocuments = StyleSheet.create({
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
        height: 31,
        width: 27,
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
    textContent: {
        color: "#005A6D",
        fontSize: 18
    },
    iconInput: {
        width: 18,
        height: 18,
    },
    card: {
        marginTop: 30,
        backgroundColor: "#FFFFFF"
    },
    contentCard: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageDocument: {
        width: 80,
        height: 60,
        marginBottom: -10,
    },
    iconDocument: {
        width: 25,
        height: 25, 
        marginLeft: "auto"
    },
    titleCard: {
        fontSize: 14,
        color: "#666666",
    },
    subtitleCard: {
        color: "#8C8C8C",
        fontSize: 12,
        marginLeft: 10,
    },
})

export default stylesDocuments;