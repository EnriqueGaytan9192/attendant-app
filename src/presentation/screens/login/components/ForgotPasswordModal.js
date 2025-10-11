import { Image, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import styleForgotPassword from "../styles/stylesForgotPassword";

const ForgotPasswordModal = () => {
    return (
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
            <Text>
                Ingresa tu correo y nombre de usuario asociados a tu cuenta para enviarte las instrucciones y ayudarte a recuperar tu contraseña.
            </Text>
        </View>
    );
}

export default ForgotPasswordModal;