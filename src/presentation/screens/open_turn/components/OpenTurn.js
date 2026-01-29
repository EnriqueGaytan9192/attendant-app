import { Dimensions, Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Card, DataTable, Divider, IconButton, Text } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useOpenTurnHook from "../hooks/useOpenTurnHook";
import stylesOpenTurn from "../styles/stylesOpenTurn";
import VehicleDropdown from "./components/VehicleDropdown";

const OpenTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        selectedPlates,
        manualPlates,
        observaciones,
        loading,
        autosData,
        motosData,
        bicicletasData,
        openDropdown,
        plate,
        showErrors,
        plateError,
        plateRef,
        toggleDropdown,
        togglePlateSelection,
        toggleSelectAll,
        isAllSelected,
        handlePlateChange,
        handleAddPlates,
        handleRemovePlate,
        handleObservacionChange,
        onContinue,
    } = useOpenTurnHook();
    //useInternetAlerts();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesOpenTurn.container}>
                    <View style={stylesOpenTurn.subContainer}>
                        <View style={stylesOpenTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesOpenTurn.iconTitle}
                            />
                            <View style={stylesOpenTurn.textContainer}>
                                <Text style={stylesOpenTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesOpenTurn.textSubtitle}>Bienvenid@ al registro de apertura de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesOpenTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <View style={stylesOpenTurn.vehiclesTotal}>
                                <Text style={stylesOpenTurn.vehiclesTitleT}>Vehículos en Patios</Text>
                                <Text style={stylesOpenTurn.vehiclesCountT}>
                                    {(autosData ? autosData.total : 0) + (motosData ? motosData.total : 0) + (bicicletasData ? bicicletasData.total : 0)}
                                </Text>
                            </View>
                            <View style={stylesOpenTurn.contentDropdown}>
                                <VehicleDropdown
                                    title="Carro"
                                    icon="directions-car"
                                    color="#90D400"
                                    vehicles={autosData?.vehicles || []}
                                    isOpen={openDropdown === "car"}
                                    onToggle={() => toggleDropdown("car")}
                                    selectedPlates={selectedPlates}
                                    onTogglePlate={togglePlateSelection}
                                    onToggleAll={() => toggleSelectAll(autosData?.vehicles)}
                                    allSelected={isAllSelected(autosData?.vehicles)}
                                />

                                <VehicleDropdown
                                    title="Moto"
                                    icon="two-wheeler"
                                    color="#90D400"
                                    vehicles={motosData?.vehicles || []}
                                    isOpen={openDropdown === "moto"}
                                    onToggle={() => toggleDropdown("moto")}
                                    selectedPlates={selectedPlates}
                                    onTogglePlate={togglePlateSelection}
                                    onToggleAll={() => toggleSelectAll(motosData?.vehicles)}
                                    allSelected={isAllSelected(motosData?.vehicles)}
                                />

                                <VehicleDropdown
                                    title="Bicicleta"
                                    icon="pedal-bike"
                                    color="#90D400"
                                    vehicles={bicicletasData?.bikes || []}
                                    isOpen={openDropdown === "bike"}
                                    onToggle={() => toggleDropdown("bike")}
                                    selectedPlates={selectedPlates}
                                    onTogglePlate={togglePlateSelection}
                                    onToggleAll={() => toggleSelectAll(bicicletasData?.bikes)}
                                    allSelected={isAllSelected(bicicletasData?.bikes)}
                                />
                            </View>
                        </View>
                        <Divider style={stylesOpenTurn.divider} />
                        <View style={stylesOpenTurn.subContents}>
                            <View>
                                <Text style={stylesOpenTurn.vehiclesTitleT}>Placas No Registradas</Text>
                                <View style={stylesOpenTurn.subcontentPlatesUnregistered}>
                                    <View style={stylesOpenTurn.contentInputPlate}>
                                        <Animatable.View style={{ width: "70%" }}>
                                            <CustomTextInput
                                                ref={plateRef}
                                                label="Placa *"
                                                value={plate}
                                                onChangeText={handlePlateChange}
                                                autoCapitalize="characters"
                                                mode="outlined"
                                                theme={{
                                                    colors: {
                                                        outline: plateError ? "#FF6E64" : "#E5E5E5",
                                                        primary: '#90D400',
                                                    }
                                                }}
                                                style={stylesOpenTurn.inputPlate}
                                                keyboardType="default"
                                            />
                                        </Animatable.View>
                                        <IconButton
                                            icon='check'
                                            mode="contained"
                                            iconColor="#FFFFFF"
                                            style={stylesOpenTurn.iconCheck}
                                            size={25}
                                            onPress={handleAddPlates}
                                            loading={loading}
                                            disabled={loading}
                                        />
                                    </View>
                                    <View style={stylesOpenTurn.contentDataTable}>
                                        <Card style={stylesOpenTurn.card}>
                                            <DataTable>
                                                <DataTable.Header style={{ borderTopColor: "#90D400", borderTopWidth: 1, borderBottomColor: "#90D400", borderBottomWidth: 1 }}>
                                                    <DataTable.Title style={{ justifyContent: "flex-start", flex: 2 }}>
                                                        <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_500Medium", }}>Fecha/Hora</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={{ justifyContent: "flex-start", flex: 1 }}>
                                                        <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_500Medium" }}>Placa</Text>
                                                    </DataTable.Title>
                                                    <DataTable.Title style={{ justifyContent: "center", flex: 0.5 }}>
                                                        <Text style={{ fontSize: 13, color: "#005A6D", fontFamily: "Monstserrat_500Medium" }}>Acción</Text>
                                                    </DataTable.Title>
                                                </DataTable.Header>

                                                <ScrollView
                                                    style={{ maxHeight: 195 }}
                                                    nestedScrollEnabled
                                                >
                                                    {manualPlates.map((item) => (
                                                        <DataTable.Row style={{ borderBottomWidth: 1, borderBlockColor: "#E5E5E5" }} key={item.plate}>
                                                            <DataTable.Cell style={{ flex: 2 }}>
                                                                <Text style={{ color: "#666666", fontSize: 13, fontFamily: "Montserrat_400Regular", lineHeight: 20 }}>{item.entry_date} {item.entry_hour}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={{ flex: 0.9 }}>
                                                                <Text style={{ color: "#666666", fontSize: 13, fontFamily: "Montserrat_400Regular", lineHeight: 20 }}>{item.plate}</Text>
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                                                                <TouchableOpacity
                                                                    onPress={() => handleRemovePlate(item.plate)}
                                                                >
                                                                    <Image
                                                                        source={require("../../../../assets/icons/deleteIcon.png")}
                                                                        style={{ width: 17, height: 22 }}
                                                                    />
                                                                </TouchableOpacity>
                                                            </DataTable.Cell>
                                                        </DataTable.Row>
                                                    ))}
                                                </ScrollView>
                                            </DataTable>
                                        </Card>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Divider style={stylesOpenTurn.divider} />
                        <View style={stylesOpenTurn.subContents}>
                            <Text style={stylesOpenTurn.vehiclesTitleT}>Observaciones</Text>
                            <Animatable.View style={{ marginTop: 15 }}>
                                <CustomTextInput
                                    label="Observaciones (opcional)"
                                    value={observaciones}
                                    onChangeText={handleObservacionChange}
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: '#90D400',
                                        }
                                    }}
                                    multiline
                                    numberOfLines={5}
                                    style={stylesOpenTurn.inputObservation}
                                    keyboardType="default"
                                />
                            </Animatable.View>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Button
                                mode="contained"
                                onPress={onContinue}
                                style={stylesOpenTurn.continueButton}
                                contentStyle={{ paddingHorizontal: 30 }}
                            >
                                Continuar
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default OpenTurnScreen;