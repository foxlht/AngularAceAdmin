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
    function ($http, $q) {
      var defer = $q.defer();

      // 获得导航数据
      var getNavigationData = function () {
        $http({
          method: 'GET',
          url: 'json/navigation.json'
        })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(data);
          });
        return defer.promise;
      };


      return {
        getNavigationData: getNavigationData
      }
    }
  ]);
