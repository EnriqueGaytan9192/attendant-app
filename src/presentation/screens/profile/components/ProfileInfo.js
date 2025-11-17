import { Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";

const ProfileInfo = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{
                    backgroundColor: 'white',
                    height: screenHeight,
                    borderColor: '#d80000ff',
                    borderWidth: 5,
                }}>
                    <Text>ProfileInfo Component</Text>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ProfileInfo;