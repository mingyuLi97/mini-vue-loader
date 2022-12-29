const pitcher = (code) => code;
const isNotPitcher = (loader) => loader.path !== __filename;
const pitch = function () {
  /**
   * loader 函数执行时的 this
   * @type {import('webpack').LoaderContext<any>}
   */
  const loaderContext = this;
  // 过滤掉自己
  const loaders = loaderContext.loaders.filter(isNotPitcher);
  // query = vue&type=script
  const query = new URLSearchParams(loaderContext.resourceQuery.slice(1));
  return genProxyModule(loaders, loaderContext);
};

function genProxyModule(loaders, loaderContext) {
  const request = genRequest(loaders, loaderContext);
  return `export { default } from ${request}`;
}

/**
 * @description:
 * @param {*} loaders
 * @param {import('webpack').LoaderContext<any>} loaderContext
 * @return {*}
 */
function genRequest(loaders, loaderContext) {
  // loader.request 是 loader 文件的绝对路径 [/Users/limingyu/WebProjects/mini-vue-loader/vue-loader/index.js]
  const loaderStrings = loaders.map((loader) => loader.request);
  // 要加载资源的绝对路径 /Users/limingyu/WebProjects/mini-vue-loader/src/App.vue?vue&type=script
  const resource = loaderContext.resourcePath + loaderContext.resourceQuery;
  return JSON.stringify(
    loaderContext.utils.contextify(
      loaderContext.context,
      `-!` + [...loaderStrings, resource].join("!")
    )
  );
}

pitcher.pitch = pitch;

module.exports = pitcher;
