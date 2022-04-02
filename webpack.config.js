const path = require('path')
const { BannerPlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const { name, version } = require('./package.json')
const banner = `${name}@${version}`

module.exports = (env, args) => ({
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  devtool: args.mode === 'development' ? 'cheap-module-source-map' : false,
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: path.resolve(__dirname, 'public')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new BannerPlugin(banner),
    new RemovePlugin({
      before: {
        include: [
          'dist'
        ]
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: [
              '*.DS_Store',
              '**/*.js'
            ]
          }
        }
      ]
    })
  ]
})
