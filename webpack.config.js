const { resolve } = require('path');
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = (process.env.NODE_ENV = 'development');
console.log('mode:', devMode);
module.exports = {
  name: 'devTest', //이름
  mode: devMode === 'development' ? 'development' : 'production', //모드 개발 or 프로덕션 NODE_ENV=
  devtool: 'eval',

  entry: {
    main: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: './dist/',
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join('/');
      return `${filepath}/[name].[hash][ext][query]`;
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png)/,
        type: 'asset/resource', // default 생성 파일 이름  : [hash][ext][query]
        generator: {
          filename: 'static/[name][ext]', // 생성 파일 이름 custom
        },
      },
      /* jpg 파일을 generator > filename 을 통해 custom한 경로와 형식으로 결과물 생성 */
      {
        test: /\.(jpg)/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext]', // 생성 파일 이름 custom
        },
      },
      /* svg 파일을 data url scheme로 js 코드 내에 인라인으로 삽입 */
      {
        test: /\.(svg)/,
        type: 'asset/inline',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: false,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['react-refresh/babel'],
        },
        // exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [
    new RefreshWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.BannerPlugin({
      banner: `Build Time : ${new Date().toLocaleString()}`,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(dev)' : '',
      },
    }),
    // new CleanWebpackPlugin(),
  ],
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname, 'dist') },
    hot: true,
    port: 3090,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8095',
    },
  },
};
