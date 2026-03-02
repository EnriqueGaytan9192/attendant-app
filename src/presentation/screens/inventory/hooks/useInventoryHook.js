import { Alert, Platform } from "react-native";
import { useSelector } from "react-redux";
import { useLazyFetch, useLazyFileFetch } from "../../../../common/hook/useFetch";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
    changeFlagBy, cleanForm, cleanFormBici, searchInDataSet, setDataList, setDataListBicycle,
    setFullFormToEdit, setFullFormToView, setSelectedView,
    setUrls
} from "../../../../state/slices/inventorySlice";
const useInventoryHook = () => {
    const dispatch = useAppDispatch();
    const { getDataFetch: fetchVehicles } = useLazyFetch();
    const { getDataFetch: fetchBicycles } = useLazyFetch();
    const {
        turnoIdEntry
    } = useSelector(
        (state) => state.movements
    );
    const { numeroIdentificacion, parqueaderoId, terminal } = useSelector((state) => state.auth);
    const { dataSet, dataSetBicycle, selectedView, searchValue, form, urls } = useAppSelector((state) => state.inventory);
    //const facility_id = useAppSelector(item => item.auth.infoAuth.facility_id);


    const { getDataFetch, loading: loadingFiles } = useLazyFetch();
    const { getDataFileFetch, loading: loadingFoto } = useLazyFileFetch();

    const handleShowAdd = () => {
        dispatch(changeFlagBy({ name: 'showTable', value: false }));
        dispatch(changeFlagBy({ name: 'showAddVehicule', value: true }));
    }


    const handleShowAddBici = () => {
        dispatch(cleanFormBici());
        dispatch(changeFlagBy({ name: 'showTable', value: false }));
        dispatch(changeFlagBy({ name: 'showAddBici', value: true }));
    }

    const handleCancel = () => {
        dispatch(cleanForm());
        dispatch(changeFlagBy({ name: 'showTable', value: true }));
        dispatch(changeFlagBy({ name: 'showAddVehicule', value: false }));
    }

    const handleViewVehicle = async (id) => {
        try {
            const { data, errorFetch } = await getDataFetch(
                `/api/inventory/vehicleDet/${id}`,
                "GET"
            );
            //console.log("data", data)
            if (errorFetch) {
                throw new Error(errorFetch?.message || "Error al obtener vehículo");
            }
            // data.inventory => objeto con todos los campos
            if (data?.inventory) {
                const transformed = transformApiResponseToForm(data.inventory);
                transformed.isView = true; // Modo solo lectura
                dispatch(setFullFormToView(transformed));
                // Cambiar flags para mostrar la pantalla de formulario
                dispatch(changeFlagBy({ name: "showTable", value: false }));
                dispatch(changeFlagBy({ name: "showAddVehicule", value: true }));
            }
        } catch (error) {
            showAlert(error.message);
        }
    };

    const handleEditVehicle = async (id) => {
        try {
            const { data, errorFetch } = await getDataFetch(
                `/api/inventory/vehicleDet/${id}`,
                "GET"
            );
            //console.log("data", data)
            if (errorFetch) {
                throw new Error(errorFetch?.message || "Error al obtener vehículo");
            }
            if (data?.inventory) {
                const transformed = transformApiResponseToForm(data.inventory);
                transformed.isEdit = true; // Modo edición
                dispatch(setFullFormToEdit(transformed));
                // Cambiar flags para mostrar la pantalla de formulario
                dispatch(changeFlagBy({ name: "showTable", value: false }));
                dispatch(changeFlagBy({ name: "showAddVehicule", value: true }));
            }
        } catch (error) {
            showAlert(error.message);
        }
    };

    const updateVehicle = async () => {
        try {
            // Si hay imágenes locales (por ejemplo, que comienzan con "file://"), súbelas a S3
            const localImages = form.photos.filter(uri => uri && uri.startsWith("file://"));
            let uploadedUrls = [];
            if (localImages.length > 0) {
                uploadedUrls = await saveImages(); // Asume que saveImages sube solo las imágenes locales y retorna sus URLs
                if (uploadedUrls.length === 0) {
                    showAlert('No se pudieron subir las imágenes. Inténtelo nuevamente.');
                    return;
                }
            }

            // Construir el body de actualización. Puedes combinar las imágenes ya existentes con las nuevas.
            const body = transformFormToUpdateRequest({
                ...form,
                photos: uploadedUrls.length > 0 ? uploadedUrls : form.photos
            });

            const { data, errorFetch } = await getDataFetch(`/api/inventoryVehicle/${form.id}`, "PUT", { rq: body });
            if (errorFetch) {
                throw new Error(errorFetch?.message || "Error al actualizar vehículo");
            }
            if (data?.message) {
                Alert.alert("Éxito", data.message, [{ text: "OK" }]);
                await reloadData();
            }
            handleCancel();
        } catch (error) {
            Alert.alert("Error", error.message, [{ text: "OK" }]);
        }
    };

    const transformApiResponseToForm = (inv) => {
        return {
            id: inv.id,
            placa: inv.placa,
            vehiculo: inv.tipoVehiculo === 1 ? "Carro" : "Moto",
            turnoId: inv.turnoId || 1,
            estado: inv.estadoVehiculo?.toString() || "1", // lo convierte a string p.e. "1"

            // Detalles "externos"
            lateralIzquierdo: inv.lateralIzquierdo,
            lateralDerecho: inv.lateralDerecho,
            frente: inv.frente,
            posterior: inv.posterior,

            // Fotos
            photo1: inv.img1,
            photo2: inv.img2,
            photo3: inv.img3,
            photo4: inv.img4,

            // Partes
            chapas: inv.chapas,
            espejos: inv.espejos,
            farolasStop: inv.farolasStop,
            llantaRepuesto: inv.llantaRepuesto,
            copas: inv.copas,
            radio: inv.radio,
            frontal: inv.frontal,
            antena: inv.antena,
            emblema: inv.emblema,
            tapaGasolina: inv.tapaGasolina,
            cauchosLaterales: inv.cauchosLaterales,
            limpiaBrisas: inv.limpiaBrisas,
            tapaLlantas: inv.tapaLlantas,
            bahul: inv.bahul,

            // Observaciones
            observaciones: inv.observaciones || "",
            photos: [
                inv.img1,
                inv.img2,
                inv.img3,
                inv.img4
            ].filter(Boolean)
        };
    };

    const transformFormToUpdateRequest = (f) => {
        return {
            turnoId: f.turnoId || 97,                // Ajusta según corresponda
            placa: f.placa,                          // "ABC123"
            vehiculo: f.vehiculo,                    // "Carro" o "Moto"
            tipoVehiculo: f.vehiculo === "Carro" ? 1 : 2,
            estado: f.estado || "0",                 // Ajusta "0" o "1" como manejes el estado
            detalles: {
                frente: f.frente,              // "rayones"
                derecha: f.lateralDerecho,     // "rayones"
                atras: f.posterior,            // "abolladuras"
                izquierda: f.lateralIzquierdo, // "rayones"
            },
            fotos: f.photos || [],           // array con URLs: ["attendant/vehicles/moto/..."]
            partes: {
                carroceria: "no aplica",             // si no lo usas, déjalo fijo
                lucesDeFreno: f.farolasStop,        // "regular"
                tapacubos: "no aplica",             // si no lo usas, déjalo fijo
                parteFrontal: f.frontal,           // "bueno"
                emblema: f.emblema,                // "bueno"
                cauchosLaterales: f.cauchosLaterales, // "bueno"
                cubiertasDeRueda: f.tapaLlantas,   // "bueno"
                chapas: f.chapas,                  // "bueno"
                copas: f.copas,                    // "regular"
            },
            accesorios: {
                espejos: f.espejos,                   // "bueno"
                tapaLlantas: f.tapaLlantas,           // "bueno"
                llantasRepuesto: f.llantaRepuesto,    // "regular"
                radio: f.radio,                       // "bueno"
                antena: f.antena,                     // "bueno"
                tapaGasolina: f.tapaGasolina,         // "regular"
                limpiaBrisas: f.limpiaBrisas,         // "bueno"
                tieneBaul: f.bahul,                   // "regular"
            },
            observaciones: f.observaciones, // "kike"
        };
    };

    const handleSearch = (text) => {
        dispatch(searchInDataSet(text));
    }

    const handleSetSelectedView = (ele) => {
        dispatch(setSelectedView(ele));
    }


    const handleSave = async () => {
        //console.log("entrando a handlesave")
        if (form.isEdit) {
            await updateVehicle();
        } else {
            await saveForm();
        }
    }

    const saveImages = async () => {
        const { photos, placa, vehiculo } = form;
        const errors = []; // Array para almacenar errores
        const uploadedUrls = []; // Array para almacenar URLs subidas
        if (!photos || photos.length === 0) {
            //showAlert('Favor de cargar alguna imagen');
            return [];
        }
        let type = vehiculo === 'Carro' ? 1 : vehiculo === 'Moto' ? 2 : 0;
        if (type === 0 && placa.trim() === '') {
            showAlert('Seleccione tipo de vehículo o escriba la placa');
            return [];
        }
        const validImages = photos.filter(Boolean); // Filtra imágenes válidas
        if ((type === 1 || type === 2) && validImages.length < 4) {
            //showAlert('Cargue al menos 4 imágenes');
            return [];
        }
        // Subir imágenes una por una
        await Promise.all(
            validImages.map(async (image, i) => {
                try {
                    const formData = new FormData();
                    const date = new Date();
                    const timestamp = date.toISOString().replace(/[-:.]/g, '');
                    const fileName = `${type}_${i + 1}_archivo_${timestamp}.jpg`;
                    // Arma el JSON que tu backend espera en el campo "json"
                    const jsonBody = {
                        name_file: fileName,
                        file_type: type,
                        id_file_module: 2,
                        destination: 12,
                        fecha_vencimiento: '24/05/2024'
                    };
                    formData.append('json', JSON.stringify(jsonBody));

                    // Prepara la imagen con la clave "file"
                    //const fileName = `${type}_${i + 1}_archivo.jpg`;
                    formData.append('file', {
                        uri: image,         // URI local de la imagen (por ejemplo: file:///data/user/0/host.exp.exponent/...)
                        type: 'image/jpeg', // Tipo MIME
                        name: fileName      // Nombre que quieras asignar
                    });

                    console.log(`Subiendo imagen ${i + 1} con nombre ${fileName}`, formData);

                    // Llamada a tu hook, con el método "FILES" (multipart/form-data)
                    const { data, errorFetch } = await getDataFetch('/api/s3Attendant', 'FILES', { rq: formData });

                    console.log(`Respuesta para imagen ${i + 1}:`, data, errorFetch);

                    if (data && data.fileUrl) {
                        uploadedUrls.push(data.fileUrl);
                    } else {
                        throw new Error(
                            `Error al subir la imagen ${i + 1}: ${errorFetch?.message || 'Desconocido'}`
                        );
                    }
                } catch (error) {
                    console.error('Error en la subida de la imagen:', error);
                    errors.push({ index: i, error: error.message || error });
                }
            })
        );
        if (errors.length > 0) {
            showAlert(`Hubo errores al subir ${errors.length} imagen(es). Verifique e intente nuevamente.`);
            console.log('Errores de imágenes:', errors);
        }

        console.log('URLs de las imágenes subidas:', uploadedUrls);
        return uploadedUrls;
    };


    const renameImage = (image, newName) => {
        return new File([image], newName, { type: image.type });
    };

    // Función genérica para mostrar alertas según la plataforma
    const showAlert = (message) => {
        if (Platform.OS === 'web') {
            // Alerta para la web
            window.alert(message);
        } else {
            // Alerta nativa para Android/iOS
            Alert.alert("", message, [{ text: "OK" }]);
        }
    };


    const saveForm = async () => {
        if (form.isEdit) {
            if (form.observations.trim() === '') {
                showAlert('Favor de completar la descripción');
                return;
            }

            const rq = { id: form.id, observations: form.observations };
            const { data, errorFetch } = await getDataFetch('/api/inventory', 'PUT', { rq });

            if (data) {
                handleCancel();
            } else if (errorFetch) {
                showAlert(errorFetch.msg || errorFetch.message);
            }
        } else {
            let urlSaved = urls || null;

            // Subir imágenes si no hay URLs guardadas
            if (!urlSaved) {
                urlSaved = await saveImages();
                if (urlSaved.length === 0) {
                    //showAlert('Por favor, cargue al menos una imagen para continuar.');
                    showAlert('Por favor, cargue las 4 imágenes requeridas para continuar con el inventario del vehículo.');
                    return;
                }
                dispatch(setUrls(urlSaved));
            }

            const vehiculos = await dropdwonPlacas();
            if (!vehiculos || vehiculos.length === 0) {
                showAlert('No se pudo obtener la lista de vehículos');
                return;
            }

            const rq = transformFormToRequest(form, urlSaved, vehiculos);
            if (rq.missingFields && rq.missingFields.length > 0) {
                showAlert('Favor de completar todos los campos');
                return;
            }
            //console.log('Body del request:', rq.requestObject);
            const { data, errorFetch } = await getDataFetch('/api/saveInventory', 'POST', { rq: rq.requestObject });//{ rq: rq.requestObject }
            if (errorFetch) {
                console.error('Error en la respuesta:', errorFetch);
            }
            if (data) {
                console.log("Respuesta", data)
                showAlert('Vehiculo registrado exitosamente.');
                dispatch(setUrls(null));
                await reloadData();
                handleCancel();
            } else if (errorFetch) {
                showAlert(errorFetch.msg || errorFetch.message);
            }
        }
    };

    const transformFormToRequest = (formObject, urls, vehiculosList) => {
        const missingFields = [];
        console.log("formObject", formObject);

        const vehiculoSeleccionado = vehiculosList.find(
            vehiculo => vehiculo.plate === formObject.placa
        );

        const entradaVehiculoId = vehiculoSeleccionado?.vehicleId || null;

        const requestObject = {
            placa: formObject.placa || missingFields.push('placa'),
            parqueaderoId: parqueaderoId,
            vehiculo: formObject.vehiculo || missingFields.push('vehiculo'),
            tipoVehiculo: formObject.vehiculo === 'Carro' ? 1 : formObject.vehiculo === 'Moto' ? 2 : 0,
            estado: "1",
            turnoId: turnoIdEntry,
            entradaVehiculoId,
            detalles: {
                frente: formObject.frente || missingFields.push('detalles.frente'),
                derecha: formObject.lateralDerecho || missingFields.push('detalles.derecha'),
                atras: formObject.posterior || missingFields.push('detalles.atras'),
                izquierda: formObject.lateralIzquierdo || missingFields.push('detalles.izquierda'),
            },
            fotos: urls,
            partes: {
                lucesDeFreno: formObject.farolasStop || missingFields.push('partes.lucesDeFreno'),
                parteFrontal: formObject.frontal || missingFields.push('partes.parteFrontal'),
                emblema: formObject.emblema || missingFields.push('partes.emblema'),
                cauchosLaterales: formObject.cauchosLaterales || missingFields.push('partes.cauchosLaterales'),
                copas: formObject.copas || missingFields.push('partes.copas'),
                chapas: formObject.chapas || missingFields.push('partes.chapas'),
            },
            accesorios: {
                espejos: formObject.espejos || missingFields.push('accesorios.espejos'),
                tapaLlantas: formObject.tapaLlantas || missingFields.push('accesorios.tapaLlantas'),
                llantasRepuesto: formObject.llantaRepuesto || missingFields.push('accesorios.llantasRepuesto'),
                radio: formObject.radio || missingFields.push('accesorios.radio'),
                antena: formObject.antena || missingFields.push('accesorios.antena'),
                tapaGasolina: formObject.tapaGasolina || missingFields.push('accesorios.tapaGasolina'),
                limpiaBrisas: formObject.limpiaBrisas || missingFields.push('accesorios.limpiaBrisas'),
                tieneBaul: formObject.bahul || missingFields.push('accesorios.tieneBaul'),
            },
            observaciones: formObject.observaciones || "",
        };

        console.log("missingFields", missingFields);

        return {
            requestObject,
            missingFields: missingFields.length > 0 ? missingFields : null,
        };
    };


    const transformElementToForm = (requestObject) => {
        // Función para capitalizar la primera letra
        const capitalize = (value) =>
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        // Función para mapear el valor de "vehicle"
        const mapVehicle = (value) => {
            if (value === "Car") return "Carro";
            if (value === "Bike") return "Moto";
            return value;
        };

        // Transformar el objeto
        const formObject = {
            id: requestObject._id,
            plate: requestObject.plate,
            vehicle: mapVehicle(requestObject.vehicle),
            bodywork: capitalize(requestObject.parts.bodywork),
            mirrors: capitalize(requestObject.accessories.mirrors),
            brakeLights: capitalize(requestObject.parts.brakeLights),
            spareWheels: capitalize(requestObject.accessories.spareWheels),
            hubcaps: capitalize(requestObject.parts.hubcaps),
            radio: capitalize(requestObject.accessories.radio),
            frontPart: capitalize(requestObject.parts.frontPart),
            antenna: capitalize(requestObject.accessories.antenna),
            emblem: capitalize(requestObject.parts.emblem),
            gasCap: capitalize(requestObject.accessories.gasCap),
            sideRubbers: capitalize(requestObject.parts.sideRubbers),
            windshieldWipers: capitalize(requestObject.accessories.windshieldWipers),
            hasTrunk: capitalize(requestObject.accessories.hasTrunk),
            wheelCovers: capitalize(requestObject.parts.wheelCovers),
            front: capitalize(requestObject.details.front),
            back: capitalize(requestObject.details.back),
            right: capitalize(requestObject.details.right),
            left: capitalize(requestObject.details.left),
            observations: requestObject.observations,
            images: requestObject.photos
        };
        //console.log(formObject);
        return formObject;
    };

    const onEdit = (element) => {
        const form = transformElementToForm(element);
        dispatch(setFullFormToEdit(form));
        dispatch(changeFlagBy({ name: 'showTable', value: false }));
        dispatch(changeFlagBy({ name: 'showAddVehicule', value: true }));
    }

    const onView = async (element) => {
        const form = transformElementToForm(element);

        if (form.images) {
            const imageUris = await Promise.all(
                form.images.map(async (imagePath) => {
                    const rs = await descargaFoto(imagePath);
                    if (rs) {
                        const { response } = rs;
                        if (response && response.ok) {
                            const blob = await response.blob();
                            return URL.createObjectURL(blob); // Crear URL local
                        }
                        return null; // Si hay un error, devuelve null
                    }

                })
            );

            // Filtrar imágenes válidas
            const validImageUris = imageUris.filter((uri) => uri !== null);

            // Actualiza el estado con las URLs locales de las imágenes
            dispatch(setFullFormToView({ ...form, images: validImageUris }));
        } else {
            dispatch(setFullFormToView(form));
        }

        dispatch(changeFlagBy({ name: 'showTable', value: false }));
        dispatch(changeFlagBy({ name: 'showAddVehicule', value: true }));
    };

    const transformToBikeForm = (bikeData) => {
        const capitalize = (value) =>
            value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";
        //console.log("bikeData", bikeData)
        return {
            id: bikeData.id,
            plate: bikeData.placa || "",
            vehicle: "Bici",
            brand: bikeData.marca || "",  // Ej: "benotto" → coincide con dataBrand
            bikeType: bikeData.modelo || "", // Ej: "tipo_b" → coincide con dataBicleType
            frame: capitalize(bikeData.marco) || "",
            seat: capitalize(bikeData.sillin) || "",
            brakes: capitalize(bikeData.frenos) || "",
            paint: capitalize(bikeData.pintura) || "",
            wheels: capitalize(bikeData.ruedas) || "",
            observations: bikeData.observaciones || "",
            bikePhoto: bikeData.img1 || null,
            isEdit: false,
            isView: false,
        };
    };

    const handleViewBike = async (id) => {
        try {
            const { data, errorFetch } = await getDataFetch(
                `/api/inventory/bikeDet/${id}`,
                "GET"
            );
            if (errorFetch) throw new Error(errorFetch?.message || "Error al obtener bicicleta");
            if (data?.bike) {
                console.log("data", data)
                const transformed = transformToBikeForm(data.bike);
                transformed.isView = true; // Modo solo lectura
                dispatch(setFullFormToView(transformed));
                // Cambia flags para mostrar AddBikeScreen
                dispatch(changeFlagBy({ name: "showTable", value: false }));
                dispatch(changeFlagBy({ name: "showAddBici", value: true }));
            }
        } catch (error) {
            showAlert(error.message);
        }
    };

    // Función para editar una bici (modo edición)
    const handleEditBike = async (id) => {
        try {
            const { data, errorFetch } = await getDataFetch(
                `/api/inventory/bikeDet/${id}`,
                "GET"
            );
            if (errorFetch) throw new Error(errorFetch?.message || "Error al obtener bicicleta");
            if (data?.bike) {
                console.log("data", data)
                const transformed = transformToBikeForm(data.bike);
                transformed.isEdit = true; // Modo edición
                dispatch(setFullFormToEdit(transformed));
                // Cambia flags para mostrar AddBikeScreen
                dispatch(changeFlagBy({ name: "showTable", value: false }));
                dispatch(changeFlagBy({ name: "showAddBici", value: true }));
            }
        } catch (error) {
            showAlert(error.message);
        }
    };
    const descargaFoto = async (uri) => {
        if (uri) {
            const rs = await getDataFileFetch(`/api/s3Download?key="${uri}"`, 'GET', {});
            //console.log(rs);
            return rs;
        }

    }

    const dropdwonPlacas = async () => {
        try {
            const url = `/api/vehiclesEntry/active/${turnoIdEntry}`;
            console.log("url lista placas", url)
            const { data, errorFetch } = await getDataFetch(
                url,
                "GET"
            );
            if (errorFetch) throw new Error(errorFetch?.message || "Error al obtener lista de placas");
            /*if (data?.data) {
                console.log("data", data?.data)
                return data?.data
            }*/

            if (data?.data) {
                const vehiculosFiltrados = data.data.filter(vehiculo => vehiculo.inventory === 0);
                console.log("vehículos filtrados", vehiculosFiltrados);
                return vehiculosFiltrados;
            }
        } catch (error) {
            showAlert(error.message);
        }
    }

    const reloadData = async () => {
        try {
            const { data: dv, errorFetch } = await fetchVehicles(
                `/api/inventory/0/turn/${turnoIdEntry}`,
                "GET"
            );

            if (errorFetch || !dv?.inventory) {
                dispatch(setDataList([]));
            } else {
                const veh = dv.inventory.filter(
                    i => i.estadoVehiculo === 1
                );
                dispatch(setDataList(veh));
            }
        } catch (e) {
            console.warn(e);
            dispatch(setDataList([])); // 🔥 limpia aunque falle
        }

        try {
            const { data: db, errorFetch } = await fetchBicycles(
                `/api/inventory/1/turn/${turnoIdEntry}`,
                "GET"
            );

            if (errorFetch || !db?.bicis) {
                dispatch(setDataListBicycle([]));
            } else {
                const bicis = db.bicis.filter(
                    i => i.estadoVehiculo === 1
                );
                dispatch(setDataListBicycle(bicis));
            }
        } catch (e) {
            console.warn(e);
            dispatch(setDataListBicycle([]));
        }
    };


    return {
        functions: {
            handleShowAddBici,
            handleShowAdd,
            handleCancel,
            handleSearch,
            handleSetSelectedView,
            handleSave,
            handleViewVehicle,
            handleEditVehicle,
            updateVehicle,
            onEdit,
            onView,
            handleViewBike,
            handleEditBike,
            getDataFetch,
            dropdwonPlacas,
            reloadData
        },
        states: {
            dataSet,
            searchValue,
            dataSetBicycle,
            selectedView,
            form,
            loadingFiles,
            turnoIdEntry
        }
    }
}

export default useInventoryHook;