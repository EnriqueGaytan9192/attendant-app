import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Divider, Text } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import stylesOpenTurn from "../styles/stylesOpenTurn";

const OpenTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesOpenTurn.container, { height: screenHeight - 100 }]}>
                    <View style={stylesOpenTurn.subContainer}>
                        <View style={stylesOpenTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesOpenTurn.iconTitle}
                            />
                            <View style={stylesOpenTurn.textContainer}>
                                <Text style={stylesOpenTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesOpenTurn.textSubtitle}>Bienvenid@ al registro de apertura de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesOpenTurn.greenLine} />
                        <View style={{ marginTop: 50 }}>
                            <View style={stylesOpenTurn.vehiclesTotal}>
                                <Text style={stylesOpenTurn.vehiclesT}>Vehículos</Text>
                                <Text style={stylesOpenTurn.vehiclesT}>30</Text>
                            </View>
                        </View>
                        <Divider style={{ backgroundColor: "#E5E5E5" }} />
                        <View style={{ marginTop: 50 }}>
                            <View>
                                <Text style={stylesOpenTurn.vehiclesT}>Placas No Registradas</Text>
                                <View>
                                    <Animatable.View>
                                        <CustomTextInput
                                            label="Usuario *"
                                            mode="outlined"
                                            theme={{
                                                colors: {
                                                    outline: "#E5E5E5",
                                                    primary: "#09D400"
                                                }
                                            }}
                                            keyboardType="default"
                                        />
                                    </Animatable.View>
                                </View>
                            </View>
                        </View>
                        <Divider style={{ backgroundColor: "#E5E5E5" }} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default OpenTurnScreen;