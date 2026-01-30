import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, DataTable, Text, TextInput } from "react-native-paper";
import styles from "../styles/pqrsStyle";
import { useEffect, useState } from "react";
import CreatePqrsComponent from "./CreatePqrsComponent";
import usePqrsHook from "../hooks/usePqrsHook";
import DataTableComponent from "../../components/DataTableComponent";

const PqrsScreen = () => {
  const [selectedTab, setSelectedTab] = useState("pqrs");

  const dummyPQRS = [
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
  } = usePqrsHook(dummyPQRS);

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={{ width: "98%", alignSelf: "center" }}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, selectedTab === "pqrs" && styles.activeTab]}
                onPress={() => setSelectedTab("pqrs")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "pqrs" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  PQRS
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "newPqrs" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("newPqrs")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "newPqrs" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Crear PQRS
                </Text>
              </TouchableOpacity>
            </View>

            {selectedTab === "pqrs" && (
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
                    data={dummyPQRS}
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

            {selectedTab === "newPqrs" && <CreatePqrsComponent />}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default PqrsScreen;
