(function () {
  'use strict';

  angular
    .module('portfolios')
    .controller('PortfoliosListController', PortfoliosListController);

  PortfoliosListController.$inject = ['PortfoliosService'];

  function PortfoliosListController(PortfoliosService) {
    var vm = this;

    vm.portfolios = PortfoliosService.query();
  }
}());
