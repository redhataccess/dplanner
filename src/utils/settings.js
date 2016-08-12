"use strict";

const fs      = require('fs');
const logger  = require("./logger");

const resolveEnvVar = (envVar) => {
   if (envVar === void 0) {
       return void 0;
   }
   if (/^\$/i.test(envVar)) {
       return process.env[envVar.slice(1, envVar.length)];
   }
   return process.env[envVar];
};

const getBrowserPath = (env) => '/labs/dplanner';

const objToExport = {
    env: 'development', // overridden in index.js
    environment: 'development', // overridden in index.js
    urlPrefix: "/labs/dplanner",
    resolveEnvVar: resolveEnvVar,
    getBrowserPath: getBrowserPath
};

module.exports = objToExport;
