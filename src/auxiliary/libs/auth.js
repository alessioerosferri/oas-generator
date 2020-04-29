'use strict';
//AUTH SETUP

const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER
});
//TODO add error logger
module.exports = async (req, secDef, Tok, next) => {
  try {
    const {authorization} = req.headers;
    if (!authorization) {
      return next(req.res.sendStatus(403));
    }

    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Bearer') {
      return next(req.res.sendStatus(403));
    }
    const {claims} = await oktaJwtVerifier.verifyAccessToken(token);
    if (!claims.scp.includes(process.env.SCOPE)) {
      return next(req.res.sendStatus(403));
    }
    return next()
  } catch (error) {
    return next(req.res.sendStatus(403));

  }
};