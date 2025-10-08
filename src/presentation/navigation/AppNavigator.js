import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Login from '../../app/login';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("isAuthenticated: ", isAuthenticated);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="drawer" component={DrawerNavigator} />
            ) : (
                <Stack.Screen name="login" component={Login} />
            )}
        </Stack.Navigator>
    )
}

export default AppNavigator;