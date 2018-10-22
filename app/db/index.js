'use strict';

const config = require('../config');
const Mongoose = require('mongoose');

Mongoose.connect(config.dbURI);

// Log an error if the connection fails
Mongoose.connection.on('error', error => {
    console.log("Mongoose Error: ", error);
});

Mongoose.connection.once('open', () => {
    console.log('Connected to mlab URI: ' + config.dbURI )
});

module.exports = {
    Mongoose
}
