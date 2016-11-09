function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var reqContext = require.context("./", true, /^.*\/index\.js$/);

var components = requireAll(reqContext);

var componentsName = _.map(components, (c) => c.default.name);

let componentsModule = angular.module('app.components', componentsName);

export default {
  module: componentsModule,
  componentsList: components
};