import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QRCodeScanner = ({ visible, onClose, onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false); // Estado para activar/desactivar la cámara

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    if (visible) {
      setIsCameraActive(true); // Activa la cámara cuando se abre el modal
    } else {
      setIsCameraActive(false); // Desactiva la cámara cuando se cierra el modal
    }
  }, [visible]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Se requiere permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {isCameraActive && ( // Solo renderiza la cámara si está activa
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: [
                "qr",
                "code128",
                "code39",
                "code93",
                "ean13",
                "ean8",
                "upc_a",
                "upc_e",
                "pdf417",
                "aztec",
                "datamatrix"
              ]
            }}
            onBarcodeScanned={scanned ? undefined : ({ data }) => {
              setScanned(true);
              onScan(data);
              setIsCameraActive(false); // Apaga la cámara inmediatamente después de escanear
              onClose();
            }}
          />
        )}

        <TouchableOpacity style={styles.closeButton} onPress={() => {
          setIsCameraActive(false); // Desactiva la cámara antes de cerrar
          onClose();
        }}>
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#000" },
  message: { textAlign: "center", paddingBottom: 10, color: "white" },
  camera: { flex: 1 },
  closeButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeText: { color: "white", fontWeight: "bold" },
  permissionButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  permissionText: { color: "white", fontWeight: "bold" },
});

export default QRCodeScanner;
