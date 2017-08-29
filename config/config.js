//========================================================================//
/*
 * REQUIRES the following ENV VARs setting
 * ----------------------------------------------------------------
 * company = name of the company
 * API_KEY = api key
 *
 * */
//========================================================================//

exports.TeamworkCreds = {
    url : "https://"+process.env.company+ ".teamwork.com"+ '/time_entries.json',
    base64 : new Buffer(process.env.API_KEY + ":xxx").toString("base64")
};


exports.BigQueryCreds = {
    projectId : process.env.google_project_id
};








