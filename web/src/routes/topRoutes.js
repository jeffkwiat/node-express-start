var express = require('express');
var request = require('request-promise');
var topRouter = express.Router();
var router = function(nav) {
    topRouter.use(function(req, res, next) {
       if (!req.user) {
            res.redirect('/');
        }
        next();
    });

    topRouter.get('/', function(req, res, next) {
        res.render('top', {
                title: 'Main page',
                posts: [],
                nav: nav,
                message: res.message
            });
    });

    /**
    topRouter.get('/', function(req, res, next) {

        var options = {
            method: 'GET',
            uri: 'http://www.reddit.com/top.json',
            json: true
        };

        request(options)
            .then(function (response) {
                res.render('top', {
                    title: 'Main page',
                    posts: response.data.children,
                    nav: nav
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    });
     */

    return topRouter;
};

module.exports = router;