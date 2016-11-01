'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:acePagination
 * @description
 * # acePagination
 */
angular.module('angularAceAdminApp')
  .directive('acePagination', function () {
    return {
      templateUrl: 'template/frame/acePagination/acePagination.html',
      restrict: 'EA',
      replace: true,
      scope: {
        'paginationConf': '=',
        'paginationClick': '&paginationChange'
      },
      controller: [
        '$scope',
        function ($scope) {
          // 判断是否为初始化状态
          $scope.count = 0;

          // 最新一次paginationConf的值
          $scope.latestConf_old = {};
          $scope.latestConf_new = {};

          // 分页数组
          $scope.pageArray = [];
          // 总页数
          setTotalPage();
          // 分页配置
          $scope.paginationConf = {
            currentPage: $scope.paginationConf.currentPage || 1,
            itemsPerPage: $scope.paginationConf.itemsPerPage || 10,
            totalItems: $scope.paginationConf.totalItems
          };

          // 每页显示条目
          $scope.itemsPerPageOption = [10, 15, 20, 50, 100];

          // 点击页码
          $scope.pageClick = function (page) {
            $scope.paginationConf.currentPage = page;
            $scope.paginationClick();
            $scope.broadcastPageChange();
          };

          // 上一页
          $scope.prevPage = function () {
            $scope.paginationConf.currentPage--;
            $scope.paginationClick();
            $scope.broadcastPageChange();
          };

          // 下一页
          $scope.nextPage = function () {
            $scope.paginationConf.currentPage++;
            if ($scope.paginationClick) {
              $scope.paginationClick();
            }
            $scope.broadcastPageChange();
          };

          // 每页条目数改变时触发次函数
          $scope.onItemsPerPageChange = function () {
            $scope.paginationConf.currentPage = 1;
            if ($scope.paginationClick) {
              $scope.paginationClick();
            }
            $scope.broadcastPageChange();
          };

          // 页码改变时触发次函数
          $scope.onCurrentPageChange = function () {
            if (isCurrentValid($scope.paginationConf, null)) {
              if ($scope.paginationClick) {
                $scope.paginationClick();
              }
              $scope.broadcastPageChange();
            }
          };

          // 当点击页码 改变页数 和每页显示条目时所执行的函数, 会发送一条广播, 并带有三个参数:
          // currentPage: 当前页数
          // itemsPerPage: 每页条目数
          // totalItems: 总条目数
          $scope.broadcastPageChange = function () {
            $scope.$emit('PAGE_EVENT_ON_CONF_CHANGE', $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage, $scope.paginationConf.totalItems);
          };

          // 监听广播, 用于切换标签页
          $scope.$on('GO_INDEX_PAGE', function (event, index) {
            var tempConf = {
              currentPage: index
            };
            if (isCurrentValid(tempConf, null)) {
              $scope.paginationConf.currentPage = index;
              if ($scope.paginationClick) {
                $scope.paginationClick();
              }
              $scope.broadcastPageChange();
            }
          });

          $scope.$watch('paginationConf', function (newValue, oldValue) {

            if (angular.equals(newValue, oldValue) && $scope.count++ !== 0) {
              return;
            }

            /**
             * 当显示条目数量改变时, 重新计算并更新总页数, 然后判断当前页码是否合法, 若不合法则将当前的页码重置为最后一页的页数
             */
            whenItemsPerPageChange(newValue, oldValue, function (newValue, oldValue) {
              if (!isCurrentValid(newValue, oldValue)) {
                $scope.paginationConf.currentPage = $scope.totalPage;
              }
            });

            if (isCurrentValid(newValue, oldValue)) {
              // 当前结束页码
              var pageNum = (parseInt(newValue.currentPage / 10) + 1) * 10 - 1 > $scope.totalPage ? $scope.totalPage : (parseInt(newValue.currentPage / 10) + 1) * 10 - 1;
              // 当前开始页码
              var index = pageNum - pageNum % 10 < 10 ? 1 : pageNum - pageNum % 10;

              $scope.pageArray = [];

              for (; index <= pageNum; index++) {
                $scope.pageArray.push(index);
              }
              // $scope.paginationClick();
            } else {
              newValue.currentPage = oldValue.currentPage;
            }

          }, true);

          /**
           * 当显示条目数量改变时, 重新计算并更新总页数, 并执行回调函数
           * @param newValue
           * @param oldValue
           * @param callback
           */
          function whenItemsPerPageChange(newValue, oldValue, callback) {
            if (newValue.itemsPerPage != oldValue.itemsPerPage || newValue.totalItems != oldValue.totalItems) {
              setTotalPage();
              callback(newValue, oldValue);
            }
          }

          /**
           * 判断页码是否合法
           * @param newVal
           * @param oldVal
           * @returns {boolean}
           */
          function isCurrentValid(newVal, oldVal) {
            return newVal.currentPage >= 1 && newVal.currentPage <= $scope.totalPage;
          }

          /**
           * 更新总页码
           */
          function setTotalPage() {
            // $scope.totalPage = $scope.paginationConf.totalItems % $scope.paginationConf.itemsPerPage > 0 ? parseInt($scope.paginationConf.totalItems / $scope.paginationConf.itemsPerPage) + 1 : ($scope.paginationConf.totalItems / $scope.paginationConf.itemsPerPage);
            $scope.totalPage = Math.ceil($scope.paginationConf.totalItems / $scope.paginationConf.itemsPerPage);
          }
        }
      ]
    };
  });
