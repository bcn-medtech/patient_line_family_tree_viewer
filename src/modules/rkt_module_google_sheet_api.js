import { map, keys, values } from "underscore";

// modules
import { isObjectEmpty } from "./rkt_module_object";

var gapi = window.gapi;

/* main functions */
// reading of spreadsheets
export function readSpreadsheetFromDrive(id_spreasdsheet, callback) {

    readEntireSpreadsheetFromDrive_API_call(id_spreasdsheet, function (sheets_data) {

        var parsed_data = parseSheetsData(sheets_data);
        callback(parsed_data);

    });

}

// writing of spreadsheets
export function writeAndExportXlsxWorkbookToDrive(data, title) {
    // Input:
    // · data = { "Title_Sheet_1": [{}, ..., {}], ..., "Title_Sheet_N": [{}, ..., {}] }
    // · title = string, title of the new spreadsheet

    // necessary info to CREATE a new spreadsheet:
    var spreadsheetBody = {
        "properties": {
            "title": title
        },
        "sheets": []
    };

    // necessary info to UPDATE the values of the different sheets:
    var add_values_batchUpdateValuesRequestBody = {
        "valueInputOption": "RAW",
        "data": []
    }

    // necessary info to format the header (in all sheets):
    var format_header_batchUpdateRequestBody = {
        "requests": []
    }

    // we fill "spreadsheetBody", "add_values_batchUpdateValuesRequestBody", and "format_header_batchUpdateRequestBody" with the values in "data"
    var names_sheets = keys(data);
    for (var i = 0; i < names_sheets.length; i++) {

        // we ask to ADD A SHEET to the spreadsheet,
        var id_sheet = i;
        var name_sheet = names_sheets[i];
        spreadsheetBody = addInfoToCreateASheet(id_sheet, name_sheet, spreadsheetBody);

        // we ask to UPDATE THE VALUES OF THIS SHEET
        var original_data_sheet = data[name_sheet];
        add_values_batchUpdateValuesRequestBody = addValuesOfSheet(name_sheet, original_data_sheet, add_values_batchUpdateValuesRequestBody);

        // and we ask to FORMAT the HEADER OF THIS SHEET
        format_header_batchUpdateRequestBody = addInfoToFormatHeaderOfSheet(id_sheet, format_header_batchUpdateRequestBody);

    }


    // we CREATE a new spreadsheet
    createSpreadSheet_API_call(spreadsheetBody, function (res) {
        var spreadsheetId = res["result"]["spreadsheetId"];

        // we UPDATE the values of the sheets of the new spreadsheet
        var batchUpdateValuesParams = {
            "spreadsheetId": spreadsheetId
        };

        updateSpreadsheetSheetsValues_API_call(batchUpdateValuesParams, add_values_batchUpdateValuesRequestBody, function (res) {

            // and we FORMAT the HEADER of the sheets
            formatHeaderRowInSheets_API_call(spreadsheetId, format_header_batchUpdateRequestBody, function (res) {

                //console.log(res);

            });

        });

    });

}


/* API calls */
function readEntireSpreadsheetFromDrive_API_call(spreadsheetId, callback) {

    var params = {
        spreadsheetId: spreadsheetId,
        fields: "sheets(properties.title,data.rowData.values(effectiveValue))"
        //fields: "sheets(properties.title,properties.index,data.rowData.values(effectiveValue))" // DO I ALSO WANT THE SHEETS' INDEXES?
    };

    gapi.client.sheets.spreadsheets.get(params)
        .then(function (res) {
            callback(res.result.sheets);
        })

}

function createSpreadSheet_API_call(spreadsheetBody, callback) {

    gapi.client.sheets.spreadsheets.create({}, spreadsheetBody)
        .then(function (res) {
            callback(res);
        });

}

function updateSpreadsheetSheetsValues_API_call(params, batchUpdateValuesRequestBody, callback) {

    gapi.client.sheets.spreadsheets.values.batchUpdate(params, batchUpdateValuesRequestBody)
        .then(function (res) {

            callback(res);

        });

}

function formatHeaderRowInSheets_API_call(spreadsheetId, batchUpdateRequestBody, callback) {

    gapi.client.sheets.spreadsheets.batchUpdate({

        spreadsheetId: spreadsheetId,
        resource: batchUpdateRequestBody

    }).then(function (res) {

        callback(res);

    });

}







/* other functions */
// reading of spreadsheets
function parseSheetsData(data) {

    var parsed_data = {};

    var lists_rows_by_sheet = getListsRowsBySheet(data);
    
    var names_sheets = keys(lists_rows_by_sheet);
    
    // loop through sheets
    for (var i=0; i<names_sheets.length; i++) {

        var name_sheet = names_sheets[i];
        var rows_sheet = lists_rows_by_sheet[name_sheet];
        
        var items_header_sheet = rows_sheet[0];
        var rows_sheet_by_key_and_value = [];
        
        // loop through rows in sheet (starting by the row in index = 1)
        for (var j = 1; j<rows_sheet.length; j++) {

            var id_row = j;
            var row = rows_sheet[id_row];
            
            var row_by_keys_and_values = {};

            // loop through the header items (and columns) in sheet
            for (var k=0; k<items_header_sheet.length; k++) {

                var id_column = k;
                var key = items_header_sheet[id_column];

                var value;
                if (row[id_column]) value = row[id_column];
                else value = "";

                row_by_keys_and_values[key] = value;

            }

            rows_sheet_by_key_and_value.push(row_by_keys_and_values);

        }

        parsed_data[name_sheet] = rows_sheet_by_key_and_value;

        
    }

    return parsed_data;

}

function getListsRowsBySheet(data) {

    var list_of_row_values = {};

    map(data, function (sheet_data) {

        var name_sheet = sheet_data["properties"]["title"];
        var grid_data_sheet = sheet_data["data"][0]["rowData"];

        var values_sheet = map(grid_data_sheet, function (row_data) {

            var values = map(row_data["values"], function (value) {

                if (!isObjectEmpty(value)) {

                    if ("numberValue" in value["effectiveValue"]) return value["effectiveValue"]["numberValue"];
                    else if ("stringValue" in value["effectiveValue"]) return value["effectiveValue"]["stringValue"];
                    else if ("boolValue" in value["effectiveValue"]) return value["effectiveValue"]["boolValue"];
                    else if ("formulaValue" in value["effectiveValue"]) return value["effectiveValue"]["formulaValue"];
                    else if ("errorValue" in value["effectiveValue"]) return value["effectiveValue"]["errorValue"];

                } else return "";

            });

            return values;

        });
        
        list_of_row_values[name_sheet] = values_sheet;

    });

    return list_of_row_values;

}

// writing of spreadsheets
function addInfoToCreateASheet(id_sheet, name_sheet, spreadsheetBody) {

    spreadsheetBody["sheets"].push({
        "properties": {
            "sheetId": id_sheet,
            "title": name_sheet
        }
    });

    return spreadsheetBody;
}

function addValuesOfSheet(name_sheet, original_data_sheet, batchUpdateValuesRequestBody) {

    var values_sheet = [];

    // we update the new sheet with

    // a header
    values_sheet.push(keys(original_data_sheet[0]));

    // and rows
    map(original_data_sheet, function (row_data) {
        values_sheet.push(values(row_data));
    });

    batchUpdateValuesRequestBody["data"].push({
        "values": values_sheet,
        "range": "'" + name_sheet + "'"
    });

    return batchUpdateValuesRequestBody;

}

function addInfoToFormatHeaderOfSheet(id_sheet, batchUpdateRequestBody) {

    // by default, 3 requests (the order of the requests is important, do NOT change it):

    // 1st request: header row is protected (i.e., cannot be edited)
    batchUpdateRequestBody["requests"].push({
        "addProtectedRange": {
            "protectedRange": {
                "range": {
                    "sheetId": id_sheet,
                    "startRowIndex": 0,
                    "endRowIndex": 1
                },
                "description": "Protecting total row",
                "warningOnly": true // I'm not totall convinced...
            }
        }
    });

    // 2nd request: header row's text is bold and centered
    batchUpdateRequestBody["requests"].push({
        "repeatCell": {
            "range": {
                "sheetId": id_sheet,
                "startRowIndex": 0,
                "endRowIndex": 1
            },
            "cell": {
                "userEnteredFormat": {
                    "horizontalAlignment": "CENTER",
                    "textFormat": { "bold": true }
                }
            },
            "fields": "userEnteredFormat(horizontalAlignment,textFormat)"
        }
    });

    // 3rd request: header row is frozen
    batchUpdateRequestBody["requests"].push({
        "updateSheetProperties": {
            "properties": {
                "sheetId": id_sheet,
                "gridProperties": {
                    "frozenRowCount": 1
                }
            },
            "fields": "gridProperties.frozenRowCount"
        }
    });

    return batchUpdateRequestBody;

}