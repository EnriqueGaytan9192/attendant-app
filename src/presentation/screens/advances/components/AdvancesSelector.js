import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button, Text, TextInput } from "react-native-paper";
import CustomDropdown from "../../../../common/components/CustomDropdown";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useAdvancesSelectorHook from "../hooks/useAdvancesSelectorHook";
import stylesAdvancesSelector from "../styles/stylesAdvancesSelector";

const AdvancesSelector = () => {
    const screenHeight = Dimensions.get('window').height;
    const screensWidth = Dimensions.get('window').width;
    
    const {
        docType,
        avanceValue,
        isFocused,
        turnos,
        setDocType,
        setIsFocused,
        formatCurrency,
        handleAdvancesChange,
    } = useAdvancesSelectorHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesAdvancesSelector.container}>
                    <View style={stylesAdvancesSelector.subContainer}>
                        <View style={stylesAdvancesSelector.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/archingIcon.png")}
                                style={stylesAdvancesSelector.iconTitle}
                            />
                            <View style={stylesAdvancesSelector.textContainer}>
                                <Text style={stylesAdvancesSelector.textTitle}>Avances</Text>
                                <Text style={stylesAdvancesSelector.textSubtitle}>Realizar avances por turno.</Text>
                            </View>
                        </View>
                        <View style={stylesAdvancesSelector.greenLine} />
                        <View>
                            <Text style={stylesAdvancesSelector.textParking}>Parqueadero Jumbo las Vegas</Text>
                            <View style={{ marginTop: 40 }}>
                                <CustomDropdown
                                    style={stylesAdvancesSelector.dropdown}
                                    label="Turno *"
                                    data={turnos}
                                    value={docType}
                                    onChange={setDocType}
                                />
                            </View>
                        </View>
                        <View style={stylesAdvancesSelector.greyLine} />

                        {docType !== "" && (
                            <View style={{ marginTop: 60, flex: 1, flexDirection: "column" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Text style={stylesAdvancesSelector.titleMenu}>Turno</Text>
                                        <Text style={stylesAdvancesSelector.subtitleMenu}>Turno 1 - 06:00 am - 08:00 am</Text>
                                    </View>
                                    <View style={{ marginLeft: 65 }}>
                                        <Text style={stylesAdvancesSelector.titleMenu}>Operario</Text>
                                        <Text style={stylesAdvancesSelector.subtitleMenu}>Nayibe Casas - 1020345678</Text>
                                    </View>
                                </View>

                                <Animatable.View style={{ width: '100%', marginBottom: 15, marginTop: 50 }} /*ref={emailRef}*/>
                                    <CustomTextInput
                                        label="Valor del Avance *"
                                        value={
                                            isFocused
                                                ? avanceValue
                                                : formatCurrency(avanceValue)   
                                        }
                                        onChangeText={handleAdvancesChange}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        mode="outlined"
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
                                                        style={stylesAdvancesSelector.iconInput}
                                                    />
                                                )}
                                            />
                                        }
                                        keyboardType="numeric"
                                    />
                                </Animatable.View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginTop: "auto",
                                    }}
                                >
                                    <Button mode="contained" style={stylesAdvancesSelector.button} onPress={() => { }}>
                                        Guardar
                                    </Button>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default AdvancesSelector;