import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import styleForgotPassword from "../styles/stylesForgotPassword";

const ForgotPasswordModal = () => {
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
                        <TouchableOpacity onPress={() => { }}>
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
                        <TextInput
                            label="Usuario *"
                            mode="outlined"
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
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
                        <TextInput
                            label="Correo Electrónico *"
                            mode="outlined"
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
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
                    </View>
                    <View style={styleForgotPassword.buttonContent}>
                        <Button 
                            mode="outlined" 
                            style={styleForgotPassword.cancelModal} 
                            textColor="#8C8C8C" 
                            onPress={() => { }}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            mode="contained" 
                            style={styleForgotPassword.saveModal} 
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

export default ForgotPasswordModal;