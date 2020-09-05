const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, arg) => {
  console.log(`mode: ${arg.mode}`);

  const isProduction = arg.mode === 'production';

  return {
    entry: {
      index : [
        path.join(__dirname, 'src/js/index.ts'),
        path.join(__dirname, 'src/css/index.scss')
      ]
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'js/[name].bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }]
      },{
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader'
        }]
      },{
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },{
          loader: 'css-loader',
          options: {
            url: false
          }
        },{
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        },{
          loader: 'sass-loader'
        }]
      },{
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: false
          }
        }
      }]
    },
    resolve: {
      extensions: [".ts"]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction
            }
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].bundle.css',
      }),
      new CopyWebpackPlugin([{
        from: 'src/img',
        to: 'img'
      }]),
      new ImageminWebpackPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template : 'src/html/index.ejs'
      })
    ]
  };
};