import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Divider, Text } from "react-native-paper";
import CustomDropdown from "../../../../../common/components/CustomDropdown";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import useNewApplicationsFormHook from "../hooks/useNewApplicationsFormHook";

const NewApplicationsForm = ({ onCancel }) => {

    const {
        asuntos,
        docType,
        applicationDescriptionRef,
        setDocType
    } = useNewApplicationsFormHook();

    return (
        <View>
            <View>
                <Text style={{ color: "#005A6D", fontSize: 20, marginTop: 40 }}>Datos Solicitud</Text>
                <View style={{ marginTop: 20 }}>
                    <CustomDropdown
                        style={{ width: "33%" }}
                        label="Asunto *"
                        data={asuntos}
                        value={docType}
                        onChange={setDocType}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Animatable.View ref={applicationDescriptionRef}>
                        <CustomTextInput
                            label="Descripción Solicitud *"
                            mode="outline"
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400"
                                }
                            }}
                            multiline
                            numberOfLines={5}
                            style={{ backgroundColor: "#FFFFFF", fontSize: 16, minHeight: 100 }}
                            keyboardType="default"
                        />
                    </Animatable.View>
                </View>
            </View>
            <Divider style={{ color: "#E5E5E5", marginTop: 25 }} />
            <View>
                <Text style={{ color: "#005A6D", fontSize: 20, marginTop: 25 }}>Soporte</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 37 }}>
                <Button
                    mode="outlined"
                    style={{ borderRadius: 6, borderColor: "#8C8C8C", backgroundColor: "#FFFFFF", width: "20%" }}
                    textColor="#8C8C8C"
                    onPress={() => {
                        onCancel();
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    mode="contained"
                    style={{ borderRadius: 6, backgroundColor: "#80C300", marginLeft: 17, width: "20%" }}
                    onPress={() => { }}
                >
                    Continuar
                </Button>
            </View>
        </View>
    )

}

export default NewApplicationsForm;