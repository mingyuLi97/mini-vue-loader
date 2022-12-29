exports.stringifyRequest = function (loaderContext, resource) {
  return JSON.stringify(
    loaderContext.utils.contextify(loaderContext.context, resource)
  );
};
