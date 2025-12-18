import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, DataTable, Text, TextInput } from "react-native-paper";
import { showAlert } from "../../../../../common/components/AlertManager";
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
        handleViewManager,
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
                        <View style={stylesAreaManagersScreen.contentSearch}>
                            <Animatable.View style={stylesAreaManagersScreen.animationSearch} ref={searchInputRef}>
                                <CustomTextInput
                                    label="Buscar...."
                                    mode="outlined"
                                    value={search}
                                    onChangeText={(text) => {
                                        let value = text;

                                        if (/^\s+/.test(value)) {
                                            showAlert("warning", "No se permiten espacios al inicio.");
                                            value = value.replace(/^\s+/, "");
                                        }
                                        if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]/.test(value)) {
                                            showAlert("warning", "No se permiten caracteres especiales.");
                                            value = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]/g, "");
                                        }

                                        setSearch(value);
                                        setPage(0);
                                    }}
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: "#90D400"
                                        }
                                    }}
                                    style={stylesAreaManagersScreen.textInputSearch}
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../../assets/icons/searchIcon.png")}
                                                    style={stylesAreaManagersScreen.textInputIcon}
                                                />
                                            )}
                                        />
                                    }
                                />
                            </Animatable.View>
                        </View>
                        <View style={stylesAreaManagersScreen.contentTable}>
                            <Animatable.View ref={tableRef}>
                                <Card style={stylesAreaManagersScreen.cardTable}>
                                    <DataTable>
                                        <DataTable.Header style={stylesAreaManagersScreen.headerTable}>
                                            <DataTable.Title style={stylesAreaManagersScreen.titleTable}>
                                                <Text style={stylesAreaManagersScreen.textTitleTable}>Fecha De Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesAreaManagersScreen.titleTable}>
                                                <Text style={stylesAreaManagersScreen.textTitleTable}>Valor Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesAreaManagersScreen.titleTable}>
                                                <Text style={stylesAreaManagersScreen.textTitleTable}>Tipo De Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesAreaManagersScreen.titleTable}>
                                                <Text style={stylesAreaManagersScreen.textTitleTable}>Operario</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesAreaManagersScreen.titleTable}>
                                                <Text style={stylesAreaManagersScreen.textTitleTable}>Estado</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesAreaManagersScreen.titleTable}>
                                                <Text style={stylesAreaManagersScreen.textTitleTable}>Acciónes</Text>
                                            </DataTable.Title>
                                        </DataTable.Header>

                                        <ScrollView
                                            style={{ maxHeight: 240 }}
                                            nestedScrollEnabled
                                        >
                                            {paginatedData.map((row, idx) => (
                                                <DataTable.Row
                                                    key={idx}
                                                    style={stylesAreaManagersScreen.rowTable}
                                                >
                                                    <DataTable.Cell>
                                                        <Text style={stylesAreaManagersScreen.textCell}>{row.fechaDescuento}</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                        <Text style={stylesAreaManagersScreen.textCell}>{row.valorDescuento}</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                        <Text style={stylesAreaManagersScreen.textCell}>{row.tipoDescuento}</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                        <Text style={stylesAreaManagersScreen.textCell}>{row.operario}</Text>
                                                    </DataTable.Cell>

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
                                                        <TouchableOpacity onPress={() => handleViewManager(row)}>
                                                            <Image
                                                                source={require("../../../../../assets/icons/viewIcon.png")}
                                                                style={stylesAreaManagersScreen.iconTable}
                                                            />
                                                        </TouchableOpacity>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            ))}
                                        </ScrollView>
                                    </DataTable>
                                </Card>
                                <View style={stylesAreaManagersScreen.contentPagination}>
                                    <View style={stylesAreaManagersScreen.subContentPagination}>
                                        <Text style={stylesAreaManagersScreen.titleContentPagination}>Items por página:</Text>

                                        {[5, 10, 15, 20].map((num) => (
                                            <TouchableOpacity
                                                key={num}
                                                onPress={() => {
                                                    setItemsPerPage(num);
                                                    setPage(0);
                                                }}
                                                style={[stylesAreaManagersScreen.buttonPagination, { backgroundColor: itemsPerPage === num ? "#90D400" : "#eaeaea" }]}
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
                                        theme={{
                                            colors: {
                                                onSurface: "#666666",
                                            },
                                        }}
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
