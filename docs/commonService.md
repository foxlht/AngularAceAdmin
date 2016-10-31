# CommonService

---

## 说明

`CommonService`中提供了常用的一些基本操作， 如遮罩层、异步请求、消息提示框等。 调用服务之前应先将服务注入到要调用的模块。方法如下（注：此处的依赖注入推荐使用行内数组，避免代码压缩时被当作变量名压缩掉）：

```javascript
angular.module('angularAceAdminApp')
    .controller('SampleCtrl', [
        '$scope',
        'CommonService',
        function ($scope, CommonService) {
          // TODO: do some thing
        }
    ])
```

## 基本功能介绍

1. CommonService.loadingMask()

  `loadingMask()`提供了`show()`和`hide()`用于显示和隐藏遮罩层。

  ```javascript
  angular.module('angularAceAdminApp')
      .controller('SampleCtrl', [
          '$scope',
          'CommonService',
          function ($scope, CommonService) {
              CommonService.loadingMask().show(); // 显示遮罩层
              CommonService.loadingMask().hide(); // 隐藏遮罩层
          }
      ])
  ```

  `loadingMask()`在内部做了一些处理， 注入了`$timeout`函数， 在调用`hide()`方法后回延迟`500`毫秒关闭遮罩层。当在500毫秒内又调用了`show()`方法时，会取消遮罩层的关闭。这样是为了更好的用户体验而设定的，在有很多异步请求时会很有用，避免造成遮罩层的多次闪烁。

1. CommonService.DownLoadFileWithPath(options)

  `DownLoadFileWithPath()`方法用于从服务器获取文件时使用，需要传入一个参数 `options`，`options` 中应包含三个参数 `url`、`data`、`method`。`url` 为文件的下载路径，`data` 为请求时附加的参数，`method` 为请求的方法，默认为 *`POST`*。

  ```javascript
  angular.module('angularAceAdminApp')
      .controller('SampleCtrl', [
          '$scope',
          'CommonService',
          function ($scope, CommonService) {

              CommonService.DownLoadFileWithPath({
                  url: 'http://localhost:8080/downloadFileDemo', // 文件下载地址
                  data: {
                    name: 'angular' // 请求附加的数据
                  },
                  method: 'POST' // 请求的方法
              });

          }
      ])
  ```

  `DownLoadFileWithPath()`大致的实现原理是用js生成一个iframe，并在iframe中添加一个form，将form的`action`设置为`options.url`，调用`form.submit()`提交表单，并在提交完成后移除iframe。

1. CommonService.requestDataFromServerWithLoading(defer, data, url)

  `requestDataFromServerWithLoading()`方法用于向服务器发送请求， 需要传入三个参数`defer`、`data`和`url`。`defer`为一个延迟对象，可以通过angular内置的`$q.defer()`获得。`data`为请求时附加的参数，如果不需要附加任何参数时，传入一个`null`即可。`url`为请求的地址。该方法返回一个`promise`对象，可以使用`.then()`方法链式调用。

  ```javascript
    angular.module('angularAceAdminApp')
        .controller('SampleCtrl', [
            '$scope',
            '$q',
            'CommonService',
            function ($scope, $q, CommonService) {

              var defer = $q.defer();
              var user = {
                name: 'Uni-HuaTong',
                password: '123456'
              };

              CommonService.requestDataFromServerWithLoading(defer, user, 'localhost:8080/login').then(function (data) {
                    // TODO: 处理返回值
                    // data为服务器返回的数据
                });
            }
        ])
  ```

  为什么采用返回`promise`对象的形式而不是传统的`ajax`请求？

  在实际的开发过程中经常会遇到在一个请求后调用另一个请求，通常我们会这么做，这里以`$.ajax`为例：

  ```javascript
  $.ajax({
    url: '...request_url_1',
    type: 'POST',
    success: function () {

      // 发送第二个异步请求
      $.ajax({
        url: '...request_url_2',
        type: 'POST',
        success: function () {

          // 发送第三个异步请求
          $.ajax({
            url: '...request_url_3',
            type: 'POST',
            success: function () {
              // TODO: do some thing...
            }
          });

        }
      });

    }
  });
  ```

  这种一层套一层的调用方式我们称之为金字塔式的回调， 因为请求是异步的，所以想要实现在一个`ajax`请求响应之后调用另一个`ajax`请求只有这样做，这样做的弊端是当维护代码时简直是噩梦级的，并且使得整体的流程显得不够明确。直到`promise`协议的出现。所有的`promise`对象都含有一个`.then()`的方法，在服务器返回响应后调用此方法，并且`.then()`的返回值会直接传入到下一个`.then()`作为参数。下面列出伪代码供参考：

  ```javascript
  CommonService.requestDataFromServerWithLoading(defer, user, 'localhost:8080/login').then(function (data) {

        return '这是来自回调函数的信息';

    }).then(function (data) {

        console.log(data); // 这里会在控制台输出 这是来自回调函数的信息

        var defer = $q.defer();
        $http('...').success(function (res) {
            defer.resolve(res);
          });
        return defer.promise;

      }).then(function (data) {
        // 上一个异步请求执行完之后才会执行我
      });
  ```

  通过上面的代码，我们可以看出， 不管是**异步还是同步**的方法，都会按照链式调用的顺序来依次执行。这可以使得整体的流程变得更加清晰，易于维护。

1. CommonService.requestDataFromServerWithUnloading(defer, data, url)

  `requestDataFromServerWithUnloading()`方法同`requestDataFromServerWithLoading()`相同，都是用于向后台发送请求时调用，唯一的区别在于此方法不会显示遮罩层。

1. `CommonService.requestDataFromServerWithFile(defer, data, url)`

  > 该方法封装自GitHub的开源项目[ng-file-upload](https://github.com/danialfarid/ng-file-upload), 在此感谢该项目的作者[Danial Farid](https://github.com/danialfarid)贡献了如此优秀的作品。

  `requestDataFromServerWithFile()`方法用于向后台异步上传文件时使用，使用了`HTML5`的`FormData`对象。与普通的`ajax`相比，使用`FormData`的最大优点就是我们可以异步上传二进制文件。使用`ngf-select`声名组件，`ng-model`为绑定的对象，只需要在一个`div`元素上添加这两个属性，就可完成对组建的实例化（此处只是一个简单的例子，更多关于`ng-file-upload`的使用方法请查看官方[文档](https://github.com/danialfarid/ng-file-upload/blob/master/README.md)）。

  html:
  ```html
    <form name='sampleForm' novalidate ng-submit="submitForm()">
        <div class="btn btn-xs btn-info btn-block"
            id="upLoadFile" ngf-select
            ng-model="formObject.upLoadFile" name="upLoadFile">
              选择文件
        </div>
    </form>
  ```

  javascript:
  ```javascript
  angular.module('angularAceAdminApp')
      .controller('SampleCtrl', [
          '$scope',
          '$q',
          'CommonService',
          function ($scope, $q, CommonService) {

              $scope.formObject = {
                upLoadFile: ''
              };

              $scope.submitForm = function () {
                  var defer = $q.defer();
                  CommonService.requestDataFromServerWithFile(defer, $scope.formObject, 'localhost:8080/uploadFile').then(function (data) {
                        // TODO: 处理返回值
                  });
              }
          }
      ])
  ```

  如果我们想验证所选文件的类型，可以通过绑定对象的`name`属性来获得文件的名称，再进行自定义的验证。下面给出一个可行的思路，在实际运用中可以灵活的修改:

  ```javascript
  function verifyFileType (file, type) {
      var verifyResult = false;
      try {
          // 将文件名以 . 分割为数组
          var spliceArr = file.name.split('.');
          // 对错误文件名的异常处理
          if (spliceArr.length === 0) {
            throw new Error('Can\'t verify file type of empty');
          } else if (spliceArr.length < 2) {
            throw new Error('Can\'t verify file type with no extension');
          }
          // 验证所选文件格式
          verifyResult = spliceArr[spliceArr.length - 1] === type;
      } catch (e) {
          console.error(e);
          verifyResult = false;
      } finally {
          return verifyResult;
      }
  }
  ```

1. CommonService.messageModal()

  `messageModal()`包含两个方法：`show()`和`hide()`用于显示和隐藏消息提示框

  * `show(message, callback)`

    用于显示模态框，其中`message`属性为模态框所显示的文字信息，`callback`为可选的回调函数，用于在弹出模态框的同时执行一些相应的处理。

    我们假设这样一种场景，当添加完毕后提示添加成功，并更新列表的信息：

    ```javascript

    SampleService.InsertItem(data).then(function (res) {
        // 若添加成功则提示信息并更新列表数据，否则提示错误信息
        if (res.status) {
          CommonService.messageModal().show('添加成功', function () {
              // 更新列表
              updateList();   
          });
        } else {
          // 提示错误信息
          CommonService.messageModal().show('添加失败: \n' + res.errMsg);
        }
    });

    ```

    **注意：尽量避免在此回调函数中调用会阻塞线程的方法，比如`alert()`。如果线程被阻塞，提示框将不会显示，直到阻塞线程的函数被执行完毕。**

  * `hide()`

    用于隐藏模态框

    ```javascript
    CommonService.messageModal().hide();
    ```
