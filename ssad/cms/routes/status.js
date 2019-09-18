var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

router.get('/', async function (req, res, next) {
    try{
         var result = await qp.executeAndFetchPromise('select * from cms.status');
         res.render('status', page = {"name":"Status List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });
 
 router.get('/edit', async function (req, res, next) {
 
     try {
        
        var result = {};
       let statushold = await qp.executeAndFetchPromise('select * from cms.status where status_id = ? ', [req.query.status_id], dbconfig);
       
       result.statushold = statushold[0];
 
       if (!req.query.api)
         res.render('status-edit', page = { "name": "Edit Status", "data": result });

       else
         res.json(statushold);
   
     }
     catch (error) {
       //feedback something went wrong
       // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
       next(error);
     }
   
   });
 
 
   
   router.post('/edit', async function (req, res, next) {
   
     try {
   
       if (!req.query.api) {
         console.log(req.body);
 
          var updatestatus = await qp.executeUpdatePromise('update cms.status set ? where status_id = ?',[req.body,req.body.status_id,dbconfig]);
        
         res.redirect('/status');
   
       }
   
       else
         res.json(updatestatus);
   
     }
     catch (error) {
     
       next(error);
     }
   
   });
 
   router.get('/create', async function (req, res, next) {
 
    try {

      if (!req.query.api)
        res.render('status-create', page = { "name": "Create",  });

      else
        res.json();
  
    }
    catch (error) {
      //feedback something went wrong
      // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
      next(error);
    }
  
  });
   router.post('/create', async function (req, res, next) {
   
    try {
  
      if (!req.query.api) {
        console.log(req.body);

         var createnew = await qp.executeAndFetchPromise('insert into status set status_name = ?', [req.body.status_name], dbconfig);
       
        res.redirect('/status');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });


 module.exports = router;