import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import stylesProfileInfo from "../styles/stylesProfileInfo";

const ProfileInfo = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesProfileInfo.container, { height: screenHeight - 25 }]}>
                    <View style={stylesProfileInfo.containerInfo}>
                        <View style={stylesProfileInfo.infoAvatar}>
                            <Image
                                source={require("../../../../assets/images/avatar.png")}
                                style={stylesProfileInfo.avatar}
                            />
                            <Text style={stylesProfileInfo.nameInfo}>Nayibe Casas</Text>
                            <Text style={stylesProfileInfo.roleInfo}>Operario</Text>
                            <Text style={stylesProfileInfo.emailInfo}>nayibe.casas@parking.net.co</Text>
                        </View>
                        <View style={stylesProfileInfo.greenLine} />
                        <View style={stylesProfileInfo.personalContainer}>
                            <Text style={stylesProfileInfo.personalText}>Información Personales</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="Nayibe Patricia"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="Casas Pelaez"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="Cédula de Ciudadania"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="1234567890"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="dd/mm/aaaa"
                                        readonly
                                        style={{ fontSize: 16 }}
                                        right={
                                            <TextInput.Icon
                                                onPress={() => setPasswordVisible(!passwordVisible)}
                                                icon={() => (
                                                    <Image
                                                        source={require("../../../../assets/icons/calendar.png")}
                                                        style={stylesProfileInfo.iconInput}
                                                    />
                                                )}
                                            />
                                        }
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="Femenino"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                            </View>
                        </View>
                        <View style={stylesProfileInfo.contactContainer}>
                            <Text style={stylesProfileInfo.personalText}>Información de Contacto</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="nayibe.casas@parking.net.co"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="3112435678"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="Ubaté"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Animatable.View style={{ width: "30%", marginBottom: 15 }}>
                                    <CustomTextInput
                                        label=""
                                        value="Calle 5 #24-16 pq.maria"
                                        readonly
                                        style={{ fontSize: 16 }}
                                    />
                                </Animatable.View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ProfileInfo;