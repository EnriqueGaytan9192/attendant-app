import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useCloseTurnHook from "../hooks/useCloseTurnHook";
import stylesCloseTurn from "../styles/stylesCloseTurn";

const CloseTurnScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const {
        numeroIdentificacion,
        turnDet,
        turnDetail,
        loading,
        closeValue,
        isFocused,
        formatCurrency,
        formatCurrencyTwo,
        handleChangeValueTwo,
        handleChangeValue,
        setIsFocused,
        handledNext,
    } = useCloseTurnHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesCloseTurn.container}>
                    <View style={stylesCloseTurn.subContainer}>
                        <View style={stylesCloseTurn.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/closeTurnIcon.png")}
                                style={stylesCloseTurn.iconTitle}
                            />
                            <View style={stylesCloseTurn.textContainer}>
                                <Text style={stylesCloseTurn.textTitle}>Cierre de Turno</Text>
                                <Text style={stylesCloseTurn.textSubtitle}>Bienvenid@ al registro de cierre de turno.</Text>
                            </View>
                        </View>
                        <View style={stylesCloseTurn.greenLine} />
                        <View style={{ marginTop: 35 }}>
                            <Text style={stylesCloseTurn.title}>Reporte de Producido</Text>
                        </View>
                        <View style={{ marginTop: 35, marginLeft: 20 }}>
                            <Text style={stylesCloseTurn.subTitle}>Turno</Text>
                            <Text style={stylesCloseTurn.info}>
                                {loading
                                    ? "Cargando turno..."
                                    : turnDet
                                        ? `Turno ${turnDet.id} - ${turnDetail?.horaInicial ?? "--"} - ${turnDetail?.horaFinal ?? "--"}`
                                        : "No se encontró turno"}
                            </Text>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesCloseTurn.subTitle}>Operario</Text>
                            <Text style={stylesCloseTurn.infoTwo}>{turnDet?.name} - {numeroIdentificacion}</Text>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <View style={{ marginTop: 25, marginLeft: 20 }}>
                            <Text style={stylesCloseTurn.subTitle}>Base de caja</Text>
                            <Text style={stylesCloseTurn.infoTwo}>{turnDet ? `$${Number(turnDet?.box_base).toLocaleString("es-CO", {
                                minimumFractionDigits: 2
                            })}` : ""}</Text>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <View style={{ marginTop: 25, marginBottom: 15 }}>
                            <Animatable.View>
                                <CustomTextInput
                                    label="Valor a reportar *"
                                    mode="outlined"
                                    value={
                                        isFocused
                                            ? closeValue
                                                : formatCurrencyTwo(closeValue)
                                    }
                                    onChangeText={handleChangeValueTwo}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    theme={{
                                        colors: {
                                            outline: "#E5E5E5",
                                            primary: '#90D400',
                                        }
                                    }}
                                    style={{ backgroundColor: '#FFFFFF', fontSize: 16, lineHeight: 20 }}
                                    left={
                                        <TextInput.Icon
                                            icon={() => (
                                                <Image
                                                    source={require("../../../../assets/icons/moneyIcon.png")}
                                                    style={{ width: 20, height: 20, marginBottom: 5 }}
                                                />
                                            )}
                                        />
                                    }
                                    keyboardType="numeric"
                                />
                            </Animatable.View>
                        </View>
                        <Divider style={stylesCloseTurn.divider} />
                        <View style={{ justifyContent: "flex-end", marginTop: "auto" }}>
                            <Button
                                mode="contained"
                                style={{ backgroundColor: "#80C300", alignSelf: "flex-end", borderRadius: 10, marginLeft: 20 }}
                                contentStyle={{ paddingHorizontal: 30 }}
                                onPress={handledNext}
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

export default CloseTurnScreen;