import { StyleSheet } from "react-native";

const stylesViewManagersModal = StyleSheet.create({
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
        fontSize: 21,
        marginLeft: 15,
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    divider: {
        color: "#000"
    },
    textModalGray: {
        fontSize: 17,
        color: '#8C8C8C',
    },
    textModalGreen: {
        fontSize: 17,
        color: '#90D400',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#90D400',
    },
    buttonContent: {
        //borderColor: '#d80000ff',
        //borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'flex-end',
        marginTop: 37,
    },
    cancelModal: {
        borderRadius: 6,
        borderColor: "#8C8C8C",
        backgroundColor: "#FFFFFF",
        width: "20%"
    },
    nextModal: {
        borderRadius: 6,
        backgroundColor: "#80C300",
        marginLeft: 17,
        width: "20%"
    }
});

export default stylesViewManagersModal;