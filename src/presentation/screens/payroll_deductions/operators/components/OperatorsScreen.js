import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, DataTable, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import useOperatorsScreenHook from "../hooks/useOperatorsScreenHook";
import stylesOperatorsScreen from "../styles/stylesOperatorsScreen";

const OperatorsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

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
        handleViewOperator,
    } = useOperatorsScreenHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesOperatorsScreen.container, { height: screenHeight - 100 }]}>
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
                        <View style={stylesOperatorsScreen.contentSearch}>
                            <Animatable.View style={stylesOperatorsScreen.animationSearch} ref={searchInputRef}>
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
                                            primary: "#90D400",
                                        },
                                    }}
                                    style={stylesOperatorsScreen.textInputSearch}
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../../assets/icons/searchIcon.png")}
                                                    style={stylesOperatorsScreen.textInputIcon}
                                                />
                                            )}
                                        />
                                    }
                                />
                            </Animatable.View>
                        </View>
                        <View style={stylesOperatorsScreen.contentTable}>
                            <Animatable.View ref={tableRef}>
                                <Card style={stylesOperatorsScreen.cardTable}>
                                    <DataTable>
                                        <DataTable.Header style={stylesOperatorsScreen.headerTable}>
                                            <DataTable.Title style={stylesOperatorsScreen.titleTable}>
                                                <Text style={stylesOperatorsScreen.textTitleTable}>Fecha De Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesOperatorsScreen.titleTable}>
                                                <Text style={stylesOperatorsScreen.textTitleTable}>Valor Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesOperatorsScreen.titleTable}>
                                                <Text style={stylesOperatorsScreen.textTitleTable}>Tipo De Descuento</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesOperatorsScreen.titleTable}>
                                                <Text style={stylesOperatorsScreen.textTitleTable}>Estado</Text>
                                            </DataTable.Title>
                                            <DataTable.Title style={stylesOperatorsScreen.titleTable}>
                                                <Text style={stylesOperatorsScreen.textTitleTable}>Acciónes</Text>
                                            </DataTable.Title>
                                        </DataTable.Header>

                                        <ScrollView
                                            style={{ maxHeight: 240 }}
                                            nestedScrollEnabled
                                        >
                                            {paginatedData.map((row, idx) => (
                                                <DataTable.Row
                                                    key={idx}
                                                    style={stylesOperatorsScreen.rowTable}
                                                >
                                                    <DataTable.Cell>{row.fechaDescuento}</DataTable.Cell>
                                                    <DataTable.Cell>{row.valorDescuento}</DataTable.Cell>
                                                    <DataTable.Cell>{row.tipoDescuento}</DataTable.Cell>

                                                    <DataTable.Cell>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            backgroundColor: getStatusBg(row.status),
                                                            paddingVertical: 4,
                                                            paddingHorizontal: 10,
                                                            borderRadius: 16,
                                                            alignItems: "center"
                                                        }}>
                                                            <View style={{
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: 50,
                                                                backgroundColor: getStatusDot(row.status),
                                                                marginRight: 6
                                                            }} />
                                                            <Text style={{ color: "#fff", fontWeight: "600" }}>{row.status}</Text>
                                                        </View>
                                                    </DataTable.Cell>

                                                    <DataTable.Cell>
                                                        <TouchableOpacity onPress={() => handleViewOperator(row)}>
                                                            <Image
                                                                source={require("../../../../../assets/icons/viewIcon.png")}
                                                                style={stylesOperatorsScreen.iconTable}
                                                            />
                                                        </TouchableOpacity>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            ))}
                                        </ScrollView>
                                    </DataTable>
                                </Card>
                                <View style={stylesOperatorsScreen.contentPagination}>
                                    <View style={stylesOperatorsScreen.subContentPagination}>
                                        <Text style={stylesOperatorsScreen.titleContentPagination}>Items por página:</Text>

                                        {[5, 10, 15, 20].map((num) => (
                                            <TouchableOpacity
                                                key={num}
                                                onPress={() => {
                                                    setItemsPerPage(num);
                                                    setPage(0);
                                                }}
                                                style={[ stylesOperatorsScreen.buttonPagination, {backgroundColor: itemsPerPage === num ? "#90D400" : "#eaeaea"}]}
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
    )
}

export default OperatorsScreen;
