import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    Image,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, DataTable, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import useAreaManagersScreenHook from "../hooks/useAreaManagersScreenHook";
import stylesAreaManagersScreen from "../styles/stylesAreaManagersScreen";

const AreaManagersScreen = () => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    const {
        tableRef,
        searchInputRef,
        search,
        page,
        itemsPerPage,
        paginatedData,
        totalPages,
        from,
        to,
        filteredData,
        setSearch,
        setPage,
        setItemsPerPage,
        getStatusBg,
        getStatusDot,
    } = useAreaManagersScreenHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesAreaManagersScreen.container, { height: screenHeight - 100 }]}>
                    <View style={stylesAreaManagersScreen.subContainer}>
                        <View style={stylesAreaManagersScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/pqrsIcon.png")}
                                style={stylesAreaManagersScreen.iconTitle}
                            />
                            <View style={stylesAreaManagersScreen.textContainer}>
                                <Text style={stylesAreaManagersScreen.textTitle}>Jefes</Text>
                                <Text style={stylesAreaManagersScreen.textSubtitle}>Radicar PQRS</Text>
                            </View>
                        </View>
                        <View style={stylesAreaManagersScreen.greenLine} />
                        <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                            <Animatable.View style={{ width: "35%", marginBottom: 15, marginTop: 50 }} ref={searchInputRef}>
                                <CustomTextInput
                                    label="Buscar...."
                                    mode="outlined"
                                    value={search}
                                    onChangeText={(t) => {
                                        setSearch(t);
                                        setPage(0);
                                    }}
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400"
                                        }
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
                        <View style={{ marginTop: 20 }}>
                            <Animatable.View ref={tableRef}>
                                <Card style={{ elevation: 3, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: "#FFFFFF" }}>
                                    <DataTable>
                                        <DataTable.Header style={{ borderTopColor: "#90D400", borderTopWidth: 2, borderBottomColor: "#90D400", borderBottomColor: 2 }}>
                                            <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Fecha De Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Valor Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Tipo De Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Operario</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Estado</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Acciónes</Text>
                                            </DataTable.Title>
                                        </DataTable.Header>

                                        <ScrollView
                                            style={{ maxHeight: 240 }}
                                            nestedScrollEnabled
                                        >
                                            {paginatedData.map((row, idx) => (
                                                <DataTable.Row
                                                    key={idx}
                                                    style={{ borderBottomWidth: 1, borderBlockColor: "#eee" }}
                                                >
                                                    <DataTable.Cell>{row.fechaDescuento}</DataTable.Cell>
                                                    <DataTable.Cell>{row.valorDescuento}</DataTable.Cell>
                                                    <DataTable.Cell>{row.tipoDescuento}</DataTable.Cell>
                                                    <DataTable.Cell>{row.operario}</DataTable.Cell>

                                                    <DataTable.Cell>
                                                        <View
                                                            style={{
                                                                flexDirection: "row",
                                                                backgroundColor: getStatusBg(row.status),
                                                                paddingVertical: 4,
                                                                paddingHorizontal: 10,
                                                                borderRadius: 16,
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: 50,
                                                                    backgroundColor: getStatusDot(row.status),
                                                                    marginRight: 6
                                                                }}
                                                            />
                                                            <Text style={{ color: "#fff", fontWeight: "600" }}>{row.status}</Text>
                                                        </View>
                                                    </DataTable.Cell>

                                                    <DataTable.Cell>
                                                        <TouchableOpacity>
                                                            <Ionicons name="eye-outline" size={22} color="#666" />
                                                        </TouchableOpacity>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            ))}
                                        </ScrollView>
                                    </DataTable>
                                </Card>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ marginRight: 8 }}>Items por página:</Text>

                                        {[5, 10, 15, 20].map((num) => (
                                            <TouchableOpacity
                                                key={num}
                                                onPress={() => {
                                                    setItemsPerPage(num);
                                                    setPage(0);
                                                }}
                                                style={{
                                                    backgroundColor: itemsPerPage === num ? "#90D400" : "#eaeaea",
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 6,
                                                    borderRadius: 6,
                                                    marginRight: 6
                                                }}
                                            >
                                                <Text style={{ color: itemsPerPage === num ? "#fff" : "#333" }}>
                                                    {num}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={totalPages}
                                        onPageChange={(newPage) => setPage(newPage)}
                                        label={`${from + 1}-${to} de ${filteredData.length}`}
                                        //label={`Página ${page + 1} de ${totalPages}`}
                                        //showFastPaginationControls
                                        numberOfItemsPerPage={itemsPerPage}
                                    />
                                </View>
                            </Animatable.View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AreaManagersScreen;
