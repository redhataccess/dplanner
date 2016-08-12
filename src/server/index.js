"use strict";

module.exports = function(options) {

    const fs              = require('fs');
    const _               = require('lodash');
    const settings        = require('../utils/settings');
    const path            = require('path');
    const morgan          = require('morgan');
    const express         = require('express');
    const bodyParser      = require('body-parser');
    const cookieParser    = require('cookie-parser');
    const compression     = require('compression');
    const ejs             = require("ejs");
    const request         = require("request");
    const logger          = require("../utils/logger");
    const prettyjson      = require("prettyjson");

    if (options.env == "development") {
        logger.info("Setting the console transports level to debug");
        logger.transports.console.level = 'debug';
    } else {
        logger.info("Setting the console transports level to info");
        logger.transports.console.level = 'info';
    }

    let app         = express();
    let server      = require('http').Server(app);

    // load bundle information from stats
    let stats       = options.stats || require("../../public/dist/stats.json");
    let packageJson = require("../../package.json");
    let publicPath  = stats.publicPath;
    //assetsByChunkName": {
    //"main": [
    //  "main.js?21059f1cb71ba8fbd914",
    //  "main.css?bc8f4539d07f0f272436380df3391431"
    //]}
    let styleUrl    = options.separateStylesheet && (publicPath + "main.css?" + stats.hash);
    //var styleUrl   = publicPath + [].concat(stats.assetsByChunkName.main)[1]; // + "?" + stats.hash;
    let scriptUrl   = publicPath + [].concat(stats.assetsByChunkName.main)[0]; // + "?" + stats.hash;
    logger.debug("main.js" + stats.assetsByChunkName.main);
    let mainJsHash = stats.hash;
    try {
        mainJsHash = /main.js\?(.*)$/.exec(stats.assetsByChunkName.main[0])[1];
    } catch(e){}

    // Set this in the settings to that it can be sent with each request.  Then it can be compared to the
    // window.copilot.mainJsHash, if there is a difference, then the user should refresh the browser.
    settings.mainJsHash = mainJsHash;
    logger.info(`main.js hash: ${mainJsHash}`);

    // Set this so extensions can read it
    settings.version = packageJson.version;
    logger.info(`version: ${packageJson.version}`);

    // http://expressjs.com/guide/error-handling.html
    //var clientErrorHandler = function(err, req, res, next) {
    //    res.status(500);
    //    res.render('error', { error: err });
    //};
    let ipAddress           = options.ipAddress || '127.0.0.1';
    let port                = options.port || 8080;
    let env                 = options.env || 'development';
    settings.env            = env;
    settings.environment    = env;

    logger.info(`styleUrl: ${styleUrl}`);
    logger.info(`scriptUrl: ${scriptUrl}`);
    logger.debug(`Serving up index: ${options.index}`);

    let renderOptions = {
        STYLE_URL: styleUrl,
        SCRIPT_URL: scriptUrl,
        ENV: env,
        BROWSER_PATH: options.browserPath || '/',
        body: '',
        state: '',
        mainJsHash: mainJsHash,
        version: packageJson.version
    };

    // Always https in production
    if (env == "production") {
        renderOptions['STYLE_URL'] = styleUrl.replace("http", "https");
        renderOptions['SCRIPT_URL'] = scriptUrl.replace("http", "https");
    }

    logger.info("Env is " + env + ', running server http://' + ipAddress + ':' + port);
    server.listen(port, ipAddress);

    process.on('SIGTERM', () => {
        logger.info("SIGTERM, exiting.");
        server.close();
        process.exit(0);
    });

    process.on('uncaughtException', (err) => {
        logger.error( " UNCAUGHT EXCEPTION " );
        logger.error( "[Inside 'uncaughtException' event] " + err.stack || err.message );
    });

    process.on('unhandledRejection', (reason, p) => {
        logger.error(`Possibly Unhandled Rejection at: Promise ${p}, reason: ${reason}`);
        // application specific logging here
    });

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('port', port);

    app.use(compression());
    app.use(morgan('dev'));
    // Set the limit otherwise larger payloads can cause 'Request Entity Too Large'
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cookieParser());

    app.use(`${options.browserPath}/_assets`, express.static(path.join(__dirname, "..", "..", "public", "dist"), {
        //etag: false,
        //maxAge: "0"
        maxAge: "200d"
    }));
    app.use(`${options.browserPath}/static`, express.static(path.join(__dirname, "..", "..", "public"), {
        //etag: false,
        //maxAge: "0"
        maxAge: "200d"
    }));

    if (options.env === 'development') {
        logger.debug("Using development error handler.");
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // Redirect anything coming in to / to /labs/dplanner
    app.get("/", (req, res, next) => {
        res.redirect("/labs/dplanner");
    });

    // Redirect any logins to the official login
    app.get("/login", (req, res, next) => {
        // res.redirect("/labs/dplanner");
        logger.info("received login request: " + req.url);
        logger.info("req.params : " + (prettyjson.render(req.params)));
        const location = "https://access.redhat.com" + req.url;
        logger.info("Redirecting to: " + location);
        res.writeHead(302, {
            Location: location
        });
        res.end();
        return true;
    });

    app.post('/api/mail/send', (req, res) => {
        'use strict';
        // To avoid ERROR: SELF_SIGNED_CERT_IN_CHAIN
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const nodemailer = require('nodemailer');

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport('smtp://smtp.corp.redhat.com:25');

        const messageBody = `<p>${req.body.requester} has just generated a request for POC engagement through the OSP Deployment Planner application (attached as a pdf).</p>
            <p><strong>Next steps:</strong></p>
            <ul>
            <li>The appropriate associate should claim the request.</li>
            <li>This associate should then:
            <ul>
            <li>Reply to the requestor and any contacts listed.</li>
            <li>Generate a POC Engagement case.</li>
            </ul>
            </li>
            </ul>
            <p>This e-mail is generated by <strong>Red Hat OpenStack Platform Deployment Planner</strong>, please <strong>do not</strong> reply to this e-mail.</p>`;

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Red Hat OpenStack Platform Deployment Planner(NO REPLY)" noreply@redhat.com', // sender address
            to: options.email || 'rhos-poc-help@redhat.com', // list of receivers
            cc: req.body.requesterMail,
            subject: `Request for POC Engagement, RHEL OSP ${req.body.version} + Director (${req.body.requester})`, // Subject line
            html: messageBody,
            attachments: [{
                filename: 'osp_architecture_review.pdf',
                content: req.body.pdfData,
                contentType: 'application/pdf'
            }]
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                res.status(200).send(info);
            }
        });
    });

    // load REST API
    // require("./api")(app, _.defaults(options, packageJson));

    // Proxy webpack for local development work
    app.get(/labs\/dplanner\/_assets\/.*?/, (req, res) => {
        let afterAssets = req.url.replace("/labs/dplanner/_assets/", "");
        const newUrl = `http://localhost:2992/labs/dplanner/_assets/${afterAssets}`;
        logger.debug(`Proxying _assets to ${newUrl}`);
        request(newUrl).pipe(res);
    });

    app.get(/^\/(webassets|labs\/clientlogproxy|chrome_themes.*?)/i, (req, res) => {
        logger.info("received request: " + req.url);
        // logger.info("req.params : " + (prettyjson.render(req.params)));
        const location = "https://access.redhat.com" + req.url;
        logger.info("Redirecting to: " + location);

        res.writeHead(302, {
            Location: location,
            'Access-Control-Allow-Origin': '*'
        });
        // res.header("Access-Control-Allow-Origin", "*"); // breaks
        res.end();
        return true;
    });

    app.get(/^\/(services.*?)/i, (req, res) => {
        var location;
        logger.info("received request: " + req.url);
        // logger.info("req.params : " + (prettyjson.render(req.params)));
        location = "https://access.redhat.com/" + req.url;
        return request(location).pipe(res);
    });

    app.get("/*", (req, res) => {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'dist', 'index.html'));
    });

};