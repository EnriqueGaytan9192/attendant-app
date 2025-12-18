import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";

const DetailApplications = ({ data }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <View>
                        <Text style={{ color: "#005A6D", fontSize: 20, marginTop: 40 }}>Datos Solicitud</Text>
                        <View style={{ marginTop: 20, flexDirection: "row" }}>
                            <View>
                                <Text style={{ fontSize: 18, color: "#666666" }}>Asunto</Text>
                                <Text style={{ fontSize: 18, color: "#666666", marginLeft: 10, marginTop: 10 }}>{data.asunto}</Text>
                            </View>
                            <View style={{ marginLeft: 65 }}>
                                <Text style={{ fontSize: 18, color: "#666666" }}>Estado</Text>
                                <Text style={{ fontSize: 18, color: "#666666", marginLeft: 10, marginTop: 10 }}>{data.status}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Text style={{ color: "#005A6D", fontSize: 20 }}>Respuesta</Text>
                        <View>
                            <Text style={{ fontSize: 18, color: "#666666", marginTop: 10 }}>{data.answer}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: "#005A6D", fontSize: 20 }}>Reclamo</Text>
                        <View>
                            <Text style={{ fontSize: 18, color: "#666666", marginTop: 10 }}>{data.claim}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default DetailApplications;