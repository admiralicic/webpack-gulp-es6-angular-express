import express from 'express';
import cars from './cars.json';
import cameras from './cameras.json';

let data = {};
data.cars = cars;
data.cameras = cameras;

let router = express.Router();

_.each(['cars', 'cameras'], (dataType) => {

  router.get('/' + dataType, function(req, res, next) {
    if (req.query) {
      let dataFiltered = _.filter(data[dataType], req.query);
      res.json(dataFiltered);
    } else {
      res.json(data[dataType]);
    }
  });

  function propertiesTypes(obj) {
    return _.mapValues(obj, v => typeof v);
  }

  router.get('/' + dataType + '/stats', function(req, res, next) {
    let propTypes = propertiesTypes(data[dataType][0]);
    let numericProps = _.pickBy(propTypes, (v, k) => v === 'number');
    let stats = {
      'count': data[dataType].length,
      'propertiesTypes': propertiesTypes(data[dataType][0]),
      'numericalPropertiesStats': {}
    };
    _.forEach(numericProps, (v, k) => {
      let values = _.map(data[dataType], d => d[k]);
      stats.numericalPropertiesStats[k] = {
        'min': _.min(values),
        'max': _.max(values),
        'sum': _.sum(values),
        'avg': _math().mean(values),
        'sigma': _math().sigma(values)
      };
    });
    res.json(stats);
  });

  router.get('/' + dataType + '/:id', function(req, res, next) {
    let d = _.find(data[dataType], (d) => {
      return d.id === parseInt(req.params.id);
    });
    if (d) {
      res.json(d);
    } else {
      res.statusCode = 404;
      res.send('Error 404: No data with id ' + req.params.id + ' found');
    }
  });

});

export default router;