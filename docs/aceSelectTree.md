# ace-select-tree

--------------------------------------------------------------------------------

## 说明

`ace-select-tree`指令用于实例化一个树形选择框，内部采用模板递归，并且采用了双向数据绑定，一旦数据源发生变化，视图会发生相应的改变。基本api如下:

|      属性    |  类型   |                                    简介                                     | 备注 |
|:----------: | :----: | :--------------------------------------------------------------------------:|:---:|
| bind-object | Object |        绑定的对象，每次选择树形列表中的选项时，该对象的值会发生改变                   | 必填 |
| bind-array  | Array  | 树形列表的数据源，因为使用了双向数据绑定，所以当该数组发生变化时，选项列表会发生相应的改变 | 必填 |
|  key-title  | String |               树形数据中, 要显示在列表中的标题                                   | 必填 |
|   key-id    | String |                 树形数据中, 元素的主键                                          | 必填 |
|key-children | String |                 树形数据中, 子项的key                                          | 必填 |

注意: 只有`bind-object`和`bind-array`使用了双向数据绑定，`key-*`的所有选项传入的都是字符串，所以`key-*`的值只在初始化时有效，即便之后该改变了其所绑定的对象也不会生效。

Javascript:

```javascript
$scope.bindObj = {};
$scope.treeList = [...];
```

Html:

```html
<div ace-select-tree bind-array="treeList" bind-object="bindObj" key-title="title" key-id="id" key-children="children"></div>
```

## 基本功能介绍

1. `bind-object` 绑定的对象，若初始化时`bind-object`有值，则会根据`key-id`选项判断在`bind-array`中是否有匹配的值，若有则会在列表中该项前面作出相应的标记，并且会在选择框中显示出该项的标题。每当点击列表中的选项时，该属性绑定对象的值会被修改。

1. `bind-array` 绑定的数据源，使用了双向数据绑定，所以当数据源的数据改变时，树形列表也会被重新渲染。

1. `key-title` 树形数据中要显示在列表中标题的key。假设有下列数组:

  ```JSON
  [
    {
      "children": [
        {
          "children": [],
          "id": "111",
          "title": "机构1-1-1"
        }
      ],
      "id": "11",
      "title": "机构1-1"
    },
    {
      "children": [
        {
          "children": [],
          "id": "121",
          "title": "机构1-2-1"
        }
      ],
      "id": "12",
      "title": "机构1-2"
    }
  ]
  ```

  `key-title`值就为**title**。

1. `key-id` 树形数据中主键的key，在判断`bind-object`是否存在于`bind-array`中时，使用的就是元素的主键进行比较的。在上述的JSON数组中，`key-id`的值为**id**。

1. `key-children` 树形数据中子项的key，在模板递归中使用该树形进行子项列表的渲染。在上述的JSON数组中，`key-children`为**children**
