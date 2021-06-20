---
title: 'webpack'
---

```JS
const Merge = require('webpack-merge');
const BaseConfig = require('./webpack.common');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/* 压缩JS, 用于替换webpack默认压缩功能 */
const TerserJSPlugin = require('terser-webpack-plugin');
/* 压缩CSS, 用于替换webpack默认压缩功能 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let ProdConfig = Merge(BaseConfig, {
  mode: 'production',
  /* 生产模式, 自动添加 ModuleConcatenationPlugin插件, 用于tree shaking */
  /* tree shaking: 移除上下文未引用的代码; 该清除处会提示 'unused harmony export cube' */
  // optimization: {
  //   usedExports: true
  // },
  // devtool: 'source-map',
  /* 标识, 不用打包的项 */
  externals: {
    // 'vue': 'Vue'
  },
  optimization: {
    minimize: false /* 是否混淆压缩 */ ,
    // runtimeChunk: 'single', /* 独立出'引导模板', 确保js文件内容contenthash正确 */
    /* 替换webpack默认的压缩功能 */
    minimizer: [
      new TerserJSPlugin({
        // include: , /* 作用域 */
        // exclude: , /* 非作用域 */
        // sourceMap: true, /* 生产环境开始source map时, 要设置成true */
        terserOptions: {
          compress: {
            drop_debugger: true /* 生产环境, 去掉debugger */ ,
            drop_console: false /* 生产环境, 去掉console */ ,
          },
          output: null,
        },
        /* 是否将注释提取到单独的文件中; 会生成 xxx.js.LICENSE.txt 文件 */
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    /* 分离公共代码 */
    splitChunks: {
      // chunks: 'all',  /* 范围: 异步+非异步 */
      automaticNameDelimiter: '-' /* 名称连接符; vendor{连接符}原包名称.js */ ,
      // minSize: 30000, /* 提取的模块(压缩前)的最小大小; eg: lodash, 500k+; 不限制 */
      maxSize: 0 /* 提取的模块(压缩前)的最大大小; 不限制 */ ,
      // minChunks: 6, /* 被引用的次数最小值; 入口? */
      // name: 'common', /* 自定义名称: [自定义值].xxx.js */
      /* ***缓存组*** */
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
          // minChunks: 1,
          minSize: 0,
        },
        /* Vue框架 */
        vueBase: {
          priority: 10,
          name: 'vue',
          test: (module) => {
            return /node_modules\/vue\//.test(module.context);
          },
          chunks: 'initial',
          enforce: true,
        },
        /* vue-router */
        vueRouter: {
          priority: 10,
          name: 'vue-router',
          test: (module) => {
            return /node_modules\/vue\-router\//.test(module.context);
          },
          chunks: 'initial',
          enforce: true,
        },

        lodashBase: {
          name: 'lodash',
          priority: 10,
          test: (module) => {
            // console.log('* babel', (module.context), )
            return /\/node_modules\/lodash/.test(module.context);
          },
          chunks: 'initial',
          enforce: true,
        },
        /* babel, 单未生效 */
        babelBase: {
          name: 'babel',
          test: (module) => {
            // console.log('* babel', (module.context), /\/node_modules\/@babel/.test(module.context))
            return /\/node_modules\/@babel/.test(module.context);
          },
          chunks: 'all',
          priority: 10,
          enforce: true,
        },

        /* 被不同chunk引用超过n次的, 抽取为common */
        common: {
          test: /[\\/]node_modules[\\/]/ /* 规则 */ ,
          name: 'common',
          chunks: 'initial',
          priority: 1 /* 优先级: 从小到大依次重要 */ ,
          minChunks: 1,
        },
      },
    },
  },
  module: {
    rules: [
      /* css */
      {
        test: /\.(scss|css|sass)$/,
        use: [
          /* MiniCssExtractPlugin处理, 使生成单独文件 */
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              /* css中引用的文件的公共路径; 不是css文件放置的路径 */
              publicPath: '/',
              // publicPath: (resPath, context) => {
              //   /* .scss的绝对路径 */
              //   return './'
              // },
              esModule: true,
              // hmr:
            },
          },
          'css-loader' /* 将 CSS 转化成 CommonJS 模块 */ ,
          {
            /* 兼容性 */
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          {
            /* 全局scss变量 */
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, '../src/style/variable.scss'),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
            },
          },
          // 'sass-loader', /* 将 Sass 编译成 CSS，默认使用 Node Sass */
        ],
      },
    ],
  },
  plugins: [
    /* 将css单独成文件 */
    new MiniCssExtractPlugin({
      filename: 'index.[hash:8].css' /* 入口chunk名称 */ ,
      chunkFilename: '[name].chunk.css' /* 非入口chunk名称 */ ,
    }),

    new webpack.HashedModuleIdsPlugin(),
  ],
  /* 控制打包后, 展示的信息, 参考: https://webpack.docschina.org/configuration/stats/ */
  stats: {
    env: false,
    hash: false /* 打包的哈希值 */ ,
    modules: false /* 添加构建模块信息 */ ,
    performance: true /* 文件列表中, 用颜色提示影响性能的文件 */ ,
  },
  /* 打包结果中, 用明文提示影响性能的文件 */
  performance: {
    hints: false /* 文件大小超限警告: false|'warning'|'error' */ ,
    maxEntrypointSize: 1024 * 300 /* 入口文件的限制 */ ,
    maxAssetSize: 1024 * 100 /* 单个文件的限制 */ ,
  },
});

module.exports = ProdConfig;
```
