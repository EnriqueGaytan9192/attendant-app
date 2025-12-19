import { Image, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const MonthlyCarPayments = () => {
    return (
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
                                <View style={{ flexDirection: 'row', marginLeft: 25, marginTop: 5 }}>
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
    )
}

export default MonthlyCarPayments;