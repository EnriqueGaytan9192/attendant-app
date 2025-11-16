import { Dimensions, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";

const ArchingSelector = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{
                backgroundColor: 'white',
                height: screenHeight,
                width: screenWidth,
            }}>
                <Text>ArchingSelector Component</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ArchingSelector;