import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Tooltip } from "react-native-paper";
import { useDispatch } from "react-redux";
import { showAlert } from "../../common/components/AlertManager";
import routes from "../../presentation/navigation/routes";
import { useAppSelector } from "../../state/hooks";
import { resetAuth } from "../../state/slices/authSlice";
import { resetCloseTurn } from "../../state/slices/closeTurnSlice";
import { resetAuth as resetInventory } from "../../state/slices/inventorySlice";
import { resetAuth as resetMovements } from "../../state/slices/movementsSlice";
import { resetOpenTurn } from "../../state/slices/openTurnSlice";

const MiniSidebar = ({ navigation, isDrawerOpen }) => {
    const { menus, isMenuBlocked } = useAppSelector((state) => state.auth);

    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(resetAuth());
        dispatch(resetOpenTurn());
        dispatch(resetCloseTurn());
        dispatch(resetInventory());
        dispatch(resetMovements());
    };

    // Mapa rápido por key
    const menuMap = menus.reduce((acc, menu) => {
        acc[menu.key] = menu;
        return acc;
    }, {});

    // Solo routes permitidos por backend
    const authorizedRoutes = routes.filter(
        route => route.key !== "profile" && menuMap[route.key]
    );

    const navigateRoute = (route) => {
        if (isMenuBlocked) {
            showAlert(
                "info",
                "El turno ha sido cerrado. El acceso al menú se encuentra restringido."
            );
            return;
        }

        const menu = menus.find((m) => m.key === route.key);
        if (!menu) return;

        if (route.children?.length && menu.children?.length) {
            navigation.navigate(menu.children[0].key);
            return;
        }

        if (menu.submodulos?.length) {
            navigation.navigate(route.key);
            return;
        }

        navigation.navigate(route.key);
    };

    return (
        <View style={[styles.sidebar, { paddingTop: 10 }]}>
            <TouchableOpacity
                onPress={() => {
                    if (isMenuBlocked) {
                        showAlert(
                            "info",
                            "El turno ha sido cerrado. El acceso al menú se encuentra restringido."
                        );
                        return;
                    }
                    navigation.toggleDrawer();
                }}
                style={styles.menuButton}
            >
                <Ionicons
                    name={isDrawerOpen ? "close" : "menu"}
                    size={28}
                    color="#000"
                />
            </TouchableOpacity>

            <View style={styles.greenLine} />

            {/*{routes
                .filter(route => route.key !== 'profile')
                .map((route) => (
                    <Tooltip
                        key={route.key}
                        title={route.title}
                        enterTouchDelay={300}
                        leaveTouchDelay={150}
                    >
                        <TouchableOpacity
                            key={route.key}
                            style={styles.iconWrapper}
                            onPress={() => {
                                if (isDrawerOpen) {
                                    navigation.closeDrawer();
                                }

                                setTimeout(() => {
                                    if (route.children) {
                                        navigation.navigate(route.children[0].key);
                                    } else {
                                        navigation.navigate(route.key);
                                    }
                                }, 120);
                            }}
                        >
                            <Image source={route.icon} style={styles.icon} />
                        </TouchableOpacity>
                    </Tooltip>
                ))}*/}

            {authorizedRoutes.map((route) => (
                <Tooltip
                    key={route.key}
                    title={route.title}
                    enterTouchDelay={300}
                    leaveTouchDelay={150}
                >
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => {
                            if (isDrawerOpen) navigation.closeDrawer();
                            setTimeout(() => navigateRoute(route), 120);
                        }}
                    >
                        <Image source={route.icon} style={styles.icon} />
                    </TouchableOpacity>
                </Tooltip>
            ))}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
                    <Image
                        source={require("../../assets/icons/logOut.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
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
        height: 1,
        backgroundColor: "#90D400",
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
    logoutContainer: {
        paddingVertical: 15,
        marginTop: "auto",
        //paddingHorizontal: 15,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    logoutIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    logoutText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});

export default MiniSidebar;
