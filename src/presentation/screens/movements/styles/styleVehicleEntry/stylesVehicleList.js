import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "white",
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "semibold",
        marginBottom: 16,
        color: "#005A6D",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 0,
    },
    textInput: {
        flex: 1,
        height: 50,
        marginRight: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "#E5E5E5",
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: "top",
    },
    iconInput: {
        width: 24,
        height: 24,
    },
    cameraIcon: {
        marginLeft: 16,
    },
    scannedText: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "bold",
        color: "#005A6D",
        backgroundColor: "#E0F7FA",
        padding: 10,
        borderRadius: 8,
        textAlign: "center",
    },
    containerCounts: {
        flexDirection: "row",
        marginBlock: 10,
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20
    },
    count: {
        fontSize: 15,
        color: "#005A6D",
        marginLeft: 10
    }
})

export default styles;