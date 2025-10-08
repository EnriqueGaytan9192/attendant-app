import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            {/*if (isAuthenticated) {
                router.replace('/drawer/home');
            } else {
                router.replace('/login');
            }*/}
            router.replace('/login');
        }, 5000);
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