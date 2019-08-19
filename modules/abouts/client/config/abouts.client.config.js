(function () {
  'use strict';

  angular
    .module('abouts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'About',
      state: 'abouts.list',
      type: 'button',
      roles: ['*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'abouts', {
      title: 'Create About',
      state: 'abouts.create',
      roles: ['user']
    });
  }
}());
