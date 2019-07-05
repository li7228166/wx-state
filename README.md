## 说明
基于ES6 Proxy（目前暂未发现不支持对情况）开发的微信小程序状态管理库，基本零浸入的实现对小程序页面及组件的状态管理，方便对中大型项目进行开发。
## 安装
#### 方法1. npm安装（需微信小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上）
```
$ npm init
$ npm install wx-state --save
```
注：详细步骤可参照微信小程序开发[文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html "文档")


#### 方法2. 复制commonjs模块文件到项目

注：[下载文件](https://raw.githubusercontent.com/li7228166/wx-state/master/dist/wx-state.js "下载")后可复制到小程序项目任意目录即可，推荐utils目录。


## 使用
#### 1. 创建相应的store
```javascript
import {observable} from "../utils/wx-state";
class Article {
    constructor() {
        this.nodeList = [];
        this.brandList = [1, 2, 3, 4, 5];
        this.obj = {
            msg: 'Hello'
        };
    }
    changeData() {
        this.nodeList = [1, 2, 3, 4];
        //模拟用户操作
        setTimeout(() => {
            this.brandList = [1, 2];
            setTimeout(() => {
                this.nodeList = [1, 2, 3];
                setTimeout(() => {
                    this.obj.msg = '你好';
                }, 1500)
            }, 1500)
        }, 1500)
    }
}
//参数'articleStore'必填且需要全局唯一
export default observable(Article, 'articleStore');
```
#### 2. 连接state到页面或组件
```javascript
import {connect} from "../../utils/wx-state";
//该处“articleStore”指向Article实例
const mapStateToData = function ({articleStore}) {
    return {
        nodeList: articleStore.nodeList,
        brandList: articleStore.brandList
    }
};
//Page
Page(connect(mapStateToData)({
    //...options，参见微信小程序官方文档"页面配置"
}));

//Component
Component(connect(mapStateToData)({
    //...options，参见微信小程序官方文档"自定义组件"
}));
```
注：上方操作会将nodeList，brandList动态合并到Page或Component的data中（所以请尽量避免同原data中已定义的对象同名），从而实现this.data及.wxml文件相应对象的调用。

#### 3. 在小程序app.js中引入store完成全局唯一实例化操作
```javascript
import articleStore from './stores/article';
App({
    //...options
})
```

## 编译
```
$ npm run build
```

注：正常使用是不需要重新编译到。但如果有特殊情况需要对该工具进行修改，可将项目clone到本地，安装依赖后并修改后执行上述命令后使用。
