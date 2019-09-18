var express = require('express');
var router = express.Router();
var tgm = require('./telebot.js');

router.get('/' , function (req , res, next) {
    res.render('telegram', { title: 'Send Telegram Notifications' });
});

router.post('/', function (req, res, next) {
    tgm.telenoti(req.body.content);
    res.redirect('/telegram');
});

module.exports = router;