/**
 * Created by sohaibnehal on 25/08/2017.
 */
exports.reformatData = function(records, callback){

    var _reformattedRecords = reformatData(records);
    callback(_reformattedRecords);

};


var reformatData = function(records, callback)
{
    //reformatting data as per the google spreadsheet
    var _item, reformattedData = [];
    records.forEach(function(item, i) {
        _item = {};
        _item['date'] = item['date'];
        _item['projectName'] = item['project-name'];
        _item['companyName'] = item['company-name'];
        _item['personName'] = item['person-first-name'] + ' ' + item['person-last-name'];
        _item['hours'] = parseInt(item['hours']);
        _item['minutes'] = parseInt(item['minutes']);
        _item['decimalHours'] = ((parseInt(item['hours']) + parseInt(item['minutes'])) / 60).toFixed(2);
        _item['description'] = item['description'];
        _item['todoListName'] = item['todo-list-name'];
        _item['todoItemName'] = item['todo-item-name'];
        _item['parentTaskName'] = item['parentTaskName'];
        _item['taskIsSubTask'] = parseInt(item['taskIsSubTask']) ? true : false;
        _item['isBillable'] = parseInt(item['isbillable']) ? true : false;
        _item['tags'] = JSON.stringify(item['tags']);
        _item['yearDate'] = new Date(_item['date']).toISOString().slice(0, 10).replace(/-/g, "");
        _item['billableHour'] = parseInt(_item['isbillable']) ? _item['decimalHours'] : 0;
        _item['nonBillableHour'] = !parseInt(_item['isbillable']) ? _item['decimalHours'] : 0;
        if (parseInt(_item['taskIsSubTask'])) {
            _item['attachedTask'] = _item['parentTaskName'];
        }
        else {
            _item['attachedTask'] = _item['todoItemName'] != '' ? _item['todoItemName'] : 'no task found';
        }
        reformattedData.push(_item);
    });
    return reformattedData;

};