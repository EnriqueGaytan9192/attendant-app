import { useState } from "react";
import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Text, TextInput } from "react-native-paper";
import CustomDataTable from "../../../../../common/components/CustomDataTable";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import stylesOperatorsScreen from "../styles/stylesOperatorsScreen";

const OperatorsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const dataInfo = [
        { fechaIngreso: "01/01/2025", placa: "AAA111", tipo: "Carro", status: "Activo" },
        { fechaIngreso: "02/01/2025", placa: "BBB222", tipo: "Moto", status: "Justificado" },
        { fechaIngreso: "03/01/2025", placa: "CCC333", tipo: "Carro", status: "Inactivo" },
    ];

    const columns = [
        { title: "Fecha/Hora Ingreso", key: "fechaIngreso" },
        { title: "Placa", key: "placa" },
        { title: "Tipo de Vehículo", key: "tipo" },
        { title: "Estado", key: "status" },
    ];

    const STATUS_STYLES = {
        Activo: { bg: "#A7E52F", dot: "#6FB80D", text: "#ffffff" },
        Justificado: { bg: "#FF9F1C", dot: "#D97706", text: "#ffffff" },
    };
    const data = [
        {
            fecha: "dd/mm/aaaa",
            valor: "Nayibe Casas",
            tipo: "Siniestros",
            estado: "Activo",
        },
        {
            fecha: "dd/mm/aaaa",
            valor: "Nayibe Casas",
            tipo: "Descuadre",
            estado: "Justificado",
        },
    ];

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesOperatorsScreen.container]}>
                    <View style={stylesOperatorsScreen.subContainer}>
                        <View style={stylesOperatorsScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/pqrsIcon.png")}
                                style={stylesOperatorsScreen.iconTitle}
                            />
                            <View style={stylesOperatorsScreen.textContainer}>
                                <Text style={stylesOperatorsScreen.textTitle}>Operarios</Text>
                                <Text style={stylesOperatorsScreen.textSubtitle}>Radicar PQRS</Text>
                            </View>
                        </View>
                        <View style={stylesOperatorsScreen.greenLine} />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Animatable.View style={{ width: '35%', marginBottom: 15, marginTop: 50 }} /*ref={emailRef}*/>
                                <CustomTextInput
                                    label="Buscar...."
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400",
                                        },
                                    }}
                                    style={{ backgroundColor: "#FFFFFF", fontSize: 16 }}
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../../assets/icons/searchIcon.png")}
                                                    style={{ width: 15, height: 15 }}
                                                />
                                            )}
                                        />
                                    }
                                />
                            </Animatable.View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <CustomDataTable
                                columns={columns}
                                data={dataInfo}
                                page={page}
                                setPage={setPage}
                                itemsPerPage={itemsPerPage}
                                setItemsPerPage={setItemsPerPage}
                                totalItems={dataInfo.length}
                                onView={(item) => console.log("Ver:", item)}
                                onEdit={(item) => console.log("Editar:", item)}
                                onDelete={(item) => console.log("Eliminar:", item)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default OperatorsScreen;
