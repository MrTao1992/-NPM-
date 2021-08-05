# 配置lerna+yarn管理多npm方法-文档

[toc]
#### 下载zm_libs项目：

[https://gitlab.zmaxis.com/game/web/zm_libs.git](https://gitlab.zmaxis.com/game/web/zm_libs.git)下载后，打开项目所在目录（如：D:\WorkSpace\zm_libs）

#### 项目目录下打开cmd命令窗口：

方法1.ctrl+r  --->  输入cmd  --->cd 项目所在目录

方法2.项目目录导航栏下输入:cmd 点击回车键

#### 全局配置lerna+yarn：

设置npm镜像地址：npm config set registry http://registry.npm.taobao.org
全局安装yarn ：npm i -g yarn
全局安装lerna ：npm i -g lerna 

#### 使用lerna为所有npm添加依赖：

lerna add [包名称] 

##### Examples
```
lerna add zmpark_cli  [--dev添加到开发环境可选，若不填默认添加到正式依赖环境]
```

#### 如何创建一个自己的npm开发包

```
创建开发包：
进入packages
拷贝复制zm_template
更改文件夹名称为自己想要的名称
修改packages.json文件
*      "name": "包名称",
*      "description": "填写项目模板描述",
*      "keywords": [
*         "包名称搜索关键词"
*       ],
*     "build:umd": "zmcli build -f umd:包名称",
*     "build:iife": "zmcli build -f iife:包名称",
*     "build:system": "zmcli build -f system:包名称",
```


#### 构建自己的npm包
构建所有npm包：
```
lerna run build:all
```

构建指定包：
```
lerna run --scope 包名称  build:all
```

#### 构建配置项在tsconfig.json中可以增加配置
dtsGenExclude 生成.d.ts文件时所要忽略的比如 core包中的
```
"dtsGenExclude": [
     "__tests__/**/*"
 ]
```
忽略测试目录下的文件，不生成声明文件

externalTag 用来判断引用的模块是否做为外部引用(不编译进来) 因为packages内的A包，引用了B包，会把A和B的代码编译成一个js 参考:
```
"externalTag":"zm_cli"
或
"externalTag":["zm_cli"]
```

#### 上传自己的npm包
设置npm镜像为公司npm地址:
```
npm set registry http://registry.npm.zmops.cc
```

npm登陆:
```
npm adduser --registry http://registry.npm.zmops.cc
```

账号&密码&邮箱：默认公司登陆账号密码邮箱

发布到npm:

运行lerna updated来决定哪一个包需要被publish
```
lerna updated
```
如果有必要，将会更新lerna.json中的version
将所有更新过的的包中的package.json的version字段更新
将所有更新过的包中的依赖更新
为新版本创建一个git commit或tag
将包publish到npm上
```
lerna publish
```







# 温馨提示

若有项目文件配置相关疑问请查看“<u>lerna项目配置文件详情-文档</u>”

若有lerna使用相关疑问请查看“<u>lerna常用命令整理-文档</u>”
