import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Tooltip } from "react-native-paper"; // ✅ IMPORTANTE
import routes from "../../presentation/navigation/routes";

const MiniSidebar = ({ navigation, isDrawerOpen }) => {
    return (
        <View style={[styles.sidebar, { paddingTop: 10 }]}>

            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.menuButton}
            >
                <Ionicons
                    name={isDrawerOpen ? "close" : "menu"}
                    size={28}
                    color="#000"
                />
            </TouchableOpacity>

            <View style={styles.greenLine} />

            {routes.map((route) => (
                <Tooltip 
                    key={route.key}
                    title={route.title}
                    enterTouchDelay={300}
                    leaveTouchDelay={150}
                >
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => navigation.navigate(route.key)}
                    >
                        <Image source={route.icon} style={styles.icon} />
                    </TouchableOpacity>
                </Tooltip>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: 70,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        borderRightWidth: 2,
        borderRightColor: "#66666626",
        elevation: 2,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    menuButton: {
        padding: 10,
        borderRadius: 10,
    },
    greenLine: {
        width: 40,
        height: 4,
        backgroundColor: "#7ED957",
        borderRadius: 10,
        marginBottom: 15,
    },
    iconWrapper: {
        paddingVertical: 5,
    },
    icon: {
        width: 35,
        height: 35,
        resizeMode: "contain",
    },
});

export default MiniSidebar;
