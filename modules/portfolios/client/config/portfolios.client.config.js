(function () {
  'use strict';

  angular
    .module('portfolios')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Portfolio',
      state: 'portfolios.list',
      type: 'button',
      roles: ['*']
    });


    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'portfolios', {
      title: 'Create Portfolio',
      state: 'portfolios.create',
      roles: ['user']
    });
  }
}());
