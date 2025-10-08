import { createDrawerNavigator } from "@react-navigation/drawer";
import MainLayout from "../../common/components/MainLayout";
import routes from "./routes";

const Drawer = createDrawerNavigator();

const RenderMainLayout = ({ route }) => {
    const routeKey = route.name;
    return <MainLayout routeKey={routeKey} />;
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {routes.map((route) => (
                <Drawer.Screen
                    key={route.key}
                    name={route.key}
                    component={RenderMainLayout}
                    options={{
                        title: route.title,
                    }}
                />
            ))}
        </Drawer.Navigator>
    )
}

export default DrawerNavigator