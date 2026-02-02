import { MaterialIcons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Card, Text, TouchableRipple } from "react-native-paper";

const InfrastructureAccordion = forwardRef(({ title, children }, ref) => {
    const [open, setOpen] = useState(false);
    const animRef = useRef(null);

    useImperativeHandle(ref, () => ({
        shake: () => animRef.current?.shake(600),
        open: () => setOpen(true),
    }));

    return (
        <Animatable.View ref={animRef} style={{ marginBottom: 20 }}>
            <View>
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
        </Animatable.View>
    );
});


export default InfrastructureAccordion;
