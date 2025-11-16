import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

const getAlertColors = (type) => {
    switch (type) {
        case 'success':
            return {
                title: 'Éxito',
                background: '#E8F5E9',
                border: '#90D400',
                titleText: '#90D400',
                text: '#8C8C8C',
                icon: require('../../assets/icons/check-circle.png'),
                //button: '#80C300',
                closeIcon: require('../../assets/icons/closeSuccess.png')
            };
        case 'warning':
            return {
                title: 'Advertencia',
                background: '#FFF8E1',
                border: '#FFA000',
                titleText: '#FFA000',
                text: '#8C8C8C',
                icon: require('../../assets/icons/exclamation-triangle.png'),
                closeIcon: require('../../assets/icons/closeWarning.png'),
            };
        case 'error':
            return {
                title: 'Error',
                background: '#FFEBEE',
                border: '#EB465A',
                titleText: '#EB465A',
                text: '#8C8C8C',
                icon: require('../../assets/icons/exclemation-circle.png'),
                closeIcon: require('../../assets/icons/closeError.png'),
            };
        default:
            return {
                title: 'Información',
                background: '#ebfcffff',
                border: '#008A9B',
                titleText: '#008A9B',
                text: '#8C8C8C',
                icon: require('../../assets/icons/info-circle.png'),
                closeIcon: require('../../assets/icons/closeInfo.png'),
            };
    }
};

const CustomAlert = ({
    visible,
    onDismiss,
    type = "error",
    message = "Error",
    duration = 3000,
    offsetTop = 35,
}) => {
    const colors = getAlertColors(type);
    const translateX = useSharedValue(300);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            opacity: visible ? 1 : 0,
        };
    });

    useEffect(() => {
        if (visible) {
            translateX.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.exp),
            });

            const timeout = setTimeout(() => {
                translateX.value = withTiming(300, {
                    duration: 300,
                    easing: Easing.in(Easing.exp),
                });
                onDismiss();
            }, duration);

            return () => clearTimeout(timeout);
        } else {
            translateX.value = withTiming(300, {
                duration: 300,
                easing: Easing.in(Easing.exp),
            });
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                animatedStyle,
                {
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    top: offsetTop || 35,
                },
            ]}
        >
            <Image source={colors.icon} style={styles.icon} />

            <View style={[styles.textBlock]}>
                <Text style={[styles.title, { color: colors.titleText }]}>
                    {colors.title}
                </Text>

                <Text style={[styles.message, { color: colors.text }]}>
                    {message}
                </Text>
            </View>

            <TouchableOpacity onPress={onDismiss}>
                <Image source={colors.closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 35,
        right: 20,
        maxWidth: 350,
        padding: 12,
        borderRadius: 8,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
        marginBottom: 35,
    },
    closeIcon: {
        width: 20,
        height: 20,
        marginLeft: 'auto',
    },
    text: {
        fontSize: 16,
        flex: 1,
    },
    textBlock: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 2,
    },
    message: {
        fontSize: 14,
    },
});


export default CustomAlert;
