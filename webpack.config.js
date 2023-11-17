const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'public'),
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
               },
            },
         },
         {
            test: /\.(s*)css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader',
            ],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'index.html'),
         filename: 'index.html',
      }),
   ],
   devServer: {
      static: {
         directory: path.join(__dirname, './src'),
       },
       compress: true,
       port: 9000,
   }
};
