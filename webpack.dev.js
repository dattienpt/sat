const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const alias = common.resolve.alias;

if (process.env.NODE_ENV === "mock") {
   alias["REQUESTS"] = path.resolve(__dirname, "mock/request");
   alias["INTERACTION"] = path.resolve(__dirname, "mock/interaction");
}

module.exports = merge(common, {
   mode: "development",
   devtool: "inline-source-map",
   devServer: {
      contentBase: "./dist",
      historyApiFallback: true,
      host: "localhost"
   },
   resolve: {
      alias
   }
});
