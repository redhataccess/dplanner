module.exports = require("./make-webpack-config")({
    env: "development",
    browserPath: '/labs/dplanner',
    devServer: true,
    publicPath: "http://localhost:2992/labs/dplanner/_assets/",
    hotComponents: true,
    //separateStylesheet: true,
    //devtool: "eval",
    devtool: "eval-source-map",
    //devtool: "source-map",
    debug: true
});