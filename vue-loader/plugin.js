class VueLoaderPlugin {
  /**
   *
   * @param {import('webpack').Compiler} complier
   */
  apply(complier) {
    const rules = complier.options.module.rules;
    /**
     * @type {import('webpack').RuleSetRule}
     */
    const pitcher = {
      loader: require.resolve("./pitcher"),
      resourceQuery: (query) => {
        let parsed = new URLSearchParams(query.slice(1));
        // 匹配所有 query 中包含 ?vue
        return parsed.get("vue") !== null;
      },
    };

    complier.options.module.rules = [pitcher, ...rules];
  }
}

module.exports = VueLoaderPlugin;
