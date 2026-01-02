const { StyleSheet } = require("react-native");

const stylesConsultations = StyleSheet.create({
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
        height: 35,
        width: 35,
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
        fontSize: 20,
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
    textContent: {
        color: "#80C300",
        fontSize: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
        //borderColor: "#000",
        //borderWidth: 3
    },
    input: {
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        marginBottom: 5,
    },
    iconInput: {
        width: 18,
        height: 18
    },
    button: {
        backgroundColor: "#90D400",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        height: 48,
        justifyContent: "center",
        paddingHorizontal: 65,
    },
    greyLine: {
        width: "100%",
        height: 1,
        backgroundColor: "#E5E5E5",
        borderRadius: 10,
        marginTop: 35,
        //marginBottom: 15,
    },
    contentSubContainer: {
        flex: 1,
        marginTop: 50
    },
    titleContent: {
        color: "#005A6D",
        fontSize: 20,
    },
    subtitleContent: {
        color: "#666666",
        fontSize: 16,
        marginTop: 5
    },
    statusPlateInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    contentCard: {
        flexDirection: 'row', 
        marginTop: 25
    },
    cardInfoPlate: {
        width: "35%", 
        borderRadius: 8, 
        elevation: 3,
        backgroundColor: 'white',
        padding: 10
    },
})

export default stylesConsultations;