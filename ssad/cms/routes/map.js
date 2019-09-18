var db = require('./database');

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB4UWA6MysWfO-lOE0WBXp-o7rFvPiZlcI'
  }
);

// Bug Proofing for Maps splitting logic
function parseData(data){
    data = data.toString();
    data = data.replace(/,/g, '');
    data = data.replace(/\+/g, '');
    return data;
}

////////////////////////// Exported Methods //////////////////////////

// Get a new instance of map data everytime pages with maps are accessed
module.exports.mapsRefresh = () => {
    // Holds all the DB data
    var tempStringArray = "";
    // Get Data from cms.inreport
    Promise.resolve(db.getLocations()).then(function(value){
        // Iterate through Data and add it to tempStringArray
        value.forEach(function(element){
            if(value.indexOf(element) == 0){         
                tempStringArray += parseData(element[0]); // address
                tempStringArray += "," + parseData(element[1]); // lat
                tempStringArray += "," + parseData(element[2]); // lng
                tempStringArray += ",inreport"; // type of report
                tempStringArray += "," + parseData(element[4]); // status
                tempStringArray += "," + parseData(element[5]); // title
            }else{
                tempStringArray += "+" + parseData(element[0]); // address
                tempStringArray += "," + parseData(element[1]); // lat
                tempStringArray += "," + parseData(element[2]); // lng
                tempStringArray += ",inreport"; // type of report
                tempStringArray += "," + parseData(element[4]); // status
                tempStringArray += "," + parseData(element[5]); // title
            }
        });
    });
  
    // Get Data from cms.dengue
    return Promise.resolve(db.getDengueLocations()).then(function(value){
        // Iterate through Data and add it to tempStringArray
        value.forEach(function(element){
            tempStringArray += "+" + parseData(element[0]); // address
            tempStringArray += "," + parseData(element[1]); // lat
            tempStringArray += "," + parseData(element[2]); // lng
            tempStringArray += ",dengue"; // type of report
            tempStringArray += ",0"; // status
            tempStringArray += "," + parseData(element[3]); // title
        });
        return tempStringArray;
    });
}
