import {
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Modal, PaperProvider, Portal, ProgressBar, Text } from "react-native-paper";
import { Provider } from "react-redux";
import useCheckForUpdates from "../common/hook/useCheckForUpdates";
import AppNavigator from "../presentation/navigation/AppNavigator";
import { theme } from "../presentation/theme/theme";
import { store } from "../state/store";

const getModalColors = (type) => {
    switch (type) {
        case 'success':
            return {
                background: '#ebfcffff',
                border: '#008A9B',
                text: '#008A9B',
                icon: require('../assets/icons/info-circle.png'),
                button: '#008A9B',
                closeIcon: require('../assets/icons/closeInfo.png')
            };
        case 'warning':
            return {
                background: '#FFF8E1',
                border: '#FFA000',
                text: '#FFA000',
                icon: require('../assets/icons/exclamation-triangle.png'),
                button: '#FF9800',
                closeIcon: require('../assets/icons/closeWarning.png')
            };
        case 'error':
            return {
                background: '#FFEBEE',
                border: '#EB465A',
                text: '#EB465A',
                icon: require('../assets/icons/exclemation-circle.png'),
                button: '#FF6E64',
                closeIcon: require('../assets/icons/closeError.png')
            };
        case 'updated':
            return {
                background: '#E8F5E9',
                border: '#90D400',
                text: '#90D400',
                icon: require('../assets/icons/check-circle.png'),
                button: '#80C300',
                closeIcon: require('../assets/icons/closeSuccess.png')
            };
        default:
            return {
                background: '#ebfcffff',
                border: '#008A9B',
                text: '#008A9B',
                icon: require('../assets/icons/info-circle.png'),
                button: '#008A9B',
                closeIcon: require('../assets/icons/closeInfo.png')
            };
    }
};

const RootLayout = () => {
    const {
        modalData,
        hideModal,
        handleAcceptUpdate,
        isDownloading,
        downloadProgress,
        timeRemaining
    } = useCheckForUpdates();
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold
    });
    if (!fontsLoaded) return null;
    const currentColor = getModalColors(modalData.type);

    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <Portal>
                    {modalData.visible && (
                        <BlurView
                            intensity={75}
                            tint="dark"
                            style={StyleSheet.absoluteFill}
                        />
                    )}
                    <Modal
                        visible={modalData.visible}
                        //onDismiss={hideModal}
                        contentContainerStyle={styles.modalContent}
                        //dismissable
                        style={{ backgroundColor: "transparent" }}
                    >
                        <View
                            style={[
                                styles.innerContainer,
                                {
                                    borderColor: currentColor.border,
                                    backgroundColor: currentColor.background,
                                }
                            ]}
                        >
                            <View style={styles.titleContent}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        source={currentColor.icon}
                                        style={styles.iconAlert}
                                    />
                                    <Text style={[styles.title, { color: currentColor.text }]}>
                                        {modalData.title}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={hideModal}
                                >
                                    <Image
                                        source={currentColor.closeIcon}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.message}>
                                {modalData.message}
                            </Text>

                            {modalData.type === 'success' && !isDownloading && (
                                <Button
                                    mode="contained"
                                    onPress={handleAcceptUpdate}
                                    style={[styles.button, { backgroundColor: currentColor.button }]}
                                >
                                    Actualizar
                                </Button>
                            )}

                            {isDownloading && (
                                <View style={{ width: '100%', marginTop: 20 }}>
                                    <Text style={{ marginBottom: 10, color: currentColor.text }}>
                                        Descargando actualización... Esto puede tardar unos segundos.
                                    </Text>
                                    <ProgressBar progress={downloadProgress} color={currentColor.button} />
                                    <Text style={{ marginTop: 10, color: currentColor.text }}>
                                        Tiempo estimado restante: {timeRemaining}s
                                    </Text>
                                    <ActivityIndicator
                                        size="small"
                                        color={currentColor.button}
                                        style={{ marginTop: 10 }}
                                    />
                                </View>
                            )}

                            {modalData.type === 'warning' && (
                                <Button
                                    mode="contained"
                                    onPress={hideModal}
                                    style={[styles.button, { backgroundColor: currentColor.button }]}
                                >
                                    Aceptar
                                </Button>
                            )}
                            {modalData.type === 'error' && (
                                <Button
                                    mode="contained"
                                    onPress={hideModal}
                                    style={[styles.button, { backgroundColor: currentColor.button }]}
                                >
                                    Aceptar
                                </Button>
                            )}
                            {modalData.type === 'updated' && (
                                <Button
                                    mode="contained"
                                    onPress={hideModal}
                                    style={[styles.button, { backgroundColor: currentColor.button }]}
                                >
                                    Aceptar
                                </Button>
                            )}
                        </View>
                    </Modal>
                </Portal>

                <AppNavigator />
            </PaperProvider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        width: "40%",
        alignSelf: "center",
        borderRadius: 10,
        //borderColor: '#d80000ff',
        //borderWidth: 5,
    },
    innerContainer: {
        borderWidth: 3,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    titleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    iconAlert: {
        width: 30,
        height: 30,
        //borderColor: '#d80000ff',
        //borderWidth: 2,
    },
    iconContainer: {
        //alignItems: 'center',
        //marginBottom: 10,
        flexDirection: "row",
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
        //fontWeight: 'bold',
        fontFamily: "Montserrat_500Medium",
        textAlign: 'center',
    },
    message: {
        fontSize: 18,
        //marginVertical: 10,
        color: "#8C8C8C",
        marginTop: 10,
        fontFamily: "Montserrat_400Regular"
    },
    button: {
        borderRadius: 6,
        marginTop: 20,
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: '#FFFFFF',
        //fontWeight: 'bold',
        fontFamily: "Montserrat_500Medium"
    },
})

export default RootLayout;