import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(app)/scanner");
    } catch {
      Alert.alert("Error", "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-surface justify-center px-8">
      <Text className="text-white text-4xl font-bold mb-2">Bienvenido</Text>
      <Text className="text-muted text-base mb-10">Inicia sesión para continuar</Text>

      <TextInput
        className="bg-card border border-border rounded-2xl px-4 py-4 text-white mb-4"
        placeholder="Email"
        placeholderTextColor="#6B6B6B"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="bg-card border border-border rounded-2xl px-4 py-4 text-white mb-6"
        placeholder="Contraseña"
        placeholderTextColor="#6B6B6B"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-accent rounded-2xl py-4 items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-surface font-bold text-base">
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-6 items-center" onPress={() => router.push("/(auth)/register")}>
        <Text className="text-muted">¿No tienes cuenta? <Text className="text-accent">Regístrate</Text></Text>
      </TouchableOpacity>
    </View>
  );
}