var express = require('express');
var request = require('request-promise');
var hotRouter = express.Router();

var router = function(nav) {
    hotRouter.get('/', function (req, res, next) {

        var options = {
            method: 'GET',
            uri: 'http://www.reddit.com/hot.json',
            json: true
        };

        request(options)
            .then(function (response) {
                res.render('hot', {
                    title: 'Main page',
                    posts: response.data.children,
                    nav: [{link: '/hot', text: 'Hot'},
                        {link: '/favorites', text: 'Favorites'}]
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    return hotRouter;
};

module.exports = router;