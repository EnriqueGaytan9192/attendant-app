import { View } from "react-native"
import * as Animatable from 'react-native-animatable'
import { Text } from "react-native-paper"
import CustomTextInput from '../../../../common/components/CustomTextInput'
import stylesProfileInfo from '../styles/stylesProfileInfo'

const ContactInfoSection = ({ user }) => {
    return (
        <View style={stylesProfileInfo.contactContainer}>
            <Text style={stylesProfileInfo.personalText}>Información de Contacto</Text>
            <View style={stylesProfileInfo.contentContactInput}>
                <Animatable.View style={stylesProfileInfo.textInputContact}>
                    <CustomTextInput
                        label=""
                        value={user.email}
                        readonly
                    />
                </Animatable.View>
                <Animatable.View style={stylesProfileInfo.textInputContact}>
                    <CustomTextInput
                        label=""
                        value={user.phone}
                        readonly
                    />
                </Animatable.View>
                <Animatable.View style={stylesProfileInfo.textInputContact}>
                    <CustomTextInput
                        label=""
                        value={user.city}
                        readonly
                    />
                </Animatable.View>
            </View>
            <View style={stylesProfileInfo.contentContactInput}>
                <Animatable.View style={stylesProfileInfo.textInputContact}>
                    <CustomTextInput
                        label=""
                        value={user.address}
                        readonly
                    />
                </Animatable.View>
            </View>
        </View>
    )
}

export default ContactInfoSection;