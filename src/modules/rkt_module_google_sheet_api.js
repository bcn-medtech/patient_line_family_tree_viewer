import { map, keys, values } from "underscore";

var gapi = window.gapi;

export function writeAndExportXlsxWorkbookToDrive(data) {
    // Input:
    // · data = { "Title_Sheet_1": [{}, ..., {}], ..., "Title_Sheet_N": [{}, ..., {}] }

    var today = new Date();

    // necessary info to CREATE a new spreadsheet:
    var spreadsheetBody = {
        "properties": {
            "title": "PL Viewer Family Tree DB - " + today.toDateString(),
            // "defaultFormat": {
            //     "wrapStrategy": "CLIP"//enum(WrapStrategy)
            // } // I think it is NOT working...
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

                console.log(res);

            });

        });

    });

}

/* other functions */
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

function addInfoToFormatHeaderOfSheet(id_sheet, batchUpdateRequestBody){

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


/* API calls */
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
