import { View } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import { useState } from "react";
import styles from "../styles/pqrsStyle";
import { Dropdown } from "react-native-element-dropdown";

const CreatePqrsComponent = () => {
  const [tipo, setTipo] = useState("");
  const [plateVehicle, setPlateVehicle] = useState("");
  const [nameClient, setNameClient] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectTypeVehicle, setSelectTypeVehicle] = useState(null);

  const typeVehicle = [
    { label: "Carro", value: "carro" },
    { label: "Moto", value: "moto" },
    { label: "Bicicleta", value: "bicicleta" }
  ]

  const brandVehicle = [
    { label: "Marca A", value: "marca_a" },
    { label: "Marca B", value: "marca_b" },
    { label: "Marca C", value: "marca_c" }
  ]

  const modelVehicle = [
    { label: "Modelo A", value: "modelo_a" },
    { label: "Modelo B", value: "modelo_b" },
    { label: "Modelo C", value: "modelo_c" }
  ]

  return (
    <View style={{ marginTop: 16 }}>
      <View style={{marginTop: 15}}>
        <Text style={styles.title}>Datos PQRS</Text>

        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>Operario</Text>
            <Text>Nayibe Casas</Text>
          </View>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={{marginTop: 15}}>
        <Text style={styles.title}>Datos del vehículo</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.dropdownText}
            containerStyle={styles.dropdownContainer}
            data={typeVehicle}
            labelField="label"
            valueField="value"
            placeholder="Tipo de Vehículos *"
            value={selectTypeVehicle}
            onChange={(item) => setSelectTypeVehicle(item.value)}
          />

          <TextInput 
            label="Placa *"
            mode="outlined"
            value={plateVehicle}
            onChangeText={setPlateVehicle}
            style={styles.input}
            theme={{
              colors: {
                outline: "#E5E5E5",
                primary: "#90D400",
              }
            }}
          />

          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.dropdownText}
            containerStyle={styles.dropdownContainer}
            data={brandVehicle}
            labelField="label"
            valueField="value"
            placeholder="Marca *"
            value={selectTypeVehicle}
            onChange={(item) => setSelectTypeVehicle(item.value)}
          />
        </View>

        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.dropdownText}
          containerStyle={styles.dropdownContainer}
          data={modelVehicle}
          labelField="label"
          valueField="value"
          placeholder="Modelo *"
          value={selectTypeVehicle}
          onChange={(item) => setSelectTypeVehicle(item.value)}
        />
      </View>

      <Divider style={styles.divider} />

      <View style={{marginTop: 15}}>
        <Text style={styles.title}>Datos del cliente</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput 
            label="Nombre Cliente *"
            mode="outlined"
            value={nameClient}
            onChangeText={setNameClient}
            style={styles.input}
            theme={{
              colors: {
                outline: "#E5E5E5",
                primary: "#90D400",
              }
            }}
          />
          
          <TextInput 
            label="Celular *"
            mode="outlined"
            value={cellphone}
            onChangeText={setCellphone}
            style={styles.input}
            theme={{
              colors: {
                outline: "#E5E5E5",
                primary: "#90D400",
              }
            }}
            keyboardType="numeric"
          />

          <TextInput 
            label="Teléfono *"
            mode="outlined"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            theme={{
              colors: {
                outline: "#E5E5E5",
                primary: "#90D400",
              }
            }}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TextInput 
            label="Correo Electrónico *"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            theme={{
              colors: {
                outline: "#E5E5E5",
                primary: "#90D400",
              }
            }}
            keyboardType="email-address"
          />
          
          <TextInput 
            label="Dirección *"
            mode="outlined"
            value={address}
            onChangeText={setAddress}
            style={[styles.input, {marginLeft: '5%'}]}
            theme={{
              colors: {
                outline: "#E5E5E5",
                primary: "#90D400",
              }
            }}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={{marginTop: 15}}>
        <Text style={styles.title}>Reclamo del Cliente</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
        <View>
          <Text style={styles.title}>Firma Operario</Text>
        </View>

        <View>
          <Text style={styles.title}>Firma Cliente</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={{marginTop: 15}}>
        <Text style={styles.title}>Documentos</Text>
      </View>
    </View>
  );
};

export default CreatePqrsComponent;
