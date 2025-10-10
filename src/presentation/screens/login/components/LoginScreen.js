import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import useLoginHook from "../hooks/useLoginHook";
import stylesLogin from "../styles/stylesLogin";

const LoginScreen = () => {
    const { deviceId } = useLoginHook();

    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={stylesLogin.major}>
                        <Text style={stylesLogin.device}>{deviceId}</Text>
                        <View style={stylesLogin.container}>
                            <View style={stylesLogin.leftSection}>
                                <Image
                                    source={require('../../../../assets/images/logoParkingGo.png')}
                                    style={stylesLogin.logo}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={stylesLogin.divider} />

                            <View style={stylesLogin.rightSection}>
                                <Text style={stylesLogin.title}>
                                    Iniciar Sesión
                                </Text>
                                <TextInput
                                    label="Nombre de Usuario *"
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400",
                                        }
                                    }}
                                    style={stylesLogin.input}
                                    keyboardType="default"
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../assets/icons/person.png")}
                                                    style={stylesLogin.iconInput}
                                                />
                                            )}
                                        />
                                    }
                                />
                                <TextInput
                                    label="Contraseña *"
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400",
                                        }
                                    }}
                                    style={stylesLogin.input}
                                    keyboardType="visible-password"
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../assets/icons/lock.png")}
                                                    style={stylesLogin.iconInput}
                                                />
                                            )}
                                        />
                                    }
                                    right={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../assets/icons/visibility_off.png")}
                                                    style={stylesLogin.iconInput}
                                                />
                                            )}
                                        />
                                    }
                                />
                                <Button mode="contained" style={stylesLogin.button}>
                                    Iniciar Sesión
                                </Button>
                                <Divider style={stylesLogin.dividerForm} />
                                <TouchableOpacity>
                                    <Text style={stylesLogin.registerLink}>
                                        ¿Olvidaste tu contraseña?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={stylesLogin.registerLink}>
                                        ¿Olvidaste tu usuario?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../../../assets/images/footerParkingGo.png')}
                                style={[stylesLogin.footer, { width: screenWidth }]}
                                resizeMode="contain"
                            />
                            <Text style={{ alignSelf: 'flex-end', flex: 1 }}>Versión 1.0.1</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;