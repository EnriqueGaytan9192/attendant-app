import { Alert, Image, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Checkbox, Divider, Text, TextInput } from "react-native-paper";
import useLostTicketHook from "../../hooks/HooksVehicleEntry/useLostTicketHook";
import styles from "../../styles/styleVehicleEntry/stylesLostTicketModal";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const onlyDigits = (txt) => txt.replace(/[^0-9]/g, "");
const trim = (txt) => txt.trim();
const validEmail = (e) => /.+@.+\..+/.test(e);
const validPhone = (p) => /^3\d{9}$/.test(p);

const LostTicketModal = ({ onFinish }) => {
    const {
        // Estado del formulario
        plate, setPlate,
        color, setColor,
        propertyCard, setPropertyCard,
        documentNumber, setDocumentNumber,
        fullName, setFullName,
        email, setEmail,
        phone, setPhone,
        address, setAddress,
        selectedOptionModel, setSelectedOptionModel,
        selectedOptionBrand, setSelectedOptionBrand,
        selectedOptionDocument, setSelectedOptionDocument,
        isAuthorized, setIsAuthorized,
        showError, setShowError,

        // Datos para dropdowns
        dataModel, dataBrand, dataDocument,

        // Funciones de navegación
        currentStep, nextStep, prevStep,

        // Funciones del modal y fotos
        onCloseModal, takePhoto, handleContinue, handleSave,

        // Estado de Redux (fotos)
        photosTicket, loadingPhotosTicket
    } = useLostTicketHook();
    const selectedVehicle = useSelector((state) => state.movements.selectedVehicle);
    const [isSaving, setIsSaving] = useState(false);
    // Estado para la alerta de campos obligatorios
    const [showRequiredFieldsAlert, setShowRequiredFieldsAlert] = useState(false);
    const [docError, setDocError] = useState('');

    const colorOptions = [
        { label: "Amarillo", value: "Amarillo" },
        { label: "Azul", value: "Azul" },
        { label: "Blanco", value: "Blanco" },
        { label: "Celeste", value: "Celeste" },
        { label: "Dorado", value: "Dorado" },
        { label: "Gris", value: "Gris" },
        { label: "Marrón", value: "Marron" },
        { label: "Morado", value: "Morado" },
        { label: "Naranja", value: "Naranja" },
        { label: "Negro", value: "Negro" },
        { label: "Plateado", value: "Plateado" },
        { label: "Rojo", value: "Rojo" },
        { label: "Rosa", value: "Rosa" },
        { label: "Verde", value: "Verde" }
    ];

    /* ---------- Validaciones paso 1 ---------- */
    const validateStep1 = () => {
        const missing =
            !selectedOptionModel ||
            !selectedOptionBrand ||
            !trim(color) ||
            !trim(propertyCard);
        if (missing) {
            Alert.alert("Completa los campos obligatorios del vehículo.");
            return false;
        }
        return true;
    };

    /* ---------- Validaciones paso 2 ---------- */
    const validateStep2 = () => {
        const requiredMissing =
            !selectedOptionDocument ||
            !trim(documentNumber) ||
            !trim(fullName) ||
            !trim(email) ||
            !trim(phone) ||
            !trim(address);
        if (requiredMissing) {
            Alert.alert("Completa todos los datos del cliente.");
            return false;
        }
        if (!validEmail(trim(email))) {
            Alert.alert("Ingresa un correo electrónico válido.");
            return false;
        }
        if (!validPhone(trim(phone))) {
            Alert.alert(
                "El celular debe empezar en 3 y contener exactamente 10 dígitos."
            );
            return false;
        }
        if (!isAuthorized) {
            Alert.alert(
                "Debes autorizar el tratamiento de datos para continuar."
            );
            return false;
        }
        return true;
    };

    /* ---------- Validaciones paso 3 ---------- */
    const validateStep3 = () => {
        const missing =
            !photosTicket.idPhoto ||
            !photosTicket.propertyCardPhoto ||
            !photosTicket.driverPhoto;
        if (missing) {
            Alert.alert("Todas las fotos son obligatorias.");
            return false;
        }
        return true;
    };

    // Función para manejar el botón Continuar con validación
    const handleNextWithValidation = () => {
        if (currentStep === 1 && validateStep1()) {
            nextStep();
        } else if (currentStep === 2) {
            if (validateStep2()) {
                nextStep();
            }
        }
    };

    // Función para manejar el botón Guardar con validación
    const handleSaveWithValidation = async () => {
        if (validateStep3()) {
            setIsSaving(true);
            await handleSave();
            setIsSaving(false);
        }
    };

    // Alerta de campos obligatorios
    const RequiredFieldsAlert = () => (
        Alert.alert(
            "Campos obligatorios",
            "Por favor, completa todos los campos obligatorios.",
            [{ text: "OK", onPress: () => setShowRequiredFieldsAlert(false) }],
            { cancelable: false }
        )
    );

    const renderPhotoSection = (photoKey, label) => (
        <TouchableOpacity
            style={styles.photoButton}
            onPress={() => takePhoto(photoKey)}
            disabled={loadingPhotosTicket[photoKey]}
        >
            {loadingPhotosTicket[photoKey] ? (
                <ActivityIndicator animating={true} color="#90D400" />
            ) : (
                <>
                    <View style={styles.photoButtonContent}>
                        <Text style={styles.photoButtonText}>
                            {photosTicket[photoKey] ? "Foto Tomada" : label}
                        </Text>
                        <MaterialIcons name="camera-alt" size={24} color="#666666" />
                    </View>
                </>
            )}
        </TouchableOpacity>
    );

    const formatFullName = (text) => {
        return text
            // Solo letras (incluye tildes, ñ) y espacios
            .replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, "")
            // Todo a minúsculas
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

    const steps = {
        1: (
            <View style={styles.modalContainer}>
                {showRequiredFieldsAlert && <RequiredFieldsAlert />}
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>Tiquete Perdido</Text>
                        {/*<Image source={require("../../../../../assets/images/close.png")} />*/}
                    </View>

                    <Divider style={styles.dividerModal} />

                    <Text style={styles.subTitle}>Datos Vehículo</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} >
                        <TextInput
                            label={selectedVehicle?.plate || ""}
                            mode="outlined"
                            style={styles.input}
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400",
                                }
                            }}
                            editable={false}
                        />

                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownText}
                            containerStyle={styles.dropdownContainer}
                            data={dataBrand}
                            labelField="label"
                            valueField="value"
                            placeholder="Marca *"
                            value={selectedOptionBrand}
                            onChange={(item) => setSelectedOptionBrand(item.value)}
                            maxHeight={200} // Esto limita la altura total del dropdown (aprox. 5 ítems)
                            itemContainerStyle={{ paddingVertical: 10 }}
                        />

                        <Dropdown
                            style={[
                                styles.dropdown,
                                !selectedOptionBrand && { backgroundColor: "#f0f0f0" } // visual cue
                            ]}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownText}
                            containerStyle={styles.dropdownContainer}
                            data={dataModel}
                            labelField="label"
                            valueField="value"
                            placeholder={
                                selectedOptionBrand ? "Modelo *" : "Selecciona primero una marca"
                            }
                            value={selectedOptionModel}
                            onChange={(item) => setSelectedOptionModel(item.value)}
                            disabled={!selectedOptionBrand}
                            maxHeight={200}
                            itemContainerStyle={{ paddingVertical: 10 }}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        {/*<TextInput
                            label="Color *"
                            mode="outlined"
                            value={color}
                            onChangeText={setColor}
                            style={styles.input}
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400",
                                }
                            }}
                        />*/}

                        <Dropdown
                            style={styles.dropdown} // usa el mismo estilo que el TextInput
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownText}
                            containerStyle={[styles.dropdownContainer, { borderRadius: 8 }]}
                            data={colorOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="Color *"
                            value={color}
                            onChange={(item) => setColor(item.value)}
                            itemContainerStyle={{ paddingVertical: 10 }}
                        />


                        <TextInput
                            label="N° Tarjeta Propiedad *"
                            mode="outlined"
                            value={propertyCard}
                            onChangeText={setPropertyCard}
                            style={[styles.input, { marginLeft: 55 }]}
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400",
                                }
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: 40,
                        }}
                    >
                        <Button
                            mode="outlined"
                            onPress={onCloseModal}
                            style={styles.cancelButton}
                        >
                            Cancelar
                        </Button>

                        <Button
                            mode="contained"
                            onPress={handleNextWithValidation}
                            style={styles.continueButton}
                        >
                            Continuar
                        </Button>
                    </View>
                </View>
            </View>
        ),
        2: (
            <View style={styles.modalContainer}>
                {showRequiredFieldsAlert && <RequiredFieldsAlert />}
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>Tiquete Perdido</Text>
                        {/*<Image source={require("../../../../../assets/images/close.png")}/>*/}
                    </View>

                    <Divider style={styles.dividerModal} />

                    <Text style={styles.subTitle}>Datos Cliente</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} >
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownText}
                            containerStyle={styles.dropdownContainer}
                            data={dataDocument}
                            labelField="label"
                            valueField="value"
                            placeholder="Tipo de Documento *"
                            value={selectedOptionDocument}
                            onChange={(item) => setSelectedOptionDocument(item.value)}
                        />

                        <View>
                            <TextInput
                                label="Número de Documento *"
                                mode="outlined"
                                value={documentNumber}
                                onChangeText={(text) => {
                                    let cleaned = text.replace(/[^0-9]/g, '');

                                    if (cleaned.startsWith('0')) {
                                        cleaned = cleaned.replace(/^0+/, '');
                                    }

                                    if (/^0+$/.test(cleaned)) {
                                        cleaned = '';
                                    }

                                    setDocumentNumber(cleaned);

                                    // Validar longitud
                                    if (cleaned && cleaned.length < 5) {
                                        setDocError('El número de documento debe tener al menos 5 dígitos.');
                                    } else {
                                        setDocError('');
                                    }
                                }}
                                style={styles.inputTwo}
                                theme={{
                                    colors: {
                                        outline: "#E5E5E5",
                                        primary: "#90D400",
                                    }
                                }}
                                keyboardType="numeric"
                            />

                            {docError ? <Text style={{ color: 'red', fontSize: 12 }}>{docError}</Text> : null}
                        </View>


                        <TextInput
                            label="Nombres y Apellidos *"
                            mode="outlined"
                            value={fullName}
                            onChangeText={(text) => setFullName(formatFullName(text))}
                            style={styles.input}
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400",
                                }
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
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
                        />

                        <TextInput
                            label="Celular *"
                            mode="outlined"
                            value={phone}
                            onChangeText={setPhone}
                            style={[styles.input, { marginLeft: 55 }]}
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400",
                                }
                            }}
                            keyboardType="numeric"
                        />

                        <TextInput
                            label="Dirección *"
                            mode="outlined"
                            value={address}
                            onChangeText={setAddress}
                            style={[styles.input, { marginLeft: 50 }]}
                            theme={{
                                colors: {
                                    outline: "#E5E5E5",
                                    primary: "#90D400",
                                }
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Checkbox
                            status={isAuthorized ? "checked" : "unchecked"}
                            onPress={() => {
                                setIsAuthorized(!isAuthorized);
                                setShowError(false);
                            }}
                            color="#90D400"
                        />
                        <Text style={{ marginLeft: 8 }}>
                            Autorizo a Parking International S.A.S. a realizar el tratamiento de mis datos personales de acuerdo con su Política de Tratamiento de Datos.
                        </Text>
                    </View>

                    {showError && (
                        <Text style={{ color: "red", marginTop: 5 }}>
                            Debes autorizar el tratamiento de datos para continuar.
                        </Text>
                    )}


                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: 40,
                        }}
                    >
                        <Button
                            mode="outlined"
                            onPress={prevStep}
                            style={styles.cancelButton}
                        >
                            Volver
                        </Button>

                        <Button
                            mode="contained"
                            onPress={handleNextWithValidation}
                            style={styles.continueButton}
                        >
                            Continuar
                        </Button>
                    </View>
                </View>
            </View>
        ),
        3: (
            <View style={styles.modalContainer}>
                {showRequiredFieldsAlert && <RequiredFieldsAlert />}
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>Tiquete Perdido</Text>
                        {/*<Image source={require("../../../../../assets/images/close.png")}/>*/}
                    </View>

                    <Divider style={styles.dividerModal} />

                    <Text style={styles.subTitle}>Documentos</Text>

                    <View style={{ marginTop: 30 }}>
                        {renderPhotoSection("idPhoto", "Foto Cédula *")}
                        <Text style={{ marginBottom: 25, marginLeft: 30, color: '#666666' }}>Se necesita documento fisíco</Text>

                        {renderPhotoSection("propertyCardPhoto", "Foto Tarjeta de Propiedad *")}
                        <Text style={{ marginBottom: 25, marginLeft: 30, color: '#666666' }}>Se necesita documento fisíco</Text>

                        {renderPhotoSection("driverPhoto", "Foto Conductor *")}
                        <Text style={{ marginBottom: 25, marginLeft: 30, color: '#666666' }}>Debe hacerse en el punto de servicio</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: 40,
                        }}
                    >
                        <Button
                            mode="outlined"
                            onPress={prevStep}
                            style={styles.cancelButton}
                        >
                            Volver
                        </Button>

                        <Button
                            mode="contained"
                            onPress={handleSaveWithValidation}
                            style={styles.continueButton}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator animating={true} color="#fff" />
                            ) : (
                                "Guardar"
                            )}
                        </Button>
                    </View>
                </View>
            </View>
        )
    };

    return <>{steps[currentStep]}</>;
};

export default LostTicketModal;