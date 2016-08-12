"use strict";

let request = require("request");

// Load the webpack stats.json then load the index.js (express)
request({url: 'http://127.0.0.1:2992/labs/dplanner/_assets/stats.json', json: true}, (err, response, stats) => {
    if (err) return console.error(err);
    require("./index")({
        env: 'development',
        stats: stats,
        separateStylesheet: true,
        index: 'index',
        email: 'smendenh@redhat.com',
        browserPath: '/labs/dplanner',
        prerender: false,
        defaultPort: 8080
    });
});