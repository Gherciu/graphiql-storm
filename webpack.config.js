const path = require('path');

module.exports = {
  mode:process.env.NODE_ENV || 'development',
  entry: path.join(__dirname,'./src/index.jsx'),
  output: {
    path: path.join(__dirname, './dist/'),
    filename:'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(flow|graphql)$/,
        use:{
          loader: 'ignore-loader'
        }
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
          test: /\.(css|scss|sass)$/,
          use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader"
          ]
      }
    ]
  }
};
