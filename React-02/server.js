// 配置开发Web服务器。
// 支持热重加载和同步测试。

import browserSync from 'browser-sync'; // 多平台同步刷新
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'; // 文件放入内存
import webpackHotMiddleware from 'webpack-hot-middleware'; // 热启动
import config from './webpack-dev-config'; // 引入配置文件

const bundler = webpack(config);

// 热模块替换
browserSync({
  port: 8889,
  ui: {
    port: 8889
  },
  server: {
    baseDir: 'src',
    
    // 中间件
    middleware: [
      historyApiFallback(),

      webpackDevMiddleware(bundler, {
        // 将中间件绑定到的公共路径
        publicPath: config.output.publicPath,

        noInfo: false, // 不显示控制台信息（仅警告和错误）
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }

        // 其他参数见
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // 热启动
      webpackHotMiddleware(bundler)
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // 载如果HMR失败重载页面
  files: [
    'src/*.html'
  ]
});
