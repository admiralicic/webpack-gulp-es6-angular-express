import services from '../services';
import {
  carsSamples,
  mockCarsDatasetApi
} from 'tests_utils/mock_rest_api';

describe('cars dataset service', function() {

  var httpBackend, datasetsSrv;

  beforeEach(function() {
    angular.mock.module('app.services');
  });

  beforeEach(angular.mock.inject(function($httpBackend, _datasetsSrv_) {
    httpBackend = $httpBackend;
    datasetsSrv = _datasetsSrv_;
    mockCarsDatasetApi(httpBackend);
  }));

  it('should fetch the whole cars dataset', function(done) {
    datasetsSrv.getAllNumericData('cars').then(function(cars) {
      expect(cars).toEqual(carsSamples);
      done();
    });
    httpBackend.flush();
  });

  it('should fetch two random cars data', function(done) {
    datasetsSrv.getRandomNumericData('cars', 2).then(function(carsData) {
      expect(carsData.data.length).toEqual(2);
      done();
    });
    httpBackend.flush();
  });

});