const { resolve } = require('path');
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const childProcess = require('child_process');

const commit = childProcess.execSync('git rev-parse --short HEAD');
const user = childProcess.execSync('git config user.name');
const date = new Date().toLocaleString();

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
      // 파일 경로지정
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join('/');
      return `${filepath}/[name].[hash][ext][query]`; //파일경로 이름 확장자 쿼리
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      api: path.resolve(__dirname, './src/api/'),
      utils: path.resolve(__dirname, './src/utils/'),
      store: path.resolve(__dirname, './src/store/'),
      pages: path.resolve(__dirname, './src/page/'),
      layout: path.resolve(__dirname, './src/layout/'),
      components: path.resolve(__dirname, './src/components/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: 'static/[name][ext]', // 생성 파일 이름 custom
        },
      },
      // ,
      // {
      //   test: /\.(png)/,
      //   type: 'asset/resource', // default 생성 파일 이름  : [hash][ext][query]
      //   generator: {
      //     filename: 'static/[name][ext]', // 생성 파일 이름 custom
      //   },
      // },
      // /* jpg 파일을 generator > filename 을 통해 custom한 경로와 형식으로 결과물 생성 */
      // {
      //   test: /\.(jpg)/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'static/[name][ext]', // 생성 파일 이름 custom
      //   },
      // },
      // /* svg 파일을 data url scheme로 js 코드 내에 인라인으로 삽입 */
      // {
      //   test: /\.(svg)/,
      //   type: 'asset/inline',
      // },
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
        exclude: path.join(__dirname, 'node_modules'), // 바벨에서 제외
      },
    ],
  },
  plugins: [
    new RefreshWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.BannerPlugin({
      banner: `Build Time : ${date} \nCommit : ${commit} \nUser : ${user} `, // main.js 배너정보
    }),
    new HtmlWebpackPlugin({
      // html 치환 플러그인
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(dev)' : '',
      },
    }),
    // new CleanWebpackPlugin(), // dist 재생성
  ],
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname, 'dist') },
    hot: true,
    port: 3090,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
};
