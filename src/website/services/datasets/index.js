class DatasetsService {

  constructor($http, $q) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
  }

  getAllNumericData(dataType) {
    return this.$http.get('datasets/' + dataType + '/stats').then(response => {
      let numericProps = _.keys(_.pickBy(response.data.propertiesTypes, (v, k) => v === 'number'));
      return this.$http.get('datasets/' + dataType).then(response => {
        return _.map(response.data, d => _.pick(d, numericProps));
      });
    });
  }

  getRandomNumericData(dataType, nbData) {
    return this.$http.get('datasets/' + dataType + '/stats').then(response => {
      let totalNbData = response.data.count;
      let requests = [];
      let fetchedIds = [];
      for (let i = 0; i < nbData; ++i) {
        let id = ((Math.random() * totalNbData) | 0);
        if (!_.includes(fetchedIds, id)) {
          requests.push(this.$http.get('datasets/' + dataType + '/' + id));
          fetchedIds.push(id);
        } else {
          --i;
        }
      }
      let numericProps = _.keys(_.pickBy(response.data.propertiesTypes, (v, k) => v === 'number'));
      let labelProp = _.keys(_.pickBy(response.data.propertiesTypes, (v, k) => v === 'string'))[0];
      return this.$q.all(requests).then((values) => {
        return {
          dataStats: response.data.numericalPropertiesStats,
          dataLabels: _.map(values, v => v.data[labelProp]),
          data: _.map(values, v => _.pick(v.data, numericProps))
        };
      });
    });
  }

}

export default {
  serviceName: 'datasetsSrv',
  serviceClass: DatasetsService
};