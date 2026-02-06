import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Button, Checkbox, DataTable, Divider, IconButton, Text, TextInput } from "react-native-paper";
import useObjectsModal from "../../hooks/HooksVehicleEntry/useObjectsModal";
import styles from "../../styles/styleVehicleEntry/stylesObjectModal";
import ElectronicSignature from "./ElectronicSignature";

const ObjectsModal = ({ onFinish }) => {
    const {
        currentStep,
        nextStep,
        prevStep,
        onCloseModal,
        name,
        setName,
        identificationNumber,
        setIdentificationNumber,
        object,
        setObject,
        objectsList,
        setObjectsList,
        addObjectToList,
        saveObjectData,
        signatureRef,
        isAuthorized,
        setIsAuthorized,
        showError,
        setShowError,
        //nameError,
        setNameError,
        identificationNumberError,
        setIdentificationNumberError,
        objectListError,
        setObjectListError,
        existingObject,
        signatureUrl,
        isSignatureAvailable,
        handleReceivedSignature,
    } = useObjectsModal();

    useEffect(() => {
        console.log("[ObjectsModal] isAuthorized =", isAuthorized);
        console.log("[ObjectsModal] isSignatureAvailable =", isSignatureAvailable);
        console.log("[ObjectsModal] showError =", showError);
    }, [isAuthorized, isSignatureAvailable, showError]);

    const [nameTouched, setNameTouched] = useState(false);
    const [idTouched, setIdTouched] = useState(false);
    const [objectTouched, setObjectTouched] = useState(false);
    // calcula errores “inline”
    const nameError = nameTouched && name.trim() === "";
    const idError = idTouched && identificationNumber.trim() === "";
    const invalidIdError = idTouched && (
        !/^[1-9][0-9]*$/.test(identificationNumber.trim())
    );
    const listError = objectsList.length === 0;
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const numberOfItemsPerPageList = [3];

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, objectsList.length);

    const step3Objects = existingObject?.objects ?? [];

    const fromStep3 = page * itemsPerPage;
    const toStep3 = Math.min(
        (page + 1) * itemsPerPage,
        step3Objects.length
    );



    useEffect(() => {
        setPage(0);
    }, [currentStep]);

    useEffect(() => {
        console.log("Valor de existingObject:", existingObject);
        if (existingObject) {
            console.log("Objeto existente detectado, cambiando a Step 3");
            nextStep(3);
        }
    }, [existingObject]);

    const formatFullName = (text) => {
        return text
            .replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, "")
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trimStart()
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
    };

    const steps = {
        1: (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>Relación de Objeto</Text>
                    </View>

                    <Divider style={styles.dividerModal} />

                    <Text style={styles.subTitle}>Datos Propietario</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ width: '48%' }}>
                            <TextInput
                                label="Nombre *"
                                mode="outlined"
                                value={name}
                                theme={{
                                    colors: { outline: "#E5E5E5", primary: "#90D400" }
                                }}
                                onChangeText={(text) => {
                                    const formatted = formatFullName(text);
                                    setName(formatted);

                                    if (nameTouched && formatted.trim() !== "") {
                                        setNameError(false);
                                    }
                                }}
                                onBlur={() => {
                                    setNameTouched(true);
                                    if (name.trim() === "") setNameError(true);
                                }}
                                style={styles.input}
                            />

                            {nameError && <Text style={{ color: "red" }}>El campo “Nombre” es obligatorio</Text>}
                        </View>
                        <View style={{ width: '48%' }}>
                            <TextInput
                                label="Número de Identificación *"
                                mode="outlined"
                                value={identificationNumber}
                                theme={{
                                    colors: { outline: "#E5E5E5", primary: "#90D400" }
                                }}
                                keyboardType="numeric"
                                onChangeText={text => {
                                    const cleaned = text
                                        .replace(/[^0-9]/g, '')          // Solo dígitos
                                        .replace(/^0+/, '');            // Elimina ceros iniciales

                                    setIdentificationNumber(cleaned);

                                    if (idTouched && cleaned.trim() !== '') {
                                        setIdentificationNumberError(false);
                                    }
                                }}
                                onBlur={() => {
                                    setIdTouched(true);

                                    const val = identificationNumber.trim();

                                    const isEmpty = val === '';
                                    const isTooShort = val.length < 5;
                                    const isOnlyZeros = /^0+$/.test(val);

                                    if (isEmpty || isTooShort || isOnlyZeros) {
                                        setIdentificationNumberError(true);
                                    } else {
                                        setIdentificationNumberError(false);
                                    }
                                }}
                                style={styles.input}
                            />
                            {identificationNumberError && (
                                <Text style={{ color: "red" }}>
                                    El número debe tener mínimo 5 dígitos, no puede comenzar con 0 ni estar compuesto solo por ceros.
                                </Text>
                            )}
                        </View>

                    </View>

                    <Text style={styles.subTitle}>Objetos a Relacionar</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', marginTop: 10, width: '50%', paddingRight: '10%' }}>
                            <TextInput
                                label="Objeto *"
                                value={object}
                                onChangeText={text => {
                                    const cleaned = text.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ]/g, '');
                                    setObject(cleaned);

                                    if (objectTouched && cleaned.trim() !== '') {
                                        setObjectListError(false);
                                    }
                                }}
                                onBlur={() => {
                                    setObjectTouched(true);
                                    if (object.trim() === '') {
                                        setObjectListError(true);
                                    }
                                }}
                                theme={{ colors: { outline: "#E5E5E5", primary: "#90D400" } }}
                                style={styles.inputTwo}
                            />

                            <IconButton
                                icon="check"
                                mode="contained"
                                style={styles.iconButton}
                                size={20}
                                disabled={object.trim() === ''}
                                onPress={addObjectToList}
                            />
                        </View>
                        {showError && objectListError && (
                            <Text style={{ color: 'red', marginTop: 10 }}>
                                El campo “Objeto” es obligatorio.
                            </Text>
                        )}
                        <View style={{ marginTop: 10, width: '50%' }}>
                            <View style={styles.table}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ color: "#90D400" }}>Fecha/Hora</DataTable.Title>
                                        <DataTable.Title style={{ color: "#90D400" }}>Objeto</DataTable.Title>
                                        <DataTable.Title style={{ color: "#90D400" }}>Acción</DataTable.Title>
                                    </DataTable.Header>

                                    {objectsList.length > 0 ? (
                                        objectsList.slice(from, to).map((item, index) => (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell>
                                                    {new Date(item.date).toLocaleString("es-CO", {
                                                        timeZone: "America/Bogota",
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })}
                                                </DataTable.Cell>
                                                <DataTable.Cell>{item.objectName}</DataTable.Cell>
                                                <DataTable.Cell>
                                                    <IconButton
                                                        icon="delete"
                                                        onPress={() => {
                                                            const updatedList = objectsList.filter((_, i) => i !== index);
                                                            setObjectsList(updatedList);
                                                        }}
                                                        size={20}
                                                    />
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        ))
                                    ) : (
                                        <View style={{ alignItems: 'center', marginBlock: 15 }}>
                                            <Text style={{ color: '#005A6D' }}>No hay objetos para mostrar.</Text>
                                        </View>
                                    )}
                                </DataTable>

                                {objectsList.length > 0 && (
                                    <DataTable.Pagination
                                        style={{ justifyContent: "center" }}
                                        page={page}
                                        numberOfPages={Math.ceil(objectsList.length / itemsPerPage)}
                                        onPageChange={(newPage) => setPage(newPage)}
                                        label={`${from + 1}-${to} de ${objectsList.length}`}
                                        //numberOfItemsPerPageList={numberOfItemsPerPageList}
                                        //numberOfItemsPerPage={itemsPerPage}
                                        //onItemsPerPageChange={setItemsPerPage}
                                        showFastPaginationControls
                                    //selectPageDropdownLabel="Items por página:"
                                    />
                                )}
                            </View>

                            {showError && objectListError && <Text style={{ color: 'red', marginTop: 10 }}>Debe agregar al menos un objeto</Text>}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 40 }}>
                        <Button mode="outlined" onPress={onCloseModal} style={styles.cancelButton}>Cancelar</Button>
                        <Button mode="contained" onPress={nextStep} disabled={
                            name.trim() === "" ||
                            identificationNumber.trim() === "" ||
                            !/^[1-9][0-9]*$/.test(identificationNumber.trim()) ||
                            objectsList.length === 0
                        } style={styles.continueButton}>Continuar</Button>
                    </View>
                </View>
            </View>
        ),
        2: (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>Relación de Objeto</Text>
                    </View>

                    <Divider style={styles.dividerModal} />

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 10, width: '48%' }}>
                            <Text style={styles.subTitle}>Datos Propietario</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text>Nombre</Text>
                                    <Text>{name}</Text>
                                </View>

                                <View style={{ marginLeft: 50 }}>
                                    <Text>Documento de Identidad</Text>
                                    <Text>{identificationNumber}</Text>
                                </View>
                            </View>

                            <Text style={styles.subTitle}>Objetos Relacionados</Text>

                            <View style={{ marginTop: 10, width: '100%' }}>
                                <View style={styles.table}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title style={{ color: "#90D400" }}>Fecha/Hora</DataTable.Title>
                                            <DataTable.Title style={{ color: "#90D400" }}>Objeto</DataTable.Title>
                                        </DataTable.Header>

                                        {objectsList.length > 0 ? (
                                            objectsList.slice(from, to).map((item, index) => (
                                                <DataTable.Row key={index}>
                                                    <DataTable.Cell>
                                                        {new Date(item.date).toLocaleString("es-CO", {
                                                            timeZone: "America/Bogota",
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>{item.objectName}</DataTable.Cell>
                                                </DataTable.Row>
                                            ))
                                        ) : (
                                            <View style={{ alignItems: 'center', marginBlock: 15 }}>
                                                <Text style={{ color: '#005A6D' }}>No hay objetos para mostrar.</Text>
                                            </View>
                                        )}
                                    </DataTable>

                                    {objectsList.length > 0 && (
                                        <DataTable.Pagination
                                            style={{ justifyContent: "center" }}
                                            page={page}
                                            numberOfPages={Math.ceil(objectsList.length / itemsPerPage)}
                                            onPageChange={(newPage) => setPage(newPage)}
                                            label={`${from + 1}-${to} de ${objectsList.length}`}
                                            //numberOfItemsPerPageList={numberOfItemsPerPageList}
                                            //numberOfItemsPerPage={itemsPerPage}
                                            //onItemsPerPageChange={setItemsPerPage}
                                            showFastPaginationControls
                                        //selectPageDropdownLabel="Items por página:"
                                        />
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, width: '48%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox
                                    status={isAuthorized ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setIsAuthorized(!isAuthorized);
                                        setShowError(false);
                                    }}
                                    color="#90D400"
                                />
                                <Text>Autorizo a Parking International S.A.S a realizar el tratamiento de mis datos personales de acuerdo con su Política de Tratamiento de Datos.</Text>
                            </View>
                            {showError && (
                                <Text style={{ color: "red", marginTop: 5 }}>
                                    Debes autorizar el tratamiento de datos para continuar.
                                </Text>
                            )}

                            <Text style={styles.subTitle}>Firma Propietario</Text>

                            <ElectronicSignature
                                ref={signatureRef}
                                onOK={(sig) => {
                                    console.log("[ObjectsModal] onOK recibida:", sig.slice(0, 30) + "…");
                                    handleReceivedSignature(sig);
                                }}
                            />
                            {showError && !isSignatureAvailable && (
                                <Text style={{ color: "red", marginTop: 5 }}>
                                    Por favor, firme antes de guardar.
                                </Text>
                            )}
                        </View>
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
                            Cancelar
                        </Button>

                        <Button
                            mode="contained"
                            onPress={saveObjectData}
                            disabled={!isAuthorized || !isSignatureAvailable}
                            style={styles.continueButton}
                        >
                            Guardar
                        </Button>
                    </View>
                </View>
            </View>
        ),
        3: (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>Relación de Objeto</Text>
                    </View>

                    <Divider style={styles.dividerModal} />

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 10, width: '48%' }}>
                            <Text style={styles.subTitle}>Datos Propietario</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ color: '#666666', marginLeft: 10 }}>Nombre</Text>
                                    <Text style={{ color: '#666666', marginLeft: 20, marginTop: 10 }}>
                                        {existingObject?.nombrePropietario}
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 50 }}>
                                    <Text style={{ color: '#666666', marginLeft: 10 }}>Documento Identidad</Text>
                                    <Text style={{ color: '#666666', marginLeft: 20, marginTop: 10 }}>
                                        {existingObject?.numeroIdentificacion}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.subTitle}>Objetos Relacionados</Text>

                            <View style={{ marginTop: 10, width: '100%' }}>
                                <View style={styles.table}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title style={{ color: "#90D400" }}>Fecha/Hora</DataTable.Title>
                                            <DataTable.Title style={{ color: "#90D400" }}>Objeto</DataTable.Title>
                                        </DataTable.Header>

                                        {step3Objects.length > 0 ? (
                                            step3Objects.slice(fromStep3, toStep3).map((item, index) => (
                                                <DataTable.Row key={index}>
                                                    <DataTable.Cell>
                                                        {new Date(item.fechaHoraEntrada).toLocaleString("es-CO", {
                                                            timeZone: "America/Bogota",
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>{item.objeto}</DataTable.Cell>
                                                </DataTable.Row>
                                            ))
                                        ) : (
                                            <View style={{ alignItems: 'center', marginBlock: 15 }}>
                                                <Text style={{ color: '#005A6D' }}>
                                                    No hay objetos para mostrar.
                                                </Text>
                                            </View>
                                        )}
                                    </DataTable>

                                    {step3Objects.length > 0 && (
                                        <DataTable.Pagination
                                            style={{ justifyContent: "center" }}
                                            page={page}
                                            numberOfPages={Math.ceil(step3Objects.length / itemsPerPage)}
                                            onPageChange={setPage}
                                            label={`${fromStep3 + 1}-${toStep3} de ${step3Objects.length}`}
                                            //numberOfItemsPerPage={itemsPerPage}
                                            //numberOfItemsPerPageList={numberOfItemsPerPageList}
                                            //onItemsPerPageChange={setItemsPerPage}
                                            showFastPaginationControls
                                        //selectPageDropdownLabel="Items por página:"
                                        />
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, width: '48%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox status="checked" color="#90D400" />
                                <Text>
                                    Autorizo a Parking International S.A.S a realizar el tratamiento de mis datos personales de acuerdo con su Política de Tratamiento de Datos.
                                </Text>
                            </View>

                            <Text style={styles.subTitle}>Firma Propietario</Text>

                            {signatureUrl ? (
                                <Image
                                    source={{ uri: signatureUrl }}
                                    style={{
                                        width: "100%",
                                        height: 200,
                                        alignSelf: "center",
                                        resizeMode: "contain",
                                    }}
                                />
                            ) : (
                                <Text>No se ha registrado firma.</Text>
                            )}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 40 }}>
                        <Button
                            mode="outlined"
                            onPress={onCloseModal}
                            style={styles.cancelButton}
                        >
                            Cerrar
                        </Button>
                    </View>
                </View>
            </View>
        ),

    };

    return <>{steps[currentStep]}</>;
};

export default ObjectsModal;
