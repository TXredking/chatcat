'use strict';
const utils = require('../utils');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login')
            },
            '/rooms': (req, res, next) => {
                res.render('rooms');
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            }
        },
        'post': {

        }
    }

    return utils.route(routes);
}
