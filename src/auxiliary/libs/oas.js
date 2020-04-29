'use strict';
//OAS TOOL SET UP

const {logger} = require('./logger');
const path = require('path');
const fs = require('fs');
const jsyaml = require('js-yaml');

let spec = fs.readFileSync(path.join(__dirname, '../api/oas-doc.yaml'), 'utf8');
let oasDoc = jsyaml.safeLoad(spec);
const oasSecurity = process.env.OAS_SECURITY === "true";
let verifyToken;
if (oasSecurity)
  verifyToken = require('./auth');
else
  verifyToken = () => {
  };


//TODO set up oas options in configFile
let oasOptions = {
  controllers: path.join(__dirname, `../controllers${process.env.MOCK_RESPONSES ? '/__mocks__' : ''}`),
  customLogger: logger,
  strict: true,
  router: true,
  validator: true,
  oasSecurity: oasSecurity,
  securityFile: {
    Bearer: verifyToken
  }
};


module.exports.oasOptions = oasOptions;
module.exports.oasDoc = oasDoc;