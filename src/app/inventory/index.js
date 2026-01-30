import { ListVehicles } from '../../presentation/screens/inventory';
import AddBikeScreen from '../../presentation/screens/inventory/components/AddBikeScreen';
import AddVehicleScreen from '../../presentation/screens/inventory/components/AddVehicleScreen';
import { useAppSelector } from '../../state/hooks';

export default function Inventory() {
  const { showTable, showAddVehicule, showAddBici } = useAppSelector((state) => state.inventory);

  return (
    <>
      {showTable && <ListVehicles />}
      {showAddVehicule && <AddVehicleScreen />}
      {showAddBici && <AddBikeScreen />}
    </>
  );
}
