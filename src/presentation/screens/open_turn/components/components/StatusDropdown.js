import { View } from "react-native";
import CustomDropdown from "../../../../../common/components/CustomDropdown";

const StatusDropdown = ({ value, onChange }) => {

    const statusOptions = [
        { label: "Bueno", value: "Bueno" },
        { label: "Regular", value: "Regular" },
        { label: "Dañado", value: "Dañado" },
        { label: "Roto", value: "Roto" },
        { label: "No está", value: "No está" },
        { label: "No visible", value: "No visible" },
        { label: "No aplica", value: "No aplica" },
    ]

    return (
        <View style={{ minWidth: 140 }}>
            <CustomDropdown
                label="Estado"
                variant="table"
                data={statusOptions}
                value={value}
                onChange={onChange}
                style={{
                    borderWidth: value === "" ? 2 : 0,
                    borderColor: "#FF6E64",
                    borderRadius: 6,
                }}
            />
        </View>
    )
}

export default StatusDropdown;