### 说明
基于ES6 Proxy（目前暂未发现不支持对情况）开发对微信小程序状态管理库，可轻松实现对微信小程序对状态管理。
### 预置命令
#### 开发
```
$ yarn run dll
$ yarn start
```
注：开发模式下会默认启用接口代理处理跨域问题。


#### JIT打包
```
$ yarn run build
```

以JIT的编译方式打包项目，生成待部署文件到dist目录


#### AOT打包
```
$ yarn run build-aot
```

以AOT的编译方式打包项目，并生成待部署文件到dist目录
注：若需要以该模式编译项目，编码时请避免使用私有变量private声明，改用public；避免使用export default的模块暴漏形式，改用export；避免使用自执行函数；

#### JIT发布
```
$ yarn run release
```
已JIT的编译方式打包项目，生成待部署文件到dist目录，并开启一个web服务到8080端口 [http://localhost:8080](http://localhost:8080) ，以便在本地预览待部署的项目
```
$ yarn run release-proxy
```
同上，同时启用接口代理服务。


#### AOT发布
```
$ yarn run release-aot
```
同JIT发布，但是会以AOT方式编译项目
```
$ yarn run release-aot-proxy
```
同上，同时启用接口代理服务。


#### JIT部署
```
$ yarn run deploy
```
**注：需要先配置下你的根目录下的config.json**
```json
{
  "ssh": {
    "host": "xx.xx.xx.xx",  //服务器IP
    "username": "xxx",      //用户名
    "password": "xxx",      //登录密码
    "port": "xxx",          //端口
    "remotePath": "/xx/xx"  //上传到服务器的哪个目录
  }
}
```
在生成待部署文件到dist目录，并直接部署到指定服务器。


#### AOT部署
```
$ yarn run deploy-aot
```
同JIT部署，但是会以AOT方式编译项目



#### 编译依赖
```
$ yarn run dll
```
默认将按照package.json的dependencies配置进行打包，如有需要可手动修改scripts/webpack.config.dll.js
```
entry: {
    vendor: [
        ...Object.keys(packageConfig.dependencies)
    ]
}
```


#### route.json文件说明
```
{
  "path": "xxxx",//目录名称
  "data": {
    "title": "xxxx",//页面标题
    "icon": "xxx",//页面图标
    "name": "xxx",//页面name
    "params": [//可为空数组
        {
            "key":"pageNum",//参数名称
            "value":"1"//参数默认值，可为空
        }
    ],//页面参数
    "redirect": "",//页面重定向，即为其它页面name值
    "sort": 0,//同级别页面排序，越大越考后
    "outlet": false,//是否驻留siteContabs中
    "hide":false//是否在导航中显示
  }
}
```
如果页面为3层结构，即xxx.xxx.xxx.xxx,则主导航显示xxx.xxx，副导航显示xxx.xxx.xxx，siteContab中驻留xxx.xxx.xxx。
若为2层结构，即xxx.xxx.xxx则主导航显示xxx.xxx,副导航显示xxx.xxx.xxx，可通过outlet:true,hide:true的方式实现（列表，添加，修改）的常规页面结构