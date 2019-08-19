(function () {
  'use strict';

  angular
    .module('posts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Blog Posts',
      state: 'posts.list',
      type: 'button',
      roles: ['*']
    });
    
    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'posts', {
      title: 'Create Post',
      state: 'posts.create',
      roles: ['user']
    });
  }
}());
