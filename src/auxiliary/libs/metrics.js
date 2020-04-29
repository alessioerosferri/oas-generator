'use strict';
//METRICS SET UP
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle(
  {
    includeMethod: true,
    includePath: true,
    promClient: {
      collectDefaultMetrics: {}
    }
  });

module.exports.metricsMiddleware = metricsMiddleware;