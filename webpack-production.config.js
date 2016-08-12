module.exports = require("./make-webpack-config")({
    env: "production",
    // For this particular app there are not multiple entry points so commons chunk isn't helpful
    //commonsChunk: true,
    longTermCaching: true,
    separateStylesheet: true,
    minimize: true
});
