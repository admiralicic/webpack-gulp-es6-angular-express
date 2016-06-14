// Entry point for the unit tests bundle for the frontend that will be generated by webpack
// and then executed through Karma.

// Explicitely import vendors modules (as they are put in a separate bundle when not in test mode)
import angular from 'angular';
import angularmocks from 'angular-mocks';
import registerAngularModule from 'registerAngularModule';
import jquery from 'jquery';
import lodash from 'lodash';
import 'bootstrap-webpack!./src/website/bootstrap.config.js';

// Import unit tests files (found in __tests__ folders and suffixed by -test.js)
var testsContext = require.context('./src/website', true, /-test\.js$/);
testsContext.keys().forEach(testsContext);

// Import all project source files except the unit tests ones for code coverage purpose
var srcContext = require.context('./src/website', true, /^((?!__tests__).)*\.js$/);
srcContext.keys().forEach(srcContext);