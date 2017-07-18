// 配置开发Web服务器。
// 支持热重加载和同步测试。

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack-dev-config';

const bundler = webpack(config);

// 热模块替换
browserSync({
  port: 8888,
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
        quiet: false, // 不显示任何控制台
        stats: { // 格式化数据选项
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});
