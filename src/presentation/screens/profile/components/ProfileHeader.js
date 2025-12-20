
import { View } from "react-native";
import { Text } from "react-native-paper";
import stylesProfileInfo from "../styles/stylesProfileInfo";

const ProfileHeader = ({ initials, name, role, email }) => {

    return (
        <View style={stylesProfileInfo.infoAvatar}>

            <View style={stylesProfileInfo.initialsAvatar}>
                <Text style={stylesProfileInfo.initialsText}>
                    {initials}
                </Text>
            </View>
            <Text style={stylesProfileInfo.nameInfo}>{name}</Text>
            <Text style={stylesProfileInfo.roleInfo}>{role}</Text>
            <Text style={stylesProfileInfo.emailInfo}>{email}</Text>
        </View>
    )
}

export default ProfileHeader;