import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import styleForgotUsername from "../styles/stylesForgotUsername";

const ForgotUsernameModal = () => {
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
                        <TouchableOpacity onPress={() => { }}>
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
                        <TextInput
                            label="Correo Electrónico *"
                            mode="outlined"
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
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
                    </View>
                    <View style={styleForgotUsername.buttonContent}>
                        <Button
                            mode="outlined"
                            style={styleForgotUsername.cancelModal}
                            textColor="#8C8C8C"
                            onPress={() => { }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            mode="contained"
                            style={styleForgotUsername.saveModal}
                            onPress={() => { }}
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