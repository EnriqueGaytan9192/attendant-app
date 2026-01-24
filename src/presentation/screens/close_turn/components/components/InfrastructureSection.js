import { DataTable, Text } from "react-native-paper";
import InfrastructureRow from "./InfrastructureRow";

const InfrastructureSection = ({
    data,
    category,
    onObservationChange,
    onEstadoChange,
    onCantidadChange,
}) => {
    return (
        <DataTable>
            <DataTable.Header style={{ borderTopColor: "#90D400", borderTopWidth: 1, borderBottomColor: "#90D400", borderBottomWidth: 1 }}>
                <DataTable.Title style={{ justifyContent: "flex-start", flex: 0.35 }}>
                    <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_500Medium", lineHeight: 20 }}>Equipos</Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "flex-start", flex: 0.2 }} numeric>
                    <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_500Medium", lineHeight: 20 }}>Cantidad</Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "flex-start", flex: 0.3 }}>
                    <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_500Medium", lineHeight: 20 }}>Estado</Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "flex-start" }}>
                    <Text style={{ fontSize: 13, color: "#666666", fontFamily: "Montserrat_500Medium", lineHeight: 20 }}>Observaciones</Text>
                </DataTable.Title>
            </DataTable.Header>

            {data.map((item, index) => (
                <InfrastructureRow
                    key={index}
                    item={item}
                    category={category}
                    index={index}
                    onObservationChange={onObservationChange}
                    onEstadoChange={onEstadoChange}
                    onCantidadChange={onCantidadChange}
                />
            ))}
        </DataTable>
    )
}

export default InfrastructureSection;