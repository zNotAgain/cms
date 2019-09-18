var express = require('express');
var router = express.Router();
var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

router.get('/' , function(req , res, next) {
    console.log('ad hi');
    res.render('advisory', { title: 'Add Advisory' });
});



module.exports = router;