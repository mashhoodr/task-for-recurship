/**
 * Created by sohaibnehal on 25/08/2017.
 */


var config = require('../config/config');

var url = config.TeamworkCreds.url;
var base64 = config.TeamworkCreds.base64;


var request = require('request'); //A request-promise?


//A -5 who on earth uses callbacks still?
exports.fetchData = function(callback)
{
    fetchDataFromTeamwork(function(records)
    {
        callback(records);
    });
};


var _allRecords = [], _record, _headers;
var _page = 1;

var fetchDataFromTeamwork = function(callback)
{
    callURL(_page, function(err, response)
    {
        if (!err)
        {
            _headers = response.headers;
            //fetching paginated data
            //A -1 probably should add a check for x-page here
            if (parseInt(_headers['x-page']) <= parseInt(_headers['x-pages']))
            {
                _record = JSON.parse(response.body);
                _allRecords = _allRecords.concat(_record["time-entries"]);
                console.log('Records fetched so far from TeamWork : '+_allRecords.length);
                _page = parseInt(_headers['x-page'])+1;
                fetchDataFromTeamwork(callback);
            }
            else
            {
                return callback(_allRecords);
            }
        }
        else
        {
            return callback(err);
        }
    });
};


function callURL(page, done)
{
    //setting up request to fetch data from teamwork
    var options = {
        url : url,
        headers: {
            "Authorization": "BASIC " + base64,
            "Content-Type": "application/json"
        },
        method: 'GET',
        qs:{
            page : page
            //fromdate : _getDateOfOneWeekAgo()
        }

    };
    request(options, sendResponse(done));

}
function sendResponse(done)
{
    //response handler for teamwork API
    return function (error, response, body) {

        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {

            done(null, response);

        } else {
            if (error) {
                console.log(error);
                done(error);
            } else {
                console.log(response.body);
                done(new Error(response.body.message));
            }
        }
    };

}

//A -2 should have used momentjs
var _getDateOfOneWeekAgo = function(){
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo = new Date(1503242606646).toISOString().slice(0, 10).replace(/-/g, "");
    return oneWeekAgo;
};