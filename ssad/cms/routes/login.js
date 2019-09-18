var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');
var emailer = require('../builder/emailBuilder');


router.get('/', function (req, res, next) {
   
    
    res.render ('login', page = {"name":"login"});
});

router.post('/login', async function (req, res, next) {
   

    try {
        console.log('login function'); 
        console.log(req.body.un);
        console.log(req.body.pw);
        var result = await qp.executeAndFetchPromise('select * from cms.accounts where un = ?',[req.body.un],dbconfig);
        console.log(result);
        if (result.length == 1 ) {
          if(result[0].pw == req.body.pw){
            
            // TO DO : SESSION FUNCTIONALITY (READ UP ON REQ.SESSION)
            // req.session.account_id = result[0].account_id;
            // req.session.name = result[0].name;
            // req.session.role = result[0].role;
    
            res.redirect('/callcenter');
          }
    
        }else{
    
          // console.log('login failed message');
          res.render ('index',  feedback= { "message": "Invalid account credentials" });
          }
      }
      catch(error) {
        //console.log('reached catch');
        res.render ('index',  feedback= { "message": "Invalid account credentials" });
        }

});

module.exports = router;