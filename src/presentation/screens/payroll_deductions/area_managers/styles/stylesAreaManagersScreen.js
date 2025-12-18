import { StyleSheet } from "react-native";

const stylesAreaManagersScreen = StyleSheet.create({
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
    contentSearch: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    animationSearch: {
        width: '35%',
        marginBottom: 15,
        marginTop: 50
    },
    textInputSearch: {
        backgroundColor: "#FFFFFF",
        fontSize: 16
    },
    textInputIcon: {
        width: 15,
        height: 15
    },
    contentTable: {
        marginTop: 20
    },
    cardTable: {
        elevation: 3,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#FFFFFF"
    },
    headerTable: {
        borderTopColor: "#90D400",
        borderTopWidth: 2,
        borderBottomColor: "#90D400",
        borderBottomWidth: 2
    },
    titleTable: {
        justifyContent: 'flex-start'
    },
    textTitleTable: {
        fontWeight: "500",
        fontSize: 14,
        color: "#666666"
    },
    rowTable: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    iconTable: {
        width: 22,
        height: 17,
    },
    contentPagination: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 5
    },
    subContentPagination: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleContentPagination: {
        marginRight: 8
    },
    buttonPagination: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 6
    }
})

export default stylesAreaManagersScreen;