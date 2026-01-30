import { DataTable, Button, Text } from "react-native-paper";
import { Image, StyleSheet } from "react-native";

const DataTableComponent = ({
  data,
  from,
  to,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
  numberOfItemsPerPageList,
}) => {
  return (
    <DataTable style={styles.table}>
      <DataTable.Header style={styles.header}>
        <DataTable.Title>Fecha</DataTable.Title>
        <DataTable.Title>N° Radicado</DataTable.Title>
        <DataTable.Title>Cliente</DataTable.Title>
        <DataTable.Title>Estado</DataTable.Title>
        <DataTable.Title>Acciones</DataTable.Title>
      </DataTable.Header>

      {data.slice(from, to).map((item, index) => (
        <DataTable.Row key={index} style={{ backgroundColor: "white" }}>
          <DataTable.Cell>{item.entryDate}</DataTable.Cell>
          <DataTable.Cell>{item.filed}</DataTable.Cell>
          <DataTable.Cell>{item.client || item.affair}</DataTable.Cell>
          <DataTable.Cell>
            <Text
              style={[
                styles.status,
                item.status === "Activo" ? styles.active : styles.inactive,
              ]}
            >
              {item.status}
            </Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button
              mode="text"
              onPress={() => {}}
              labelStyle={styles.actionButtonLabel}
              contentStyle={styles.buttonContent}
            >
              <Image
                source={require("../../../../assets/images/eye.png")}
                style={styles.iconImage}
              />
            </Button>
            <Button
              mode="text"
              onPress={() => {}}
              labelStyle={styles.actionButtonLabel}
              contentStyle={styles.buttonContent}
            >
              <Image
                source={require("../../../../assets/images/pencil.png")}
                style={styles.iconImage}
              />
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        style={styles.pagination}
        page={page}
        numberOfPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={(newPage) => setPage(newPage)}
        label={`${from + 1}-${to} de ${data.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel="Items por página:"
      />
    </DataTable>
  );
};

export default DataTableComponent;

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 2,
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderBottomColor: "#A3D200",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  cell: {
    paddingVertical: 12,
  },
  status: {
    padding: 4,
    borderRadius: 4,
    color: "white",
    textAlign: "center",
  },
  active: {
    backgroundColor: "#90D400",
  },
  inactive: {
    backgroundColor: "red",
  },
  buttonContent: {
    flexDirection: "row",
  },
  iconImage: {
    width: 20, // Ajusta el tamaño según necesites
    height: 20, // Ajusta el tamaño según necesites
    marginRight: 5, // Espacio entre el icono y el texto
  },
  actionButtonLabel: {
    fontSize: 12, // Ajusta el tamaño del texto si es necesario
    color: "#000", // Color del texto
  },
  pagination: {
    backgroundColor: "white", // Asegura que el fondo sea blanco
    borderTopWidth: 0, // Elimina cualquier borde superior
    borderBottomWidth: 0, // Elimina cualquier borde inferior
    elevation: 0,
    justifyContent: "center",
  },
});
