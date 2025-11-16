import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MiniSidebar from "../../presentation/navigation/MisiSidebar";
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