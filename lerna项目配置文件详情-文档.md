# lerna项目配置文件详情-文档
[toc]
## lerna项目基础目录

|-- lerna项目目录
    |-- .gitignore                          //git项目忽略配置文件
    |-- lerna.json                          //lerna配置文件
    |-- package.json                        //npm包配置文件
    |-- README.md
    |-- yarn.lock                           //yarn下载包依赖配置文件
    |-- packages                            //所有npm都放在这里
        |-- zm_template                     //npm开发模板
            |-- package.json
            |-- README.md
            |-- tsconfig.json               //为了支持ts开发而配置
            |-- src
            |   |-- index.ts
            |   |-- interfaces.ts
            |   |-- Template.ts
            |-- __tests__                   //单元测试可以再这里玩哦！
           
           
## lerna.json文件详解
```
{
  "packages": [
    "packages/*"                        //子包所在目录
  ],
  "useWorkspaces": true,                //是否使用Workspaces
  "npmClient": "yarn",                  //使用yarn工具操作npm
  "version": "0.0.0"
}

```

## package.json文件详解
```
{
  "name": "root",
  "private": true,                  //使用yarn的Workspaces必须是 private 项目才可以开启 workspaces
   "workspaces": [
      "packages/*"                  //workspaces包含目录
   ],
  "devDependencies": {              //开发依赖（打包时不会将其编译）
    "lerna": "^3.22.1"
  }
}

```
## packages/*/tsconfig.json 文件详解
```
{
  "compilerOptions": {                                  //配置编译选项
    "moduleResolution": "Node",                         // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "module": "ES6",                                    // 生成代码的模板标准
    "target": "es5",                                    //目标语言的版本
    "lib": [                                            // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置
      "dom",
      "es5",
      "es2015.promise",
      "es2015.proxy",
      "es2015",
      "es2016.array.include"
    ],
    "sourceMap": true,                                  // 生成目标文件的sourceMap文件
    "downlevelIteration": true,                         //降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,                            // 允许export=导出，由import from 导入
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "declaration": true,                                //生成声明文件，开启后会自动生成声明文件
    "removeComments": false                             // 删除注释 
  },
  "exclude": [                                          //编译剔除
    "dist"
  ],
  "dtsGenExclude": [                                    //构建剔除
    "__tests__/**/*"
  ]
}
```
## packages/*/package.json 文件详解
```
{
  "name": "zm_core",                                //npm包名称
  "version": "1.0.0",                               //包版本
  "description": "核心模块库",                       //包描述
  "keywords": [                                     //搜索包关键字
    "zm_core",
    "zmpark_core"
  ],
  "author": "DESKTOP-LP244C2\\22471 <2247121604@qq.com>",           //包作者
  "homepage": "https://gitlab.zmaxis.com/game/web/zm_libs.git",     //项目所在地址
  "license": "ISC",                                                 //包项目权限许可
  "main": "dist/cjs/lib/index.js",                                  //main 字段指定了程序的主入口文件
  "module": "dist/es/lib/index.js",                                 //rollup 打包需要的入口文件
  "typings": "dist/cjs/types",                                      //TypeScript 的入口文件
  "directories": {
    "lib": "dist",
    "test": "__tests__"
  },
  "files": [                                                        //内容是模块下文件名或者文件夹名
    "libs",
    "src",
    "dist"
  ],
  "publishConfig": {                                                //npm发布地址
    "registry": "http://registry.npm.zmops.cc"
  },
  "repository": "https://gitlab.zmaxis.com/game/web/zm_libs.git",   //npm镜像地址
  "scripts": {                                                      //可执行的脚本命令
    "watch:cjs": "zmcli build -w true -f cjs",
    "build:cjs": "zmcli build -f cjs",
    "build:es": "zmcli build -f es",
    "build:umd": "zmcli build -f umd:zmcore",
    "build:iife": "zmcli build -f iife:zmcore",
    "build:system": "zmcli build -f system:zmcore",
    "build:all": "npm run build:cjs&&npm run build:es&&npm run build:umd&&npm run build:iife"
  },
  "devDependencies": {                                              //开发环境依赖
    "zmpark_cli": "^1.0.0"
  }
}

```


