export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find the require statement for 'terser-webpack-plugin'
  root.find(j.VariableDeclarator, {
    init: {
      callee: { name: 'require' },
      arguments: [{ value: 'terser-webpack-plugin' }]
    }
  }).forEach(path => {
    // Replace the require statement with '@rspack/core'
    path.get('init', 'arguments', 0).replace(j.literal('@rspack/core'));
    // Rename the variable to 'rspack'
    path.get('id').replace(j.identifier('rspack'));
    dirtyFlag = true;
  });

  // Replace new TerserPlugin with new rspack.SwcJsMinimizerRspackPlugin
  root.find(j.NewExpression, {
    callee: { name: 'TerserPlugin' }
  }).forEach(path => {
    path.get('callee').replace(
      j.memberExpression(
        j.identifier('rspack'),
        j.identifier('SwcJsMinimizerRspackPlugin')
      )
    );
    dirtyFlag = true;
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";