var express = require('express');
var bodyParser = require('body-parser');
var Nexmo = require('nexmo');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');

//Init Nexmo

var nexmo = new Nexmo({
	apiKey: '8a419c42',
	apiSecret: 'q67f9RfJdp1a7C14'
}, {debug: true});

// Body parser middleware

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Sms creation

//make a function call to this node.
//get array of ids and location
//look up which number to call
//then send sms

module.exports = {
	//Agency SMS
	agencySmsBuilder: async function(array, location) {
	//array of assistID to be taken
		var reqAssist = array;
		var tempLocation = location;
		console.log(reqAssist);
		console.log(tempLocation);

		//Agency SMS Format

		console.log('assitance length :'+ reqAssist.length);
		//Send sms to each service provider
		
		for(var i=0; i<reqAssist.length; i++){
			var tempname = await qp.executeAndFetchPromise("select assistance_name from cms.assistance where assistance_id = ?",[reqAssist[i].assistance_id],dbconfig);
			var agencySms = "CMS ALERT :NEED "+tempname[0].assistance_name+" AT " + tempLocation;

			var assistProv = await qp.executeAndFetchPromise("select assistance_provider from cms.assistance where assistance_id = ?",[reqAssist[i].assistance_id],dbconfig);
			var agencyContact = await qp.executeAndFetchPromise("select agency_contactno from cms.agency where agency_id = ?", [assistProv[0].assistance_provider],dbconfig);
			console.log()
			nexmo.message.sendSms(
				'NEXMO', agencyContact[0].agency_contactno, agencySms, { type: 'unicode' },
				(err, responseData) => {
					if(err) {
						console.log(err);
					} else {
						var { messages } = responseData;
						var {['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
						console.dir(responseData);
						}
					}
			)

			console.log('SMS OUT :' + i)
				}

},

// Create PSI sms for public

publicPSISmsBuilder: async function(){
	// extract current PSI
	var psiResult= await qp.executeAndFetchPromise('select current from cms.psi where psicontrol = 1',[],dbconfig);
	console.log(psiResult);

	//var publicPSISms ="";
	//if (psiResult[0].current > 300){
	var	publicPSISms = "CMS PSI Alert \n Current PSI reading is: " + psiResult[0].current + "\n Please stay indoors.";
	//}

	var personInfo = await qp.executeAndFetchPromise('select * from cms.publicsms',[],dbconfig);
	for(var i = 0; i<personInfo.length; i++){
		nexmo.message.sendSms(
			'NEXMO', personInfo[i].contactno,  publicPSISms, { type: 'unicode' },
			(err, responseData) => {
				if(err) {
					console.log(err);
				} else {
					var { messages } = responseData;
					var {['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
					console.dir(responseData);
				}
		})
	}
	
	},

// Create report for public sms

publicReportSmsBuilder: async function(reportid){
	console.log(reportid);
	var reportResult = await qp.executeAndFetchPromise('select title, location from cms.inreport where report_id = ?',[reportid],dbconfig);
	
	var publicReportSms = "CMS Alert \n" + reportResult[0].title +" at " + reportResult[0].location;
	console.log(publicReportSms);
	var personInfo = await qp.executeAndFetchPromise('select * from cms.publicsms',[],dbconfig);
	for(var i = 0; i<personInfo.length; i++){
		nexmo.message.sendSms(
			'NEXMO', personInfo[i].contactno,  publicReportSms, { type: 'unicode' },
			(err, responseData) => {
				if(err) {
					console.log(err);
				} else {
					var { messages } = responseData;
					var {['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
					console.dir(responseData);
				}
		})
	}
}}


/* Postman POST test

router.post('/', async function (req, res, next) {
	var reqAssist = req.body.assistance_id;
	var tempLocation = req.body.address;
	console.log(reqAssist);
	console.log(tempLocation);

	//Agency SMS Format

	var agencySms = "CMS ALERT \n" + "NEED ASSISTANCE AT " + tempLocation;
	
	//Send sms to each service provider
	
	/*for(var i=0; i<reqAssist.length; i++){
		//var assistProv = await qp.executeAndFetchPromise("select assistance_provider from cms.assistance where assistance_id = ",[reqAssist[i]],dbconfig);
		//var agencyContact = await qp.executeAndFetchPromise("select agency_contactno from cms.agency where agency_id = ", [assistProv[i]],dbConfig);
		nexmo.message.sendSms(
			'NEXMO', '6593269309', agencySms, { type: 'unicode' },
			(err, responseData) => {
				if(err) {
					console.log(err);
				} else {
					var { messages } = responseData;
					var {['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
					console.dir(responseData);
					}
				}
		)
			}
}
		)
*/
//custom sms
//send text directly

/*
router.post('/', async function (req, res, next) {

	
	try{
		var terrorResult = await qp.executeAndFetchPromise('select * from cms.inreport where type = 2 && status = 3',[],dbconfig);
		console.log(terrorResult);
		var psiResult= await qp.executeAndFetchPromise('select * from cms.psi where psicontrol = ?',[],dbConfig);
		console.log(psiResult);
		var publicTerrorSms = "CMS Terror Alert \n";
		var publicPSISms ="";
		if (psiResult[0].current > 300){
			publicPSISms = "CMS PSI Alert \n Current PSI reading is: " + psiResult[0].current + "\n Please stay indoors.";
		}
		if (terrorResult!=null){
			for (var i = 0; i<terrorResult.size(); i++){
				publicTerrorSms+=terrorResult[i].title + "\n" + terrorResult[i].content +"\n Location: " + terrorResult[i].location + "\n";
				}}
		var publicSms = publicTerrorSms + publicPSISms;
		var publicnumber = '6593269309';
		nexmo.message.sendSms(
			'NEXMO', publicnumber,  publicSms, { type: 'unicode' },
			(err, responseData) => {
				if(err) {
					console.log(err);
				} else {
					var { messages } = responseData;
					var {['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
					console.dir(responseData);
				}
		})
		} 
	catch(error) {
	  console.log('reached catch');
	  }
	  res.next();
});
*/
