import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MiniSidebar from "../../presentation/navigation/MisiSidebar";
import routes from "../../presentation/navigation/routes";
import CustomHeader from "./CustomHeader";

const findRouteByKey = (key) => {
    // 1. Buscar en rutas principales
    const main = routes.find(r => r.key === key);
    if (main) return main;

    // 2. Buscar en submenús
    for (const r of routes) {
        if (r.children) {
            const child = r.children.find(c => c.key === key);
            if (child) return child;
        }
    }

    return null;
};

const MainLayout = ({ routeKey }) => {
    const navigation = useNavigation();
    const drawerStatus = useDrawerStatus();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const currentRoute = findRouteByKey(routeKey);
    const CurrentComponent = currentRoute?.component;

    const leftRoutes = routes.slice(0, 2);
    const rightRoutes = routes.slice(2, 8);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                <MiniSidebar navigation={navigation} />

                <View style={styles.container}>
                    <CustomHeader
                        title={currentRoute?.title}
                        navigation={navigation}
                    />

                    <View style={styles.content}>
                        {CurrentComponent && <CurrentComponent />}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    content: {
        flex: 1,
    },
});

export default MainLayout;