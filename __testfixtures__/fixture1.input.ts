//chnage the import statement to const rspack = require('@rspack/core');
//track the variable assigned
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    //change to rspack.SwcJsMinimizerRspackPlugin(options)
    minimizer: [new TerserPlugin(options)],
  },
};