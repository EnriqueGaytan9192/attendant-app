import { useState } from "react";
import { Image, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import useMinorImbalanceCloseTurnHook from "../hooks/useMinorImbalanceCloseTurnHook";
import stylesMinorImbalanceCloseTurn from "../styles/stylesMinorImbalanceCloseTurn";
import CustomAlert from "./components/CustomAlert";

const MinorImbalanceCloseTurn = () => {
  const {
    ajuste,
    formatCurrency,
    confirmComplete,
    confirmClose,
  } = useMinorImbalanceCloseTurnHook();

  const [alertConfig, setAlertConfig] = useState(null);

  const closeAlert = () => setAlertConfig(null);

  return (
    <TouchableWithoutFeedback>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={stylesMinorImbalanceCloseTurn.container}>
          <View style={stylesMinorImbalanceCloseTurn.subContainer}>
            {/* Header */}
            <View style={stylesMinorImbalanceCloseTurn.containerTitle}>
              <Image
                source={require("../../../../assets/images/closeTurnIcon.png")}
                style={stylesMinorImbalanceCloseTurn.iconTitle}
              />
              <View style={stylesMinorImbalanceCloseTurn.textContainer}>
                <Text style={stylesMinorImbalanceCloseTurn.textTitle}>
                  Cierre de Turno
                </Text>
                <Text style={stylesMinorImbalanceCloseTurn.textSubtitle}>
                  Bienvenid@ al registro de cierre de turno.
                </Text>
              </View>
            </View>

            <View style={stylesMinorImbalanceCloseTurn.greenLine} />

            {/* Card */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
              <Card
                style={{
                  width: "50%",
                  paddingVertical: 40,
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  elevation: 3,
                }}
              >
                <Card.Content>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../../../assets/images/messangeWarning.png")}
                      style={{ width: 126, height: 110 }}
                      resizeMode="center"
                    />

                    <View style={{ alignItems: "center", marginTop: 20, maxWidth: "80%" }}>
                      <Text style={{ fontSize: 21, color: "#FFA000", textAlign: "center" }}>
                        ¡Hoy tienes un descuadre en tu turno!
                      </Text>
                      <Text style={{ fontSize: 21, color: "#929292", textAlign: "center" }}>
                        El faltante es por un valor de:
                      </Text>
                      <Text style={{ fontSize: 21, color: "#FFA000", textAlign: "center" }}>
                        {formatCurrency(ajuste)}
                      </Text>
                    </View>

                    {/* Buttons */}
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                      <Button
                        mode="contained"
                        style={{
                          backgroundColor: "#80C300",
                          marginTop: 15,
                          marginRight: 15,
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          setAlertConfig({
                            title: "¿Estás seguro de completar el faltante?",
                            message:
                              "Recuerda que al completar el faltante deberás entregar el dinero completo durante la auditoría.",
                            onConfirm: confirmComplete,
                          })
                        }
                      >
                        Completar Faltante
                      </Button>

                      <Button
                        mode="contained"
                        style={{
                          backgroundColor: "#FFA000",
                          marginTop: 15,
                          marginLeft: 15,
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          setAlertConfig({
                            title: "¿Estás seguro de cerrar con faltante?",
                            message:
                              "Recuerda que el faltante será procesado como descuento de nómina.",
                            onConfirm: confirmClose,
                          })
                        }
                      >
                        Cerrar con Faltante
                      </Button>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
        </View>

        {/* ALERT MODAL */}
        {alertConfig && (
          <CustomAlert
            visible={true}
            title={alertConfig.title}
            message={alertConfig.message}
            onCancel={closeAlert}
            onConfirm={() => {
              closeAlert();
              alertConfig.onConfirm();
            }}
          />
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default MinorImbalanceCloseTurn;
