const compiler = require("vue/compiler-sfc");
const VueLoaderPlugin = require("./plugin");

function loader(source) {
  /**
   * loader 函数执行时的 this
   * https://webpack.docschina.org/api/loaders/#the-loader-context
   * @type {import('webpack').LoaderContext<any>}
   */
  const loaderContext = this;
  const { resourcePath, resourceQuery } = loaderContext;

  const rawQuery = resourceQuery.slice(1);
  const incomingQuery = new URLSearchParams(rawQuery);
  const { descriptor } = compiler.parse(source);
  const code = [];

  if (incomingQuery.get("type")) {
    if (incomingQuery.get("type") === "script") {
      const scriptBlok = compiler.compileScript(descriptor, { id: '1' });
      loaderContext.callback(null, scriptBlok.content);
    }
    return;
  }

  const { script } = descriptor;
  if (script) {
    const query = "?vue&type=script";
    /**
     * 获取相对路径，用于 require / import
     * contextify('/home/a/b', 'home/a/b/c')  => ./c
     */
    const stringifyRequest = JSON.stringify(
      loaderContext.utils.contextify(
        loaderContext.context,
        resourcePath + query
      )
    );
    code.push(`import script from ${stringifyRequest}`);
    code.push("export default script");
  }
  return code.join("\n");
}

function select() {}

module.exports = loader;
loader.VueLoaderPlugin = VueLoaderPlugin;
