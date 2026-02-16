import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import CustomTextInput from "../../../../../common/components/CustomTextInput";
import stylesVehiclesListCard from "../../styles/VehiclesEntry/stylesVehiclesListCard";

const CameraButton = () => (
    <TouchableOpacity onPress={() => {}}>
        <Image
            source={require("../../../../../assets/images/camera.png")}
            style={stylesVehiclesListCard.cameraIcon}
        />
    </TouchableOpacity>
)

const VehiclesListCard = () => {
    return (
        <Card style={stylesVehiclesListCard.card}>
            <Card.Content>
                <Text style={stylesVehiclesListCard.title}>Vehículos en Parqueadero</Text>
                <View style={stylesVehiclesListCard.searchBar}>
                    <CustomTextInput
                        label="Buscar..."
                        mode="outlined"
                        theme={{
                            colors: {
                                outline: "#E5E5E5",
                                primary: "#90D400"
                            }
                        }}
                        style={{ backgroundColor: "#FFFFFF", fontSize: 16, lineHeight: 20, height: 50, width: 250 }}
                        left={
                            <TextInput.Icon
                                icon={() => (
                                    <Image
                                        source={require("../../../../../assets/icons/searchIcon.png")}
                                        style={stylesVehiclesListCard.iconInput}
                                    />
                                )}
                            />
                        }
                    />
                    <CameraButton onPress={() => {}} />
                </View>
                <View style={stylesVehiclesListCard.containerCounts}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons
                            name="directions-car"
                            size={25}
                            color="#90D400"
                        />
                        <Text style={{ fontSize: 17, marginLeft: 10, color: "#005A6D", fontFamily: "Montserrat_400Regular", lineHeight: 20, marginTop: 2 }}>02</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons
                            name="two-wheeler"
                            size={28}
                            color="#90D400"
                        />
                        <Text style={{ fontSize: 17, marginLeft: 10, color: "#005A6D", fontFamily: "Montserrat_400Regular", lineHeight: 20, marginTop: 2 }}>02</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons
                            name="pedal-bike"
                            size={25}
                            color="#90D400"
                        />
                        <Text style={{ fontSize: 17, marginLeft: 10, color: "#005A6D", fontFamily: "Montserrat_400Regular", lineHeight: 20, marginTop: 2 }}>02</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

export default VehiclesListCard;