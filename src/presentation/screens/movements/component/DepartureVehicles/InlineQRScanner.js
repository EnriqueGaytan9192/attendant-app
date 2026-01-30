import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const InlineQRScanner = ({ onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isActive, setIsActive] = useState(false); // <- controla si la cámara está activa
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Se requiere permiso de cámara</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ data }) => {
    setScanned(true);
    setIsActive(false); // <- desactiva la cámara
    onScan(data);
    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <View style={styles.scannerContainer}>
      {isActive ? (
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "code128", "code39", "pdf417"],
          }}
          onBarcodeScanned={scanned ? undefined : handleScan}
        />
      ) : (
        <TouchableOpacity
          style={styles.inactiveOverlay}
          onPress={() => setIsActive(true)}
        >
          <Text style={styles.tapText}>Toca para activar escáner</Text>
        </TouchableOpacity>
      )}

      {/* Bordes decorativos */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  scannerContainer: {
    width: 250,
    height: 200,
    backgroundColor: "#F4F2F2",
    position: "relative",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 25,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  inactiveOverlay: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  tapText: {
    color: "#005A6D",
    fontWeight: "bold",
  },
  corner: {
    width: 50,
    height: 50,
    borderColor: "#005F6B",
    borderWidth: 3,
    position: "absolute",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  permissionContainer: {
    alignItems: "center",
    padding: 10,
  },
  permissionText: {
    color: "#000",
    marginBottom: 10,
  },
  permissionButton: {
    backgroundColor: "#005F6B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InlineQRScanner;
