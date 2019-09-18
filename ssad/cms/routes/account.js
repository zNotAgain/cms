var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

router.get('/', async function (req, res, next) {
    try{
        try{
            var result = await qp.executeAndFetchPromise('select account_id,un,name,email,contact_no,role from cms.accounts');

        }
        catch(error)
        {
            console.log(error);
        }
         var temp = {};
         
         for(let i = 0; i< result.length; i++)
         {
             var getter = await qp.executeAndFetchPromise('select role_name from roles where role_id = ?',[result[i].role],dbconfig);
             result[i].role_name = getter[0].role_name;
         }
         res.render('account', page = {"name":"Account List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });

 router.get('/role', async function (req, res, next) {
    try{
        try{
            var result = await qp.executeAndFetchPromise('select * from cms.roles');

        }
        catch(error)
        {
            console.log(error);
        }
         
         res.render('roles', page = {"name":"Role List","data": result});
 
    }
    catch(error)
    {
        //return a failed view message
    }
     
 });
 
 router.get('/edit', async function (req, res, next) {
 
     try {
        
        var result = {};
       let statushold = await qp.executeAndFetchPromise('select * from cms.accounts where account_id = ? ', [req.query.account_id], dbconfig);

       var namehold = await qp.executeAndFetchPromise('select role_name from cms.roles where role_id = ?',[statushold[0].role],dbconfig);

       var arr = await qp.executeAndFetchPromise('select role_name from cms.roles',[],dbconfig);
       
       result.statushold = statushold[0];
       result.role_name = namehold[0].role_name;
       result.arr = arr;

 
       if (!req.query.api)
         res.render('account-edit', page = { "name": "Edit Account", "data": result });

       else
         res.json(statushold);
   
     }
     catch (error) {
       //feedback something went wrong
       // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
       next(error);
     }
   
   });

   router.get('/roleedit', async function (req, res, next) {
 
    try {
       
       var result = {};
      let roleselect = await qp.executeAndFetchPromise('select * from cms.roles where role_id = ? ', [req.query.role_id], dbconfig);

      
      
      result = roleselect[0];


      if (!req.query.api)
        res.render('role-edit', page = { "name": "Edit Role", "data": result });

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

         var holder =  await qp.executeAndFetchPromise('select role_id from cms.roles where role_name = ?',[req.body.role_name],dbconfig);

         var temp = {};

         temp.account_id = req.body.account_id;
         temp.un = req.body.un;
         temp.name = req.body.name;
         temp.email= req.body.email;
         temp.contact_no = req.body.contact_no;
         temp.role = holder[0].role_id
 
          var updatestatus = await qp.executeUpdatePromise('update cms.accounts set ? where account_id = ?',[temp,temp.account_id,dbconfig]);
        
         res.redirect('/account');
   
       }
   
       else
         res.json(updatestatus);
   
     }
     catch (error) {
     
       next(error);
     }
   
   });

   router.post('/roleedit', async function (req, res, next) {
   
    try {
  
      if (!req.query.api) {
        

        

         var updatestatus = await qp.executeUpdatePromise('update cms.roles set ? where role_id = ?',[req.body,req.body.role_id],dbconfig);
       
        res.redirect('/account/role');
  
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

        holder = await qp.executeAndFetchPromise('select role_name from cms.roles',[],dbconfig);

        var result = holder;
        res.render('account-create', page = { "name": "Create","data" : result  });
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

  router.get('/rolecreate', async function (req, res, next) {
 
    try {

      if (!req.query.api)

      {


        res.render('role-create', page = { "name": "Create" });
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

        var roleid = await qp.executeAndFetchPromise('select role_id from cms.roles where role_name = ?',[req.body.role_name],dbconfig);


        var temp = {};
        temp.un = req.body.un;
        temp.pw = req.body.pw;
        temp.name = req.body.name;
        temp.email= req.body.email;
        temp.contact_no = req.body.contact_no;
        temp.role = roleid[0].role_id;

        try
        {
            //var createnew = await qp.executeAndFetchPromise('insert into cms.accounts set un = ? , pw =?,name = ?, email = ?, contact_no = ?, role = ?', [temp.un,temp.pw,temp.name,temp.email,temp.contact_no,temp.role], dbconfig);
            //var createnew = await qp.executeAndFetchPromise('insert into cms.`accounts` set `name` = ?',[temp.name], dbconfig);

            var createnew = await qp.executeAndFetchPromise('insert into cms.accounts set ?',[temp], dbconfig);
            //var result = await qp.executeAndFetchPromise('insert into sale_type set ?',[createProduct], dbconfig);


        }
        catch(error)
        {
            console.log(error);
        }

         //var createnew = await qp.executeAndFetchPromise('insert into cms.accounts set ?', [temp], dbconfig);
       
        res.redirect('/account');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });
  router.post('/rolecreate', async function (req, res, next) {
   
    try {
  
      if (!req.query.api) {
        console.log(req.body);



       

        try
        {
            

            var createnew = await qp.executeAndFetchPromise('insert into cms.roles set ?',[req.body], dbconfig);


        }
        catch(error)
        {
            console.log(error);
        }

         //var createnew = await qp.executeAndFetchPromise('insert into cms.accounts set ?', [temp], dbconfig);
       
        res.redirect('/account/role');
  
      }
  
      else
        res.json(result);
  
    }
    catch (error) {
    
      next(error);
    }
  
  });


 module.exports = router;