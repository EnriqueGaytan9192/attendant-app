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
        autos,
        motos,
        bicicletas,
        plate,
        showErrors,
        openDropdown,
        selectedPlates,      
        plateRef,
        toggleDropdown,
        togglePlate,
        toggleSelectAll,
        isAllSelected,
        handlePlateChange,
        handleNextStep,
    } = useOpenTurnHook();

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
                                <Text style={stylesOpenTurn.vehiclesCountT}>30</Text>
                            </View>
                            <View style={stylesOpenTurn.contentDropdown}>
                                <VehicleDropdown
                                    title="Carro"
                                    icon="directions-car"
                                    color="#90D400"
                                    vehicles={autos}
                                    isOpen={openDropdown === "car"}
                                    onToggle={() => toggleDropdown("car")}
                                    selected={selectedPlates.car}
                                    onTogglePlate={(plate) => togglePlate("car", plate)}
                                    onToggleAll={() => toggleSelectAll("car", autos)}
                                    allSelected={isAllSelected("car", autos)}
                                />

                                <VehicleDropdown
                                    title="Moto"
                                    icon="two-wheeler"
                                    color="#90D400"
                                    vehicles={motos?.vehicles || []}
                                    isOpen={openDropdown === "moto"}
                                    onToggle={() => toggleDropdown("moto")}
                                    selected={selectedPlates.moto}
                                    onTogglePlate={(plate) => togglePlate("moto", plate)}
                                />

                                <VehicleDropdown
                                    title="Bicicleta"
                                    icon="pedal-bike"
                                    color="#90D400"
                                    vehicles={bicicletas?.vehicles || []}
                                    isOpen={openDropdown === "bike"}
                                    onToggle={() => toggleDropdown("bike")}
                                    selected={selectedPlates.bike}
                                    onTogglePlate={(plate) => togglePlate("bike", plate)}
                                />
                            </View>
                        </View>
                        <Divider style={stylesOpenTurn.divider} />
                        <View style={stylesOpenTurn.subContents}>
                            <View>
                                <Text style={stylesOpenTurn.vehiclesTitleT}>Placas No Registradas</Text>
                                <View style={stylesOpenTurn.subcontentPlatesUnregistered}>
                                    <View style={stylesOpenTurn.contentInputPlate}>
                                        <Animatable.View style={{ width: "70%" }} ref={plateRef}>
                                            <CustomTextInput
                                                label="Placa *"
                                                value={plate}
                                                onChangeText={handlePlateChange}
                                                mode="outlined"
                                                theme={{
                                                    colors: {
                                                        outline: showErrors && !plate ? "red" : "#E5E5E5",
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
                                                    style={{ maxHeight: 150 }}
                                                    nestedScrollEnabled
                                                >
                                                    <DataTable.Row style={{ borderBottomWidth: 1, borderBlockColor: "#E5E5E5" }}>
                                                        <DataTable.Cell style={{ flex: 2 }}>
                                                            <Text style={{ color: "#666666", fontSize: 13, fontFamily: "Montserrat_400Regular", lineHeight: 20 }}>mm/dd/aaaa 00:00 am/pm</Text>
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 0.9 }}>
                                                            <Text style={{ color: "#666666", fontSize: 13, fontFamily: "Montserrat_400Regular", lineHeight: 20 }}>AAA111</Text>
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                                                            <TouchableOpacity onPress={() => { }}>
                                                                <Image
                                                                    source={require("../../../../assets/icons/deleteIcon.png")}
                                                                    style={{ width: 17, height: 22 }}
                                                                />
                                                            </TouchableOpacity>
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
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
                                onPress={handleNextStep}
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