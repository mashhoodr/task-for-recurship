/**
 * Created by sohaibnehal on 25/08/2017.
 */
var config = require('../config/config');
var splitArray = require('split-array');
var async = require("async");

// Imports the Google Cloud client library
var BigQuery = require('@google-cloud/bigquery');
var project_id = config.BigQueryCreds.projectId;

var bigquery = BigQuery({
    projectId: project_id
});
exports.storeDataInBigQuery = function (records, callback) {


    //recommended number of rows per request
    var _arr = splitArray(records, 500);
    async.each(_arr, function (rows, cb) {
        bigquery
            .dataset('teamwork_sohaib')
            .table('timeEntries')
            .insert(rows)
            .then(function (insertErrors) {
                console.log('Rows saved in BigQuery during current request : ' +rows.length);

                if (insertErrors && insertErrors.length > 0) {
                    console.log('Insert errors:');
                    insertErrors.forEach(function (err) {
                        console.error(err)
                    });
                }
                cb();

            })
            .catch(function (err) {
                console.error('ERROR:', err);
                cb();
            });

    }, function (err) {
        callback('Records saved in BigQuery successfully');
    });


};

