# react-native-template-ts

## 创建脚手架步骤
1、创建文件夹，执行npm init，填入响应信息，完成npm项目的初始化配置
或
通过运行react-native init 项目名称创建，根据需要配置，配置完成删除ios、android文件夹

2、创建代码结构
```
.
├── README.md
├── app
│   ├── assets
│   │   ├── fonts
│   │   └── icons
│   ├── components
│   │   └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── container
│   ├── custom.d.ts
│   ├── images.d.ts
│   ├── model
│   │   └── index.ts
│   ├── styles
│   │   └── index.ts
│   └── utils
│       └── index.ts
├── dependencies.json 模板工程中所依赖的第三方库
├── devDependencies.json 模板工程中开发所依赖的第三方库
└── package.json
```

3、上传npm
注意：上传模板的名称必须遵循react-native-template-xxx
```
1、注册账号 https://www.npmjs.com/
2、终端执行命令npm adduser --registry http://registry.npmjs.org
3、根据提示输入第一步中注册好的账号、密码、邮箱
4、将当前路径切换到要发布的模板的文件夹中（保证有package.json文件）
5、终端执行命令npm publish --registry http://registry.npmjs.org 进行发布
6、发布成功后通过【https：//www.npmjs.com/+ 插件名 】可以在网页访问
```

## 脚手架使用
react-native init 【项目名称】 --template ts-redux

## cocoaPods安装
- 参照 https://www.jianshu.com/p/f43b5964f582