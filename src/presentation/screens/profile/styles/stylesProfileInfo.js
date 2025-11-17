import { StyleSheet } from "react-native";

const stylesProfileInfo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    containerInfo: {
        flex: 1,
        //borderColor: '#00d800ff',
        //borderWidth: 5,
        marginHorizontal: 85,
        marginVertical: 40,
    },
    infoAvatar: {
        //borderColor: '#0000d8ff',
        //borderWidth: 5,
        alignItems: 'center',
    },
    avatar: {
        width: 88,
        height: 88,
    },
    nameInfo: {
        fontSize: 24,
        color: '#80C300',
        marginTop: 15,
    },
    roleInfo: {
        fontSize: 16,
        color: '#666666',
        marginTop: 10,
    },
    emailInfo: {
        fontSize: 16,
        color: '#666666',
        marginTop: 3,
    },
    greenLine: {
        width: "100%",
        height: 2,
        backgroundColor: "#E5E5E5",
        borderRadius: 10,
        marginTop: 20,
    },
    personalContainer: {
        //borderColor: '#d80000ff',
        //borderWidth: 5,
        marginTop: 50,
    },
    personalText: {
        fontSize: 16,
        color: '#80C300',
        marginBottom: 10,
    },
    contactContainer: {
        //borderColor: '#00d800ff',
        //borderWidth: 5,
        marginTop: 20,
    },
    iconInput: {
        width: 20,
        height: 22,
    },
})

export default stylesProfileInfo;