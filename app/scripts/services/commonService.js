'use strict';

/**
 * @ngdoc service
 * @name angularAceAdminApp.CommonService
 * @description
 * # CommonService
 * Service in the angularAceAdminApp.
 */
angular.module('angularAceAdminApp')
  .factory('CommonService', [
    '$rootScope',
    '$http',
    '$q',
    'Upload',
    function ($rootScope, $http, $q, Upload) {

      /**
       * 根据所给路径下载文件
       * @param options option参数格式 {url: "", data: {}, method: "post"}
       * @constructor
       */
      function DownLoadFileWithPath(options) {
        var config = $.extend(true, {method: 'post'}, options);
        var $iframe = $('<iframe id="down-file-iframe" />');
        var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
        $form.attr('action', config.url);
        for (var key in config.data) {
          $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
        }
        $iframe.append($form);
        $(document.body).append($iframe);
        $form[0].submit();
        $iframe.remove();
      }

      /**
       * 显示和隐藏遮罩层
       * @returns {{show: CommonService.show, hide: CommonService.hide}}
       */
      function loadingMask() {
        return {
          show: function () {
            $rootScope.$broadcast('loadingMask_show');
          },
          hide: function () {
            $rootScope.$broadcast('loadingMask_hide');
          }
        }
      }

      /**
       * 向服务器请求数据并显示遮罩层
       * @param defer 异步对象
       * @param data 请求时发送的数据
       * @param url 请求的地址
       * @returns {promise.promise|jQuery.promise|*|promise|d.promise|Promise} 返回一个promise对象, 可以使用then()方法链式调用
       */
      function requestDataFromServerWithLoading(defer, data, url) {
        loadingMask().show();
        $http({
          method: 'POST',
          data: data,
          url: url
        })
          .success(function (data, status, headers, config) {
            loadingMask().hide();
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            loadingMask().hide();
            defer.reject(data);
          });
        return defer.promise;
      }

      /**
       * 向服务器请求数据
       * @param defer 异步对象
       * @param data 请求时发送的数据
       * @param url 请求的地址
       * @returns {promise.promise|jQuery.promise|*|promise|d.promise|Promise} 返回一个promise对象, 可以使用then()方法链式调用
       */
      function requestDataFromServerWithUnloading(defer, data, url) {
        $http({
          method: 'POST',
          data: data,
          url: url
        })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(data);
          });
        return defer.promise;
      }

      /**
       * 向服务器发送数据并附带文件上传 (使用html5新特性)
       * @param defer
       * @param data
       * @param url
       * @returns {promise.promise|jQuery.promise|*|promise|d.promise|Promise}
       */
      function requestDataFromServerWithFile(defer, data, url) {
        loadingMask().show();
        Upload.upload({
          url: url,
          data: data
        }).then(function (data, status, headers, config) {
          loadingMask().hide();
          defer.resolve(data);
        }), function (resp) {
          loadingMask().hide();
          defer.reject(resp);
        };
        return defer.promise;
      }

      /**
       * 显示或隐藏消息框
       * @returns {{show: CommonService.show, hide: CommonService.hide}}
         */
      function messageModal() {
        return {
          show: function (message, callback) {
            $rootScope.showMessageModal(message, callback);
          },
          hide: function () {
            $rootScope.hideMessageModal();
          }
        }
      }



      return {
        DownLoadFileWithPath: DownLoadFileWithPath,
        loadingMask: loadingMask,
        requestDataFromServerWithLoading: requestDataFromServerWithLoading,
        requestDataFromServerWithUnloading: requestDataFromServerWithUnloading,
        requestDataFromServerWithFile: requestDataFromServerWithFile,
        messageModal: messageModal
      }
    }]);
