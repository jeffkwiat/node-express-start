var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav) {
    adminRouter.route('/add-user')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/easecentral';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                collection.insertOne({username: 'jeffkwiat', password: 'jimidylan03'}, function(err, result) {
                    res.send(result);
                    db.close();
                });
            });
        });
    return adminRouter;
};

module.exports = router;