import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../app/login';
//import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="drawer" component={DrawerNavigator} /> */}
            <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
    )
}

export default AppNavigator;