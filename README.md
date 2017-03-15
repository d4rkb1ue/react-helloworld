# 介绍

从零开始构建一个前端脚手架，技术栈：

- React 为数据提供渲染为 HTML 的视图的开源 JavaScript 库
- Babel 是一个 JavaScript 编译器，用于转化 ES2015/JSX 代码
- Webpack 前端资源加载/打包工具，满足前端工程化需要
- antd-react 使用 Ant Design UI 库的 React 实现

# [在我的 Blog 查看完整介绍](https://drkbl.com/react-hello-world/)

# React

React 可以在浏览器运行，也可以在服务器运行。

## 在浏览器中运行
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <!-- React 的核心库 -->
    <script src="https://unpkg.com/react@latest/dist/react.js"></script>
    <!-- 提供与 DOM 相关的功能 -->
    <script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <!-- 将 JSX 语法转为 JavaScript 语法 -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      /* ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点 */
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

> It does a slow runtime code transformation, so don't use it in production.

`<script type="text/babel">...</script>` 的部分就是 React 独有的 JSX 语法，显然跟 JavaScript 不兼容，是 JavaScript 和 HTML 混写的一种语法。凡是使用 JSX 的地方，都要加上 `type="text/babel"` 。

在生产环境使用时，应使用 babel 将 JSX 转码，如

```
$ babel src --out-dir build
```

上面命令可以将 src 子目录的 js 文件进行语法转换，转码后的文件全部放在 build 子目录。


## 服务器端运行

```
$ npm init
$ npm install --save react react-dom
```

除此之外，需要安装 babel 和 webpack 作为 react 的运行时。

# Babel

## 配置文件

使用 Babel 前，需要先创建配置文件是 `.babelrc` ，存放在项目的根目录下。`presets` 字段设定转码规则，
```
{
  "presets": [
    "es2015",
    "react",
  ],
  "plugins": []
}
```

## 运行时

使用 Babel 的命令行转码工具 babel-cli，
```
$ npm install --save-dev babel-cli
```

为了避免安装在全局环境中（项目产生了对环境的依赖，且无法管理版本），选择安装为本地（locally）模块，保存为 devDependencies （仅用于开发）。在使用时，

> `npm run` 新建的这个 Shell，会将当前目录的 `node_modules/.bin` 子目录加入 `PATH` 变量，执行结束后，再将 `PATH` 变量恢复原样。
> 
> 这意味着，当前目录的 `node_modules/.bin` 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写 `mocha test` 就可以了。
> 
> `"build": "babel src -d lib"` == `"test": "./node_modules/.bin/babel src -d lib"`

package.json
```json
...
"scripts": {
    "build": "babel src -d lib"
}
...
```

# Webpack

同样，使用
```
$ npm install --save-dev webpack
```

在本地安装 webpack 。在 `package.json` 规定本地命令，
```json
"scripts": {
  ...
  "webpack": "webpack --progress --colors",
  ...
}
```

`--progress --colors` 让 log 打印出进度并且以彩色显示。

以后需要执行 `$ webpack` 的地方需要用 `$ npm run webpack` 来替代，如此也避免了全局安装。

## Hello World

新建 `main.js`
```js
document.write("Hello World!");
```

和 `index.html` ，
```html
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <script src="bundle.js" charset="utf-8"></script>
</body>
</html>
```

运行，
```
$ webpack ./main.js bundle.js
```


在浏览器中打开 `index.html` ，
```
$ open -a safari index.html
```

hello world!

## 使用配置文件

新建 `webpack.config.js` 来规定执行 webpack 编译的参数，
```js
var path = require("path");
module.exports = {
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  }
};
```

入口依然为 `./main.js` ，同时规定编译输出到 `./build/bundle.js` 。将 `index.html` 也移动到 `./build/` 目录下。

直接在 `webpack.config.js` 运行，
```
$ webpack
```

```
$ open -a safari index.html
```

## 运行在 Webpack Dev Server

> This binds a small express server on localhost:8080 which serves your static assets as well as the bundle (compiled automatically). It automatically updates the browser page when a bundle is recompiled (SockJS). Open http://localhost:8080/webpack-dev-server/bundle in your browser.

安装它，

```
$ npm install --save-dev webpack-dev-server
```

全局安装的话，执行 `$ webpack-dev-server` 即可开启一个 express 服务器，默认地址为 `http://localhost:8080/` ，使用 `--port <number>` 参数定义其他端口。更多命令见 [API](https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli)。

我们采取的本地安装，在 `package.json` 规定本地命令，需要用 `$ npm run test` 替代即可，

```json
...
"scripts": {
    "test": "webpack-dev-server --progress --colors --content-base build/",
    "webpack": "webpack --progress --colors"
  },
...
```



## Babel-loader 和 Hello World! by React

因为 Webpack 本身只支持 JavaScript ，为了让它支持 React ， 需要安装 Babel-loader 以编译 React 的 JSX 文件。loader 是 Webpack 的一个机制。

创建 `./main.jsx` ，
```
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#main')
);
```

```js
const React = require('react');
const ReactDOM = require('react-dom');
```

是 ES5 的写法，我们可以用 ES2015 的写法代替之（反正有 babel），
```js
import React from 'react';
import ReactDOM from 'react-dom';
```


安装，
```
$ npm i --save-dev babel-loader
```

修改 `webpack.config.js` 
```js
var path = require("path");
module.exports = {
  entry: "./main.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
```

对于 `/\.js[x]?$/` `test` 通过的文件，执行下面的 loader， `query` 部分和上面指定 babel 的配置文件一致。另一种写法 `loader: 'babel-loader?presets[]=es2015&presets[]=react'`。

HTML 文件无需修改，依然执行 `npm run test` 即可运行 React 版的 Hello World!

## 添加 CSS 支持

我们需要额外安装 loader 来支持 CSS

```
npm i --save css-loader style-loader
```

添加一个 loader ，
```js
module: {
    loaders: [
    {
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.css$/, 
      loader: 'style-loader!css-loader' 
    },]
  }
};
```

以加入 [antd/DatePicker](https://ant.design/docs/react/introduce-cn) 为例，在 `main.jsx` 中载入 CSS 文件，还有 DatePicker（日期选择器） 组件，
```js
import DatePicker from 'antd/lib/date-picker';  // 加载 JS
import 'antd/lib/date-picker/style/css';        // 加载 CSS
```

再修改 HTML 添加 DatePicker（日期选择器）的占位，
```html
<div id="antd"></div>
<script src="bundle.js" charset="utf-8"></script>
```

继续修改 `main.jsx` ，加入渲染，
```js
ReactDOM.render(
  <DatePicker />,
  document.querySelector('#antd')
);
```

执行渲染，查看结果～

`DatePicker` 是一个 React 组件类，像插入普通 HTML 标签一样，在网页中插入这个组件。所有组件类都必须有自己的 render 方法，用于输出组件。就像这样，

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
```

---

*让 Sublime 支持 JSX 的渲染，可以用 [babel-sublime](https://github.com/babel/babel-sublime) 解决，安装后设置 syntax 为 `JavaScript(Babel)`*


---
# Reference
- [Babel 入门 - 阮一峰](http://www.ruanyifeng.com/blog/2016/01/babel.html)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [Webpack Getting-started](http://webpack.github.io/docs/tutorials/getting-started/)
- [ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos)
- [Ant Design of React](https://ant.design/docs/react/introduce-cn)
- []http://www.ruanyifeng.com/blog/2015/03/react.html
- [Moment.js](http://momentjs.com)