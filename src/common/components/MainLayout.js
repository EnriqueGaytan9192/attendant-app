import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import routes from "../../presentation/navigation/routes";
import CustomHeader from "./CustomHeader";


const MainLayout = ({ routeKey }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const currentRoute = routes.find((route) => route.key === routeKey);
    const CurrentComponent = currentRoute?.component;

    const leftRoutes = routes.slice(0, 2);
    const rightRoutes = routes.slice(2, 8);

    return (
        <View style={ styles.container }>
            <CustomHeader title={currentRoute?.title} navigation={navigation} />

            <View style={ styles.content }>
                {CurrentComponent && <CurrentComponent />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    bottomMenu: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#006D77",
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: "relative",
    },
    sideMenu: {
        flexDirection: "row",
    },
    menuItem: {
        alignItems: "center",
        marginHorizontal: 10,
    },
    menuText: {
        color: "#FFFFFF",
        fontSize: 12,
    },
    activeMenuText: {
        color: "#4CAF50",
        fontWeight: "bold",
    },
    qrButtonWrapper: {
        position: "absolute",
        top: -30,
        left: "50%",
        transform: [{ translateX: -35 }],
    },
    qrButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#008080",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#006D77",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MainLayout;