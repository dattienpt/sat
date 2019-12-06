const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const target = path.resolve(__dirname, "src/configs/prod.js");
const getCurrentEvn = () => {
   const evnConfig = process.env.evnConfig;
   switch (evnConfig) {
      case "development":
         return path.resolve(__dirname, "src/configs/dev.js");
      case "prod":
         return path.resolve(__dirname, "src/configs/prod.js");
      default:
         return path.resolve(__dirname, "src/configs/dev.js");
   }
};
const conFig = getCurrentEvn();
const copy = async (source, target, callback) => {
   await fs.readFile(source, "utf8", async (err, data) => {
      if (err) {
         return callback(err);
      } else {
         await fs.writeFile(target, data, callback);
      }
   });
};

copy(conFig, target, err => {
   if (err) {
      return console.log("copy error", err);
   } else {
      console.log("copy current env", conFig);
   }
});

const config = {
   entry: {
      app: "./src/index.js"
   },
   output: {
      filename: "[name].[hash:4].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/"
   },
   resolve: {
      extensions: [
         ".js",
         ".jsx",
         ".json",
         ".css",
         ".png",
         ".jpg",
         ".gif",
         ".jpeg",
         ".svg"
      ],
      alias: {
         IMAGE: path.resolve(__dirname, "./src/assets"),
         REQUESTS: path.resolve(__dirname, "./src/http/requests"),
         INTERACTION: path.resolve(__dirname, "./src/interaction"),
         UTILS: path.resolve(__dirname, "./src/utils"),
         STYLES: path.resolve(__dirname, "./src/styles")
      },
      modules: ["src", "node_modules"]
   },
   module: {
      rules: [
         {
            test: /\.less$/,
            use: [
               {
                  loader: "style-loader"
               },
               {
                  loader: "css-loader"
               },
               {
                  loader: "less-loader",
                  options: {
                     javascriptEnabled: true
                  }
               }
            ]
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                  plugins: []
               }
            }
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         },
         {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
         },
         {
            test: /\.svg$/,
            use: "file-loader"
         },
         {
            test: /\.png$/,
            use: [
               {
                  loader: "url-loader",
                  options: {
                     mimetype: "image/png"
                  }
               }
            ]
         }
      ]
   },
   optimization: {
      splitChunks: {
         minChunks: 2,
         chunks: "async"
      }
   },
   plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      new LodashModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: "./src/index.html"
      })
   ],
   optimization: {
      runtimeChunk: "single",
      splitChunks: {
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: "vendors",
               chunks: "all"
            }
         }
      }
   }
};

module.exports = config;
