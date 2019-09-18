var express = require('express');
var router = express.Router();
var tweeter = require('../builder/twitterBuilder');

router.get('/' , function (req , res, next) {
    // console.log('tweetybird hi');
    res.render('twitter', { title: 'Send Tweets' });
});

router.post('/', function (req, res, next) {
    // console.log(req.body);
    tweeter.postTwit(req.body.content);
    res.redirect('/tweet');
});

module.exports = router;