var express = require('express');
var router = express.Router();
var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));
var dbconfig = require('../dbconfig.json');

router.get('/' , function (req , res, next) {
    console.log('ad hi');
    res.render('terroristadvisory', { title: 'Add Advisory' });
});

router.post('/', async function (req, res, next) {
    console.log(req.body);
    var result = await qp.executeUpdatePromise('insert into `cms`.`terroristad` set ?', [req.body], dbconfig);
    res.redirect('/callcenter');
});

module.exports = router;