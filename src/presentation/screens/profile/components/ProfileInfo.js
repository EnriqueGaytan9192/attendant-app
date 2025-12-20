import { Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import useProfileInfoHook from "../hooks/useProfileInfoHook";
import stylesProfileInfo from "../styles/stylesProfileInfo";
import ContactInfoSection from "./ContactInfoSection";
import PersonalInfoSection from "./PersonalInfoSection";
import ProfileHeader from "./ProfileHeader";

const ProfileInfo = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        user,
        initials,
    } = useProfileInfoHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesProfileInfo.container}>
                    <View style={stylesProfileInfo.containerInfo}>
                        <ProfileHeader
                            initials={initials}
                            name={`${user.firstName} ${user.lastName}`}
                            role={user.role}
                            email={user.email}
                        />
                        <View style={stylesProfileInfo.greenLine} />
                        <PersonalInfoSection user={user} />
                        <ContactInfoSection user={user} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ProfileInfo;