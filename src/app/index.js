import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    console.log("isAuthenticated index: ", isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('/drawer/home');
            router.replace('/drawer/home');
        } else {
            console.log('/login');
            router.replace('/login');
        }
    }, [isAuthenticated]);

    return (
        <View style={ styles.container }>
            <ActivityIndicator size="large" color="#4CAF50" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8BC34A'
    }
});