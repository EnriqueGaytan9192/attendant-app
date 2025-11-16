import { Dimensions, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";

const OpenTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{
                backgroundColor: 'white',
                height: screenHeight,
                width: screenWidth,
            }}>
                <Text>Open Turn Component</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default OpenTurnScreen;