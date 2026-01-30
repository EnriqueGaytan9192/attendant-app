import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, DataTable, Text, TextInput } from "react-native-paper";
import styles from "../styles/solicStyle";
import { useEffect, useState } from "react";
import useSolicitudesHook from "../hooks/useSolicitudesHook";
import DataTableComponent from "../../components/DataTableComponent";

const SolicitudesScreen = () => {
  const [selectedTab, setSelectedTab] = useState("solicitud");

  const dummySolicitudes = [
    {
      entryDate: 'dd/mm/aaaa 00:00',
      filed: '123456',
      affair: 'Lorem ipsum',
      status: 'Activo'
    },
    {
      entryDate: 'dd/mm/aaaa 00:00',
      filed: '123456',
      affair: 'Lorem ipsum',
      status: 'Activo'
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
  } = useSolicitudesHook(dummySolicitudes);

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={{ width: "98%", alignSelf: "center" }}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, selectedTab === "solicitud" && styles.activeTab]}
                onPress={() => setSelectedTab("solicitud")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "solicitud" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Solicitudes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "newSoli" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("newSoli")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "newSoli" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Crear Solicitud
                </Text>
              </TouchableOpacity>
            </View>

            {selectedTab === "solicitud" && (
              <>
                <View style={styles.searchBar}>
                  <TextInput
                    label="Buscar..."
                    mode="outlined"
                    theme={{
                      colors: {
                        outline: "#E5E5E5",
                        primary: "#90D400"
                      }
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
                    data={dummySolicitudes}
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

            {selectedTab === "newSoli" && (
              //<CreatePqrsComponent />
              <>
              </>
            )}
            
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SolicitudesScreen;
