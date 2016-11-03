# ace-pagination

---

## 说明

　　`ace-pagination`指令用于实例化一个翻页控件，该控件采用了**单向绑定**。基本api如下：

|           属性            |    类型    |                                                 简介                                             |                             备注                             |
|:-----------------------: |  :------: | :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------: |
|     pagination-conf      |   Object  | 翻页控件的配置对象，应包含三个属性： currentPage：页码、itemsPerPage：每页显示的条目数、totalItems：总条目数 | currentPage默认值为1，itemsPerPage默认值为10，totalItems为必选项 |
|    pagination-click      |  Function |                           当翻页、切换每页条目数时所执行的函数                                         |                                无                            |
|PAGE_EVENT_ON_CONF_CHANGE |   Event   |  当翻页时所发送的广播，包含三个参数currentPage：页码、itemsPerPage：每页显示的条目数、totalItems：总条目数   |                                无                            |
|      GO_INDEX_PAGE       |  Listener |                      监听事件，发送此广播时需传入一个页码参数，用于跳转到该页                              |                               无                             |

　　在公交运营管理系统中，该控件设计为双向数据绑定，但根据实际使用的效果和反馈来看，效果并不理想。控件需要对用户输入的页码进行验证，判断输入的页码是否大于当前的总页数，若输入的值不合法，则进行相应的赋值操作。由于在双向数据绑定中，使用了angular提供的`$watch`方法对`paginationConf`进行监听，而赋值的操作又是在`$watch`方法内进行的，所以引起了循环调用，这正是效果不理想的原因。所以此版本将该控件修改为单向绑定，从而避免循环调用的出现。（注： paginationConf在指令内部依然为双向绑定，但修改其值不会触发`pagination-click`和`PAGE_EVENT_ON_CONF_CHANGE`。）

## 基本功能介绍

1. `pagination-conf`

  　　翻页控件的配置对象，应包含三个属性：`currentPage`：页码、`itemsPerPage`：每页显示的条目数、`totalItems`：总条目数。在这里需要注意，`currentPage`和`itemsPerPage`为单向数据绑定，就算修改其值也不会触发`pagination-click`所绑定的方法和`PAGE_EVENT_ON_CONF_CHANGE`事件；但`totalItems`仍然为双向数据绑定，只要其值发生了改变，`ace-pagination`便会重新计算总条目数并更新视图。

  Javascript:

  ```javascript
  $scope.paginationConf = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 50
  };
  ```

  Html:

  ```html
  <div ace-pagination pagination-conf="paginationConf"></div>
  ```

1. `pagination-click`

  　　绑定点击页码和选择每页条目数时所执行的方法，可以在此函数中执行请求数据等操作。

  Javascript:

  ```javascript
  $scope.paginationConf = {...};

  $scope.onPageChange = function () {
      SampleService.getList($scope.paginationConf).then(function (data) {
        // TODO: do some thing
      });
  }
  ```

  Html:

  ```html
  <div ace-pagination pagination-conf="paginationConf" pagination-change="onPageChange()"></div>
  ```

1. `PAGE_EVENT_ON_CONF_CHANGE`

  　　点击页码和修改每页条目数时所广播的事件，并包含三个参数：`currentPage`：页码、`itemsPerPage`：每页显示的条目数、`totalItems`：总条目数。在这里需要注意的是，该广播会在`pagination-click`所绑定的方法执行完毕之后才会发送，若`pagination-click`绑定的方法中有阻塞线程的操作，那么该广播会在`pagination-click`全部执行完毕之后进行发送。

  Javascript:

  ```javascript
  $scope.$on('PAGE_EVENT_ON_CONF_CHANGE', function (event, currentPage, itemsPerPage, totalItems) {
      console.log('当前第' + currentPage + '页');
      console.log('每页' + itemsPerPage + '条');
      console.log('共' + totalItems + '条');
  });
  ```

1. `GO_INDEX_PAGE`

  　　此广播用于重新设置页码，需传入一个参数，用于跳转到该页。此广播仍然对页码进行了检测，若传入的页码小于1或大于当前总页码，则不会进行跳转。

  Javascript:

  ```javascript
  $scope.goFirst = function () {
      $scope.$broadcast('GO_INDEX_PAGE', 1);
  };
  ```
