'use strict';
const utils = require('../utils');
const passport = require('passport');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login')
            },
            '/rooms': [utils.isAuthenticated, (req, res, next) => {
                res.render('rooms', {
                    user: req.user
                });
            }],
            '/chat': [utils.isAuthenticated, (req, res, next) => {
                res.render('chatroom', {
                    user: req.user
                });
            }],
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/logout': (req, res, next) => {
                req.logout();
                res.redirect('/');
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
