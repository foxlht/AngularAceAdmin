'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:loadingMask
 * @description
 * # loadingMask
 */
angular.module('angularAceAdminApp')
    .directive('loadingMask', function () {
        return {
            templateUrl: 'template/frame/loadingMask/loadingMask.html',
            restrict: 'EA',
            scope: true,
            controller: [
                '$scope',
                '$timeout',
                function ($scope, $timeout) {
                    $scope.show = false;

                    $scope.timer = "";

                    // 显示遮罩层
                    $scope.$on('loadingMask_show', function (event) {
                        $timeout.cancel($scope.timer);
                        $scope.show = true;
                    });

                    // 隐藏遮罩层
                    $scope.$on('loadingMask_hide', function (event) {

                        $scope.timer = $timeout(function () {
                            $scope.show = false;
                        }, 500);

                    });

                }
            ]
        };
    });
