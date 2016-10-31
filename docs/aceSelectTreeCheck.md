# ace-select-tree-check

--------------------------------------------------------------------------------

## 说明

`ace-select-tree-check`指令是在`ace-select-tree`指令的基础上修改而来。其中`key-title`、`key-id`、`key-children`和`bind-array`同[`ace-select-tree`](aceSelectTree.md)相同，这里不再做相同的描述，只介绍不同的部分。基本api如下:

|     属性       |   类型  |                                     简介                                     | 备注 |
| :-----------: | :-----: | :-------------------------------------------------------------------------: | :--: |
|  bind-array   |  Array  | 树形列表的数据源，因为使用了双向数据绑定，所以当该数组发生变化时，选项列表会发生相应的改变 | 必填  |
| checked-array |  Array  |                 该数组存放全部选中项的id                                        | 必填 |
|   key-title   | String  |               树形数据中, 要显示在列表中的标题                                   | 必填  |
|    key-id     | String  |                 树形数据中, 元素的主键                                         | 必填  |
| key-children  | String  |                 树形数据中, 子项的key                                          | 必填 |
|   key-check   | Boolean |                 树形数据中, 选中标志的key                                         | 必填  |

注意: 只有`checked-array`和`bind-array`使用了双向数据绑定，`key-*`的所有选项传入的都是字符串，所以`key-*`的值只在初始化时有效，即便之后该改变了其所绑定的对象也不会生效。

## 基本功能介绍

1. `checked-array`

  该属性绑定值的类型应为一个数组，用于存放所有选中项的id，以下列数组为例，如果所有的项都被选中，则`checked-array`中存放的值为：

  ```javascript
  ['1', '5', '27', '6', '31', '28', '29', '30']
  ```

  JSON:

  ```JSON
  [
    {
      "checked": true,
      "id": "1",
      "title": "导航菜单",
      "children": [
        {
          "checked": true,
          "id": "5",
          "title": "车辆监控",
          "children": [
            {
              "checked": true,
              "children": [],
              "id": "27",
              "title": "车辆定位与行驶情况"
            }
          ]
        },
        {
          "checked": true,
          "id": "6",
          "title": "KPI",
          "children": [
            {
              "checked": true,
              "id": "31",
              "title": "司机运营明细",
              "children": []
            },
            {
              "checked": true,
              "id": "28",
              "title": "员工卡发卡明细",
              "children": []
            },
            {
              "checked": true,
              "id": "29",
              "title": "线路运营明细",
              "children": []
            },
            {
              "checked": true,
              "id": "30",
              "title": "车辆运营明细",
              "children": []
            }
          ]
        }
      ]
    }
  ]
  ```

1. `key-check`

  树形数据中, 选中标志的key。 当此属性绑定的值为true时，相应选项前的复选框为选中状态；当值为false时，复选框为未选中状态。以上述数组为例，`key-check`的值为**checked**
