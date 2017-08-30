console.log('Running module:'+new Date());
var TeamWorkMethods = require('./methods/TeamWorkMethods');
var ReformatData = require('./methods/ReformatDataModule');
var BigQueryMethods = require('./methods/BigQueryMethods');

TeamWorkMethods.fetchData(function(records){

    console.log('Total records fetched from TeamWork: ' + records.length);

    ReformatData.reformatData(records, function(reformattedRecords)
    {
        console.log('Total reformatted records : '+ reformattedRecords.length);

        BigQueryMethods.storeDataInBigQuery([], function(success, err)
        {
            if (err)
            {
                console.log(err);
            }
            else
            {
                console.log(success)
            }
        })
    })
});
