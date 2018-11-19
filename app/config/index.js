'use strict';

if(process.env.NODE_ENV === 'production') {
    //Offer production stage environment variables
    let redisURI = require('url').parse(process.env.REDIS_URL);
    let redisPassword = redisURI.auth.split(':')[1];

    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        "fb": {
            "clientID": process.env.fbClientID,
            "clientSecret": process.env.fbClientSecret,
            "callbackURL": process.env.host + "/auth/facebook/callback",
            "profileFields": ["id", "displayName", "photos"]
        },
        redis: {
            host: redisURI.hostname,
            post: redisURI.port,
            password: redisPassword
        }
    }
} else {
    //Offer development stage settings and data
    module.exports = require('./development.json');
}
