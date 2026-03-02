import { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

interface CameraScannerProps {
  onDataDetected: (data: string, type: string) => void;
  isPaused?: boolean;
}

export function CameraScanner({ onDataDetected, isPaused = false }: CameraScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const isProcessing = useRef(false);

  if (!permission) {
    return <View className="flex-1 bg-surface" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-surface justify-center items-center px-8">
        <Text className="text-white text-xl font-bold text-center mb-4">
          Acceso a cámara requerido
        </Text>
        <Text className="text-muted text-center mb-8">
          Necesitamos acceso a tu cámara para escanear códigos QR
        </Text>
        <TouchableOpacity
          className="bg-accent px-8 py-4 rounded-2xl"
          onPress={requestPermission}
        >
          <Text className="text-surface font-bold">Dar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ type, data }: { type: string; data: string }) => {
    if (isPaused || isProcessing.current) return;
    isProcessing.current = true;
    onDataDetected(data, type);
    setTimeout(() => {
      isProcessing.current = false;
    }, 1500);
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      barcodeScannerSettings={{       // ← prop correcta
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={isPaused ? undefined : handleScan}
    />
  );
}