'use strict';
const passport = require('passport');
const config = require('../config');
const logger = require('../logger');
const utils = require('../utils');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        // Find the user using the _id
        utils.findById(id)
            .then(user => done(null, user))
            .catch(error => logger.log('error', 'Error when deserializing the user:' + error));
    });


    let authProcessor = (accessToken, refreshToken, profile, done) => {
        // Find a user in the local db using profile.id
        // If the user is found, return the user data using the done method.
        // If the user is not found, create one in the local db and return.
        utils.findOne(profile.id)
            .then(result => {
                if(result) {
                    done(null, result);
                } else {
                    // Create a new user and return
                    utils.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => logger.log('error', 'Error when creating new user:' + error));
                }
            });
    }

    passport.use(new FacebookStrategy(config.fb, authProcessor));
}
