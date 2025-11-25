import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import stylesConsultations from "../styles/stylesConsultations";

const ConsultationsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesConsultations.container]}>
                    <View style={stylesConsultations.subContainer}>
                        <View style={stylesConsultations.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/consultationsIcon.png")}
                                style={stylesConsultations.iconTitle}
                            />
                            <View style={stylesConsultations.textContainer}>
                                <Text style={stylesConsultations.textTitle}>Consultas</Text>
                                <Text style={stylesConsultations.textSubtitle}>Consulta información sobre una placa dentro del parqueadero</Text>
                            </View>
                        </View>
                        <View style={stylesConsultations.greenLine} />
                        <View style={{ flex: 1, marginTop: 50 }}>
                            <Text style={stylesConsultations.textContent}>Consultar Información por Placa</Text>
                            <View style={stylesConsultations.inputContainer}>
                                <CustomTextInput
                                    label="Placa"
                                    mode="outline"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400",
                                        }
                                    }}
                                    style={stylesConsultations.input}
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../assets/icons/searchIcon.png")}
                                                    style={stylesConsultations.iconInput}
                                                />
                                            )}
                                        />
                                    }
                                />

                                <Button mode="contained" style={stylesConsultations.button}>
                                    Buscar
                                </Button>
                            </View>
                            <View style={stylesConsultations.greyLine} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                <View>
                                    <Text style={stylesConsultations.titleContent}>Placa</Text>
                                    <Text style={stylesConsultations.subtitleContent}>AAA111</Text>
                                </View>
                                <View>
                                    <Text style={stylesConsultations.titleContent}>Tipo de Vehiculo</Text>
                                    <Text style={stylesConsultations.subtitleContent}>Carro</Text>
                                </View>
                                <View>
                                    <Text style={stylesConsultations.titleContent}>Ingreso</Text>
                                    <Text style={{ color: "#666666", fontSize: 12, marginTop: 10 }}>dd/mm/aaaa 00:00 am/pm</Text>
                                </View>
                                <View>
                                    <Text style={stylesConsultations.titleContent}>Producto de Ingreso</Text>
                                    <Text style={stylesConsultations.subtitleContent}>Horas</Text>
                                </View>
                            </View>
                            <Text style={[stylesConsultations.titleContent, { marginTop: 35 }]}>Productos Activos</Text>
                            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                                <Card style={{ width: "35%", borderRadius: 8, elevation: 3, backgroundColor: 'white', padding: 10 }}>
                                    <Card.Content>
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20, }}>Reserva Carro</Text>
                                                <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, backgroundColor: "#95E42D" }}>
                                                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600", }}>Activa</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 15 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20 }}>Fecha de Ingreso</Text>
                                                <Text style={{ color: "#666666", fontSize: 16 }}>dd/mm/aaaa</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20 }}>Hora de Ingreso</Text>
                                                <Text style={{ color: "#666666", fontSize: 16 }}>00:00 am/pm</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20 }}>Duración</Text>
                                                <Text style={{ color: "#666666", fontSize: 16 }}>2 horas</Text>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 15 }} />
                                            <View style={{ marginTop: 15 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image
                                                        source={require('../../../../assets/icons/vehicleIcon.png')}
                                                        style={{ height: 40, width: 40 }}
                                                    />
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#005A6D", fontSize: 20 }}>AAA111</Text>
                                                        <Text style={{ color: "#666666", fontSize: 16 }}>Carro</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 15 }} />
                                            <View style={{ marginTop: 15 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <Text style={{ color: "#005A6D", fontSize: 20 }}>Parqueadero Calle 100</Text>
                                                        <Text style={{ color: "#666666", fontSize: 16 }}>Calle 100 #3-45</Text>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, backgroundColor: "#95E42D" }}>
                                                                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600", }}>Abierto</Text>
                                                            </View>
                                                            <Text style={{ color: "#666666", fontSize: 16, marginLeft: 10 }}>8:00 am - 11:00 pm</Text>
                                                        </View>
                                                    </View>
                                                    <Image
                                                        source={require('../../../../assets/icons/addressIcon.png')}
                                                        style={{ height: 40, width: 40 }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </Card.Content>
                                </Card>

                                <Card style={{ width: "35%", borderRadius: 8, elevation: 3, backgroundColor: 'white', padding: 10, marginLeft: 25 }}>
                                    <Card.Content>
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20, }}>Mensualidades Carro</Text>
                                                <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, backgroundColor: "#95E42D" }}>
                                                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600", }}>Activa</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 15 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20, marginLeft: 25 }}>Fecha de Inicio</Text>
                                                <Text style={{ color: "#666666", fontSize: 16 }}>dd/mm/aaaa</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                                <Text style={{ color: "#005A6D", fontSize: 20, marginLeft: 25 }}>Fecha de Expiración</Text>
                                                <Text style={{ color: "#666666", fontSize: 16 }}>dd/mm/aaaa</Text>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 15 }} />
                                            <View style={{ marginTop: 15 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <Text style={{ color: "#005A6D", fontSize: 20, marginLeft: 25 }}>Parqueadero Calle 100</Text>
                                                        <Text style={{ color: "#666666", fontSize: 16, marginLeft: 25 }}>Calle 100 #3-45</Text>
                                                        <View style={{ flexDirection: 'row', marginLeft: 25 }}>
                                                            <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, backgroundColor: "#95E42D" }}>
                                                                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600", }}>Abierto</Text>
                                                            </View>
                                                            <Text style={{ color: "#666666", fontSize: 16, marginLeft: 10 }}>8:00 am - 11:00 pm</Text>
                                                        </View>
                                                    </View>
                                                    <Image
                                                        source={require('../../../../assets/icons/addressIcon.png')}
                                                        style={{ height: 40, width: 40 }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 20 }} />
                                            <View style={{ marginTop: 15 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                                    <Image
                                                        source={require('../../../../assets/icons/vehicleIcon.png')}
                                                        style={{ height: 40, width: 40 }}
                                                    />
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: "#005A6D", fontSize: 20 }}>AAA111</Text>
                                                        <Text style={{ color: "#666666", fontSize: 16 }}>Carro</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: "100%", height: 1, backgroundColor: "#E5E5E5", borderRadius: 10, marginTop: 15 }} />
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

export default ConsultationsScreen;