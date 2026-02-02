import { DataTable, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import { setFieldError } from "../../../../../state/slices/closeTurnSlice";
import StatusDropdown from "./StatusDropdown";

const InfrastructureRow = ({
    item,
    category,
    index,
    onObservationChange,
    onEstadoChange,
    onCantidadChange,
}) => {
    const dispatch = useDispatch();

    return (
        <DataTable.Row>
            <DataTable.Cell style={{ justifyContent: "flex-start", flex: 0.35 }}>
                <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_400Regular", lineHeight: 20 }}>{item.name}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "flex-start", flex: 0.2 }} numeric>
                <CustomTextInput
                    label=""
                    mode="flat"
                    dense
                    placeholder="0"
                    keyboardType="numeric"
                    value={item.cantidad?.toString() ?? ""}
                    error={item.cantidadError}
                    onChangeText={(text) => {
                        onCantidadChange(category, index, text);
                        dispatch(setFieldError({
                            category,
                            index,
                            field: "cantidad",
                            value: false,
                        }));
                    }}
                    theme={{
                        colors: {
                            error: "#FF3B30",
                        }
                    }}
                    style={{
                        width: "auto",
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                />
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "flex-start", flex: 0.3 }}>
                <StatusDropdown
                    value={item.estado}
                    error={item.estadoError}
                    onChange={(value) => {
                        onEstadoChange(category, index, value);
                        dispatch(setFieldError({
                            category,
                            index,
                            field: "estado",
                            value: false,
                        }));
                    }}
                />

            </DataTable.Cell>
            <DataTable.Cell>
                <CustomTextInput
                    label=""
                    mode="flat"
                    placeholder="Observaciones"
                    value={item.observaciones}
                    onChangeText={(text) =>
                        onObservationChange(category, index, text)
                    }
                    style={{
                        width: 550,
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                />
            </DataTable.Cell>
        </DataTable.Row>
    )
}

export default InfrastructureRow;