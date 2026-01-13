import { Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text, TextInput } from 'react-native-paper';
import CustomTextInput from '../../../../common/components/CustomTextInput';
import stylesProfileInfo from "../styles/stylesProfileInfo";

const PersonalInfoSection = ({ user }) => {
    return (
        <View style={stylesProfileInfo.personalContainer}>
            <Text style={stylesProfileInfo.personalText}>Información Personales</Text>
            
            <View style={stylesProfileInfo.contentPersonalInput}>
                <Animatable.View style={stylesProfileInfo.textInputPPersonal}>
                    <CustomTextInput
                        label=""
                        value={user.firstName}
                        readonly
                        style={{ lineHeight: 20 }}
                    />
                </Animatable.View>
                <Animatable.View style={stylesProfileInfo.textInputPPersonal}>
                    <CustomTextInput
                        label=""
                        value={user.lastName}
                        readonly
                        style={{ lineHeight: 20 }}
                    />
                </Animatable.View>
                <Animatable.View style={stylesProfileInfo.textInputPPersonal}>
                    <CustomTextInput
                        label=""
                        value={user.documentType}
                        readonly
                        style={{ lineHeight: 20 }}
                    />
                </Animatable.View>
            </View>
            <View style={stylesProfileInfo.contentPersonalInput}>
                <Animatable.View style={stylesProfileInfo.textInputPPersonal}>
                    <CustomTextInput
                        label=""
                        value={user.noIdentifier}
                        readonly
                        style={{ lineHeight: 20 }}
                    />
                </Animatable.View>
                <Animatable.View style={stylesProfileInfo.textInputPPersonal}>
                    <CustomTextInput
                        label=""
                        value={user.birthDate}
                        readonly
                        style={{ lineHeight: 20 }}
                        right={
                            <TextInput.Icon
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
                <Animatable.View style={stylesProfileInfo.textInputPPersonal}>
                    <CustomTextInput
                        label=""
                        value={user.gender}
                        readonly
                        style={{ lineHeight: 20 }}
                    />
                </Animatable.View>
            </View>
        </View>
    )
}

export default PersonalInfoSection;