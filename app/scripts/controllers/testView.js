'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:TestViewCtrl
 * @description
 * # TestViewCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('TestViewCtrl', [
    '$scope',
    '$q',
    '$timeout',
    'CommonService',
    function ($scope, $q, $timeout, CommonService) {

      $scope.modalViewConfig = {
        title: '模态框测试',
        show: false
      };

      $scope.showModal = function () {
        CommonService.messageModal().show('测试消息模态框', function () {
          console.log('测试消息模态框')
        });
      };

      $scope.treeList = [];
      $scope.idArray = [];

      function getTreeList() {
        var defer = $q.defer();
        CommonService.requestDataFromServerWithLoading(defer, null, 'json/permissionTree.json').then(function (data) {
          $scope.treeList = data;
        });
      }

      getTreeList();

      $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 50
      };

      $scope.currentPage = 1;
      $scope.itemsPerPage = 10;
      $scope.totalItems = 50;

      $scope.setPage = function () {
        $timeout(function () {
          console.log('http');
        }, 1000);
      };

      $scope.$on('PAGE_EVENT_ON_CONF_CHANGE', function (event, currentPage, itemsPerPage, totalItems) {
        console.log('当前第' + currentPage + '页');
        console.log('每页' + itemsPerPage + '条');
        console.log('共' + totalItems + '条');
      });

      $scope.goFirst = function () {
        $scope.$broadcast('GO_INDEX_PAGE', 1);
      };

      $scope.btnInfo = {
        title: '开关',
        status: true
      }



    }
  ]);
