import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  DataTable,
  Text,
  TextInput,
} from "react-native-paper";
import useInventoryHook from "../hooks/useInventoryHook";
import styles from "../styles/listVehicle";

const ListVehicle = () => {
  const { functions, states } = useInventoryHook();
  const {
    handleShowAdd,
    handleShowAddBici,
    handleViewVehicle,
    handleEditVehicle,
    handleViewBike,
    handleEditBike,
    reloadData
  } = functions;
  const { dataSet, dataSetBicycle, turnoIdEntry } = states;
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState("vehicles");
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [5, 10, 15];
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  useEffect(() => {
    if (isFocused) {
      reloadData();
    }
  }, [isFocused, turnoIdEntry]);
  // Mapeo de autos
  // Después
  const mappedVehicles = Array.isArray(dataSet)
    ? dataSet.map((item) => ({
      id: item.id,
      inventoryDate: new Date(item.fechaIngreso).toLocaleString(),
      entryDate: new Date(item.horaIngreso).toLocaleString(),
      plate: item.placa,
      type: item.tipoVehiculo === 1 ? "Carro" : "Moto",
      status: item.estadoVehiculo === 1 ? "Activo" : "Inactivo",
    }))
    : [];


  // Mapeo de bicis
  const mappedBikes = Array.isArray(dataSetBicycle)
    ? dataSetBicycle.map((item) => ({
      id: item.id,
      inventoryDate: new Date(item.fechaHoraInventario).toLocaleString(),
      entryDate: new Date(item.fechaHoraIngreso).toLocaleString(),
      plate: item.placa,
      type: "Bicicleta",
      status: item.estadoVehiculo === 1 ? "Activo" : "Inactivo",
      editado: item.editado
    }))
    : [];

  console.log("mappedVehicles", mappedVehicles);
  console.log("mappedBikes", mappedBikes);
  // Definir la data según la pestaña seleccionada
  const data = selectedTab === "vehicles" ? mappedVehicles : mappedBikes;

  // Estado local para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  // Filtrar los datos según el query (placa, tipo o estado)
  const filteredData = data.filter(
    (item) =>
      item.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredData.length);

  // Reiniciar la paginación cuando se cambia de pestaña
  useEffect(() => {
    setPage(0);
  }, [selectedTab]);

  // Reiniciar la búsqueda al cambiar la pestaña
  useEffect(() => {
    setSearchQuery("");
  }, [selectedTab]);

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={{ width: "98%", alignSelf: "center" }}>
        <Card style={styles.card}>
          <Card.Content>
            {/* Tabs para vehículos y bicicletas */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "vehicles" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("vehicles")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "vehicles" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Vehículos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "bikes" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("bikes")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedTab === "bikes" ? "#FFFFFF" : "#8C8C8C",
                  }}
                >
                  Bicicletas
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botones para agregar vehículo o bicicleta */}
            <View>
              {selectedTab === "vehicles" && (
                <Button
                  mode="contained"
                  onPress={handleShowAdd}
                  style={styles.button}
                  icon="plus"
                >
                  Agregar Vehículo
                </Button>
              )}
              {/*{selectedTab === "bikes" && (
                <Button
                  mode="contained"
                  onPress={handleShowAddBici}
                  icon="plus"
                  style={styles.button}
                >
                  Agregar Bicicleta
                </Button>
              )}*/}
            </View>

            {/* Barra de búsqueda */}
            <View style={styles.searchBar}>
              <TextInput
                label="Buscar..."
                mode="outlined"
                theme={{
                  colors: { outline: "#E5E5E5", primary: "#90D400" },
                }}
                style={styles.textInput}
                keyboardType="default"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Image
                        source={require("../../../../assets/images/search.png")}
                        style={styles.iconInput}
                      />
                    )}
                  />
                }
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* DataTable para mostrar inventario */}
            <View style={{ marginTop: 25 }}>
              <DataTable style={styles.table}>
                <DataTable.Header style={styles.header}>
                  <DataTable.Title>Fecha/Hora Inventario</DataTable.Title>
                  <DataTable.Title>Fecha/Hora Ingreso</DataTable.Title>
                  <DataTable.Title>Placa</DataTable.Title>
                  <DataTable.Title>Tipo de Vehículo</DataTable.Title>
                  <DataTable.Title>Estado</DataTable.Title>
                  <DataTable.Title>Acciones</DataTable.Title>
                </DataTable.Header>

                {filteredData.slice(from, to).length > 0 ? (
                  filteredData.slice(from, to).map((item, index) => (
                    <DataTable.Row key={index} style={{ backgroundColor: "white" }}>
                      <DataTable.Cell>{item.inventoryDate}</DataTable.Cell>
                      <DataTable.Cell>{item.entryDate}</DataTable.Cell>
                      <DataTable.Cell>{item.plate}</DataTable.Cell>
                      <DataTable.Cell>{item.type}</DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={[
                            styles.status,
                            item.status === "Activo"
                              ? styles.active
                              : styles.inactive,
                          ]}
                        >
                          {item.status}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {selectedTab === "vehicles" ? (
                          <>
                            <Button
                              mode="text"
                              onPress={() => handleViewVehicle(item.id)}
                              labelStyle={styles.actionButtonLabel}
                              contentStyle={styles.buttonContent}
                              icon={() => (
                                <Image
                                  source={require("../../../../assets/icons/viewIcon.png")}
                                  style={styles.iconImage}
                                />
                              )}
                            />
                            {/*<Button
                              mode="text"
                              onPress={() => handleEditVehicle(item.id)}
                              labelStyle={styles.actionButtonLabel}
                              contentStyle={styles.buttonContent}
                            >
                              <Image
                                source={require("../../../../assets/images/pencil.png")}
                                style={styles.iconImage}
                              />
                            </Button>*/}
                          </>
                        ) : (
                          <>
                            <Button
                              mode="text"
                              onPress={() => handleViewBike(item.id)}
                              labelStyle={styles.actionButtonLabel}
                              contentStyle={styles.buttonContent}
                              icon={() => (
                                <Image
                                  source={require("../../../../assets/icons/viewIcon.png")}
                                  style={styles.iconImage}
                                />
                              )}
                            />
                            {item.editado === 0 && (
                              < Button
                                mode="text"
                                onPress={() => handleEditBike(item.id)}
                                labelStyle={styles.actionButtonLabel}
                                contentStyle={styles.buttonContent}
                                icon={() => (
                                  <Image
                                    source={require("../../../../assets/icons/editIcon.png")}
                                    style={{ width: 18, height: 18 }}
                                  />
                                )}
                              />
                            )}
                          </>
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))
                ) : (
                  <View style={{ alignItems: "center", marginTop: 15 }}>
                    <Text style={{ marginBottom: 20 }}>
                      {selectedTab === "vehicles"
                        ? "No hay vehículos disponibles"
                        : "No hay bicicletas disponibles"}
                    </Text>
                  </View>
                )}
              </DataTable>

              {/* Paginación */}
              <DataTable.Pagination
                style={{ justifyContent: "center" }}
                page={page}
                numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
                onPageChange={(newPage) => setPage(newPage)}
                label={`${from + 1}-${to} de ${filteredData.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                showFastPaginationControls
                selectPageDropdownLabel="Items por página:"
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView >
  );
};

export default ListVehicle;
