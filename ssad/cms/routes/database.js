var express = require('express');

var bodyParser = require('body-parser');

var qp = require('flexqp');
var con = require('../dbconfig.json');
qp.presetConnection(con);

module.exports.getAll = async function () {
  console.log('get whole table');
  var result = await qp.executeAndFetchPromise("select * from `cms`.`inreport`");
  console.log(result);
}

module.exports.getLocations = async function () {
    console.log('get all the locations'); 
  
    var result = await qp.executeAndFetchPromise("select `location`, `lat`, `lng`, `type`, `status`, `title` from `cms`.`inreport`");
    var arr = [];
    for (var i in result) {
      arr.push([result[i].location, result[i].lat, result[i].lng, result[i].type, result[i].status, result[i].title]);
    }
    return arr;
}

module.exports.putLocation = async function (reportid, loc, lat, lng) {

  console.log('put a single location');
  var result = await qp.executeUpdatePromise("update `cms`.`inreport` set `location` = ?, `lat` = ?, `lng` = ? where `report_id` = ?", [loc, lat, lng, reportid]);
  console.log(result);
    
}

module.exports.getDengueLocations = async function () {
  console.log('get dengue locations');
  var result = await qp.executeAndFetchPromise("select `address`, `lat`, `lng`, `notes` from `cms`.`dengue`");
  var arr = [];
  for (var i in result) {
    arr.push([result[i].address, result[i].lat, result[i].lng, result[i].notes]);
  }
  return arr;
}

module.exports.getPSIData = async function () {
  console.log('get PSI data');
  var result = await qp.executeAndFetchPromise("select `current_north`, `current_south`, `current_east`, `current_west`, `current_central` from `cms`.`psi`");
  return [result[0].current_north, result[0].current_south, result[0].current_east, result[0].current_west, result[0].current_central];
}
