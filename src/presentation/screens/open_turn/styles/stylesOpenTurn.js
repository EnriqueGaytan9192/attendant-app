const { StyleSheet } = require("react-native");

const stylesOpenTurn = StyleSheet.create({
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
    vehiclesTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    vehiclesTitleT: {
      fontSize: 17,
      color: "#005A6D",
      //fontWeight: 'medium'
      fontFamily: "Montserrat_500Medium"
    },
    vehiclesCountT: {
      fontSize: 21,
      color: "#005A6D",
      //fontWeight: 'medium'
      fontFamily: "Montserrat_400Regular"
    },
    contentDropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    divider: {
        backgroundColor: "#E5E5E5",
        marginTop: 30
    },
    subContents: {
        marginTop: 35
    },
    subcontentPlatesUnregistered: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    contentInputPlate: {
        flexDirection: "row",
        width: "50%",
    },
    inputPlate: {
        backgroundColor: "#FFFFFF",
        fontSize: 16, 
        lineHeight: 20
    },
    iconCheck: {
        backgroundColor: "#80C300",
        borderRadius: 8,
        marginLeft: 8
    },
    contentDataTable: {
        width: "50%"
    },
    card: {
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#FFFFFF"
    },
    headerDataTable: {
        borderTopColor: "#90D400",
        borderTopWidth: 1,
        borderBottomColor: "#90D400",
        borderBottomWidth: 1,
    },
    inputObservation: {
        backgroundColor: "#FFFFFF",
        fontSize: 16, 
        minHeight: 100,
        lineHeight: 20
    },
    continueButton: {
        backgroundColor: "#80C300",
        alignSelf: "flex-end",
        borderRadius: 10
    }
})

export default stylesOpenTurn;