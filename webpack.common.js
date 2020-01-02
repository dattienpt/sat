const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const themeConfig = {
  'primary-color': '#1DA57A', // primary color for all components
  'link-color': '#1890ff', // link color
  'success-color': '#52c41a', // success state color
  'warning-color': '#faad14', // warning state color
  'error-color': '#f5222d', // error state color
  'font-size-base': '14px', // major text font size
  'heading-color': '#1DA57A', // heading text color
  'text-color': '#92973f', // major text color
  'text-color-secondary': '#1DA57A', // secondary text color
  'disabled-color': 'rgba(0, 0, 0, .25)', // disable state color
  'border-radius-base': '4px', // major border radius
  'border-color-base': '#d9d9d9', // major border color
  'box-shadow-base': '#1DA57A', // major shadow for layers
  'body-background': '#b8d9ab'// Background color for `<body>`
}

const target = path.resolve(__dirname, 'src/configs/prod.js');
const getCurrentEvn = () => {
  const evnConfig = process.env.evnConfig;
  switch (evnConfig) {
    case 'development':
      return path.resolve(__dirname, 'src/configs/dev.js');
    case 'prod':
      return path.resolve(__dirname, 'src/configs/prod.js');
    default:
      return path.resolve(__dirname, 'src/configs/dev.js');
  }
};
const conFig = getCurrentEvn();
const copy = async (source, target, callback) => {
  await fs.readFile(source, 'utf8', async (err, data) => {
    if (err) {
      return callback(err);
    } else {
      await fs.writeFile(target, data, callback);
    }
  });
};

copy(conFig, target, err => {
  if (err) {
    return console.log('copy error', err);
  } else {
    console.log('copy current env', conFig);

  }
});

const config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash:8].bundle.js',
    //path: path.resolve(__dirname, 'dist'),
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.json', '.css', '.png', '.jpg', '.gif', '.jpeg', '.svg'
    ],
    alias: {
      IMAGE: path.resolve(__dirname, './src/assets'),
      REQUESTS: path.resolve(__dirname, './src/http/requests'),
      INTERACTION: path.resolve(__dirname, './src/interaction'),
      UTILS: path.resolve(__dirname, './src/utils'),
      STYLES: path.resolve(__dirname, './src/styles')
    },
    modules: ['src', 'node_modules']
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
            plugins: []
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeConfig,
              javascriptEnabled: true,
            },
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      }
    ]
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
      chunks: 'async'
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
