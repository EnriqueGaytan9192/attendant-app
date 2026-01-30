import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button, Checkbox, Divider, Text, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import useElectronicInvoiceModalHook from "../../hooks/HooksDepartureVehicles/useElectronicInvoiceModalHook";
import styles from "../../styles/stylesDepartureVehicles/stylesElectronicInvoiceModal";

const ElectronicInvoiceModal = (defaultDocNumber) => {
    const { onCloseModal, options, saveElectronicInvoice } = useElectronicInvoiceModalHook();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    //const [docNumber, setDocNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [cell, setCell] = useState("");
    const [address, setAddress] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [docNumber, setDocNumber] = useState(defaultDocNumber.defaultDocNumber || "");
    console.log("defaultDocNumber", defaultDocNumber);

    /* ---------- Validaciones ---------- */
    const validEmail = (mail) => /.+@.+\..+/.test(mail.trim());
    const validCell = (num) => /^3\d{9}$/.test(num.trim());
    const onlyDigits = (txt) => txt.replace(/[^0-9]/g, "");

    /*useEffect(() => {
        setDocNumber(defaultDocNumber || "");
      }, [defaultDocNumber]);*/
    const onContinue = () => {
        const trimmed = {
            docNumber: docNumber.trim(),
            fullName: fullName.trim(),
            email: email.trim(),
            cell: cell.trim(),
            address: address.trim(),
        };
        // Validación de campos obligatorios
        if (
            !selectedOption ||
            !trimmed.docNumber ||
            !trimmed.fullName ||
            !trimmed.email ||
            !trimmed.cell ||
            !trimmed.address
        ) {
            Alert.alert("Completa todos los campos obligatorios.");
            return;
        }

        if (!validateInputByType(trimmed.docNumber, selectedOption)) {
            Alert.alert(getErrorMessageByType(selectedOption));
            return;
        }

        // Validación del formato del correo electrónico
        // Se verifica que contenga al menos un "@" y un "."
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Ingrese un correo electrónico válido, que contenga '@' y '.'");
            return;
        }

        // Validación del número de celular
        // Debe iniciar con 3 y tener 10 números adicionales (total 11 dígitos)
        const cellRegex = /^3\d{9}$/;
        if (!cellRegex.test(cell)) {
            Alert.alert("El número de celular debe iniciar con 3 y tener 10 dígitos en total.");
            return;
        }

        // Preparación del payload; en este ejemplo, parqueaderoId y turnoId se asignan de forma estática,
        // pero lo ideal es obtenerlos dinámicamente, por ejemplo, desde un slice.
        const payload = {
            tipoDocumento: selectedOptionId,
            facturacionElectronica: docNumber,
            razonSocial: fullName,
            correo: email.trim(),
            numCelular: cell,
            direccion: address,
            tratamientoDatos: 1,
            parqueaderoId: 7,
            turnoId: 97
        };
        saveElectronicInvoice(payload);
    };

    // Etiqueta por tipo de documento
    const getLabelByDocumentType = (type) => {
        switch (type) {
            case "CC":
                return "Cédula de Ciudadanía *";
            case "NT":
                return "Número de Identificación Tributaria *";
            case "CE":
                return "Cédula de Extranjería *";
            default:
                return "Número de Documento *";
        }
    };

    // Mensaje de error por tipo
    const getErrorMessageByType = (type) => {
        switch (type) {
            case "CC":
                return "Debe ingresar entre 6 y 10 dígitos sin espacios y sin iniciar con 0.";
            case "NT":
                return "Debe ingresar entre 6 y 11 dígitos sin espacios y sin iniciar con 0.";
            //case "CE":
            //return "Debe ingresar entre 3 y 7 dígitos sin espacios y sin iniciar con 0.";
            default:
                return "Número de identificación no registrado.";
        }
    };

    // Validación por tipo
    const validateInputByType = (value, type) => {
        if (!value) return false;
        const cleanValue = value.trim();

        if (type === "CC") {
            return /^[1-9][0-9]{5,9}$/.test(cleanValue);
        }
        if (type === "NT") {
            return /^[1-9][0-9]{5,10}$/.test(cleanValue);
        }
        /*if (type === "CE") {
            return /^[1-9][0-9]{2,6}$/.test(cleanValue);
        }*/
        return false;
    };

    const formatFullName = (text) => {
        return text
            // Elimina todo lo que NO sea letra o espacio (incluye tildes y ñ)
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
            // Convierte todo a minúsculas
            .toLowerCase()
            // Evita múltiples espacios
            .replace(/\s+/g, " ")
            // Evita espacios al inicio
            .trimStart()
            // Capitaliza cada palabra
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
    };


    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.modalTitle}>Relación Factura Electronica</Text>
                </View>

                <Divider style={styles.dividerModal} />

                <Text style={styles.subTitle}>Datos Vehículos</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.dropdownPlaceholder}
                        selectedTextStyle={styles.dropdownText}
                        containerStyle={styles.dropdownContainer}
                        labelField="nombre"
                        valueField="prefijo"
                        placeholder="Tipo de Documento *"
                        data={options}
                        value={selectedOption}
                        onChange={(item) => {
                            setSelectedOption(item.prefijo);
                            setSelectedOptionId(item.idTipoDocumentos);
                        }}
                    />
                    {/*<TextInput
                        label="Número de Documento *"
                        mode="outlined"
                        style={styles.input}
                        value={docNumber}
                        onChangeText={setDocNumber}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        keyboardType="numeric"
                    />*/}
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <TextInput
                            label={getLabelByDocumentType(selectedOption)} // etiqueta dinámica
                            mode="outlined"
                            style={styles.inputTwo}
                            value={docNumber}
                            onChangeText={(text) => {
                                // solo números, sin espacios al inicio
                                const cleaned = text.replace(/^\s+/, "").replace(/[^0-9]/g, "");
                                setDocNumber(cleaned);
                            }}
                            theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                            keyboardType="numeric"
                            error={docNumber.length > 0 && !validateInputByType(docNumber, selectedOption)}
                        />

                        {docNumber.length > 0 && !validateInputByType(docNumber, selectedOption) && (
                            <Text style={{ color: "red", fontSize: 12, marginTop: 4, marginLeft: 5 }}>
                                {getErrorMessageByType(selectedOption)}
                            </Text>
                        )}
                    </View>

                    <TextInput
                        label="Nombres y Apellidos *"
                        mode="outlined"
                        style={styles.input}
                        value={fullName}
                        onChangeText={(text) => setFullName(formatFullName(text))}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                    <TextInput
                        label="Correo Electrónico *"
                        mode="outlined"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        keyboardType="email-address"
                    />
                    <TextInput
                        label="Celular *"
                        mode="outlined"
                        style={styles.input}
                        value={cell}
                        onChangeText={setCell}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        keyboardType="numeric"
                    />
                    <TextInput
                        label="Dirección *"
                        mode="outlined"
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Checkbox
                        color="#90D400"
                        status={isAuthorized ? "checked" : "unchecked"}
                        onPress={() => setIsAuthorized(!isAuthorized)}
                    />
                    <Text style={{ color: '#929292', fontSize: 18, marginLeft: 5, marginRight: 30 }}>
                        Autorizo a Parking International S.A.S a realizar el tratamiento de mis datos personales de acuerdo con su Política de Tratamiento de Datos.
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    <Button
                        mode="outlined"
                        theme={{ colors: { primary: "#8C8C8C" } }}
                        onPress={onCloseModal}
                        style={styles.cancelButton}
                    >
                        Volver
                    </Button>

                    <Button
                        mode="contained"
                        onPress={onContinue}
                        style={styles.continueButton}
                    >
                        Continuar
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default ElectronicInvoiceModal;
