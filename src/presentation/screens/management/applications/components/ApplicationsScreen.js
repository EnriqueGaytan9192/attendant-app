import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesApplicationsScreen from "../styles/stylesApplicationsScreen";

const ApplicationsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesApplicationsScreen.container, { height: screenHeight - 25 }]}>
                    <View style={stylesApplicationsScreen.subContainer}>
                        <View style={stylesApplicationsScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/applicationsIcon.png")}
                                style={stylesApplicationsScreen.iconTitle}
                            />
                            <View style={stylesApplicationsScreen.textContainer}>
                                <Text style={stylesApplicationsScreen.textTitle}>Solicitud</Text>
                                <Text style={stylesApplicationsScreen.textSubtitle}>Radicar Solicitud</Text>
                            </View>
                        </View>
                        <View style={stylesApplicationsScreen.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ApplicationsScreen;