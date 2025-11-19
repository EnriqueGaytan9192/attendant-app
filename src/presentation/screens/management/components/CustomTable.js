import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";

const CustomTable = ({ columns = [], data = [] }) => {

    return (
        <View
            style={{
                backgroundColor: "#FFF",
                borderRadius: 12,
                paddingVertical: 10,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
                width: "100%",
                paddingHorizontal: 10,
            }}
        >
            {/* LÍNEA VERDE SUPERIOR */}
            <View
                style={{
                    height: 2,
                    backgroundColor: "#A6D400",
                    marginHorizontal: 10,
                    marginBottom: 10,
                }}
            />

            {/* HEADER */}
            <DataTable.Header
                style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#A6D400",
                    marginHorizontal: 10,
                }}
            >
                {columns.map((col, index) => (
                    <DataTable.Title
                        key={index}
                        style={{ justifyContent: col.center ? "center" : "flex-start" }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#555" }}>
                            {col.title}
                        </Text>
                    </DataTable.Title>
                ))}
            </DataTable.Header>

            {/* ROWS */}
            {data.map((row, idx) => (
                <View key={idx} style={{ marginHorizontal: 10 }}>
                    <DataTable.Row
                        style={{
                            height: 55,
                            borderBottomWidth: 1,
                            borderBottomColor: "#EAEAEA",
                        }}
                    >
                        {columns.map((col, index) => (
                            <DataTable.Cell
                                key={index}
                                style={{ justifyContent: col.center ? "center" : "flex-start" }}
                            >
                                {col.render ? (
                                    col.render(row)
                                ) : (
                                    <Text style={{ fontSize: 14, color: "#333" }}>
                                        {row[col.field]}
                                    </Text>
                                )}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                </View>
            ))}

        </View>
    );
};

export default CustomTable;
