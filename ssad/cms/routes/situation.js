var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

var orm = require('orm');
var pdfdoc = require('pdfkit');

// default view on login
router.get('/', async function (req, res, next) {
   try{
        var result = {};
        result = await qp.executeAndFetchPromise('select * from cms.inreport where status = 1');

        for(let i = 0 ; i < result.length; i++)
        {
          temparray = await qp.executeAndFetchPromise('select type_name from cms.type where type_id = ?',[result[i].type],dbconfig);
          result[i].type_name = temparray[0].type_name;
        }
        res.render('situation', page = {"name":"Situation List","data": result});

   }
   catch(error)
   {
       //return a failed view message
   }
    
});

router.get('/completed', async function (req, res, next) {
  try{
       var result = await qp.executeAndFetchPromise('select * from cms.inreport where status = 3');
        for(let i = 0 ; i < result.length; i++)
        {
          temparray = await qp.executeAndFetchPromise('select type_name from cms.type where type_id = ?',[result[i].type],dbconfig);
          result[i].type_name = temparray[0].type_name;
        }
       res.render('situationcompleted', page = {"name":"Resolved Situations","data": result});



  }
  catch(error)
  {
      //return a failed view message
  }
   
});

router.get('/awaiting', async function (req, res, next) {
  try{
       var result = await qp.executeAndFetchPromise('select * from cms.inreport where status = 2');
        for(let i = 0 ; i < result.length; i++)
        {
          temparray = await qp.executeAndFetchPromise('select type_name from cms.type where type_id = ?',[result[i].type],dbconfig);
          result[i].type_name = temparray[0].type_name;
        }
       res.render('situationawait', page = {"name":"Situations Awaiting Closure","data": result});



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
      var statustypes ={};
      var typecon ={};

      let situation = await qp.executeAndFetchPromise('select * from cms.inreport where report_id = ? ', [req.query.report_id], dbconfig);
      statustypes = await qp.executeAndFetchPromise('select * from cms.status',[],dbconfig);
      typecon = await qp.executeAndFetchPromise('select * from cms.type',[],dbconfig);

      result.situation = situation[0];
      result.typecon = typecon;
      result.statustypes = statustypes;

      if (!req.query.api)
        res.render('situation-edit', page = { "name": "Edit Situation", "data": result });
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


  router.get('/editcompleted', async function (req, res, next) {

    try {
      var result = {};
      var statustypes ={};
      var typecon ={};

      let situation = await qp.executeAndFetchPromise('select * from cms.inreport where report_id = ? ', [req.query.report_id], dbconfig);
      statustypes = await qp.executeAndFetchPromise('select * from cms.status',[],dbconfig);
      typecon = await qp.executeAndFetchPromise('select * from cms.type',[],dbconfig);

      result.situation = situation[0];
      result.typecon = typecon;
      result.statustypes = statustypes;

      if (!req.query.api)
        res.render('situationcompleted-edit', page = { "name": "Edit Completed Situation", "data": result });
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

         var correctingstatustype = await qp.executeAndFetchPromise('select status_id from cms.status where status_name = ?',[req.body.status],dbconfig);
         var correctingincidenttype = await qp.executeAndFetchPromise('select type_id from cms.type where type_name = ?',[req.body.type],dbconfig);
         req.body.status = correctingstatustype[0].status_id;
         req.body.type = correctingincidenttype[0].type_id;
         
         var datetime = new Date();
         req.body.lastupdated = datetime.toLocaleString();

        let final = await qp.executeUpdatePromise('update cms.inreport set ? where report_id = ?', [req.body, req.body.report_id], dbconfig);
  
        res.redirect('/situation');
  
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

  router.post('/editcompleted', async function (req, res, next) {
  
    try {
  
      if (!req.query.api) {
        console.log(req.body);

         var correctingstatustype = await qp.executeAndFetchPromise('select status_id from cms.status where status_name = ?',[req.body.status],dbconfig);
         var correctingincidenttype = await qp.executeAndFetchPromise('select type_id from cms.type where type_name = ?',[req.body.type],dbconfig);
         req.body.status = correctingstatustype[0].status_id;
         req.body.type = correctingincidenttype[0].type_id;
         
         var datetime = new Date();
         req.body.lastupdated = datetime.toLocaleString();

        let final = await qp.executeUpdatePromise('update cms.inreport set ? where report_id = ?', [req.body, req.body.report_id], dbconfig);
  
        res.redirect('/situation/completed');
  
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


  router.get('/editawaiting', async function (req, res, next) {

    try {
      var result = {};
      var statustypes ={};
      var typecon ={};

      let situation = await qp.executeAndFetchPromise('select * from cms.inreport where report_id = ? ', [req.query.report_id], dbconfig);
      statustypes = await qp.executeAndFetchPromise('select * from cms.status',[],dbconfig);
      typecon = await qp.executeAndFetchPromise('select * from cms.type',[],dbconfig);

      result.situation = situation[0];
      result.typecon = typecon;
      result.statustypes = statustypes;

      if (!req.query.api)
        res.render('situationawait-edit', page = { "name": "Edit Intermittent Situation", "data": result });
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

  router.post('/editawaiting', async function (req, res, next) {
  
    try {
  
      if (!req.query.api) {
        console.log(req.body);

         var correctingstatustype = await qp.executeAndFetchPromise('select status_id from cms.status where status_name = ?',[req.body.status],dbconfig);
         var correctingincidenttype = await qp.executeAndFetchPromise('select type_id from cms.type where type_name = ?',[req.body.type],dbconfig);
         req.body.status = correctingstatustype[0].status_id;
         req.body.type = correctingincidenttype[0].type_id;
         
         var datetime = new Date();
         req.body.lastupdated = datetime.toLocaleString();

        let final = await qp.executeUpdatePromise('update cms.inreport set ? where report_id = ?', [req.body, req.body.report_id], dbconfig);
  
        res.redirect('/situation/awaiting');
  
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

router.use(orm.express("mysql://root:123456@localhost:/cms", {
  define: function (db, models, next) {
    models.reports = db.define("inreport", {
      report_id : {
        type: 'serial',
        key: true
      },
      title : String,
      name  : String,
      contactno : Number,
      email : String,
      timereported : String,
      lastupdated : String,
      location  : String,
      content : String,
  });
  next();
  }
}));

router.get('/pdf', function(req, res, next) {
  var report_id  = req.query.report_id;
  const doc = new pdfdoc();
  var result = req.models.reports.find({report_id: report_id}, function(error, rep){
      if(error) throw error;

      var title         = rep[0]['title'];
      var name          = rep[0]['name'];
      var contactno     = rep[0]['contactno'];
      var email         = rep[0]['email'];
      var timereported  = rep[0]['timereported'];
      var lastupdated   = rep[0]['lastupdated'];
      var location      = rep[0]['location'];
      var content       = rep[0]['content'];


      var filename = encodeURIComponent(title) + '.pdf';
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');

      doc.font('Times-Roman', 18)
        .fontSize(15)
        .text(title, 100, 50);

      doc.moveDown()
          .fillColor('black')
          .fontSize(12)
          .text("Report made by: "+name);

      doc.moveDown()
          .fillColor('black')
          .fontSize(12)
          .text("Contact No: "+contactno);

      doc.moveDown()
          .fillColor('black')
          .fontSize(12)
          .text("Email: "+email);

      doc.moveDown()
        .fillColor('black')
        .fontSize(12)
        .text("Time reported: "+timereported);

      doc.moveDown()
        .fillColor('black')
        .fontSize(12)
        .text("Last updated: "+lastupdated);

      doc.moveDown()
          .fillColor('black')
          .fontSize(12)
          .text("Location: "+location);  

      doc
          .moveDown()
          .fillColor('black')
          .fontSize(11)
          .text(content, {
            align: 'justify',
            indent: 30,
            height: 300,
            ellipsis: true
          });

      doc.pipe(res);
      doc.end();
  });

});

module.exports = router;
