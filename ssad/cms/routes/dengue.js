var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

router.get('/', async function (req, res, next) {
    try{
         var result = await qp.executeAndFetchPromise('select * from cms.dengue');
         res.render('dengue-list', page = {"name":"Dengue List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });
 
 


 module.exports = router;