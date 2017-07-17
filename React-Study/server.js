// 配置开发Web服务器。
// 支持热重加载和同步测试。

var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack-dev-config');

const bundler = webpack(config);
var app = new (require('express'))();
var port = 3000;

// app.use(webpackDevMiddleware(bundler, {
//   noInfo: true,
//   // 如果false，将会给你列出一大堆无聊的信息。
//
//   publicPath: config.output.publicPath,
//   stats: {
//     colors: true
//   }
// }));
app.use(webpackHotMiddleware(bundler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});

// // 热模块替换
// browserSync({
//   port: 8888,
//   ui: {
//     port: 8889
//   },
//   server: {
//     baseDir: 'src',
//
//     // 中间件
//     middleware: [
//       historyApiFallback(),
//
//       webpackDevMiddleware(bundler, {
//         // 将中间件绑定到的公共路径
//         publicPath: config.output.publicPath,
//
//         noInfo: false, // 不显示控制台信息（仅警告和错误）
//         quiet: false, // 不显示任何控制台
//         stats: { // 格式化数据选项
//           assets: false,
//           colors: true,
//           version: false,
//           hash: false,
//           timings: false,
//           chunks: false,
//           chunkModules: false
//         },
//
//         // for other settings see
//         // http://webpack.github.io/docs/webpack-dev-middleware.html
//       }),
//
//       // bundler should be the same as above
//       webpackHotMiddleware(bundler)
//     ]
//   },
//
//   // no need to watch '*.js' here, webpack will take care of it for us,
//   // including full page reloads if HMR won't work
//   files: [
//     'src/*.html'
//   ]
// });
