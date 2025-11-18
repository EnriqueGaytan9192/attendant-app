import { Dimensions, Image, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import CustomDropdown from "../../../../common/components/CustomDropdown";
import useAdvancesSelector from "../hooks/useAdvancesSelector";
import stylesAdvancesSelector from "../styles/stylesAdvancesSelector";

const AdvancesSelector = () => {
    const screenHeight = Dimensions.get('window').height;
    const screensWidth = Dimensions.get('window').width;
    const {
        docType,
        setDocType,
        turnos
    } = useAdvancesSelector();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[stylesAdvancesSelector.container, { height: screenHeight - 25 }]}>
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
                            <View style={{ marginTop: 50 }}>
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
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default AdvancesSelector;