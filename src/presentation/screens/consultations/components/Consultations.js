import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesConsultations from "../styles/stylesConsultations";

const ConsultationsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesConsultations.container, { height: screenHeight - 25 }]}>
                    <View style={stylesConsultations.subContainer}>
                        <View style={stylesConsultations.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/consultationsIcon.png")}
                                style={stylesConsultations.iconTitle}
                            />
                            <View style={stylesConsultations.textContainer}>
                                <Text style={stylesConsultations.textTitle}>Consultas</Text>
                                <Text style={stylesConsultations.textSubtitle}>Consulta información sobre una placa dentro del parqueadero</Text>
                            </View>
                        </View>
                        <View style={stylesConsultations.greenLine} />
                        <View style={{ flex: 1, marginTop: 20, borderColor: "#000", borderWidth: 2 }}>
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ConsultationsScreen;