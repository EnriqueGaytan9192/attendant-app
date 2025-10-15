import { useState } from "react";
import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAlert from "../../../../common/components/CustomAlert";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useLoginHook from "../hooks/useLoginHook";
import stylesLogin from "../styles/stylesLogin";

const LoginScreen = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const {
        form,
        deviceId,
        passwordVisible,
        setPasswordVisible,
        passwordModal,
        userModal,
        emailRef,
        passwordRef,
        showErrors,
        showSnackbar,
        setShowSnackbar,
        handleLogin,
        handleDataForm,
        alertNetworkVisible,
        alertNetworkMessage,
        alertNetworkType,
        setAlertNetworkVisible,
        reconnectedAlertVisible,
        setReconnectedAlertVisible,
        reconnectedMessage,
        unstableNetworkVisible,
        setUnstableNetworkVisible,
        unstableMessage,
    } = useLoginHook();
    const [showNoSpacesAlertUsername, setShowNoSpacesAlertUsername] = useState(false);
    const [showNoSpacesAlertPassword, setShowNoSpacesAlertPassword] = useState(false);

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
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={stylesLogin.divider} />

                            <View style={stylesLogin.rightSection}>
                                <Text style={stylesLogin.title}>
                                    Iniciar Sesión
                                </Text>
                                <Animatable.View style={{ width: '70%', marginBottom: 15 }} ref={emailRef}>
                                    <CustomTextInput
                                        ref={emailRef}
                                        label="Nombre de Usuario *"
                                        value={form.email}
                                        onChangeText={(text) => {
                                            const hasSpaces = /\s/.test(text);
                                            const noSpaces = text.replace(/\s/g, '');

                                            setShowSnackbar(false);
                                            handleDataForm('email', noSpaces);

                                            if (hasSpaces && !showNoSpacesAlertUsername) {
                                                setShowNoSpacesAlertUsername(true);
                                            }
                                        }}
                                        mode="outlined"
                                        theme={{
                                            colors: {
                                                outline: showErrors && !form.email ? 'red' : "#E5E5E5",
                                                primary: "#90D400",
                                            },
                                        }}
                                        style={{ backgroundColor: "#FFFFFF", fontSize: 16 }}
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
                                </Animatable.View>
                                <Animatable.View style={{ width: '70%', marginBottom: 15 }} ref={passwordRef}>
                                    <CustomTextInput
                                        ref={passwordRef}
                                        label="Contraseña *"
                                        value={form.password}
                                        onChangeText={(text) => {
                                            const hasSpaces = /\s/.test(text);
                                            const noSpaces = text.replace(/\s/g, '');

                                            setShowSnackbar(false);
                                            handleDataForm('password', noSpaces);

                                            if (hasSpaces && !showNoSpacesAlertPassword) {
                                                setShowNoSpacesAlertPassword(true);
                                            }
                                        }}
                                        mode="outlined"
                                        theme={{
                                            colors: {
                                                outline: showErrors && !form.password ? 'red' : "#E5E5E5",
                                                primary: "#90D400",
                                            }
                                        }}
                                        style={{ backgroundColor: "#FFFFFF", fontSize: 16 }}
                                        keyboardType="default"
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
                                                        source={require("../../../../assets/icons/visibility_off.png")}
                                                        style={stylesLogin.iconInput}
                                                    />
                                                )}
                                            />
                                        }
                                    />
                                </Animatable.View>
                                <Button mode="contained" style={stylesLogin.button} onPress={handleLogin}>
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
                                    marginRight: 10
                                }}
                            >
                                Versión 1.0.8.1
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <CustomAlert
                    visible={showSnackbar}
                    onDismiss={() => setShowSnackbar(false)}
                    type='error'
                    message="Por favor completa todos los campos obligatorios."
                />
                <CustomAlert
                    visible={showNoSpacesAlertUsername}
                    onDismiss={() => setShowNoSpacesAlertUsername(false)}
                    type='warning'
                    message="El nombre de usuario no puede contener espacios."
                />
                <CustomAlert
                    visible={showNoSpacesAlertPassword}
                    onDismiss={() => setShowNoSpacesAlertPassword(false)}
                    type='warning'
                    message="La contraseña no puede contener espacios."
                />
                {reconnectedAlertVisible ? (
                    <CustomAlert
                        visible={true}
                        onDismiss={() => setReconnectedAlertVisible(false)}
                        type="success"
                        message={reconnectedMessage}
                    />
                ) : (
                    <>
                        <CustomAlert
                            visible={unstableNetworkVisible}
                            onDismiss={() => setUnstableNetworkVisible(false)}
                            type="warning"
                            message={unstableMessage}
                        />
                        <CustomAlert
                            visible={alertNetworkVisible}
                            onDismiss={() => setAlertNetworkVisible(false)}
                            type={alertNetworkType}
                            message={alertNetworkMessage}
                        />
                    </>
                )}

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;