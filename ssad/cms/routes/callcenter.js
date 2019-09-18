var express = require('express');
var router = express.Router();
var ps = require('./psi.js');

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');


// default view on login
router.get('/', async function (req, res, next) {
    ps.getPSI();
    var result = await qp.executeAndFetchPromise('select current_north from cms.psi');
    var result1 = await qp.executeAndFetchPromise('select current_south from cms.psi');
    var result2 = await qp.executeAndFetchPromise('select current_east from cms.psi');
    var result3 = await qp.executeAndFetchPromise('select current_west from cms.psi');
    var result4 = await qp.executeAndFetchPromise('select current_central from cms.psi');
    psin = result[0].current_north;
    psis = result1[0].current_south;
    psie = result2[0].current_east;
    psiw = result3[0].current_west;
    psic = result4[0].current_central;

    var result5 = await qp.executeAndFetchPromise('select * from cms.hazead');
    var result6 = await qp.executeAndFetchPromise('select * from cms.terroristad');
    var result7 = await qp.executeAndFetchPromise('select * from cms.denguead');

    var result8 = await qp.executeAndFetchPromise('select * from cms.announcement');
    res.render ('callCenter', page = {"name":"callCenter", psin:psin, psis:psis, psie:psie, psiw:psiw, psic:psic, "hazead":result5, "terroristad":result6, "denguead":result7, "ann":result8});
});

router.get('/email', function (req, res, next){

    res.redirect('/email');
    

});


router.get('/email', function (req, res, next){

    res.redirect('/email');
    

});


module.exports = router;
