import { useEffect } from "react";
import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { showAlert } from "../../../../common/components/AlertManager";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useForgotUsernameHook from "../hooks/useForgotUsernameHook";
import styleForgotUsername from "../styles/stylesForgotUsername";

const ForgotUsernameModal = () => {
    const {
        emailTwoModalRef,
        formTwo,
        handleSend,
        onChangeText,
        showErrorsTwoModal,
        onCloseTwoModal
    } = useForgotUsernameHook();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            emailTwoModalRef?.current?.focus();
        }, 300);
        
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <View style={styleForgotUsername.titleContent}>
                        <View style={styleForgotUsername.leftGroup}>
                            <Image
                                source={require("../../../../assets/icons/bell.png")}
                                style={styleForgotUsername.icon}
                            />
                            <Text style={styleForgotUsername.title}>
                                ¿Olvidaste tu usuario?
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onCloseTwoModal}>
                            <Image
                                source={require("../../../../assets/icons/close.png")}
                                style={styleForgotUsername.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <Divider style={styleForgotUsername.divider} />
                    <View>
                        <Text style={styleForgotUsername.textModal}>
                            Ingresa el correo asociado a tu cuenta para enviarte las instrucciones y ayudarte a recuperar tu usuario.
                        </Text>
                        <Animatable.View>
                            <CustomTextInput
                                ref={emailTwoModalRef}
                                label="Correo Electrónico *"
                                value={formTwo.emailTwoModal}
                                onChangeText={(text) => {
                                    const hasSpaces = /\s/.test(text);
                                    const noSpaces = text.replace(/\s/g, '');

                                    onChangeText('emailTwoModal', noSpaces);

                                    if (hasSpaces) {
                                        showAlert("warning", "El correo electrónico no puede contener espacios.");
                                    }
                                }}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        outline: showErrorsTwoModal && !formTwo.emailTwoModal ? 'red' : "#E5E5E5",
                                        primary: "#09D400"
                                    }
                                }}
                                style={styleForgotUsername.input}
                                keyboardType="email-address"
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={require("../../../../assets/icons/mail.png")}
                                                style={styleForgotUsername.iconInput}
                                            />
                                        )}
                                    />
                                }
                            />
                        </Animatable.View>
                    </View>
                    <View style={styleForgotUsername.buttonContent}>
                        <Button
                            mode="outlined"
                            style={styleForgotUsername.cancelModal}
                            textColor="#8C8C8C"
                            onPress={onCloseTwoModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            mode="contained"
                            style={styleForgotUsername.saveModal}
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

export default ForgotUsernameModal;