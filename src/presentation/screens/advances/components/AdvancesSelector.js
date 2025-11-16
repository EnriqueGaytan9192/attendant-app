import { Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";

const AdvancesSelector = () => {
    const screenHeight = Dimensions.get('window').height;
    const screensWidth = Dimensions.get('window').width;

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
                    <Text>AdvancesSelector Component</Text>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default AdvancesSelector;