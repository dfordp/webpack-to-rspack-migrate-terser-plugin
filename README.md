Change import and usage of  from TerserPlugin  to use included rspack.SwcJsMinimizerRspackPlugin.
### Before

```ts
//chnage the import statement to const rspack = require('@rspack/core');
//track the variable assigned
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    //change to rspack.SwcJsMinimizerRspackPlugin(options)
    minimizer: [new TerserPlugin(options)],
  },
};
```

### After

```ts
const rspack = require('@rspack/core');
module.exports = {
  // ...
  optimization: {
    minimizer: [new rspack.SwcJsMinimizerRspackPlugin(options)],
  },
};
```

