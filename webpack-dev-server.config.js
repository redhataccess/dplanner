module.exports = require("./make-webpack-config")({
    env: "development",
    browserPath: '/labs/dplanner',
    devServer: true,
    // publicPath: "http://localhost:2992/labs/dplanner/_assets/",
    publicPath: "/",
    separateStylesheet: true,
    // https://github.com/webpack/webpack/issues/2145
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'inline-source-map',
    debug: true
});