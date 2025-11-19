import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const EyeIcon = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="visibility" size={22} color="#666" />
    </TouchableOpacity>
);

export default EyeIcon;
