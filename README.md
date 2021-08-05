===========================

##########掌门学习乐园公用库开发仓库

## 切换镜像源
npm config set registry=http://registry.npmjs.org  // npmjs源

npm config set registry http://registry.npm.taobao.org  // 淘宝镜像地址

npm config set registry http://registry.npm.zmops.cc    // 发布公司npm地址

## VsCode 编辑忽略配置
```
  "files.exclude": {
    "**/*.meta": true,
    "**/**/__tests__": true,
    "**/**/dist": true,
    "**/**/libs": true,
    "**/**/node_modules": true,
    "**/**/README.md": true,
    "**/**/tsconfig.json": true
},
```