var express = require('express');
var router = express.Router();
var map = require('./map.js');
var db = require('./database.js');
var dbconfig = require('../dbconfig.json');
var request = require('request');
var ps = require('./psi.js');
var smser = require('../routes/sms.js');
var twitsender = require('../builder/twitterBuilder.js')
var tb = require('./telebot.js');

// var orm = require('orm');
// var pdfdoc = require('pdfkit');

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

/* GET home page. */
router.get('/', async function(req, res, next) {

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
  /* Promise object allows map page to be rendered
   only after Data is acquired and parsed */
  Promise.resolve(map.mapsRefresh()).then(function(element){
    res.render('index', { title: 'Incident Report', psin:psin, psis:psis, psie:psie, psiw:psiw, psic:psic, "hazead":result5, "terroristad":result6, "denguead":result7, "ann":result8, db_Data: element});
  });
  

  // res.render('index', { title: 'index', noOfAddress: map.getNumOfIncidents(), addressArrayString: map.getAddressArrayString(), latArrayString: map.getLatArrayString(), lngArrayString: map.getLngArrayString(), typeArrayString: map.getTypeArrayString(), statusArrayString: map.getStatusArrayString(), titleArrayString: map.getTitleArrayString()});
});

// router.post('/inreport', async function (req, res, next) {
//   console.log('incident report function'); 

//   var id = parseInt(req.body.id, 10);
//   var no = parseInt(req.body.contact, 10);
//   var result = await qp.executeUpdatePromise("insert into `cms`.`inreport` (`report_id`, `title`, `name`, `contactno`, `email`, `location`, `content`, `agencies`) values (?, ?, ?, ?, ?, ?, ?, ?)",
//         [id, req.body.title, req.body.name, no, req.body.email, req.body.loc, req.body.content, req.body.agencies]);
  
//         console.log(result);
// });

router.get('/inc', async function(req, res, next) {
  var result = await qp.executeAndFetchPromise('select * from cms.assistance');
  var temp = await qp.executeAndFetchPromise('select * from cms.type')
  // console.log(result);
 
  // console.log(arr)
  res.render('incidentReport', { title: 'Incident Report', arr: result, data: temp , arr2:JSON.stringify(result) });
});


router.post('/inc', async function (req, res, next) {

  // Set realmode = 1 to send sms;
  var realmode = 0;
  var fulladd = req.body.address;
  var datetime = new Date();
  var bighold;
  var typeid = await qp.executeAndFetchPromise('select type_id from cms.type where type_name = ?',[req.body.type_name],dbconfig)
  var retrieveID = {};
  var dt = datetime.toLocaleString();

  req.body.type = typeid[0].type_id;
  req.body.location = fulladd;
  req.body.lastupdated = dt;
  req.body.timereported = dt;
  req.body.status = 1;

  //console.log(datetime.toLocaleString());

  var newbody = reportbuilder(req.body);
  
  var objectcreate = JSON.parse(req.body.assistance_id);
  console.log(objectcreate);

  
  var forsmsagency =[];

 
  
  
try{
  /*var result = await qp.executeAndFetchPromise('insert into cms.inreport set title = ?, name = ?, location = ?, content = ?, contactno = ?, email = ?, lat = ?, lng = ?, timereported = ?, lastupdated = ?,status = ?, type= ?',
                                                                    [req.body.title, req.body.name,,req.body.location,req.body.content,req.body.contactno,req.body.email,req.body.lat,req.body.lng,req.body.timereported,req.body.lastupdated,req.body.status,req.body.type],dbconfig);
  console.log(result);*/

  var result = await qp.executeAndFetchPromise('insert into cms.inreport set ?',[newbody],dbconfig);
  var tempid = result.insertId;

  for (let i= 0; i< objectcreate.length;i++)
  {
    try
    {
      retrieveID = await qp.executeAndFetchPromise('select assistance_id from cms.assistance where assistance_name = ?', [objectcreate[i]],dbconfig)
      var tempsend = await qp.executeAndFetchPromise('insert into cms.assistance_requests set report_id = ? , assistance_needed_id = ?',[tempid,retrieveID[0].assistance_id],dbconfig);
    }
    catch(error)
    {
      console.log(error);
    }
  }
  try{
    for (let i= 0; i< objectcreate.length;i++)
    {
      var templa = await qp.executeAndFetchPromise('select assistance_id from cms.assistance where assistance_name = ?', [objectcreate[i]],dbconfig)
      forsmsagency.push(templa[0]);
    }
    console.log(forsmsagency);
  }
  catch(error)
  {
    console.log(error);
  }


  var messagemaker = tweetbodybuilder(req.body);
  twitsender.postTwit(messagemaker);

  tb.telenoti(messagemaker);

  
  if (realmode == 1) // ONLY TEST SMS FUNCTIONS WHEN YOU NEED IT OR ELSE IT COSTS MONEY
  {
    var holder11 = await smser.agencySmsBuilder(forsmsagency,newbody.location);
    var holder22 = await smser.publicReportSmsBuilder(tempid);
  }
  
}
catch(error)
{
 console.log(error);
}
  res.redirect('/situation');

        //console.log(result);
});

function tweetbodybuilder(body)
{
  var emerlink = 'https://www.scdf.gov.sg/home/civil-defence-shelter/types-of-shelter'
  var msg = body.type_name+" : "+body.title+" at "+body.location+ ".\n If advised to seek shelter, visit link : "+ emerlink; 


  return msg;
}
function reportbuilder(body)
{
  var temp = {};
  temp.title = body.title;
  temp.name = body.name;
  temp.content = body.content;
  temp.contactno = body.contactno;
  temp.email = body.email;
  temp.lat = body.lat;
  temp.lng = body.lng;
  temp.location = body.location;
  temp.timereported = body.timereported;
  temp.lastupdated = body.lastupdated;
  temp.status = body.status;
  temp.type = body.type

  console.log(temp);
  return temp;
  
}

router.get('/callcenter', async function(req, res, next) {
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
  /* Promise object allows map page to be rendered
   only after Data is acquired and parsed */
  Promise.resolve(map.mapsRefresh()).then(function(element){
    res.render('callcenter', { title: 'Incident Report', psin:psin, psis:psis, psie:psie, psiw:psiw, psic:psic, "hazead":result5, "terroristad":result6, "denguead":result7, "ann":result8, db_Data: element});
  });
  
});


router.get('/updateSit' , function(req , res,next){

  res.render('updateSituation', { title: 'Update Situation' });
});

router.get('/advisory' , function(req , res,next){

  res.render('advisory', { title: 'Add Advisory' });
});


router.post('/dengue', async function (req, res, next) {

  console.log('reach here');
  console.log(req.body);
  try{
    var result = await qp.executeAndFetchPromise('insert into cms.dengue set ?',[req.body],dbconfig);
    //reroute the dengue list
    res.redirect('/dengue-list');


  }
catch(error)
{
console.log(error);
}



});

router.get('/dengue-list', async function (req, res, next) {
  try{
       var result = await qp.executeAndFetchPromise('select * from cms.dengue');
       res.render('dengue-list', page = {"name":"Dengue List","data": result});

  }
  catch(error)
  {
      //return a failed view message
  }
   
});

router.get('/dengueedit', async function (req, res, next) {
 
  try {
     
     var result = {};
    let statushold = await qp.executeAndFetchPromise('select * from cms.dengue where dengue_id = ? ', [req.query.dengue_id], dbconfig);
    
    result= statushold[0];

    if (!req.query.api)
      res.render('dengue-edit', page = { "name": "Edit Dengue Info", "data": result });

    else
      res.json(statushold);

  }
  catch (error) {
    //feedback something went wrong
    // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
    next(error);
  }

});

router.post('/dengueedit', async function (req, res, next) {

 try {

   if (!req.query.api) {

     console.log(req.body);

     let final = await qp.executeUpdatePromise('update cms.dengue set ? where dengue_id = ?', [req.body, req.body.dengue_id], dbconfig);

     res.redirect('/dengue-list');

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
router.get('/denguedelete', async function (req, res, next) {

 try {
    
    var deleter = await qp.executeAndFetchPromise('delete from cms.dengue where dengue_id = ?',[req.query.dengue_id],dbconfig);

   res.redirect('/dengue-list');


 }
 catch (error) {
   //feedback something went wrong
   // res.redirect ('login',  feedback= { "message": "Invalid username/password" });
   next(error);
 }

});








router.get('/dengue', function(req , res,next){

  res.render('dengueReport', { title: 'Dengue Report' });
});

router.get('/generalmessage' , function(req , res,next){
  res.render('generalmessage', { title: 'Add Home Post' });
});

router.post('/generalmessage', async function(req, res, next) {
  var dt = new Date();
  var date = dt.toString().slice(4,15);
  var time = dt.toString().slice(16,24);
  var datetime = date + ' ' + time;
  req.body.datetime = datetime;
  var result = await qp.executeUpdatePromise('insert into cms.announcement set ?',[req.body],dbconfig);
  res.redirect('/callcenter');
});

 router.post('/login', async function (req, res, next) {
  try {
    console.log('login function'); 
    console.log(req.body.un);

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
      // res.send('else error');
      }
  }
  catch(error) {
    //console.log('reached catch');
    res.render ('index',  feedback= { "message": "Invalid account credentials" });
    // res.send('catch error');
    }
});

router.get('/sendn', async function(req, res, next) {
  var result = await qp.executeAndFetchPromise('select `agency_name` from `cms`.`agency`');
  // console.log(result);
  arr = [];
  for (var i in result) {
    arr.push(result[i].agency_name)
  }
  res.render('sendNotification', { title: 'Send Notification', arr: arr });
});

// router.get('/login', function(req, res, next){
//   res.render();
// });

// Routing to the Main Maps Page
router.get('/map', function(req, res, next) {
  /* Promise object allows map page to be rendered
   only after Data is acquired and parsed */
  Promise.resolve(map.mapsRefresh()).then(function(element1){
    Promise.resolve(db.getPSIData()).then(function(element2){
      res.render('googleMaps', {title: 'Google Map', db_Data: element1, psin: element2[0], psis: element2[1], psie: element2[2], psiw: element2[3], psic: element2[4]});
    }); 
  });
});

router.get('/location', function() {
  // get locations
  db.getLocations();
});

router.post('/location', (req) => {
  // put a single location
  db.putLocations(req.body.id, req.body.loc, req.body.lat, req.body.lng);
});

router.get('/all', () => {
  // get whole table for ziwei
  db.getAll();
});

router.get('/psi', function (req, res) {
  // 24h psi 
  var datetime = new Date();
  var dt = datetime.toISOString();
  var date = dt.slice(0, 10);
  var hh = dt.slice(11, 13);
  var mm = dt.slice(14, 16);
  var ss = dt.slice(17, 19);

  let url = `https://api.data.gov.sg/v1/environment/psi?date_time=${date}T${hh}%3A${mm}%3A${ss}`

  request(url, function (err, response, body) {
    if (err) {
      console.log('error')
    }
    let psi = JSON.parse(body)
    //console.log(psi)
    console.log("psi reading (24h)")
    console.log(psi.items[0].readings.psi_twenty_four_hourly.national)
  })
});

module.exports = router;
