import { BlurView } from "expo-blur";
import { Image, StyleSheet, View } from "react-native";
import { Button, Modal, Text } from "react-native-paper";

const getModalColors = (type) => {
    switch (type) {
        case 'warning':
            return {
                title: "Advertencia",
                background: '#FFF8E1',
                border: '#FFA000',
                text: '#FFA000',
                icon: require('../../assets/icons/exclamation-triangle.png'),
                button: '#FF9800',
                buttonCancel: '#666666',
            };
        case 'error':
            return {
                title: "Error",
                background: '#FFEBEE',
                border: '#EB465A',
                text: '#EB465A',
                icon: require('../../assets/icons/exclemation-circle.png'),
                button: '#FF6E64',
                buttonCancel: '#666666',
            };
        case 'info':
            return {
                title: "Información",
                background: '#ebfcffff',
                border: '#008A9B',
                text: '#008A9B',
                icon: require('../../assets/icons/info-circle.png'),
                button: '#008A9B',
                buttonCancel: '#666666',
            };
        case 'success':
            return {
                title: "Éxito",
                background: '#E8F5E9',
                border: '#90D400',
                text: '#90D400',
                icon: require('../../assets/icons/check-circle.png'),
                button: '#80C300',
                buttonCancel: '#666666',
            };
        default:
            return {
                background: '#E8F5E9',
                border: '#90D400',
                text: '#90D400',
                icon: require('../../assets/icons/check-circle.png'),
                button: '#80C300',
                buttonCancel: '#666666',
            };
    }
};

const CustomAlertButton = ({
    visible,
    title = "Confirmación",
    message,
    type = "warning",
    onConfirm,
    onCancel,
    onClose,
}) => {
    if (!visible) return null;

    const currentColor = getModalColors(type);

    return (
        <>
            <BlurView
                intensity={75}
                tint="dark"
                style={StyleSheet.absoluteFill}
            />

            <Modal
                visible={visible}
                contentContainerStyle={styles.modalContent}
                style={{ backgroundColor: "transparent" }}
            >
                <View
                    style={[
                        styles.innerContainer,
                        {
                            borderColor: currentColor.border,
                            backgroundColor: currentColor.background,
                        },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.titleContent}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={currentColor.icon}
                                style={styles.iconAlert}
                            />
                            <Text
                                style={[
                                    styles.title,
                                    { color: currentColor.text },
                                ]}
                            >
                                {currentColor.title}
                            </Text>
                        </View>

                        <Button compact onPress={onClose}>
                            ✕
                        </Button>
                    </View>

                    {/* Message */}
                    <Text style={styles.message}>
                        {message}
                    </Text>

                    {/* Actions */}
                    <View style={styles.actions}>
                        {onCancel && (
                            <Button
                                mode="contained"
                                onPress={onCancel}
                                style={[
                                    styles.button,
                                    { backgroundColor: currentColor.buttonCancel },
                                ]}
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button
                            mode="contained"
                            onPress={onConfirm}
                            style={[
                                styles.button,
                                { backgroundColor: currentColor.button },
                            ]}
                        >
                            Aceptar
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default CustomAlertButton;

const styles = StyleSheet.create({
    modalContent: {
        width: "40%",
        alignSelf: "center",
        borderRadius: 10,
    },
    innerContainer: {
        borderWidth: 3,
        padding: 20,
        borderRadius: 10,
    },
    titleContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconAlert: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
        fontFamily: "Montserrat_500Medium",
    },
    message: {
        fontSize: 18,
        color: "#8C8C8C",
        marginTop: 15,
        fontFamily: "Montserrat_400Regular",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 25,
    },
    button: {
        borderRadius: 6,
        marginLeft: 10,
        paddingHorizontal: 15
    },
});
