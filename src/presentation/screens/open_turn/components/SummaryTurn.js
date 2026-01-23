import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Divider, Switch, Text } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useSummaryTurnHook from "../hooks/useSummaryTurnHook";
import stylesSummaryTurn from "../styles/stylesSummaryTurn";

const SummaryTurn = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        baseCompleta,
        toggleBase,
        handlePrevious,
        handleNextStep,
    } = useSummaryTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesSummaryTurn.container}>
                    <View style={stylesSummaryTurn.subContainer}>
                        <View style={stylesSummaryTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/openTurnIcon.png")}
                                style={stylesSummaryTurn.iconTitle}
                            />
                            <View style={stylesSummaryTurn.textContainer}>
                                <Text style={stylesSummaryTurn.textTitle}>Apertura de Turno</Text>
                                <Text style={stylesSummaryTurn.textSubtitle}>Bienvenid@ al registro de apertura de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesSummaryTurn.greenLine} />
                        <View style={stylesSummaryTurn.subContents}>
                            <Text style={stylesSummaryTurn.title}>Resumen Apertura de Turno</Text>
                        </View>
                        <View style={stylesSummaryTurn.subContentsTwo}>
                            <Text style={stylesSummaryTurn.subTitle}>Turno</Text>
                            <Text style={stylesSummaryTurn.info}>Turno 1 - 06:00 am - 08:00 am</Text>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={stylesSummaryTurn.subContentsThree}>
                            <Text style={stylesSummaryTurn.subTitle}>Operario</Text>
                            <Text style={stylesSummaryTurn.infoTwo}>Nayibe Casas - 1020345678</Text>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={stylesSummaryTurn.subContentsThree}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Text style={stylesSummaryTurn.subTitle}>Base de caja</Text>
                                    <Text style={stylesSummaryTurn.infoTwo}>$200.000</Text>
                                </View>
                                <View style={stylesSummaryTurn.contentSwitch}>
                                    <Switch
                                        value={baseCompleta}
                                        onValueChange={toggleBase}
                                        color="#90D400"
                                        trackColor={{
                                            true: "#90D400",
                                            false: "#005A6D"
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            marginLeft: 8,
                                            fontFamily: "Montserrat_400Regular",
                                            lineHeight: 20,
                                            color: baseCompleta ? "#666666" : "#666666",
                                        }}
                                    >
                                        {baseCompleta ? "Completa" : "Incompleta"}
                                    </Text>
                                </View>

                                {!baseCompleta && (
                                    <Animatable.View style={{ width: "18%", marginLeft: 20 }}>
                                        <CustomTextInput
                                            label="Base de Caja *"
                                            mode="outlined"
                                            theme={{
                                                colors: {
                                                    outlined: "#E5E5E5",
                                                    primary: "#90D400",
                                                }
                                            }}
                                            style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20 }}
                                            keyboardType="numeric"
                                        />
                                    </Animatable.View>
                                )}
                            </View>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesSummaryTurn.subTitle}>Vehículos en Patio</Text>
                            <Text style={stylesSummaryTurn.infoTwo}>20</Text>
                        </View>
                        <Divider style={stylesSummaryTurn.divider} />
                        <View style={stylesSummaryTurn.containerButtons}>
                            <Button
                                mode="contained"
                                onPress={handlePrevious}
                                style={{ backgroundColor: "#8C8C8C", alignSelf: "flex-end", borderRadius: 10, marginRight: 20 }}
                                contentStyle={{
                                    paddingHorizontal: 30,
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleNextStep}
                                style={{ backgroundColor: "#80C300", alignSelf: "flex-end", borderRadius: 10, marginLeft: 20 }}
                                contentStyle={{
                                    paddingHorizontal: 30
                                }}
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

export default SummaryTurn;