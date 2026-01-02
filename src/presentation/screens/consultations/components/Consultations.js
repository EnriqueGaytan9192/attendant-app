import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useConsultationsHook from "../hooks/useConsultationsHook";
import stylesConsultations from "../styles/stylesConsultations";

const ConsultationsScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        plate,
        result,
        showErrors,
        plateRef,
        dataInfo,
        setPlate,
        handlePlateChange,
        handleSearch,
    } = useConsultationsHook();

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
                        <View style={stylesConsultations.contentSubContainer}>
                            <Text style={stylesConsultations.textContent}>Consultar Información por Placa</Text>
                            <View style={stylesConsultations.inputContainer}>
                                <Animatable.View style={{ width: "77%" }} ref={plateRef}>
                                    <CustomTextInput
                                        label="Placa"
                                        value={plate}
                                        onChangeText={handlePlateChange}
                                        autoCapitalize="characters"
                                        mode="outline"
                                        theme={{
                                            colors: {
                                                outline: showErrors && !plate ? "red" : "#E5E5E5",
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
                                </Animatable.View>

                                <Button mode="contained" style={stylesConsultations.button} onPress={handleSearch}>
                                    Buscar
                                </Button>
                            </View>
                            <View style={stylesConsultations.greyLine} />
                            {result && (
                                <>
                                    <View style={stylesConsultations.statusPlateInfo}>
                                        <View>
                                            <Text style={stylesConsultations.titleContent}>Placa</Text>
                                            <Text style={stylesConsultations.subtitleContent}>{result.plate}</Text>
                                        </View>
                                        <View>
                                            <Text style={stylesConsultations.titleContent}>Tipo de Vehiculo</Text>
                                            <Text style={stylesConsultations.subtitleContent}>{result.vehicleType}</Text>
                                        </View>
                                        <View>
                                            <Text style={stylesConsultations.titleContent}>Ingreso</Text>
                                            <Text style={stylesConsultations.subtitleContent}>{result.entryDate}</Text>
                                        </View>
                                        <View style={{ marginRight: 15 }}>
                                            <Text style={stylesConsultations.titleContent}>Producto de Ingreso</Text>
                                            <Text style={stylesConsultations.subtitleContent}>{result.entryProduct}</Text>
                                        </View>
                                    </View>
                                </>
                            )}
                            {/*<Text style={[stylesConsultations.titleContent, { marginTop: 35 }]}>Productos Activos</Text>
                            <View style={stylesConsultations.contentCard}>
                                <CarReservationCard />

                                <MonthlyCarPayments />
                            </View>*/}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default ConsultationsScreen;