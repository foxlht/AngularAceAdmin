'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.NavigationServices
 * @description
 * # NavigationServices
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
  .factory('NavigationServices', [
    '$http',
    '$q',
    'CommonService',
    function ($http, $q, CommonService) {

      // 获得导航数据
      var getNavigationData = function () {
        var defer = $q.defer();
        return CommonService.requestDataFromServerWithLoading(defer, null, 'json/navigation.json');
      };


      return {
        getNavigationData: getNavigationData
      }
    }
  ]);
