// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('./metro.transformer.js');

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
