'use strict';

const config = require('../config');
const logger = require('../logger');
const Mongoose = require('mongoose');

Mongoose.connect(config.dbURI);

// Log an error if the connection fails
Mongoose.connection.on('error', error => {
    logger.log('error', "Mongoose Error: " + error);
});

Mongoose.connection.once('open', () => {
    logger.log('info', 'Connected to mlab URI: ' + config.dbURI);
});

// Create a Schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

// Turn the Schema into a usable model.
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose,
    userModel
}
