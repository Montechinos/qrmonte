const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Necesario para Firebase modular
config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs"];
config.resolver.unstable_enablePackageExports = false; // ← clave para Firebase

module.exports = withNativeWind(config, { input: "./global.css" });