console.log('Running module:' + new Date()); //A -1 for not using momentjs
//A -1 for not using logging library
var TeamWorkMethods = require('./methods/TeamWorkMethods');
var ReformatData = require('./methods/ReformatDataModule');
var BigQueryMethods = require('./methods/BigQueryMethods');

TeamWorkMethods.fetchData(function(records){  //A -1 for inconsistent brace positions
    //A -3 for using ES5 code
    //A -5 for not using promises or async / await
    console.log('Total records fetched from TeamWork: ' + records.length);

    ReformatData.reformatData(records, function(reformattedRecords)
    {
        console.log('Total reformatted records : '+ reformattedRecords.length);

        BigQueryMethods.storeDataInBigQuery(reformattedRecords, function(success, err)
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
