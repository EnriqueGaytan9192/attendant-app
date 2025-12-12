import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const CustomDateTimePicker = ({ visible, onClose, onConfirm }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState("calendar"); // calendar | months | years | time

    // --- Helpers ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const changeMonth = (value) => {
        let newDate = new Date(currentDate);
        newDate.setMonth(month + value);
        setCurrentDate(newDate);
    };

    const changeYear = (value) => {
        let newDate = new Date(currentDate);
        newDate.setFullYear(year + value);
        setCurrentDate(newDate);
    };

    const selectDay = (day) => {
        let newDate = new Date(currentDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
    };

    // --- Años en bloques de 10 ---
    const decadeStart = year - (year % 10);
    const decade = Array.from({ length: 10 }, (_, i) => decadeStart + i);

    // --- Horas y minutos ---
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);
    const [ampm, setAmpm] = useState("AM");

    const confirmDate = () => {
        let finalDate = new Date(selectedDate);
        finalDate.setHours(ampm === "AM" ? hour : hour + 12);
        finalDate.setMinutes(minute);
        onConfirm(finalDate);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={22} />
                        </TouchableOpacity>
                        <Text variant="titleMedium">Seleccionar fecha</Text>
                        <View style={{ width: 22 }} />
                    </View>

                    {/* NAVBAR */}
                    {view === "calendar" && (
                        <View style={styles.navbar}>
                            <TouchableOpacity onPress={() => changeMonth(-1)}>
                                <Icon name="chevron-back" size={22} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setView("months")}>
                                <Text variant="titleMedium">{MONTHS[month]}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setView("years")}>
                                <Text variant="titleMedium">{year}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => changeMonth(1)}>
                                <Icon name="chevron-forward" size={22} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* VIEW: CALENDARIO */}
                    {view === "calendar" && (
                        <View>
                            <View style={styles.weekRow}>
                                {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                                    <Text key={i} style={styles.weekDay}>{d}</Text>
                                ))}
                            </View>

                            {/* DÍAS */}
                            <View style={styles.daysGrid}>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                    <TouchableOpacity
                                        key={day}
                                        style={[
                                            styles.day,
                                            selectedDate.getDate() === day &&
                                                month === selectedDate.getMonth() &&
                                                year === selectedDate.getFullYear()
                                                ? styles.daySelected
                                                : null
                                        ]}
                                        onPress={() => selectDay(day)}
                                    >
                                        <Text>{day}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setView("time")}
                            >
                                <Text style={{ color: "white" }}>Seleccionar hora</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* VIEW: MESES */}
                    {view === "months" && (
                        <View>
                            <View style={styles.navbar}>
                                <TouchableOpacity onPress={() => changeYear(-1)}>
                                    <Icon name="chevron-back" size={22} />
                                </TouchableOpacity>

                                <Text variant="titleMedium">{year}</Text>

                                <TouchableOpacity onPress={() => changeYear(1)}>
                                    <Icon name="chevron-forward" size={22} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.monthGrid}>
                                {MONTHS.map((m, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.monthItem}
                                        onPress={() => {
                                            let newDate = new Date(currentDate);
                                            newDate.setMonth(i);
                                            setCurrentDate(newDate);
                                            setView("calendar");
                                        }}
                                    >
                                        <Text>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* VIEW: AÑOS */}
                    {view === "years" && (
                        <View>
                            <View style={styles.navbar}>
                                <TouchableOpacity onPress={() => changeYear(-10)}>
                                    <Icon name="chevron-back" size={22} />
                                </TouchableOpacity>

                                <Text variant="titleMedium">
                                    {decadeStart} - {decadeStart + 9}
                                </Text>

                                <TouchableOpacity onPress={() => changeYear(10)}>
                                    <Icon name="chevron-forward" size={22} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.monthGrid}>
                                {decade.map((y) => (
                                    <TouchableOpacity
                                        key={y}
                                        style={styles.monthItem}
                                        onPress={() => {
                                            let newDate = new Date(currentDate);
                                            newDate.setFullYear(y);
                                            setCurrentDate(newDate);
                                            setView("calendar");
                                        }}
                                    >
                                        <Text>{y}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* VIEW: HORA */}
                    {view === "time" && (
                        <View style={styles.timeContainer}>
                            {/* Horas */}
                            <View style={styles.timeColumn}>
                                <TouchableOpacity onPress={() => setHour((hour + 1) % 12 || 12)}>
                                    <Icon name="chevron-up" size={22} />
                                </TouchableOpacity>
                                <Text variant="headlineSmall">{hour.toString().padStart(2, "0")}</Text>
                                <TouchableOpacity onPress={() => setHour((hour - 1 + 12) % 12 || 12)}>
                                    <Icon name="chevron-down" size={22} />
                                </TouchableOpacity>
                            </View>

                            {/* Minutos */}
                            <View style={styles.timeColumn}>
                                <TouchableOpacity onPress={() => setMinute((minute + 1) % 60)}>
                                    <Icon name="chevron-up" size={22} />
                                </TouchableOpacity>
                                <Text variant="headlineSmall">{minute.toString().padStart(2, "0")}</Text>
                                <TouchableOpacity onPress={() => setMinute((minute - 1 + 60) % 60)}>
                                    <Icon name="chevron-down" size={22} />
                                </TouchableOpacity>
                            </View>

                            {/* AM / PM */}
                            <View style={styles.timeColumn}>
                                <TouchableOpacity onPress={() => setAmpm(ampm === "AM" ? "PM" : "AM")}>
                                    <Icon name="chevron-up" size={22} />
                                </TouchableOpacity>
                                <Text variant="headlineSmall">{ampm}</Text>
                                <TouchableOpacity onPress={() => setAmpm(ampm === "AM" ? "PM" : "AM")}>
                                    <Icon name="chevron-down" size={22} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* BOTÓN FINAL */}
                    {view === "time" && (
                        <TouchableOpacity style={styles.button} onPress={confirmDate}>
                            <Text style={{ color: "white" }}>Confirmar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    weekDay: {
        width: "14%",
        textAlign: "center",
        fontWeight: "bold",
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    day: {
        width: "14%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginBottom: 5,
    },
    daySelected: {
        backgroundColor: "#8CC152",
    },
    monthGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    monthItem: {
        width: "30%",
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#eee",
        borderRadius: 8,
        alignItems: "center",
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    timeColumn: {
        alignItems: "center",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
});

export default CustomDateTimePicker;
