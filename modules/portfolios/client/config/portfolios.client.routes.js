(function () {
  'use strict';

  angular
    .module('portfolios')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('portfolios', {
        abstract: true,
        url: '/portfolio',
        template: '<ui-view/>'
      })
      .state('portfolios.list', {
        url: '',
        templateUrl: 'modules/portfolios/client/views/list-portfolios.client.view.html',
        controller: 'PortfoliosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Portfolios List'
        }
      })
      .state('portfolios.create', {
        url: '/create',
        templateUrl: 'modules/portfolios/client/views/form-portfolio.client.view.html',
        controller: 'PortfoliosController',
        controllerAs: 'vm',
        resolve: {
          portfolioResolve: newPortfolio
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Portfolios Create'
        }
      })
      .state('portfolios.edit', {
        url: '/:portfolioId/edit',
        templateUrl: 'modules/portfolios/client/views/form-portfolio.client.view.html',
        controller: 'PortfoliosController',
        controllerAs: 'vm',
        resolve: {
          portfolioResolve: getPortfolio
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Portfolio {{ portfolioResolve.name }}'
        }
      })
      .state('portfolios.view', {
        url: '/:portfolioId',
        templateUrl: 'modules/portfolios/client/views/view-portfolio.client.view.html',
        controller: 'PortfoliosController',
        controllerAs: 'vm',
        resolve: {
          portfolioResolve: getPortfolio
        },
        data: {
          pageTitle: 'Portfolio {{ portfolioResolve.name }}'
        }
      });
  }

  getPortfolio.$inject = ['$stateParams', 'PortfoliosService'];

  function getPortfolio($stateParams, PortfoliosService) {
    return PortfoliosService.get({
      portfolioId: $stateParams.portfolioId
    }).$promise;
  }

  newPortfolio.$inject = ['PortfoliosService'];

  function newPortfolio(PortfoliosService) {
    return new PortfoliosService();
  }
}());
