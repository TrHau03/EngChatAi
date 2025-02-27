const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")
const sourceExts = require("metro-config/src/defaults/defaults").sourceExts
const assetExts = require("metro-config/src/defaults/defaults").assetExts
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const config = {
    transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
    },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
