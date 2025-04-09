const path = require('path');  // Добавляем подключение модуля path
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Добавление source map для отладки
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // Используем path для задания директории
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
});
