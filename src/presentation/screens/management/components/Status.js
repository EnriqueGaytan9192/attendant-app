import { StyleSheet, Text, View } from "react-native";

const StatusBadge = ({ status }) => (
    <View style={[styles.badge, status === "Activo" ? styles.green : styles.gray]}>
        <Text style={styles.text}>{status}</Text>
    </View>
);

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    green: { backgroundColor: "#95E42D" },
    gray: { backgroundColor: "#CCC" },
    text: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});

export default StatusBadge;
