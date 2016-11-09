export var carsSamples = [{
  "acceleration": 8.5,
  "cylinders": 8,
  "displacement": 440,
  "horsepower": 215,
  "id": 7,
  "model": 70,
  "mpg": 14,
  "weight": 4312
}, {
  "acceleration": 10,
  "cylinders": 8,
  "displacement": 455,
  "horsepower": 225,
  "id": 8,
  "model": 70,
  "mpg": 14,
  "weight": 4425
}, {
  "acceleration": 8.5,
  "cylinders": 8,
  "displacement": 390,
  "horsepower": 190,
  "id": 9,
  "model": 70,
  "mpg": 15,
  "weight": 3850
}, {
  "acceleration": 17.5,
  "cylinders": 4,
  "displacement": 133,
  "horsepower": 115,
  "id": 10,
  "model": 70,
  "mpg": 0,
  "weight": 3090
}];

export var carsSamplesStats = {
  "count": 4,
  "propertiesTypes": {
    "acceleration": "number",
    "car": "string",
    "cylinders": "number",
    "displacement": "number",
    "horsepower": "number",
    "id": "number",
    "model": "number",
    "mpg": "number",
    "origin": "string",
    "weight": "number"
  },
  "numericalPropertiesStats": {
    "acceleration": {
      "min": 8.5,
      "max": 17.5,
      "sum": 44.5,
      "avg": 11.125,
      "sigma": 3.7312028891498
    },
    "cylinders": {
      "min": 4,
      "max": 8,
      "sum": 28,
      "avg": 7,
      "sigma": 1.7320508075689
    },
    "displacement": {
      "min": 133,
      "max": 455,
      "sum": 1418,
      "avg": 354.5,
      "sigma": 130.12782177536
    },
    "horsepower": {
      "min": 115,
      "max": 225,
      "sum": 745,
      "avg": 186.25,
      "sigma": 43.066082942381
    },
    "id": {
      "min": 7,
      "max": 10,
      "sum": 34,
      "avg": 8.5,
      "sigma": 1.1180339887499
    },
    "model": {
      "min": 70,
      "max": 70,
      "sum": 280,
      "avg": 70,
      "sigma": 0
    },
    "mpg": {
      "min": 0,
      "max": 15,
      "sum": 43,
      "avg": 10.75,
      "sigma": 6.2199276523124
    },
    "weight": {
      "min": 3090,
      "max": 4425,
      "sum": 15677,
      "avg": 3919.25,
      "sigma": 524.99684522862
    }
  }
};

export function mockCarsDatasetApi(httpBackend) {
  httpBackend.whenGET('datasets/cars').respond(carsSamples);
  httpBackend.whenGET('datasets/cars/stats').respond(carsSamplesStats);
  httpBackend.whenGET(new RegExp('datasets\\/cars\\/[0-9]+')).respond(function(method, url) {
    var regexp = new RegExp('datasets\\/cars\\/([0-9]+)');
    var carId = parseInt(url.match(regexp)[1]);
    if (carId < carsSamples.length) {
      return [200, carsSamples[carId]];
    } else {
      return [404];
    }
  });
};