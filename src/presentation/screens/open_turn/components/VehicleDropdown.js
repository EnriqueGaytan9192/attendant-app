import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Checkbox, Divider, Text } from "react-native-paper";

const VehicleDropdown = ({
    title,
    icon,
    color,
    vehicles = [],
    isOpen,
    onToggle,
    selected = [],
    onTogglePlate,
    onToggleAll,
    allSelected,
}) => {
    const hasVehicles = vehicles.length > 0;

    return (
        <View style={{ width: "32%" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={onToggle}>
                <Card style={{ paddingVertical: 16, paddingHorizontal: 20, borderRadius: 10, elevation: 3, backgroundColor: "#FFFFFF" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name={icon} size={30} color={color} />
                            <Text style={{ fontSize: 16, marginLeft: 15, color, fontFamily: "Montserrat_500Medium", lineHeight: 20, marginTop: 3 }}>
                                {title}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "#666666", fontSize: 16, marginRight: 10, fontFamily: "Montserrat_400Regular", lineHeight: 20 }}>
                                {vehicles.length}
                            </Text>
                            <MaterialIcons
                                name={isOpen ? "expand-less" : "expand-more"}
                                size={32}
                                color={color}
                            />
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>

            {isOpen && (
                <Card
                    style={{
                        position: "absolute",
                        top: 75,
                        width: "100%",
                        borderRadius: 12,
                        elevation: 6,
                        zIndex: 100,
                        paddingVertical: 8,
                        backgroundColor: "#FFFFFF"
                    }}
                >
                    {hasVehicles && (
                        <View>
                            <TouchableOpacity
                                onPress={onToggleAll}
                                style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, justifyContent: "flex-end" }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginBottom: 5,
                                        fontFamily: "Montserrat_500Medium",
                                        color,
                                        lineHeight: 20
                                    }}
                                >
                                    {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
                                </Text>
                            </TouchableOpacity>

                            <Divider style={{ width: "95%", color: "#E5E5E5", alignSelf: "center" }} />
                        </View>
                    )}

                    {hasVehicles ? (
                        <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
                            {vehicles.map(item => (
                                <TouchableOpacity
                                    key={item.placa}
                                    onPress={() => onTogglePlate(item.placa)}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 12,
                                        paddingVertical: 6
                                    }}
                                >
                                    <Checkbox
                                        status={selected.includes(item.placa) ? "checked" : "unchecked"}
                                        color={color}
                                        uncheckedColor="#68AF00"
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 8,
                                            fontSize: 16,
                                            color: "#666666",
                                            fontFamily: "Montserrat_400Regular",
                                            lineHeight: 20
                                        }}
                                    >
                                        {item.placa}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ) : (
                        <View
                            style={{
                                paddingVertical: 20,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#666666",
                                    fontFamily: "Montserrat_400Regular",
                                    lineHeight: 20
                                }}
                            >
                                No hay vehículos disponibles
                            </Text>
                        </View>
                    )}
                </Card>
            )}
        </View>
    )
}

export default VehicleDropdown;