import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useLoginHook from "../hooks/useLoginHook";
import stylesLogin from "../styles/stylesLogin";

const LoginScreen = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const {
        form,
        loading,
        deviceId,
        passwordVisible,
        showErrors,
        emailRef,
        passwordRef,
        setPasswordVisible,
        handledUsernameChange,
        handlePasswordChange,
        passwordModal,
        userModal,
        handleLogin,
    } = useLoginHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1 }}>
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
                                    resizeMode="center"
                                />
                            </View>

                            <View style={stylesLogin.divider} />

                            <View style={stylesLogin.rightSection}>
                                <Text style={stylesLogin.title}>
                                    Iniciar Sesión
                                </Text>
                                <Animatable.View style={{ width: '70%', marginBottom: 15 }} ref={emailRef}>
                                    <CustomTextInput
                                        label="Nombre de Usuario *"
                                        value={form.email}
                                        onChangeText={handledUsernameChange}
                                        mode="outlined"
                                        theme={{
                                            colors: {
                                                outline: showErrors && !form.email ? '#FF6E64' : "#E5E5E5",
                                                primary: "#90D400",
                                            },
                                        }}
                                        style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20 }}
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
                                        keyboardType="default"
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: '70%', marginBottom: 15 }} ref={passwordRef}>
                                    <CustomTextInput
                                        label="Contraseña *"
                                        value={form.password}
                                        onChangeText={handlePasswordChange}
                                        mode="outlined"
                                        theme={{
                                            colors: {
                                                outline: showErrors && !form.password ? '#FF6E64' : "#E5E5E5",
                                                primary: "#90D400",
                                            }
                                        }}
                                        style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20 }}
                                        secureTextEntry={passwordVisible}
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
                                                onPress={() => setPasswordVisible(!passwordVisible)}
                                                icon={() => (
                                                    <Image
                                                        source={
                                                            passwordVisible
                                                                ? require("../../../../assets/icons/visibility_off.png")
                                                                : require("../../../../assets/icons/viewIcon.png")
                                                        }
                                                        //style={stylesLogin.iconInput}
                                                        style={[
                                                            passwordVisible
                                                                ? stylesLogin.iconHidden
                                                                : stylesLogin.iconVisible
                                                        ]}
                                                    />
                                                )}
                                            />
                                        }
                                        keyboardType="default"
                                    />
                                </Animatable.View>
                                <Button
                                    mode="contained"
                                    style={stylesLogin.button}
                                    onPress={handleLogin}
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Iniciar Sesión
                                </Button>
                                <Divider style={stylesLogin.dividerForm} />
                                <TouchableOpacity onPress={passwordModal}>
                                    <Text style={stylesLogin.registerLink}>
                                        ¿Olvidaste tu contraseña?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={userModal}>
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
                            <Text
                                style={{
                                    alignSelf: 'flex-end',
                                    flex: 1,
                                    color: "#000",
                                    marginRight: 10,
                                    fontFamily: "Montserrat_400Regular",
                                    lineHeight: 20
                                }}
                            >
                                Versión DEV 5.0.1.13
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;