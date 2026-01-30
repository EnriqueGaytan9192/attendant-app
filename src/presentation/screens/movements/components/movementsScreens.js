import { ScrollView, View } from "react-native";
import styles from "../styles/stylesMovements";
import VehicleListCard from "../component/VehicleEntry/VehicleListCard";
import VehicleEntryCard from "../component/VehicleEntry/VehicleEntryCard";
import VehicleDetailCard from "../component/VehicleEntry/VehicleDetailCard";

const MovementsScreen = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ padding: 16 }}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <VehicleListCard />
        </View>

        <View style={styles.rightSection}>
          <VehicleEntryCard />
          <VehicleDetailCard />
        </View>
      </View>
    </ScrollView>
  );
};

export default MovementsScreen;
