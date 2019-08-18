(function () {
  'use strict';

  // Portfolios controller
  angular
    .module('portfolios')
    .controller('PortfoliosController', PortfoliosController);

  PortfoliosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'portfolioResolve'];

  function PortfoliosController ($scope, $state, $window, Authentication, portfolio) {
    var vm = this;

    vm.authentication = Authentication;
    vm.portfolio = portfolio;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Portfolio
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.portfolio.$remove($state.go('portfolios.list'));
      }
    }

    // Save Portfolio
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.portfolioForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.portfolio._id) {
        vm.portfolio.$update(successCallback, errorCallback);
      } else {
        vm.portfolio.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('portfolios.view', {
          portfolioId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
