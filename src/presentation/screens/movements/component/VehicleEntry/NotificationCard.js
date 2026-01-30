import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../styles/stylesMovements";

const NotificationsCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notificaciones</Text>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.notificationItem}>
              <MaterialIcons name="check-circle" size={20} color="#005A6D" />
              <Text style={styles.notificationText}>Default Message Content</Text>
              <TouchableOpacity>
                <MaterialIcons name="close" size={20} color="#005A6D" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

export default NotificationsCard;
