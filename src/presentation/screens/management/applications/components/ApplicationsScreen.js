import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, DataTable, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import useApplicationsScreenHook from "../hooks/useApplicationsScreenHook";
import stylesApplicationsScreen from "../styles/stylesApplicationsScreen";
import DetailApplications from "./DetailApplications";
import NewApplicationsForm from "./NewApplicationsForm";

const ApplicationsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        selectedTabApplications,
        selectedApplication,
        search,
        page,
        itemsPerPage,
        dataInfo,
        paginatedData,
        totalPages,
        tableRef,
        searchInputRef,
        from,
        to,
        filteredData,
        setSelectedTabApplications,
        setSelectedApplication,
        setSearch,
        setPage,
        setItemsPerPage,
        getStatusBg,
        getStatusDot,
    } = useApplicationsScreenHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesApplicationsScreen.container}>
                    <View style={stylesApplicationsScreen.subContainer}>
                        <View style={stylesApplicationsScreen.containerTitle}>
                            <Image
                                source={require("../../../../../assets/images/applicationsIcon.png")}
                                style={stylesApplicationsScreen.iconTitle}
                            />
                            <View style={stylesApplicationsScreen.textContainer}>
                                <Text style={stylesApplicationsScreen.textTitle}>Solicitud</Text>
                                <Text style={stylesApplicationsScreen.textSubtitle}>Radicar Solicitud</Text>
                            </View>
                        </View>
                        <View style={stylesApplicationsScreen.greenLine} />
                        <View style={{ flexDirection: "row", marginBottom: 16, width: "40%", alignSelf: "flex-end", }}>
                            <TouchableOpacity
                                style={[{ flex: 1, padding: 12, alignItems: 'center', borderBottomColor: "#ddd", borderBottomWidth: 2 }, selectedTabApplications === "applications" && { borderBottomColor: "#90D400", backgroundColor: "#90D400", borderTopLeftRadius: 15, borderTopRightRadius: 15 }]}
                                onPress={() => {
                                    setSelectedApplication(null);
                                    setSelectedTabApplications("applications");
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: selectedTabApplications === "applications" ? "#FFFFFF" : "#8C8C8C"
                                    }}
                                >
                                    Solicitudes
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[{ flex: 1, padding: 12, alignItems: 'center', borderBottomColor: "#ddd", borderBottomWidth: 2 }, selectedTabApplications === "newApplications" && { borderBottomColor: "#90D400", backgroundColor: "#90D400", borderTopLeftRadius: 15, borderTopRightRadius: 15 }]}
                                onPress={() => setSelectedTabApplications("newApplications")}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: selectedTabApplications === "newApplications" ? "#FFFFFF" : "#8C8C8C"
                                    }}
                                >
                                    {selectedApplication ? "Ver Solicitud" : "Crear Solicitud"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {selectedTabApplications === "applications" && (
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Animatable.View style={{ width: "35%", marginBottom: 15, marginTop: 25 }} ref={searchInputRef}>
                                        <CustomTextInput
                                            label="Buscar...."
                                            mode="outline"
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
                                                <DataTable.Header style={{ borderTopColor: "#90D400", borderTopWidth: 2, borderBottomColor: "#90D400", borderBottomWidth: 2 }}>
                                                    <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                        <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Fecha</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                        <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>N° Solicitud</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={{ justifyContent: "flex-start" }}>
                                                        <Text style={{ fontWeight: "500", fontSize: 14, color: "#666666" }}>Asunto</Text>
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
                                                            <DataTable.Cell>{row.fecha}</DataTable.Cell>
                                                            <DataTable.Cell>{row.numSolicitud}</DataTable.Cell>
                                                            <DataTable.Cell>{row.asunto}</DataTable.Cell>

                                                            <DataTable.Cell>
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        backgroundColor: getStatusBg(row.status),
                                                                        paddingVertical: 4,
                                                                        paddingHorizontal: 10,
                                                                        borderRadius: 16,
                                                                        alignItems: "center",
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
                                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setSelectedApplication(row);
                                                                            setSelectedTabApplications("newApplications");

                                                                            console.log("Registro: ", row)
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            source={require("../../../../../assets/icons/viewIcon.png")}
                                                                            style={{ width: 22, height: 17 }}
                                                                        />
                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity>
                                                                        <Image
                                                                            source={require("../../../../../assets/icons/editIcon.png")}
                                                                            style={{ width: 19, height: 19 }}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
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
                            </>
                        )}

                        {selectedTabApplications === "newApplications" && (
                            selectedApplication
                                ? <DetailApplications data={selectedApplication} />
                                : <NewApplicationsForm
                                    onCancel={() => setSelectedTabApplications("applications")}
                                />
                        )}
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ApplicationsScreen;