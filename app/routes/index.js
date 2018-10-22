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
            },
            '/getsession': (req, res, next) => {
                res.send('Session Test: ' + req.session.test);
            },
            '/setsession': (req, res, next) => {
                req.session.test = "success";
                res.send("Session Set");
            }
        },
        'post': {

        },
        'NA': (req, res, next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }

    return utils.route(routes);
}
