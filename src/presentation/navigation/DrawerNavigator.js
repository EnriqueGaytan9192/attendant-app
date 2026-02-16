import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MainLayout from "../../common/components/MainLayout";
import { useAppSelector } from "../../state/hooks";
import { resetAuth } from "../../state/slices/authSlice";
import { resetCloseTurn } from "../../state/slices/closeTurnSlice";
import { resetAuth as resetInventory } from "../../state/slices/inventorySlice";
import { resetMovements } from "../../state/slices/movementsSlice";
import { resetOpenTurn } from "../../state/slices/openTurnSlice";
import useProfileInfoHook from "../screens/profile/hooks/useProfileInfoHook";
import routes from "./routes";

const Drawer = createDrawerNavigator();

const RenderMainLayout = ({ route }) => {
    const routeKey = route.name;
    console.log(routeKey);
    return <MainLayout routeKey={routeKey} />;
};

const CustomDrawerContent = ({ navigation }) => {
    const [expandedMenus, setExpandedMenus] = useState({});
    const { menus } = useAppSelector((state) => state.auth);
    const profileFilter = menus.filter(menus => menus.key !== "profile")
    //const menus = routes.filter(route => route.key !== 'profile');
    console.log("Menus", menus)
    const toggleSubMenu = (key) => {
        setExpandedMenus((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(resetAuth());
        dispatch(resetOpenTurn());
        dispatch(resetCloseTurn());
        dispatch(resetInventory());
        dispatch(resetMovements());
    };

    const { userInfo, loadingUser, user, initials } = useProfileInfoHook();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]} >
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.drawerContainer}>
                        {/*<Image
                        source={require('../../assets/icons/logoParking.png')}
                        style={styles.logoParking}
                    />*/}
                        <View style={styles.profileSection}>
                            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/*<Image
                                    source={require('../../assets/icons/avatar.png')}
                                    style={styles.profileImage}
                                />*/}
                                    <View style={styles.initialsAvatarSmall}>
                                        <Text style={styles.initialsTextSmall}>
                                            {initials}
                                        </Text>
                                    </View>
                                    {/*<View style={{ marginLeft: 10 }}>
                                    <Text style={styles.profileName}>
                                        {`${user.firstName} ${user.lastName}`}
                                    </Text>
                                    <Text style={styles.profileRole}>
                                        {user.role}
                                    </Text>
                                </View>*/}
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.profileName}>
                                            {loadingUser ? "Cargando..." : userInfo?.empleado}
                                        </Text>
                                        <Text style={styles.profileRole}>
                                            {loadingUser ? "" : userInfo?.rol}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/*<View style={styles.greenLine} />*/}
                        {profileFilter.map((menu) => {
                            //const route = menu;
                            const route = routes.find((r) => r.key === menu.key);

                            if (!route) return null;

                            if (route.children) {
                                return (
                                    <View key={route.key}>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => toggleSubMenu(route.key)}
                                        >
                                            <Image
                                                source={route.icon}
                                                style={styles.icon}
                                            />
                                            <Text style={styles.menuText}>{route.title}</Text>
                                            <Text style={styles.arrow}>
                                                {expandedMenus[route.key] ?
                                                    <Ionicons
                                                        name="chevron-up"
                                                        size={16}
                                                        color={"#4DADB9"}
                                                    />
                                                    :
                                                    <Ionicons
                                                        name="chevron-down"
                                                        size={16}
                                                        color={"#4DADB9"}
                                                    />
                                                }
                                            </Text>
                                        </TouchableOpacity>

                                        {expandedMenus[route.key] &&
                                            route.children.map((subRoute) => (
                                                <TouchableOpacity
                                                    key={subRoute.key}
                                                    style={styles.subMenuItem}
                                                    onPress={() => navigation.navigate(subRoute.key)}
                                                >
                                                    <Image
                                                        source={subRoute.icon}
                                                        style={styles.subIcon}
                                                    />
                                                    <Text style={styles.subMenuText}>{subRoute.title}</Text>
                                                </TouchableOpacity>
                                            ))}
                                    </View>
                                );
                            }

                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    style={styles.menuItem}
                                    onPress={() => navigation.navigate(route.key)}
                                >
                                    <Image source={route.icon} style={styles.icon} />
                                    <Text style={styles.menuText}>{route.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.menuItem, styles.logoutDynamic, { marginLeft: 15 }]} onPress={handleLogOut}>
                    <Image
                        source={require("../../assets/icons/logOut.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.menuText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const DrawerNavigator = () => {
    const menus = routes;

    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {menus.map((menu) => {
                const route = menu;

                return (
                    <Drawer.Screen
                        key={route.key}
                        name={route.key}
                        component={RenderMainLayout}
                        options={{
                            title: route.title,
                            drawerIcon: ({ size }) => (
                                <Image
                                    source={route.icon}
                                    style={{ width: size, height: size, resizeMode: "contain" }}
                                />
                            ),
                        }}
                    />
                )
            })}

            {routes
                .filter((route) => route.children)
                .flatMap((route) =>
                    route.children.map((subRoute) => (
                        <Drawer.Screen
                            key={subRoute.key}
                            name={subRoute.key}
                            component={RenderMainLayout}
                            options={{
                                title: subRoute.title,
                                drawerIcon: ({ size }) => (
                                    <Image
                                        source={subRoute.icon}
                                        style={{ width: size, height: size, resizeMode: "contain" }}
                                    />
                                ),
                            }}
                        />
                    ))
                )}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        marginBottom: 46,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        width: "95%",
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    logoParking: {
        width: "75%",
        height: 50,
        //alignSelf: 'center'
        //borderRadius: 25,
    },
    profileSection: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBlockColor: "#90D400",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
    },
    profileName: {
        fontSize: 17,
        //fontWeight: "bold",
        color: "#90D400",
        marginTop: 5,
        fontFamily: "Montserrat_500Medium"
    },
    profileRole: {
        backgroundColor: "#666666",
        fontSize: 12.5,
        color: "#FFFFFF",
        paddingHorizontal: "auto",
        paddingVertical: 2,
        borderRadius: 5,
        marginTop: 5,
        width: 125,
        textAlign: 'center',
        fontFamily: "Montserrat_400Regular"
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    subMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        paddingLeft: 40,
    },
    menuText: {
        flex: 1,
        fontSize: 17,
        color: "#666666",
        fontFamily: "Montserrat_500Medium",
        lineHeight: 20,
    },
    subMenuText: {
        fontSize: 13,
        color: "#666666",
        fontFamily: "Montserrat_400Regular",
        lineHeight: 20
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 10,
    },
    subIcon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    arrow: {
        fontSize: 16,
        color: "#777",
    },
    logoutContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
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
    greenLine: {
        width: "100%",
        height: 4,
        backgroundColor: "#7ED957",
        borderRadius: 10,
        marginBottom: 15,
    },
    initialsAvatarSmall: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#90D400",
        justifyContent: "center",
        alignItems: "center",
    },
    initialsTextSmall: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    logoutDynamic: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        marginBottom: 10,
    },

})

export default DrawerNavigator