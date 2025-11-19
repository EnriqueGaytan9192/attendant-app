import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
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
                <View style={[stylesDocuments.container]}>
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
                        <View style={{ flex: 1, marginTop: 60, }}>
                            <Text style={stylesDocuments.textContent}>Documentos Generales y De Parqueadero</Text>
                            <View style={{ marginTop: 20 }}>
                                <CustomTextInput
                                    label="Buscar..."
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400",
                                        }
                                    }}
                                    style={{ backgroundColor: '#FFFFFF', fontSize: 16 }}
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../assets/icons/searchIcon.png")}
                                                    style={stylesDocuments.iconInput}
                                                />
                                            )}
                                        />
                                    }
                                />
                            </View>
                            <View>
                                <Card style={ stylesDocuments.card }>
                                    <Card.Content>
                                        <View style={ stylesDocuments.contentCard }>
                                            <Image
                                                source={require("../../../../assets/images/greenDocumentIcon.png")}
                                                style={ stylesDocuments.imageDocument }
                                            />
                                            <View>
                                                <Text style={ stylesDocuments.titleCard }>Lorem ipsum</Text>
                                                <Text style={ stylesDocuments.subtitleCard }>dd/mm/aaaa</Text>
                                            </View>
                                            <Image
                                                source={require("../../../../assets/icons/downloadIcon.png")}
                                                style={ stylesDocuments.iconDocument }
                                            />
                                        </View>
                                    </Card.Content>
                                </Card>

                                <Card style={ stylesDocuments.card }>
                                    <Card.Content>
                                        <View style={ stylesDocuments.contentCard }>
                                            <Image
                                                source={require("../../../../assets/images/yellowDocumentIcon.png")}
                                                style={ stylesDocuments.imageDocument }
                                            />
                                            <View>
                                                <Text style={ stylesDocuments.titleCard }>Lorem ipsum</Text>
                                                <Text style={ stylesDocuments.subtitleCard }>dd/mm/aaaa</Text>
                                            </View>
                                            <Image
                                                source={require("../../../../assets/icons/downloadIcon.png")}
                                                style={ stylesDocuments.iconDocument }
                                            />
                                        </View>
                                    </Card.Content>
                                </Card>

                                <Card style={ stylesDocuments.card }>
                                    <Card.Content>
                                        <View style={ stylesDocuments.contentCard }>
                                            <Image
                                                source={require("../../../../assets/images/blueDocumentIcon.png")}
                                                style={ stylesDocuments.imageDocument }
                                            />
                                            <View>
                                                <Text style={ stylesDocuments.titleCard }>Lorem ipsum</Text>
                                                <Text style={ stylesDocuments.subtitleCard }>dd/mm/aaaa</Text>
                                            </View>
                                            <Image
                                                source={require("../../../../assets/icons/downloadIcon.png")}
                                                style={ stylesDocuments.iconDocument }
                                            />
                                        </View>
                                    </Card.Content>
                                </Card>

                                <Card style={stylesDocuments.card }>
                                    <Card.Content>
                                        <View style={ stylesDocuments.contentCard }>
                                            <Image
                                                source={require("../../../../assets/images/redDocumentIcon.png")}
                                                style={ stylesDocuments.imageDocument }
                                            />
                                            <View>
                                                <Text style={ stylesDocuments.titleCard }>Lorem ipsum</Text>
                                                <Text style={ stylesDocuments.subtitleCard }>dd/mm/aaaa</Text>
                                            </View>
                                            <Image
                                                source={require("../../../../assets/icons/downloadIcon.png")}
                                                style={ stylesDocuments.iconDocument }
                                            />
                                        </View>
                                    </Card.Content>
                                </Card>

                                <Card style={ stylesDocuments.card }>
                                    <Card.Content>
                                        <View style={ stylesDocuments.contentCard }>
                                            <Image
                                                source={require("../../../../assets/images/greenDocumentIcon.png")}
                                                style={ stylesDocuments.imageDocument }
                                            />
                                            <View>
                                                <Text style={ stylesDocuments.titleCard }>Lorem ipsum</Text>
                                                <Text style={ stylesDocuments.subtitleCard }>dd/mm/aaaa</Text>
                                            </View>
                                            <Image
                                                source={require("../../../../assets/icons/downloadIcon.png")}
                                                style={ stylesDocuments.iconDocument }
                                            />
                                        </View>
                                    </Card.Content>
                                </Card>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default DocumentsScreen;