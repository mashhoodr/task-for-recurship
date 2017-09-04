//========================================================================//
/*
 * REQUIRES the following ENV VARs setting
 * ----------------------------------------------------------------
 * company = name of the company
 * API_KEY = api key
 *
 * */
//========================================================================//

//A -1 for not using a config library

exports.TeamworkCreds = { //A -1 uneven spacing
    url : "https://"+process.env.company+ ".teamwork.com"+ '/time_entries.json',
    base64 : new Buffer(process.env.API_KEY + ":xxx").toString("base64")
};


exports.BigQueryCreds = {
    projectId : process.env.google_project_id
};








