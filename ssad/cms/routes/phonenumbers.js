var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

router.get('/', async function (req, res, next) {
    try{
        try{
            var result = await qp.executeAndFetchPromise('select * from cms.publicsms',[],dbconfig);

        }
        catch(error)
        {
            console.log(error);
        }
         
         res.render('phonenumber', page = {"name":"Public Phone Number List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });


 router.get('/agencynumbers', async function (req, res, next) {
    try{
        try{
            var result = await qp.executeAndFetchPromise('select agency_id, agency_name, agency_contactno from cms.agency',[],dbconfig);

        }
        catch(error)
        {
            console.log(error);
        }
         
         res.render('phone-agency', page = {"name":"Agency Contact Numbers","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });


 
 router.get('/edit', async function (req, res, next) {
 
     try {
        
       var temp = await qp.executeAndFetchPromise('select * from publicsms where person_id = ?',[req.query.person_id],dbconfig);

 
       var result = temp[0];
       if (!req.query.api)
         res.render('phone-edit', page = { "name": "Edit Details", "data": result });

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

 
          var updatestatus = await qp.executeUpdatePromise('update cms.publicsms set ? where person_id = ?',[req.body, req.body.person_id],dbconfig);
        
         res.redirect('/phonenumbers');
   
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

      {

    
        res.render('phone-create', page = { "name": "Create" });
      }
       

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



       

        try
        {
       
            var createnew = await qp.executeAndFetchPromise('insert into cms.publicsms set ?',[req.body], dbconfig);


        }
        catch(error)
        {
            console.log(error);
        }

         //var createnew = await qp.executeAndFetchPromise('insert into cms.accounts set ?', [temp], dbconfig);
       
        res.redirect('/phonenumbers');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });
 


 module.exports = router;