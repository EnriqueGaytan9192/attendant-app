import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { Card, DataTable, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "../../../../../state/slices/movementsSlice";
import useVehicleListCardHook from "../../hooks/HooksVehicleEntry/useVehicleListCardHook";
import styles from "../../styles/styleVehicleEntry/stylesVehicleList";
import QRCodeScanner from "./QRScanner";

const StatusIcon = ({ stateTransaction }) => {
  switch (stateTransaction) {
    case 0: return <Image source={require("../../../../../assets/images/active.png")} />;
    case 1: return null;
    case 2: return <Image source={require("../../../../../assets/images/complete.png")} />;
    case 3: return <Image source={require("../../../../../assets/images/warning.png")} />;
    default: return null;
  }
};

const CameraButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={require("../../../../../assets/images/camera.png")}
      style={styles.cameraIcon}
    />
  </TouchableOpacity>
);

const VehicleListCard = () => {
  const {
    vehiclesList,
    selectedVehicle,
    scannerVisibleParking,
    scannedData,
    autos,
    motos,
    bicicletas,
    handleSelectVehicle,
    toggleScanner,
    handleScan,
  } = useVehicleListCardHook();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [5, 10, 15];
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  const filteredVehicles = vehiclesList.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(searchText.toLowerCase())
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredVehicles.length);
  const paginatedVehicles = filteredVehicles.slice(from, to);

  const alertMessageQr = useSelector((state) => state.movements.alertMessageQr);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertMessageQr) {
      Alert.alert(
        "Tiquete no encontrado",
        alertMessageQr,
        [{ text: "OK", onPress: () => dispatch(setAlertMessage("")) }],
        { cancelable: false }
      );
    }
  }, [alertMessageQr]);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Vehículos en Parqueadero</Text>
        <View style={styles.searchBar}>
          <TextInput
            label="Buscar..."
            mode="outlined"
            theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
            style={styles.textInput}
            keyboardType="default"
            value={searchText}
            onChangeText={setSearchText}
            left={<TextInput.Icon icon={() => (
              <Image source={require("../../../../../assets/images/search.png")} style={styles.iconInput} />
            )} />}
          />
          <CameraButton onPress={() => toggleScanner(true)} />
        </View>

        <View style={styles.containerCounts}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialIcons
              name="directions-car"
              size={25}
              color="#90D400"
            />
            <Text style={styles.count}>{autos ? autos.total : 0}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialIcons
              name="two-wheeler"
              size={30}
              color="#90D400"
            />
            <Text style={styles.count}>{motos ? motos.total : 0}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialIcons
              name="pedal-bike"
              size={25}
              color="#90D400"
            />
            <Text style={styles.count}>{bicicletas ? bicicletas.total : 0}</Text>
          </View>
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title></DataTable.Title>
            <DataTable.Title>Placa</DataTable.Title>
            <DataTable.Title>Entrada</DataTable.Title>
            <DataTable.Title>Tipo</DataTable.Title>
          </DataTable.Header>

          {paginatedVehicles.length > 0 ? (
            paginatedVehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.vehicleId}
                onPress={() => handleSelectVehicle(vehicle)}
              >
                <DataTable.Row
                  style={{
                    alignItems: "center",
                    backgroundColor:
                      selectedVehicle?.vehicleId === vehicle.vehicleId
                        ? "#E0F7FA"
                        : "white",
                  }}
                >
                  <DataTable.Cell>
                    <View style={{ marginLeft: 25 }}>
                      <StatusIcon stateTransaction={vehicle.stateTransaction} />
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell>{vehicle.plate}</DataTable.Cell>
                  <DataTable.Cell>
                    {vehicle.entryAt
                      ? new Date(vehicle.entryAt).toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      : "Sin entrada"}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {vehicle.nombreProducto}
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Text style={styles.count}>No hay vehículos disponibles</Text>
            </View>
          )}
        </DataTable>

        <DataTable.Pagination
          style={{ justifyContent: "center", marginTop: 10 }}
          page={page}
          numberOfPages={Math.ceil(filteredVehicles.length / itemsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} de ${filteredVehicles.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel="Items por página:"
        />

        {scannerVisibleParking && (
          <QRCodeScanner
            visible={scannerVisibleParking}
            onClose={() => toggleScanner(false)}
            onScan={(data) => {
              handleScan(data);
              toggleScanner(false);
            }}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default VehicleListCard;
