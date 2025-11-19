import { useState } from "react";
import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import CustomTable from "../../components/CustomTable";
import stylesPqrsScreen from "../styles/stylesPqrsScreen";

const PqrsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const columns = [
        { title: "Fecha", field: "fecha" },
        { title: "N° Radicado", field: "radicado" },
        { title: "Cliente", field: "cliente" },
        {
            title: "Estado",
            render: (row) => (
                <View
                    style={{
                        backgroundColor: "#A5E200",
                        paddingHorizontal: 14,
                        paddingVertical: 4,
                        borderRadius: 20,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            backgroundColor: "#6CB300",
                            borderRadius: 50,
                            marginRight: 6,
                        }}
                    />
                    <Text style={{ color: "#fff", fontWeight: "600" }}>{row.estado}</Text>
                </View>
            )
        },
        {
            title: "Acciones",
            center: true,
            render: () => (
                <TouchableOpacity>
                    <Image
                        source={require("../../../../../assets/icons/moneyIcon.png")}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            )
        }
    ];

    const data = [
        { fecha: "01/03/2025 10:00", radicado: "123456", cliente: "Nayibe Casas", estado: "Activo" },
        { fecha: "01/03/2025 10:00", radicado: "987654", cliente: "Juan Pérez", estado: "Activo" },
    ];

    const total = data.length;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesPqrsScreen.container, { height: screenHeight - 25 }]}>
                    <View style={stylesPqrsScreen.subContainer}>
                        <View style={stylesPqrsScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/pqrsIcon.png")}
                                style={stylesPqrsScreen.iconTitle}
                            />
                            <View style={stylesPqrsScreen.textContainer}>
                                <Text style={stylesPqrsScreen.textTitle}>PQRS</Text>
                                <Text style={stylesPqrsScreen.textSubtitle}>Radicar PQRS</Text>
                            </View>
                        </View>
                        <View style={stylesPqrsScreen.greenLine} />
                        <View style={{ marginTop: 50 }}></View>
                        <CustomTable
                            columns={columns}
                            data={data}
                        />

                        {/* PAGINACIÓN CENTRADA Y FUERA DE LA TABLA */}
                        <View style={{ marginTop: 20, alignItems: "center" }}>
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(total / itemsPerPage)}
                                onPageChange={setPage}
                                label={`${page * itemsPerPage + 1}-${Math.min((page + 1) * itemsPerPage, total)} de ${total}`}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={setItemsPerPage}
                                numberOfItemsPerPageList={[1, 5, 10, 25]}
                                showFastPaginationControls
                                selectPageDropdownLabel="Items por página"
                            />
                        </View>

                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default PqrsScreen;