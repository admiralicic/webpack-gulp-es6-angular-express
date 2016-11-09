import app from '../app';
import {mockCarsDatasetApi} from 'tests_utils/mock_rest_api';

describe('app', function () {

  var element, controller;

  beforeEach(function () {
    angular.mock.module('app');
  });

  describe('app controller and directive', function () {

    beforeEach(angular.mock.inject(function ($rootScope, $componentController, $compile, $httpBackend) {
      mockCarsDatasetApi($httpBackend);
      var scope = $rootScope.$new();
      element = $compile('<app></app>')(scope);
      scope.$apply();
      controller = element.controller('app');
    }));

    it('should have a datasets list defined with at least one dataset', function () {
      expect(controller.datasets).toBeDefined();
      expect(controller.datasets.length).toBeGreaterThan(0);
    });

    it('should create as many entries in the navbar as the number of registered datasets', function() {
      expect($(element).find('.dataset-link').length).toEqual(controller.datasets.length);
    });

  });

});
