/**
 * Created by sohaibnehal on 25/08/2017.
 */
var config = require('../config/config');
var splitArray = require('split-array');
var async = require("async"); //A -2 for not using nodes build in async
//A -1 for using quotes inconsistency

// Imports the Google Cloud client library
var BigQuery = require('@google-cloud/bigquery');
var project_id = config.BigQueryCreds.projectId;

var bigquery = BigQuery({
    projectId: project_id
});

exports.storeDataInBigQuery = function (records, callback) {

    async.waterfall([
        function(nextTask){
            //Delete all previous records

            // The SQL query to run
            var sqlQuery = 'DELETE FROM teamwork_sohaib.timeEntries WHERE TRUE';

            // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
            var options = {
                query: sqlQuery,
                useLegacySql: false // Use standard SQL syntax for queries.
            };

            // Runs the query
            bigquery
                .query(options)
                .then(function(results){
                    nextTask();
                })
                .catch(function (err) {
                    console.error('ERROR:', err);
                    nextTask(err);
                });
        },
        function(nextTask){
            //Add New Records

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
                        cb(err);
                    });

            }, function (err) {
                if (err)
                {
                    nextTask(err);
                }
                else
                {
                    nextTask();
                }
            });
        }

    ], function nextTask(err){

        if (err)
        {
            callback(null, err);
        }
        else
        {
            callback('Records saved in BigQuery successfully');
        }

    });


};

