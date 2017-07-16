# react-to-configure
react热更替配置
1. 初步引入webpack：实现模块管理

在根目录下创建webpack.dev.js文件：

const path = require('path')
const root = __dirname

module.exports = {
  // 入口文件
  entry: path.resolve(root, 'src/main.js'),
  // 出口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist')
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  }
}
这里我们通过webpack去执行babel进行编译，所以将babel的配置抽出到一个文件，根目录下创建.babelrc：

{
  "presets": [
    ["es2015", {"modules": false}], // webpack 2 本身已支持es6 module
    "react"
  ]
}
将缺少的包都安装上：

$ npm install --save react react-dom
$ npm install --save-dev webpack babel-cli babel-loader babel-preset-es2015 babel-preset-react
当前的package.json模块如下：

"dependencies": {
  "react": "^15.4.2",
  "react-dom": "^15.4.2"
},
"devDependencies": {
  "babel-cli": "^6.23.0",
  "babel-loader": "^6.3.2",
  "babel-preset-es2015": "^6.22.0",
  "babel-preset-react": "^6.23.0",
  "webpack": "^2.2.1"
}
最后修改一下现有的文件：

改一下index.html的script引入位置：
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>React Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
main.js中使用import引入模块
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app')
)
修改package.json的scripts
"scripts": {
  "dev": "webpack --config webpack.dev.js"
}
测试看看，编译之后打开浏览器

$ npm run dev
2. 完善webpack配置：实现监听文件改动，自动编译并刷新浏览器

实现监听文件改动然后自动编译新的bundle.js，我们需要用到webpack-dev-server去创建一个本地服务器，同时，可以结合html-webpack-plugin去生成index.html，先安装：

$ npm install webpack-dev-server html-webpack-plugin --save-dev
先说说html-webpack-plugin的使用

将我们根目录下的index.html改名为template.html，顾名思义，现在作为一个模板，通过插件会在dist中生成一个对应的index.html文件，template.html中去掉多余的东西：

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>React Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- js文件会自动插入到这里，无需自己填写 -->
  </body>
</html>
在webpack.dev.js中加入html-webpack-plugin的配置：

// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  // 其他配置保持不变
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    })
  ]
}
现在通过npm run dev，就能看到生成的dist/index.html

接下来引入webpack-dev.server，webpack.dev.js配置修改如下：

module.exports = {
  entry: [
    'webpack-dev-server/client',
    path.resolve(root, 'src/main.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist'),
    publicPath: '/'
  },
  // ...
  // 其他配置保持不变
  // ...
  devServer: {
    contentBase: path.resolve(root, 'dist'),
    publicPath: '/',
    port: 8080,
    historyApiFallback: true
  }
}
package.json中的scripts修改如下：

"scripts": {
  "dev": "webpack-dev-server --config webpack.dev.js"
}
通过npm run dev就可以启动一个本地服务器了，只要文件有改动，就会自动刷新浏览器

3. 完善webpack配置：实现热替换（HMR）

自动刷新依然不尽兴，有时候仅仅改动了某个组件的细微地方（改动文案、样式等等），然后导致整个页面刷新了，有些调试步骤又得重新来一次

下面将讲解如何实现react的热替换

实现热替换需要用到react-hot-loader，使用npm安装：

（该教程发布时，需要添加@next才能安装3.x.x版本）

$ npm install --save-dev react-hot-loader@next
更改webpack.dev.js的配置：

// ...
const webpack = require('webpack')

module.exports = {
  entry: [
    'react-hot-loader/patch', // 激活HMR
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve(root, 'src/main.js')
  ],
  // ...
  // 其他配置保持不变
  // ...
  devServer: {
    hot: true, // 激活服务器的HMR
    contentBase: path.resolve(root, 'dist'),
    publicPath: '/',
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    }),
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
    new webpack.NamedModulesPlugin() // 执行热替换时打印模块名字
  ]
}
.babelrc也有相应的改动：

{
  "presets": [
    ["es2015", {"modules": false}],
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel" // 添加HMR支持
  ]
}
为了测试热替换是否生效，在src目录添加一个App.js文件，作为根组件：

import React from 'react'

const App = () => (
  <h1>Hello, world!</h1>
)

export default App
main.js中引入并渲染App，同时又一些为支持HMR的改动：

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const render = (App) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}
重新运行npm run dev，在对App中的Hello, world!进行改动时，页面并不是整个刷新的，至此完成热替换的配置
