/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  dependencies: {
    "react-native-video": {
      platforms: {
        android: {
          sourceDir: "./node_modules/react-native-video/android-exoplayer",
        },
      },
    },
  },
};
