'use strict';

const oasTools = require('oas-tools');
const http = require('http');
const {logger} = require('./libs/logger');
const {metricsMiddleware} = require('./libs/metrics');
const {oasOptions, oasDoc} = require('./libs/oas');


//EXPRESS
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const serverPort = process.env.PORT || 8080;
let server;
app.use(bodyParser.json({strict: true}));
app.use(metricsMiddleware);

//OASTOOLS
oasTools.configure(oasOptions);
oasTools.initialize(oasDoc, app, function () {
  server = http.createServer(app).listen(serverPort, function () {
    logger.info(["#CL", "server.js", "StartUp", "SServer is now running"]);
  });
});

module.exports.app = app;
module.exports.server = server;