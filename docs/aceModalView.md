# ace-modal-view

---

## 说明

`ace-modal-view`是对`bootstrap`的[模态框](http://v3.bootcss.com/javascript/#modals)的封装。可以以简单的方式实例化一个模态框组件，而不用每次去重复编写相同的内容。基本api如下：

|     属性       |              类型                |         简介         |     备注    |
|:-------------:|:-------------------------------:|:--------------------:|:----------:|
|modal-title    |             String              |      模态框的标题      |    必选     |
|modal-show     |            Boolean              |  控制模态框的显示和隐藏  |    必选     |
|modal-size     |         [large, small]          |     控制模态框的尺寸    |若无此项，则为默认尺寸|
|modal-btn-text |             String              |模态框footer部分按钮的文字|      无     |
|modal-btn-style|[primary, danger, info, success] |模态框footer部分按钮的颜色| 默认为primary |
|modal-footer-block|         Boolean              |用于判断模态框footer部分是否显示| 默认不显示 |
|modal-view-submit|         Function              |点击footer部分按钮所执行的方法|     无      |
|modal-view-close|          Function              |关闭模态框时所执行的方法   |      无        |

使用时应尽量把同一个modal的属性写在一起

Javascript:

```javascript
$scope.modalViewConfig = {
  title: 'sample',
  show: false
}
```

Html:

```html
<div ace-modal-view modal-title='modalViewConfig.title' modal-show='modalViewConfig.show'></div>
```

`ace-modal-view`指令的内部可以嵌套子标签，比如表单和提示信息。下面是一个简单的例子：

Javascript:

```javascript
  $scope.message = 'Hello Angular.js!';
```

Html:

```html
<div ace-modal-view modal-title='modalViewConfig.title' modal-show='modalViewConfig.show'>
  {{ message }}
</div>
```

## 基本功能介绍

1. `modal-title`

  `modal-title`为模态框header部分的标题，应传入一个字符串，此属性为一个必选项。

1. `modal-show`

  `modal-show`用来控制模态框的显示和隐藏，当模态框为true时，显示模态框；当模态框为false时，隐藏模态框。在初始化时，一般将`modal-show`的值设置为`false`。当点击模态框的关闭按钮时，`modal-show`所绑定变量的值也会变为`false`。不过你也可以改变`modal-show`所绑定变量的值，以此来驱动视图的变化。这得益于MVVM的绑定机制，同时也是Angular所推崇的，以事件或模型来驱动视图。下面我们做一个假设，删除一个用户，在删除成功后，关闭模态框，并在控制台输出文字:

  Javascript:

  ```javascript
  SampleService.DeleteUser(user).then(function (res) {
      $scope.modalViewConfig.show = false;
      console.log(res.status ? '删除成功' : '删除失败');
  });
  ```

1. `modal-size`
  `modal-size`用来控制模态框的大小，是一个可选项，有两个选项供以选择`large`和`small`，若不进行配置，则以默认的宽度显示。

  Javascript:

  ```javascript
  $scope.modalViewConfig = {
    title: 'Sample',
    show: false,
    size: 'large'
  }
  ```

  Html:

  ```html
  <div ace-modal-view modal-title='modalViewConfig.title' modal-show='modalViewConfig.show' modal-size='modalViewConfig.size'></div>
  ```

1. `modal-footer-block`

  `modal-footer-block`选项用于设置是否显示modal的footer部分，默认不显示。当该选项为false时，`modal-btn-text`、`modal-btn-style`和`modal-view-submit`的设置都将无效。

1. `modal-btn-text`

  `modal-btn-text`为模态框footer按钮的文字, 注意: 当`modal-footer-block`为`false`时, 此按钮不会显示。

1. `modal-btn-style`

  `modal-btn-style`为模态框footer按钮的颜色，共有四种可选的风格：`primary`、`danger`、`info`和`success`，默认为`primary`。

1. `modal-view-submit`

  `modal-view-submit`用于设置点击模态框footer按钮所执行的方法，一般用于执行一些非表单提交的操作。若进行表单的提交的操作，推荐将`modal-footer-block`的值设置为false，将表单提交按钮的`type`设置为`submit`，并使用angular内置的`ng-submit`指令拦截表单提交操作。这样设置的好处是可以更方便的使用angular内置的表单验证功能，关于angular表单验证的相关信息请查看官方[文档](https://docs.angularjs.org/api/ng/directive/form)

1. `modal-view-close`

  `modal-view-close`用于设置当模态框关闭时所执行的方法，可以在此方法中执行一些清空和恢复初始状态的操作。
