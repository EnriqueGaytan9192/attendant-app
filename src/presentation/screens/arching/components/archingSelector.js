import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Button, Text, TextInput } from "react-native-paper";
import CustomDropdown from "../../../../common/components/CustomDropdown";
import CustomTextInput from "../../../../common/components/CustomTextInput";
import useArchingSelectorHook from "../hooks/useArchingSelectorHook";
import stylesArchingSelector from "../styles/stylesArchingSelector";

const ArchingSelector = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    
    const {
        docType,
        arqueoValue,
        isFocused,
        turnos,
        setDocType,
        formatCurrency,
        setIsFocused,
        handleArchingChange,
    } = useArchingSelectorHook();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={stylesArchingSelector.container}>
                    <View style={stylesArchingSelector.subContainer}>
                        <View style={stylesArchingSelector.containerTitle}>
                            <Image
                                source={require("../../../../assets/images/archingIcon.png")}
                                style={stylesArchingSelector.iconTitle}
                            />
                            <View style={stylesArchingSelector.textContainer}>
                                <Text style={stylesArchingSelector.textTitle}>Arqueo</Text>
                                <Text style={stylesArchingSelector.textSubtitle}>Realizar arqueos por turno.</Text>
                            </View>
                        </View>
                        <View style={stylesArchingSelector.greenLine} />
                        <View>
                            <Text style={stylesArchingSelector.textParking}>Parqueadero Jumbo las Vegas</Text>
                            <View style={{ marginTop: 40 }}>
                                <CustomDropdown
                                    style={stylesArchingSelector.dropdown}
                                    label="Turno *"
                                    data={turnos}
                                    value={docType}
                                    onChange={setDocType}
                                />
                            </View>
                        </View>
                        <View style={stylesArchingSelector.greyLine} />

                        {docType !== "" && (
                            <View style={{ marginTop: 60, flex: 1, flexDirection: "column" }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={stylesArchingSelector.titleMenu}>Turno</Text>
                                        <Text style={stylesArchingSelector.subtitleMenu}>Turno 1 - 06:00 am - 08:00 am</Text>
                                    </View>
                                    <View style={{ marginLeft: 65 }}>
                                        <Text style={stylesArchingSelector.titleMenu}>Operario</Text>
                                        <Text style={stylesArchingSelector.subtitleMenu}>Nayibe Casas - 1020345678</Text>
                                    </View>
                                    <View style={{ marginLeft: 65 }}>
                                        <Text style={stylesArchingSelector.titleMenu}>Base de Caja</Text>
                                        <Text style={stylesArchingSelector.subtitleMenu}>$ 200.000</Text>
                                    </View>
                                </View>
                                <Animatable.View style={{ width: '100%', marginBottom: 15, marginTop: 50 }} /*ref={emailRef}*/>
                                    <CustomTextInput
                                        label="Valor del Arqueo *"
                                        value={
                                            isFocused
                                                ? arqueoValue
                                                : formatCurrency(arqueoValue)
                                        }
                                        onChangeText={handleArchingChange}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        mode="outlined"
                                        theme={{
                                            colors: {
                                                outline: "#E5E5E5",
                                                primary: "#90D400",
                                            },
                                        }}
                                        style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20  }}
                                        left={
                                            <TextInput.Icon
                                                icon={() => (
                                                    <Image
                                                        source={require("../../../../assets/icons/moneyIcon.png")}
                                                        style={stylesArchingSelector.iconInput}
                                                    />
                                                )}
                                            />
                                        }
                                        keyboardType="numeric"
                                    />
                                </Animatable.View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        marginTop: "auto"
                                    }}
                                >
                                    <Button mode="contained" style={stylesArchingSelector.button} /*onPress={handleLogin}*/ onPress={() => { }}>
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

export default ArchingSelector;