import Papaparse from 'papaparse';
import XLSX from 'xlsx';

export function readXlsxWorkbook(file, callback) {

    var reader = new FileReader();

    if(file.type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.name.indexOf("xlsx")!=-1){

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            callback(workbook);
        };
        reader.readAsBinaryString(file);

    }else{
        callback(false);
    }

    
}

export function convertWorkbookToCSVMap(workbook) {

    var resultcsv = {};

    workbook.SheetNames.forEach(function (sheetName) {

        var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);

        if (csv.length > 0) {

            resultcsv[sheetName.toLowerCase()] = csv;
        }
    });

    return resultcsv;
}

export function convertCSVMapInJSONMap(csvMap) {

    var tempMap = {};
    var jsonMap = {};

    //parse csv
    for (var key in csvMap) {
        if (csvMap.hasOwnProperty(key)) {

            var data = Papaparse.parse(csvMap[key], {
                delimiter: "",	// auto-detect
                newline: "",	// auto-detect
                header: false,
                dynamicTyping: true,
                preview: 0,
                encoding: "",
                worker: false,
                comments: false,
                step: undefined,
                complete: undefined,
                error: undefined,
                download: false,
                skipEmptyLines: true,
                chunk: undefined,
                fastMode: undefined,
                beforeFirstChunk: undefined,
                withCredentials: undefined
            });

            var csvrows = data.data;
            var headers = csvrows[0];
            var json = [];

            for (var i = 1; i < csvrows.length; i++) {

                var obj = {};
                var currentline = csvrows[i];

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j].toLowerCase()] = currentline[j];
                }

                json.push(obj);
            }

            jsonMap[key]=json;
        }
    }

    return jsonMap;
}






