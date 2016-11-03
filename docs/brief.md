# 简介

  　　本模版是基于Angular和Ace Admin的后台管理模版。使用Angular提供页面渲染、路由管理、页面分发等业务逻辑的管理，使用Ace Admin提供样式的支持。内部提供了一些常用的指令和方法，如模态框、树形选择框，树形复选框、开关按钮、翻页控件等。今后会陆续加入新的指令，总结成前端库，方便今后的快速开发和使用。

# 为什么使用Angular?

  Angular是一个由Google发起的开源项目，基于**MVVM**设计模式的前端框架，相比传统的Web App来说，它有以下几点好处。

  1. MVC
  1. 模块化
  1. 双向数据绑定
  1. 指令系统，可以对模版进行复用
  1. 依赖注入

  　　Angular提供了路由拦截机制，可以在前端进行视图的分发，减轻服务端压力。并且提供了Controller，每个Controller都有自己独立的作用域，而不是绑定在全局对象`window`上，这样可以避免污染全局空间。

  　　模块化的好处也是不言而喻的，首先从开发上来说，可以将页面拆分成若干个模块，常用的模块可以封装为指令进行重复调用，而这是传统的Web App无法提供的。再从维护上来说，模块化更利于维护，在项目出现Bug或需求发生变更时，前端代码往往需要作出变更，而以往使用如**easy-ui**或**jQuery**开发时，每个页面中的所有js代码往往都写在了一起，十分不利于维护。而Angular可以用组件或模块化开发的模式，每个小的模块只专注于自己的业务逻辑，每个模块有属于自己的作用域，不会造成命名冲突，也会使业务逻辑更加清晰、有条理。

  　　双向数据绑定是Angular的重中之重，在以往的开发中，我们需要手动的去维护视图和变量，而在Angular中，无论我们修改视图还是变量，只要其中一个发生变化，另一个也会随之改变，这些都是Angular帮我们所做的工作。假设我们有一下表单，用于提交用户名和密码：

  Html

  ```html
  <form>
      <input type="text" name="username" id="username"/>
      <input type="password" name="password" id="password">
  </form>
  ```

  通常情况下我们需要这样获取到表单的值：

  Javascript

  ```javascript
  var user = {
      username: $('#username').val(),
      password: $('#password').val()
  }
  ```

  而在Angular中，我们只需将user对象绑定到表单上即可：

  Html:

  ```html
  <form>
      <input type="text" name="username" ng-model="user.username"/>
      <input type="password" name="password" ng-model="user.password">
  </form>
  ```

  Javascript:

  ```javascript
  $scope.user = {
      username: '',
      password: ''
  }
  ```

  　　就是这样，只需要在`$scope`对象上创建一个user对象，然后将这个user对象绑定到表单中即可，我们无需在进行任何操作。当我们对表单进行修改时，user对象的值会自动发生改变；当user对象发生变化时，页面表单中的值也会相应的发生改变。

  　　Angular采用了依赖注入的形式，将所需的模块注入到相应的模块中，这种模式可以是结构变得更清晰。假设我们有一个`UserService`用来同服务端获取数据，那么在`UserController`中，我们就可以将`UserService`注入进来：

  ```javascript
  angular.module('angularAceAdminApp')
      .controller('UserController', [
        '$scope',
        'UserService',
        function ($scope, UserService) {
          // TODO: do some thing...
        }
      ]
    );

  ```

# 不适用Angular的情况

  　　以上说了Angular的种种优点，那么在所有的地方都可以使用Angular吗？当然不是的，Angular更适用与CRUD的应用，市面上90%的应用都是CRUD应用，但仍有一些情景不适合使用Angular：

  1. Angular不适合进行游戏的开发，因为操作Dom元素是一件极其浪费性能的事情，所以当需要进行游戏开发时，并不推荐使用Angular。可以考虑**canvas**或**Unity 3D**等进行游戏的开发。

  2. 图形界面编辑器，同样是出于性能的原因，对于复杂页面和频繁操作Dom的应用不适合使用Angular

  3. 兼容低版本浏览器。当我们需要兼容例如**IE8**甚至更之前的版本时，不适合使用Angular。由于Angular使用了一些新的特性，老版本的浏览器并不支持这些特性（将Angular 的版本降级到1.2是可以在IE8浏览器上运行的），当需要兼容这些低版本浏览器时，更推荐使用一些兼容性比较好的库，例如： **easy-ui**。

  　　在公交运营管理系统的开发中，也发现了Angular 1.x版本的一些不足之处，自定义指令在`ng-repeat`中无法正确的双向绑定，在对搜索框进repeat操作时，Angular无法正确的双向绑定，当自定义指令中的值发生改变时，Angular会将其清空。在项目中暂时由其他方法替代。还有Angular虽然支持模块化，但支持的并不理想，在管理大型的项目中，控制器和视图的零散化依然会造成一些不便。类似于**Vue.js**这样的集中管理方案在实际开发中显得更为妥当。后续计划将此模版迁移至**Vue.js**。


# 目录结构

  - app
    - images
    - scripts
      - controllers
      - directives
      - services
      - filters
      - app.js
    - styles
    - template
    - views
    - index.html
  - docs
  - lib
  - bower.json
  - gulpfile.js
  - package.json

1. app

  　　app文件夹用于存放项目的源代码，包括图片、控制器、指令、服务、过滤器、程序的入口文件`app.js`、样式表、模版、页面和启动页面`index.html`，下面对各个文件夹进行说明：

  - images

    用于存放各种静态的图片文件，比如项目的图标等不需要经常变动的图片文件。

  - script

    存放前端全部的源码，包括`controller`、`directive`、`service`、`filter`和`app.js`。

    `controllers`为每个页面的控制器，页面中全部的逻辑代码应该写在此处。

    `directives`为Angular应用的指令，本后台模版中提供的模态框、树形选择框，树形复选框等指令就存放于`directives/frame`下。指令的模版应存放于`app/template`中。

    `filters`中存放的是Angular的过滤器，通常用于格式化数据，比如后台发送来的数据中，时间是一个字符串，而我们更期望它是一个`Date`对象。那么这时候使用`filter`就是一个很好的选择。

    filter:

    ```javascript
    angular.module('angularAceAdminApp')
        .filter('SampleFilter', [
              function () {

                  var SerializationDate = function (input) {
                      return new Date(input);
                  }

                  return {
                      SerializationDate: SerializationDate
                  }

              }
           ]
        );
    ```

    controller:

    ```javascript
    angular.module('angularAceAdminApp')
        .controller('SampleController', [
              '$scope',
              '$filter',
              function ($scope, $filter) {

                  // TODO: do some thing

                  $scope.date = $filter(SampleFilter).SerializationDate('2016-11-02');

                  ...
              }
           ]
        );
    ```

    `services`用于存放Angular应用的服务，服务一般是于服务端交互的部分，或整个angular应用的通用方法。本模版的`CommonService`就存放于`services`文件夹下。关于更多`service`的介绍请查阅[模版组成](#)。

    `app.js`文件是整个Angular应用的入口文件，在该文件内定义了所要拦截的路由，并为相应的页面分发view和controller。

  - styles

    存放样式表文件，可使用`Less`等语言，之后使用`Gulp`进行编译。

  - template

    存放指令的模版文件。

  - views

    存放每个路由所对应的页面，在运行过程中由路由进行view和controller的分发。

  - index.html

    该文件是整个Angular应用的启动页面，在该页面中引用全部的资源文件。

1. docs

  本模版的文档文件，采用markdown编写。

1. lib

  存放外部的资源文件，Ace Admin的资源文件就存放于此。

1. bower.json

  本模版使用bower管理资源文件的依赖，使用如下命令安装bower

  ```javascript
  npm install bower -g
  ```

  本模版的根目录，使用bower安装依赖：

  ```javascript
  bower install
  ```

1. gulpfile.js

  项目构建的相关命令，本模版默认使用Gulp作为构建工具，你也可以使用其他的构建工具，如Grunt和Webpack。

1. package.json

  项目构建所需要的依赖，进入本模版的根目录，使用如下命令进行安装。

  ```javascript
  npm install
  ```


# 模版组成

  　　模版整体大致由视图(view)、控制器(controller)、模版(template)、指令(directive)和服务(service)5个部分组成。整体流程如下：

  ![框架流程](./AngularAceAdmin.png)

## 路由（route）

  1. 路由管理使用 `ui.route` 进行管理，所有的路由全部在`app.js`中定义（app/scripts/app.js，app.js为Angular应用的入口文件）。

  1. 每个页面的视图和控制器统一在路由中进行定义和分发。

  1. 在`$stateProvider.status`中定义 `url` 和 `views，每个views可以指定一个content属性用于分发视图。`

## 视图&控制器

  1. 视图为每个页面的html代码块，主要作用是确定每个页面的整体布局，并显示需要输出的信息（如表格、表单等），在视图中可以调用对应控制器中绑定在scope对象上的属性和方法。

  1. 控制器为每个页面的业务逻辑部分，每个控制器都有属于他自己的作用域（scope），可以将属性或方法绑定在scope对象上，以供模版去调用。

  1. 由于每个控制器之间是相对独立的作用域，所以控制器之间的相互通信有以下三种方式：

    1. 通过广播（$broadcast 或 $emit）来向子级或父级控制器推送广播事件，并且可以携带参数。但是如果大量的使用广播会导致不好维护和管理，所以尽量少的使用广播。

    1. 在根作用域（rootScope）上绑定数据或方法（不推荐），虽然各个控制器是相对独立的，但他们全部都继承自rootScope，通过在rootScope上绑定数据或方法，可以使得每个控制器都可以访问，但极力不推荐这样做，因为在rootScope中绑定属性或方法会污染全局空间。

    1. 通过服务（service）共享数据（推荐），如果想共享某个数据或在多个控制器中调用同一个方法时，应把其写为一个服务，如果共享的是数据，可以注入angular.cookie存储在本地。

## 模版&指令

  1. 模版同视图一样，都是相映的html代码段；不同的地方为，模版不再是页面的布局，而是相映的组件的html代码段。

  1. 将相应的组件封装成指令，可以达到复用的目的。例如本系统内最常用的模态框，通过以下指令就可以直接创建。该指令已经设置为可嵌套，可以直接在其内部嵌套其他的指令。

## 服务

  1. 一切需要与后台交互、数据本地持久化、通用方法都应该写为服务。

  1. 与后台通信时，应在服务内注入$http和$q的依赖

  1. 推荐对服务中接口的地址进行统一管理，可以参照公交运营管理系统的**NetControl**
