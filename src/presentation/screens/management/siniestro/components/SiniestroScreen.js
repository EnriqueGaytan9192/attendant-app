import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, DataTable, Text, TextInput } from "react-native-paper";
import styles from "../styles/siniestroStyle";
import { useEffect, useState } from "react";
import useSiniestroHook from "../hooks/useSiniestroHook";
import DataTableComponent from "../../components/DataTableComponent";
import CreateSiniestroComponent from "./CreateSiniestroComponent";

const SiniestroScreen = () => {
  const [selectedTab, setSelectedTab] = useState("siniestro");

  const dummySiniestro = [
    {
      entryDate: "dd/mm/aaaa 00:00",
      filed: "123456",
      client: "Nayibe Casas",
      status: "Activo",
    },
    {
      entryDate: "dd/mm/aaaa 00:00",
      filed: "123456",
      client: "Nayibe Casas",
      status: "Activo",
    },
  ];

  const {
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    numberOfItemsPerPageList,
    from,
    to,
  } = useSiniestroHook(dummySiniestro);

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={{ width: "98%", alignSelf: "center" }}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "siniestro" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("siniestro")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "siniestro" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Siniestro
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "newSiniestro" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("newSiniestro")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color:
                      selectedTab === "newSiniestro" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Crear Siniestro
                </Text>
              </TouchableOpacity>
            </View>

            {selectedTab === "siniestro" && (
              <>
                <View style={styles.searchBar}>
                  <TextInput
                    label="Buscar..."
                    mode="outlined"
                    theme={{
                      colors: {
                        outline: "#E5E5E5",
                        primary: "#90D400",
                      },
                    }}
                    style={styles.textInput}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <Image
                            source={require("../../../../../assets/images/search.png")}
                            style={styles.iconInput}
                          />
                        )}
                      />
                    }
                  />
                </View>

                <View style={{ marginTop: 25 }}>
                  <DataTableComponent
                    data={dummySiniestro}
                    from={from}
                    to={to}
                    page={page}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                  />
                </View>
              </>
            )}

            {selectedTab === "newSiniestro" && ( <CreateSiniestroComponent /> )}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SiniestroScreen;
