var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

router.get('/', async function (req, res, next) {
    try{
         var result = await qp.executeAndFetchPromise('select * from cms.agency',[],dbconfig);
         res.render('agency', page = {"name":"Agency List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });

 router.get('/agencyassist', async function (req, res, next) {
  try{
       var result = await qp.executeAndFetchPromise('select * from cms.assistance',[],dbconfig);

       for(let i =0; i< result.length ;i++)
       {
         var holder = await qp.executeAndFetchPromise('select agency_name from cms.agency where agency_id = ?',[result[i].assistance_provider],dbconfig);
         result[i].assistance_provider_name = holder[0].agency_name;
       }

       res.render('agencyservices', page = {"name":"Services List","data": result});

  }
  catch(error)
  {
      //return a failed view message
  }
   
});
 
router.get('/archive', async function (req, res, next) {
  try{
       var result = await qp.executeAndFetchPromise('select * from cms.fullcontrol',[],dbconfig);
       console.log(result);
       res.render('assistarchive', page = {"name":"Services Rendered","data": result});

  }
  catch(error)
  {
      //return a failed view message
  }
   
});
 //GET THE STUFF TO EDIT BRO
 router.get('/edit', async function (req, res, next) {
 
     try {
       var result = {};

 
       let agencytemp = await qp.executeAndFetchPromise('select * from cms.agency where agency_id = ? ', [req.query.agency_id], dbconfig);
       
       console.log(agencytemp);
 
       result.agency = agencytemp[0];
 
       if (!req.query.api)
         res.render('agency-edit', page = { "name": "Edit Agency", "data": result });
         //data.statustypes
         //data.situation
       else
         res.json(result);
   
     }
     catch (error) {
       //feedback something went wrong
       // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
       next(error);
     }
   
   });
   router.get('/editservices', async function (req, res, next) {
 
    try {
      var result = {};


      let assistancetemp = await qp.executeAndFetchPromise('select * from cms.assistance where assistance_id = ? ', [req.query.assistance_id], dbconfig);
      var temphold = await qp.executeAndFetchPromise ('select * from cms.agency', [], dbconfig)
      
      result.assistance = assistancetemp[0];


      if (!req.query.api)
        res.render('agencyservices-edit', page = { "name": "Edit Services", "data": result, "arr" : temphold });
        //data.statustypes
        //data.situation
      else
        res.json(result);
  
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
 
         let final = await qp.executeUpdatePromise('update cms.agency set ? where agency_id = ?', [req.body, req.body.agency_id], dbconfig);
   
         res.redirect('/agency/');
   
       }
   
       else
         res.json(result);
   
     }
     catch (error) {
       //feedback something went wrong
       // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
       next(error);
     }
   
   });


   router.post('/editservices', async function (req, res, next) {
   
    try {
  
      if (!req.query.api) {
        

        var temp = await qp.executeAndFetchPromise('select agency_id from cms.agency where agency_name = ?', [req.body.agency_name],dbconfig);

        req.body.agency_id = temp[0].agency_id;

        let final = await qp.executeUpdatePromise('update cms.assistance set assistance_name = ?, assistance_provider = ? where assistance_id = ?', [req.body.assistance_name,req.body.agency_id, req.body.assistance_id], dbconfig);
  
        res.redirect('/agency/agencyassist');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
      //feedback something went wrong
      // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
      next(error);
    }
  
  });


   router.get('/create', async function (req, res, next) {
 
    try {

      if (!req.query.api)
        res.render('agency-create', page = { "name": "Create",  });

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

         var createnew = await qp.executeAndFetchPromise('insert into agency set ?', [req.body], dbconfig);
       
        res.redirect('/agency');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });

  router.get('/createservice', async function (req, res, next) {
 
    try {

      var result = await qp.executeAndFetchPromise('select agency_name from cms.agency',[],dbconfig);

      if (!req.query.api)
        res.render('agencyservices-create', page = { "name": "Create Service", "arr" : result });

      else
        res.json();
  
    }
    catch (error) {
      //feedback something went wrong
      // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
      next(error);
    }
  
  });

  router.post('/createservice', async function (req, res, next) {
   
    try {
  
      if (!req.query.api) {
        console.log(req.body);
        var getid = await qp.executeAndFetchPromise('select agency_id from agency where agency_name = ?',[req.body.agency_name],dbconfig);

        var temp ={};
        temp.assistance_provider = getid[0].agency_id;
        temp.assistance_name = req.body.assistance_name;

         var createnew = await qp.executeAndFetchPromise('insert into assistance set  ?', [temp], dbconfig);
       
         res.redirect('/agency/agencyassist');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });

module.exports = router;