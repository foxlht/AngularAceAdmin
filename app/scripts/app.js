'use strict';

/**
 * @ngdoc overview
 * @name angularAceAdminApp
 * @description
 * # angularAceAdminApp
 *
 * Main module of the application.
 */
angular
  .module('angularAceAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$compileProvider',
    function ($stateProvider, $urlRouterProvider, $compileProvider) {
      // angular默认的安全协议为 https?|ftp|mailto , 在这里重新配置加入javascript (用于创建导航时下拉菜单时使用)
      // The angular default security protocol is : https?|ftp|mailto
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);

      // 当页面路由没有定义时, 将页面跳转到登录页面
      // Redirect Url when route does not define in here
      $urlRouterProvider.otherwise('/login');

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/frame/login.html',
          controller: 'LoginCtrl'
        })
        .state('main', {
          url: '/main',
          templateUrl: 'views/frame/main.html',
          controller: 'MainCtrl',
          resolve: {
            navDataList: [
              'NavigationServices',
              '$q',
              function (NavigationServices, $q) {
                var defer = $q.defer();
                NavigationServices.getNavigationData().then(function (data) {
                  defer.resolve(data);
                });
                return defer.promise;
              }
            ]
          }
        });
    }
  ]);
