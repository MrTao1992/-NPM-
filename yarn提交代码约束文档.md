# 提交代码约束  使用 yarn run commit 来提交
参考完整文档https://blog.csdn.net/i10630226/article/details/99702447

3.2 优雅的提交
3.2.1 commitizen && cz-lerna-changelog
commitizen 是用来格式化 git commit message 的工具，它提供了一种问询式的方式去获取所需的提交信息。
cz-lerna-changelog 是专门为 Lerna 项目量身定制的提交规范，在问询的过程，会有类似影响哪些 package 的选择。

因为这是整个工程的开发依赖，所以在根目录安装：
yarn add  -D commitizen
yarn add  -D cz-lerna-changelog

安装完成后，在 package.json 中增加 config 字段，把 cz-lerna-changelog 配置给 commitizen。同时因为commitizen不是全局安全的，所以需要添加 scripts 脚本来执行 git-cz

{
"name": "root",
"private": true,
"scripts": {
"commit": "git-cz"
},
"config": {
"commitizen": {
"path": "./node_modules/cz-lerna-changelog"
}
},
"devDependencies": {
"commitizen": "^3.1.1",
"cz-lerna-changelog": "^2.0.2",
"lerna": "^3.15.0"
}

之后在常规的开发中就可以使用 yarn run commit 来根据提示一步一步输入，来完成代码的提交。

3.2.2 commitlint && husky
上面我们使用了 commitizen 来规范提交，但这个要靠开发自觉使用yarn run commit 。万一忘记了，或者直接使用 git commit 提交怎么办？答案就是在提交时对提交信息进行校验，如果不符合要求就不让提交，并提示。校验的工作由 commitlint 来完成，校验的时机则由 husky 来指定。husky 继承了 Git 下所有的钩子，在触发钩子的时候，husky 可以阻止不合法的 commit,push 等等。

安装 commitlint 以及要遵守的规范

yarn add -D @commitlint/cli @commitlint/config-conventional

在工程根目录为 commitlint 增加配置文件 commitlint.config.js 为commitlint 指定相应的规范

module.exports = { 
extends: ['@commitlint/config-conventional'] 
}

安装 husky
yarn add -D husky

在 package.json 中增加如下配置
"husky": { 
"hooks": { 
"commit-msg": "commitlint -E HUSKY_GIT_PARAMS" 
}
}

"commit-msg"是git提交时校验提交信息的钩子，当触发时便会使用 commitlit 来校验。安装配置完成后，想通过 git commit 或者其它第三方工具提交时，只要提交信息不符合规范就无法提交。从而约束开发者使用 yarn run commit 来提交。


3.2.3 eslint && lint-staged
除了规范提交信息，代码本身肯定也少了靠规范来统一风格。

安装

yarn add  -D standard lint-staged
1
eslint就是完整的一套 JavaScript（typescript） 代码规范，自带 linter & 代码自动修正。自动格式化代码并修正，提前发现风格以及程序问题, 同时也支持typescript的代码规范校验，eslintrc.json配置：

{
"extends": [
"yayajing",
"plugin:@typescript-eslint/recommended"
],
"parser": "typescript-eslint-parser",
"plugins": ["@typescript-eslint"],
"rules": {
"eqeqeq":"off",
"@typescript-eslint/explicit-function-return-type": "off",
"no-template-curly-in-string": "off"
}
}

lint-staged staged 是 Git 里的概念，表示暂存区，lint-staged 表示只检查并矫正暂存区中的文件。一来提高校验效率，二来可以为老的项目带去巨大的方便。

package.json配置

// package.json
{
"name": "root",
"private": true,
"scripts": {
"c": "git-cz"
},
"config": {
"commitizen": {
"path": "./node_modules/cz-lerna-changelog"
}
},
"husky": {
"hooks": {
"pre-commit": "lint-staged",
"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
}
},
"lint-staged": {
"*.ts": [
"eslint --fix",
"git add"
]
},
"devDependencies": {
"@commitlint/cli": "^8.1.0",
"@commitlint/config-conventional": "^8.1.0",
"commitizen": "^3.1.1",
"cz-lerna-changelog": "^2.0.2",
"husky": "^3.0.0",
"lerna": "^3.15.0",
"lint-staged": "^9.2.0"
}
}
安装完成后，在 package.json 增加 lint-staged 配置，如上所示表示对暂存区中的 js 文件执行 eslint --fix 校验并自动修复。那什么时候去校验呢，就又用到了上面安装的 husky ，husky的配置中增加pre-commit的钩子用来执行 lint-staged 的校验操作。

此时提交 ts 文件时，便会自动修正并校验错误。即保证了代码风格统一，又能提高代码质量。
