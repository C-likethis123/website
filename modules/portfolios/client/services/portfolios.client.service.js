// Portfolios service used to communicate Portfolios REST endpoints
(function () {
  'use strict';

  angular
    .module('portfolios')
    .factory('PortfoliosService', PortfoliosService);

  PortfoliosService.$inject = ['$resource'];

  function PortfoliosService($resource) {
    return $resource('api/portfolios/:portfolioId', {
      portfolioId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
