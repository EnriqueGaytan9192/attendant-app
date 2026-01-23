import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CustomDropdown = ({
  label = "",
  asteriskColor = "#68AF00",
  data,
  value,
  onChange,
  placeholder = "",
  style,
  variant = "default",
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const isTable = variant === "table";
  const showAsterisk = !isTable;
  const baseLabel = label.replace("*", "");
  const showLabel = Boolean(value) && !isTable;

  return (
    <View style={{ marginBottom: isTable ? 0 : 10 }}>

      {showLabel && (
        <Text style={styles.label}>{baseLabel}</Text>
      )}

      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={{
          fontSize: isTable ? 13 : 16,
          color: "#666666",
          fontFamily: "Montserrat_400Regular",
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
        placeholder={
          <Text
            style={[
              styles.placeholderText,
              isTable && { fontSize: 13 }
            ]}
          >
            {baseLabel}
            {showAsterisk && (
              <Text style={{ color: asteriskColor }}> *</Text>
            )}
          </Text>
        }
        renderRightIcon={() => (
          <Ionicons
            name={isFocus ? "caret-up-outline" : "caret-down-outline"}
            size={isTable ? 16 : 18}
            color={value ? "#68AF00" : "#8C8C8C"}
          />
        )}
        style={[
          styles.dropdown,
          isTable && styles.tableDropdown,
          {
            borderColor: value ? "#90D400" : "#E5E5E5",
          },
          isFocus && { borderColor: "#90D400" },
          style,
        ]}
        selectedTextStyle={{
          fontSize: isTable ? 13 : 16,
          color: "#666666",
          fontFamily: "Montserrat_400Regular",
          lineHeight: 20,
        }}
        {...props}
      />
    </View>
  );
};


export default CustomDropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
    marginLeft: 5,
    fontFamily: "Montserrat_400Regular"
  },
  dropdown: {
    height: 60,
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 25,
    backgroundColor: "white",
  },
  placeholderText: {
    color: "#666666",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    lineHeight: 20
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Montserrat_400Regular",
    lineHeight: 20
  },
  dropdownContainer: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    maxHeight: 240,
    paddingVertical: 4,
  },
  tableDropdown: {
    height: 42,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "transparent",
  },

});
