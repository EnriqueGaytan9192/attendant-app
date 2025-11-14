import { useEffect } from "react";
import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { showAlert } from "../../../../common/components/AlertManager";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useForgotPasswordHook from "../hooks/useForgotPasswordHook";
import styleForgotPassword from "../styles/stylesForgotPassword";

const ForgotPasswordModal = () => {
    const {
        usernameModalRef,
        emailModalRef,
        form,
        onChangeText,
        showErrorsOneModal,
        handleSend,
        onCloseOneModal,
    } = useForgotPasswordHook();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            usernameModalRef?.current?.focus();
        }, 300);

        return () => clearTimeout(timeOut);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <View style={styleForgotPassword.titleContent}>
                        <View style={styleForgotPassword.leftGroup}>
                            <Image
                                source={require("../../../../assets/icons/bell.png")}
                                style={styleForgotPassword.icon}
                            />
                            <Text style={styleForgotPassword.title}>
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onCloseOneModal}>
                            <Image
                                source={require("../../../../assets/icons/close.png")}
                                style={styleForgotPassword.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <Divider style={styleForgotPassword.divider} />
                    <View>
                        <Text style={styleForgotPassword.textModal}>
                            Ingresa tu correo y nombre de usuario asociados a tu cuenta para enviarte las instrucciones y ayudarte a recuperar tu contraseña.
                        </Text>
                        <Animatable.View>
                            <CustomTextInput
                                ref={usernameModalRef}
                                label="Usuario *"
                                value={form.usernameOneModal}
                                onChangeText={(text) => {

                                    const hasSpaces = /\s/.test(text);
                                    const noSpaces = text.replace(/\s/g, '');

                                    onChangeText('usernameOneModal', noSpaces);

                                    if (hasSpaces) {
                                        showAlert("warning", "El nombre de usuario no puede contener espacios.");
                                    }
                                }}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        outline: showErrorsOneModal && !form.usernameOneModal ? 'red' : "#E5E5E5",
                                        primary: "#09D400"
                                    }
                                }}
                                style={styleForgotPassword.input}
                                keyboardType="default"
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={require("../../../../assets/icons/person_outline.png")}
                                                style={styleForgotPassword.iconInput}
                                            />
                                        )}
                                    />
                                }
                            />
                        </Animatable.View>
                        <Animatable.View>
                            <CustomTextInput
                                ref={emailModalRef}
                                label="Correo Electrónico *"
                                value={form.emailOneModal}
                                onChangeText={(text) => {
                                    const hasSpaces = /\s/.test(text);
                                    const noSpaces = text.replace(/\s/g, '');

                                    onChangeText('emailOneModal', noSpaces)

                                    if (hasSpaces) {
                                        showAlert("warning", "El correo electrónico no puede contener espacios.");
                                    }
                                }}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        outline: showErrorsOneModal && !form.emailOneModal ? 'red' : "#E5E5E5",
                                        primary: "#09D400"
                                    }
                                }}
                                style={styleForgotPassword.input}
                                keyboardType="email-address"
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={require("../../../../assets/icons/mail.png")}
                                                style={styleForgotPassword.iconInput}
                                            />
                                        )}
                                    />
                                }
                            />
                        </Animatable.View>
                    </View>
                    <View style={styleForgotPassword.buttonContent}>
                        <Button
                            mode="outlined"
                            style={styleForgotPassword.cancelModal}
                            textColor="#8C8C8C"
                            onPress={onCloseOneModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            mode="contained"
                            style={styleForgotPassword.saveModal}
                            onPress={handleSend}
                        >
                            Guardar
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

export default ForgotPasswordModal;