var request = require('request');

var qp = require('flexqp');
var con = require('../dbconfig.json');
qp.presetConnection(con);

async function storePSI(data, nsewc) {
  // console.log(data)
  // console.log(nsewc)
  var datetime = new Date();
  var localt = datetime.toLocaleString();
  var result = await qp.executeUpdatePromise("update `cms`.`psi` set `current` = ?, `current_north` = ?, `current_south` = ?, `current_east` = ?, `current_west` = ?, `current_central` = ?, `lastupdated` = ? where `psicontrol` = ?", [data, nsewc[0], nsewc[1], nsewc[2], nsewc[3], nsewc[4], localt, 1]);
  // console.log(result)
}

async function storePSI24(time, data) {
  var result = await qp.executeUpdatePromise("update `cms`.`psi_twentyfour` set `psi` = ? where `time` = ?", [data, time]);
}

module.exports.getPSI = function () {
  var datetime = new Date();
  var localt = datetime.toLocaleTimeString();
  var dt = datetime.toISOString();
  // console.log(localt);
  // console.log(dt);
  var date = dt.slice(0, 10);
  // console.log(date);
  var hh = dt.slice(11, 13);
  var mm = dt.slice(14, 16);
  var ss = dt.slice(17, 19);
  // var hh = localt.slice(0, 2);
  // var mm = localt.slice(3, 5);
  // var ss = localt.slice(6, 8);
  

  let url = `https://api.data.gov.sg/v1/environment/psi?date_time=${date}T${hh}%3A${mm}%3A${ss}`
  let urlx = `https://api.data.gov.sg/v1/environment/psi?date=${date}`

  request(url, function (err, response, body) {
    if (err) {
      console.log('error')
    }
    let psi = JSON.parse(body)
    var nsewc = [];
    // console.log(psi)
    // console.log("psi reading (24h)")
    // console.log(psi.items[0].readings.psi_twenty_four_hourly.national)
    nsewc.push(psi.items[0].readings.psi_twenty_four_hourly.north)
    nsewc.push(psi.items[0].readings.psi_twenty_four_hourly.south)
    nsewc.push(psi.items[0].readings.psi_twenty_four_hourly.east)
    nsewc.push(psi.items[0].readings.psi_twenty_four_hourly.west)
    nsewc.push(psi.items[0].readings.psi_twenty_four_hourly.central)   
    // console.log(nsewc)  
    // console.log(Object.keys(psi.items[0].readings.psi_twenty_four_hourly).length);
    storePSI(psi.items[0].readings.psi_twenty_four_hourly.national, nsewc)
  })

  request(urlx, function (err, response, body) {
    if (err) {
      console.log('error')
    }
    let psix = JSON.parse(body);
    // console.log(body);
    // console.log(Object.keys(psix.items).length);
    var i;
    for (i = 0; i < Object.keys(psix.items).length; i++) {
      storePSI24(psix.items[i].timestamp.slice(11, 19), psix.items[i].readings.psi_twenty_four_hourly.national);
      // console.log(psix.items[i].timestamp.slice(11, 19) + " - " + psix.items[i].readings.psi_twenty_four_hourly.national);
    }
    // console.log(psix.items[0].timestamp);
    // console.log(psix.items[0].readings.psi_twenty_four_hourly.national);
  })

}