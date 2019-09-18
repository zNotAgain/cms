var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

router.get('/', async function (req, res, next) {
    try{
         var result = await qp.executeAndFetchPromise('select * from cms.type');
         res.render('type', page = {"name":"Type List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });
 
 router.get('/edit', async function (req, res, next) {
 
     try {
        
        var result = {};
       let typehold = await qp.executeAndFetchPromise('select * from cms.type where type_id = ? ', [req.query.type_id], dbconfig);
       
       result.typehold = typehold[0];
 
       if (!req.query.api)
         res.render('type-edit', page = { "name": "Edit Type", "data": result });

       else
         res.json(typehold);
   
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
 
          var updatetypename = await qp.executeUpdatePromise('update cms.type set ? where type_id = ?',[req.body,req.body.type_id,dbconfig]);
        
         res.redirect('/type');
   
       }
   
       else
         res.json(updatetypename);
   
     }
     catch (error) {
     
       next(error);
     }
   
   });
 
   router.get('/create', async function (req, res, next) {
 
    try {

      if (!req.query.api)
        res.render('type-create', page = { "name": "Create",  });

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

         var createnew = await qp.executeAndFetchPromise('insert into type set type_name = ?', [req.body.type_name], dbconfig);
       
        res.redirect('/type');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });

 
 module.exports = router;