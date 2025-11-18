import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import stylesDocuments from "../styles/stylesDocuments";

const DocumentsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesDocuments.container, { height: screenHeight - 25 }]}>
                    <View style={stylesDocuments.subContainer}>
                        <View style={stylesDocuments.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/documentsIcon.png")}
                                style={stylesDocuments.iconTitle}
                            />
                            <View style={stylesDocuments.textContainer}>
                                <Text style={stylesDocuments.textTitle}>Documentos</Text>
                                <Text style={stylesDocuments.textSubtitle}>Descarga de documentos</Text>
                            </View>
                        </View>
                        <View style={stylesDocuments.greenLine} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default DocumentsScreen;