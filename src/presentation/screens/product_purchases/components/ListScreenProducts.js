import React from 'react';
import { Appbar, Card, Text, Divider, Avatar } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import useProductPurchases from '../hooks/useListScreenProductsHook';
import { MaterialIcons } from "@expo/vector-icons";

const MonthlyListScreen = () => {
    const {
        mensualidades,
        loadingMensualidades,
        errorMensualidades,
        handleSelectMonth,
    } = useProductPurchases();

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Planes Mensuales" />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.container}>
                {loadingMensualidades && (
                    <Text style={styles.loadingText}>Cargando mensualidades...</Text>
                )}

                {errorMensualidades && (
                    <Text style={styles.errorText}>Error al cargar mensualidades</Text>
                )}

                {!loadingMensualidades && mensualidades.length === 0 && (
                    <Text style={styles.emptyText}>
                        Este parqueadero no cuenta con mensualidades disponibles en este momento.
                    </Text>
                )}

                {mensualidades.map((item) => (
                    <Card
                        key={item.mensualidadId}
                        style={styles.card}
                        onPress={() => handleSelectMonth(item)}
                        mode="elevated"
                    >
                        <Card.Title
                            title={item.nombre}
                            titleStyle={styles.title}
                            left={(props) => (
                                <Avatar.Text
                                    {...props}
                                    label={item.nombre[0]?.toUpperCase() || "M"}
                                    size={40}
                                    style={styles.avatar}
                                />
                            )}
                            right={(props) => (

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.vehicleIconsContainer}>
                                        {item.mensualidadVehiculo?.map((vehiculo) => {
                                            if (vehiculo.tipoVehiculoId === 1) {
                                                return (
                                                    <MaterialIcons
                                                        key={`car-${vehiculo.mensualidadVehiculoId}`}
                                                        name="directions-car"
                                                        size={24}
                                                        color="#90D400"
                                                        style={styles.icon}
                                                    />
                                                );
                                            }
                                            if (vehiculo.tipoVehiculoId === 2) {
                                                return (
                                                    <MaterialIcons
                                                        key={`moto-${vehiculo.mensualidadVehiculoId}`}
                                                        name="two-wheeler"
                                                        size={24}
                                                        color="#90D400"
                                                        style={styles.icon}
                                                    />
                                                );
                                            }
                                            if (vehiculo.tipoVehiculoId === 3) {
                                                return (
                                                    <MaterialIcons
                                                        key={`bike-${vehiculo.mensualidadVehiculoId}`}
                                                        name="pedal-bike"
                                                        size={24}
                                                        color="#90D400"
                                                        style={styles.icon}
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                    </View>
                                    <Text style={styles.amount}>${item.valor.toLocaleString()}</Text>
                                </View>
                            )}
                        />
                        <Card.Content>
                            <View style={styles.infoRow}>
                                <View style={styles.infoColumn}>
                                    <Text style={styles.label}>Descripción</Text>
                                    <Text style={styles.value}>
                                        {item.descripcion || 'Sin descripción'}
                                    </Text>
                                </View>
                                <View style={styles.infoColumn}>
                                    <Text style={styles.label}>Vigencia</Text>
                                    <Text style={styles.value}>
                                        {new Date(item.fechaInicio).toLocaleDateString('es-CO', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        }).replaceAll('/', '-')}
                                        {' - '}
                                        {new Date(item.fechaFin).toLocaleDateString('es-CO', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        }).replaceAll('/', '-')}
                                    </Text>
                                </View>

                            </View>
                        </Card.Content>
                    </Card>
                ))}

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#F9FAFB',
    },
    loadingText: {
        margin: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        margin: 20,
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    emptyText: {
        marginTop: 30,
        fontSize: 16,
        textAlign: 'center',
        color: '#6B7280',
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: 'white',
        elevation: 2,
        paddingBottom: 8,
    },

    avatar: {
        backgroundColor: '#6366F1',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },

    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#10B981',
        marginRight: 16,
        marginTop: 4,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginTop: 12,
    },

    infoColumn: {
        flex: 1,
    },

    label: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 2,
    },

    value: {
        fontSize: 14,
        color: '#374151',
    },

    divider: {
        marginVertical: 8,
    },
    vehicleIconsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        marginLeft: 10
    },
    icon: {
        marginRight: 12,
    },
});

export default MonthlyListScreen;
