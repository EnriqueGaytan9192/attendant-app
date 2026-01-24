import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";

const InfrastructureAccordion = ({ title, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={{ marginBottom: 20 }}>
            <Card
                style={{
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                <TouchableRipple onPress={() => setOpen(!open)}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            paddingVertical: 18,
                            alignItems: "center",
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <Text style={{ fontSize: 17, color: "#8C8C8C", fontFamily: "Montserrat_500Medium", lineHeight: 20 }}>{title}</Text>
                        <MaterialIcons
                            name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={32}
                            color="#90D400"
                        />
                    </View>
                </TouchableRipple>
            </Card>

            {open && (
                <Card
                    style={{
                        marginTop: 12,
                        borderRadius: 12,
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                        }}
                    >
                        {children}
                    </View>
                </Card>
            )}
        </View>
    )
}

export default InfrastructureAccordion;