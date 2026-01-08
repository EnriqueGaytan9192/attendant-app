import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Checkbox, Text } from "react-native-paper";

const VehicleDropdown = ({
    title,
    icon,
    color,
    vehicles = [],
    isOpen,
    onToggle,
    selected,
    onTogglePlate,
}) => {
    return (
        <View style={{ width: "32%" }}>
            {/* Header */}
            <TouchableOpacity onPress={onToggle}>
                <Card style={{ padding: 12, borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name={icon} size={26} color={color} />
                            <Text style={{ marginLeft: 8, color, fontWeight: "600" }}>
                                {title}
                            </Text>
                        </View>
                        <Text style={{ color: "#666" }}>{vehicles.length}</Text>
                    </View>
                </Card>
            </TouchableOpacity>

            {/* Dropdown */}
            {isOpen && (
                <Card
                    style={{
                        position: "absolute",
                        top: 60,
                        width: "100%",
                        zIndex: 99,
                        padding: 8,
                        borderRadius: 10,
                    }}
                >
                    <ScrollView style={{ maxHeight: 180 }}>
                        {vehicles.map((item) => (
                            <TouchableOpacity
                                key={item.placa}
                                onPress={() => onTogglePlate(item.placa)}
                                style={{ flexDirection: "row", alignItems: "center", paddingVertical: 6 }}
                            >
                                <Checkbox
                                    status={selected.includes(item.placa) ? "checked" : "unchecked"}
                                    color={color}
                                />
                                <Text style={{ marginLeft: 8 }}>{item.placa}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Card>
            )}
        </View>
    );
};

export default VehicleDropdown;
