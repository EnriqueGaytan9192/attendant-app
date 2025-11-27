import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, DataTable, Menu, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const STATUS_STYLES = {
    Activo: { bg: "#A7E52F", dot: "#6FB80D", text: "#ffffff" },
    Inactivo: { bg: "#FF6B6B", dot: "#CC3B3B", text: "#ffffff" },
    Justificado: { bg: "#FFA534", dot: "#D17C00", text: "#ffffff" },
};

const CustomDataTable = ({
    columns = [],
    data = [],
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    onView,
    onEdit,
    onDelete,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const itemsOptions = [5, 10, 15, 20];

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, totalItems);

    return (
        <View>
            <View style={styles.card}>

                {/* Encabezado */}
                <DataTable>
                    <View style={{ height: 3, backgroundColor: "#A6D400", }} />

                    <DataTable.Header style={styles.header}>
                        {columns.map((col) => (
                            <DataTable.Title key={col.key} style={styles.headerCell}>
                                <Text style={styles.headerText}>{col.title}</Text>
                            </DataTable.Title>
                        ))}
                        <DataTable.Title style={styles.headerCell}>
                            <Text style={styles.headerText}>Acciónes</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    {/* Filas */}
                    {data.slice(from, to).map((row, idx) => (
                        <DataTable.Row key={idx} style={styles.row}>
                            {columns.map((col) => {
                                // Status
                                if (col.key === "status") {
                                    const s = STATUS_STYLES[row[col.key]];

                                    return (
                                        <DataTable.Cell key={col.key}>
                                            <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                                                <View style={[styles.statusDot, { backgroundColor: s.dot }]} />
                                                <Text style={[styles.statusText, { color: s.text }]}>
                                                    {row[col.key]}
                                                </Text>
                                            </View>
                                        </DataTable.Cell>
                                    );
                                }

                                // Texto normal
                                return (
                                    <DataTable.Cell key={col.key}>
                                        <Text style={styles.rowText}>{row[col.key]}</Text>
                                    </DataTable.Cell>
                                );
                            })}

                            {/* Acciones */}
                            <DataTable.Cell style={styles.actionsCell}>
                                <TouchableOpacity onPress={() => onView(row)}>
                                    <Icon name="eye-outline" size={21} color="#6D6D6D" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onEdit(row)} style={styles.actionButton}>
                                    <Icon name="pencil-outline" size={21} color="#6D6D6D" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onDelete(row)} style={styles.actionButton}>
                                    <Icon name="trash-can-outline" size={21} color="#6D6D6D" />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>

            </View>
            {/* Pagination */}
            <View style={styles.paginationContainer}>

                {/* SELECTOR DE ITEMS POR PÁGINA */}
                <View style={styles.itemsPerPage}>
                    <Text style={styles.paginationLabel}>Items por página:</Text>

                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <Button
                                mode="outlined"
                                onPress={() => setMenuVisible(true)}
                                style={styles.selectorBtn}
                                contentStyle={{ flexDirection: "row-reverse" }}
                            >
                                {itemsPerPage}
                            </Button>
                        }
                    >
                        {itemsOptions.map((opt) => (
                            <Menu.Item
                                key={opt}
                                onPress={() => {
                                    setItemsPerPage(opt);
                                    setMenuVisible(false);
                                    setPage(0);
                                }}
                                title={`${opt}`}
                            />
                        ))}
                    </Menu>

                </View>

                {/* CONTADOR E ICONOS */}
                <View style={styles.pageInfo}>
                    <Text style={styles.paginationLabel}>
                        {from + 1}-{to} de {totalItems}
                    </Text>

                    <TouchableOpacity disabled={page === 0} onPress={() => setPage(page - 1)}>
                        <Icon name="chevron-left" size={25} color="#6D6D6D" />
                    </TouchableOpacity>

                    <TouchableOpacity disabled={to >= totalItems} onPress={() => setPage(page + 1)}>
                        <Icon name="chevron-right" size={25} color="#6D6D6D" />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation: 3,
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: "#A7C957",
    },
    headerCell: {
        justifyContent: "flex-start",
    },
    headerText: {
        fontWeight: "600",
        fontSize: 14,
    },

    /** FILAS */
    row: {
        borderBottomWidth: 1,
        borderBottomColor: "#EFEFEF",
    },
    rowText: {
        color: "#444",
    },

    /** STATUS */
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        alignSelf: "center",
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: 5,
    },
    statusText: {
        fontWeight: "600",
        fontSize: 13,
    },

    /** ACCIONES */
    actionsCell: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 10,
    },
    actionButton: {
        padding: 4,
    },

    /** PAGINATION */
    paginationContainer: {
        paddingTop: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    itemsPerPage: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    itemsBtn: {
        backgroundColor: "#F3F3F3",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    paginationLabel: {
        color: "#444",
    },
    pageInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginLeft: 25
    },
});

export default CustomDataTable;
