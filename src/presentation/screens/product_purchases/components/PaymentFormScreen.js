import { Button, Card, Checkbox, Divider, Text, TextInput } from "react-native-paper";
import styles from "../styles/stylesPaymentForm";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import usePaymentForm from "../hooks/usePaymentFormScreenHook";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const PaymentFormScreen = ({ month, onBack }) => {
  const {
    nitCedula,
    selectedTabProducts,
    identificationOptions,
    selectedDocumentType,
    typeDocument,
    correo,
    nombre,
    apellidos,
    placa,
    plateError,
    medioPagoId,
    numeroComprobante,
    tokenProduc,
    selectFactura,
    handleInputChange,
    handleSearch,
    setSelectedDocumentType,
    setTypeDocument,
    handleTypeDocument,
    getLabelByDocumentType,
    getErrorMessageByType,
    validateInputByType,
    getDocumentTypeCode,
    setNombre,
    setCorreo,
    setApellidos,
    setPlaca,
    setMedioPagoId,
    setNumeroComprobante,
    setTokenProduc,
    handleSubmit,
    formHasErrors,
    userInfo,
    handleBack,
    resetConFacturaForm,
    resetSinFacturaForm,
    handleNitCedulaInput,
    validateNitOrCC,
    setIsCedulaValidated
  } = usePaymentForm();

  const [submitting, setSubmitting] = useState(false);
  const documentTypeCode = getDocumentTypeCode(selectedDocumentType);
  const [typeDocumentSelected, setTypeDocumentSelected] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const procesarHandleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await handleSubmit();
    } catch (e) {
      // ya maneja errores internamente, aquí podrías loguear
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedTabProducts === "sinFactura") {
      resetConFacturaForm(); // limpiar los datos del otro formulario
    } else if (selectedTabProducts === "conFactura") {
      resetSinFacturaForm(); // limpiar los datos del otro formulario
    }
  }, [selectedTabProducts]);


  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        marginTop: 5,
        padding: 20,
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View>
            <Text style={styles.title}>Compra de Mensualidad Natural: {month?.nombre || '----'}</Text>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTabProducts === "sinFactura" && styles.activeTab,
              ]}
              onPress={() => selectFactura("sinFactura")}
              disabled={submitting}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: selectedTabProducts === "sinFactura" ? "#005A6D" : "#8C8C8C",
                }}
              >
                Facturación genérica
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTabProducts === "conFactura" && styles.activeTab]}
              onPress={() => selectFactura("conFactura")}
              disabled={submitting}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: selectedTabProducts === "conFactura" ? "#005A6D" : "#8C8C8C",
                }}
              >
                Facturación personalizada
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {selectedTabProducts === "sinFactura" && (
              <View>
                <View style={styles.container}>
                  <View>
                    <Text style={styles.subTitle}>Datos del Cliente</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownText}
                      containerStyle={styles.dropdownContainer}
                      data={identificationOptions}
                      labelField="label"
                      valueField="value"
                      placeholder="Tipo de Documento *"
                      value={selectedDocumentType}
                      onChange={(item) => {
                        setSelectedDocumentType(item.value);
                        setTypeDocumentSelected(false)
                        setTypeDocument("");
                      }}
                    />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                      <TextInput
                        label={getLabelByDocumentType(documentTypeCode)}
                        mode="outlined"
                        value={typeDocument}
                        onChangeText={handleTypeDocument}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        style={styles.textInputTwo}
                        error={typeDocument.length > 0 && !validateInputByType(typeDocument, documentTypeCode)}
                        keyboardType="numeric"
                        placeholder="Ingrese número"
                        disabled={typeDocumentSelected}
                      />

                      {typeDocument.length > 0 && !validateInputByType(typeDocument, documentTypeCode) && (
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4, marginLeft: 45 }}>
                          {getErrorMessageByType(documentTypeCode)}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TextInput
                        label="Correo electrónico *"
                        mode="outlined"
                        value={correo}
                        //onChangeText={setCorreo}
                        //onChangeText={text => setCorreo(text.replace(/\s/g, ''))}
                        onChangeText={text => {
                          const noSpaces = text.replace(/\s/g, '');

                          const filtered = noSpaces.replace(/[^\w@.+-]/gi, '');

                          setCorreo(filtered);
                        }}

                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        style={styles.textInputThree}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      <TextInput
                        label="Nombre o Razón Social *"
                        mode="outlined"
                        value={nombre}
                        //onChangeText={setNombre}
                        //onChangeText={text => setNombre(text.replace(/^\s+/, ''))}
                        onChangeText={text => {
                          const noLeadingSpaces = text.replace(/^\s+/, '');

                          // Permite letras, números, espacios, puntos, guiones y diagonales
                          const filtered = noLeadingSpaces.replace(/[^\p{L}\p{N}\s\.\-\/]/gu, '');

                          setNombre(filtered);
                        }}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        style={styles.textInputThree}
                        keyboardType="default"
                      />
                    </View>
                    <TextInput
                      label="Apellidos *"
                      mode="outlined"
                      value={apellidos}
                      //onChangeText={setApellidos}
                      //onChangeText={text => setApellidos(text.replace(/^\s+/, ''))}
                      onChangeText={text => {
                        const noLeadingSpaces = text.replace(/^\s+/, '');

                        const filtered = noLeadingSpaces.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

                        setApellidos(filtered);
                      }}

                      theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                      style={[styles.textInputThree, { marginTop: 5 }]}
                      keyboardType="default"
                    />
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.container}>
                  <View>
                    <Text style={styles.subTitle}>Datos del Vehículo</Text>
                  </View>

                  <View style={{ marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <TextInput
                          label="Placa *"
                          error={plateError}
                          mode="outlined"
                          value={placa}
                          //onChangeText={text => setPlaca(text.toUpperCase())}
                          //onChangeText={text => setPlaca(text.replace(/\s/g, '').toUpperCase())}
                          onChangeText={text => {
                            const filtered = text
                              .replace(/\s/g, '')
                              .replace(/[^a-zA-Z0-9]/g, '')
                              .toUpperCase();

                            setPlaca(filtered);
                          }}
                          theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                          style={styles.textInputFour}
                          keyboardType="default"
                        />
                        {plateError ? <Text style={styles.errorText}>{plateError}</Text> : null}
                      </View>
                      <TextInput
                        label="Token de Validación *"
                        mode="outlined"
                        value={tokenProduc}
                        //onChangeText={text => setTokenProduc(text.toUpperCase())}
                        //onChangeText={text => setTokenProduc(text.replace(/\s/g, '').toUpperCase())}
                        onChangeText={text => {
                          const filtered = text
                            .replace(/\s/g, '')
                            .replace(/[^a-zA-Z0-9]/g, '')
                            .toUpperCase();

                          setTokenProduc(filtered); // o setTokenProduc(filtered)
                        }}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        style={styles.textInputThree}
                        keyboardType="default"
                      />
                    </View>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.container}>
                  <View>
                    <Text style={styles.subTitle}>Medio de Pago</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                      status={medioPagoId === 1 ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setMedioPagoId(1);
                        setNumeroComprobante('');
                      }}
                      color="#90D400"
                    />
                    <Text style={{ marginRight: 16 }}>Efectivo</Text>

                    <Checkbox
                      status={medioPagoId === 2 ? 'checked' : 'unchecked'}
                      onPress={() => setMedioPagoId(2)}
                      color="#90D400"
                    />
                    <Text>Datáfono</Text>
                  </View>

                  {medioPagoId === 2 && (
                    <TextInput
                      label="Número de Comprobante *"
                      mode="outlined"
                      value={numeroComprobante}
                      //onChangeText={setNumeroComprobante}
                      onChangeText={text => setNumeroComprobante(text.replace(/\s/g, ''))}
                      theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                      style={[styles.textInputThree, { marginTop: 5, alignSelf: 'flex-end' }]}
                      keyboardType="default"
                    />
                  )}
                </View>

              </View>
            )}

            {selectedTabProducts === "conFactura" && (
              <View>
                <View style={styles.container}>
                  <Text style={styles.subTitle}>Facturación Electrónica</Text>
                  <View style={{ flexDirection: "row", alignContent: "center" }}>
                    <View style={{ flexDirection: "column" }}>
                      <TextInput
                        label="NIT/Cédula *"
                        mode="outlined"
                        value={nitCedula}
                        onChangeText={text => {
                          handleNitCedulaInput(text),
                            setIsCedulaValidated(false);
                        }}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        style={styles.textInput}
                        error={nitCedula.length > 0 && !validateNitOrCC(nitCedula)}
                        placeholder="Ej: 12345678901 o 1234567890"
                        keyboardType="numeric"
                      />
                      {/*{nitCedula.length > 0 && !validateNitOrCC(nitCedula) && (
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                          Ingresa un NIT válido (6-11 dígitos, sin ceros iniciales) o una cédula válida (6-10 dígitos, sin ceros iniciales).
                        </Text>
                      )}*/}
                      {nitCedula.length > 0 && !validateNitOrCC(nitCedula) && (
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                          Ingresa un NIT válido (6-11 dígitos) o una cédula válida (6-10 dígitos).
                        </Text>
                      )}
                    </View>

                    <Button
                      mode="contained"
                      style={styles.searchButton}
                      //onPress={handleSearch}
                      onPress={() => {
                        if (!validateNitOrCC(nitCedula)) {
                          Alert.alert("Ingrese un NIT o Cédula válido.");
                          return;
                        }
                        // aquí haces tu lógica de validación con backend
                        setIsCedulaValidated(true);
                        handleSearch()
                      }}
                    >
                      Validar
                    </Button>
                    {userInfo && (
                      <Text style={styles.userInfoText}>
                        {userInfo.number} - {userInfo.name}
                      </Text>
                    )}
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.container}>
                  <View>
                    <Text style={styles.subTitle}>Datos del Vehículo</Text>
                  </View>

                  <View style={{ marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <TextInput
                          label="Placa *"
                          mode="outlined"
                          error={plateError}
                          value={placa}
                          //onChangeText={text => setPlaca(text.toUpperCase())}
                          //onChangeText={text => setPlaca(text.replace(/\s/g, '').toUpperCase())}
                          onChangeText={text => {
                            const filtered = text
                              .replace(/\s/g, '')
                              .replace(/[^a-zA-Z0-9]/g, '')
                              .toUpperCase();

                            setPlaca(filtered);
                          }}
                          theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                          style={styles.textInputFour}
                          keyboardType="default"
                        />
                        {plateError ? <Text style={styles.errorText}>{plateError}</Text> : null}
                      </View>
                      <TextInput
                        label="Token de Validación *"
                        mode="outlined"
                        value={tokenProduc}
                        //onChangeText={text => setTokenProduc(text.toUpperCase())}
                        //onChangeText={text => setTokenProduc(text.replace(/\s/g, '').toUpperCase())}
                        onChangeText={text => {
                          const filtered = text
                            .replace(/\s/g, '')
                            .replace(/[^a-zA-Z0-9]/g, '')
                            .toUpperCase();

                          setTokenProduc(filtered); // o setTokenProduc(filtered)
                        }}
                        theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                        style={styles.textInputThree}
                        keyboardType="default"
                      />
                    </View>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.container}>
                  <View>
                    <Text style={styles.subTitle}>Medio de Pago</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                      status={medioPagoId === 1 ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setMedioPagoId(1);
                        setNumeroComprobante('');
                      }}
                      color="#90D400"
                    />
                    <Text style={{ marginRight: 16 }}>Efectivo</Text>

                    <Checkbox
                      status={medioPagoId === 2 ? 'checked' : 'unchecked'}
                      onPress={() => setMedioPagoId(2)}
                      color="#90D400"
                    />
                    <Text>Datáfono</Text>
                  </View>

                  {medioPagoId === 2 && (
                    <TextInput
                      label="Número de Comprobante *"
                      mode="outlined"
                      value={numeroComprobante}
                      //onChangeText={setNumeroComprobante}
                      onChangeText={text => setNumeroComprobante(text.replace(/\s/g, ''))}
                      theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                      style={[styles.textInputThree, { marginTop: 5, alignSelf: 'flex-end' }]}
                      keyboardType="default "
                    />
                  )}
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <Button
              mode="outlined"
              onPress={onBack}
              style={styles.cancelButton}
            >
              Cancelar
            </Button>

            <Button
              mode="contained"
              onPress={procesarHandleSubmit
              }
              style={styles.continueButton}
              loading={isSubmitting}
              disabled={isSubmitting || formHasErrors}
            >
              Guardar
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default PaymentFormScreen;
