import { isObjectAnArray } from './../../../../../../modules/rkt_module_object';
import { map, sortBy } from 'underscore';

export function sort_children_by_dob(children) {

    if (isObjectAnArray(children)) {

        var sorted_children = children.slice();
        
        for (var i = 0; i < sorted_children.length; i++) {
            sorted_children[i].dob = format_date(sorted_children[i].dob);
        }

        sorted_children = sortBy(sorted_children, "dob");

        return sorted_children;


    } else return children;

}

export function calculate_age(dob) {
    // Input: 'dob' ('date of birth') --> yyyy-dd-mm ('ISO Date')
    
    var today = new Date();
    var birthDate = new Date(format_date(dob));
    
    var age = today.getFullYear() - birthDate.getFullYear();
    var month_difference = today.getMonth() - birthDate.getMonth();

    if (month_difference < 0 || (month_difference === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

function format_date(stringDate, desiredDateFormat) {
    // Input: stringDate (dd/mm/yy)
    var date = new Date(stringDate);


    if (date !== undefined) {

        var today = new Date;
        var formatted_date, y, m, d;

        y = date.getFullYear(); // to avoid the 'year 2000 problem', 'y' has always 4 numbers
        if (y > today.getFullYear()) y = y - 100;

        m = date.getMonth() + 1; // 1-12
        d = date.getDate(); // 1-31

        switch (desiredDateFormat) {

            case 'yyyy-mm-dd':
            case 'ISO':
            case undefined:
                formatted_date = y + "-" + m + "-" + d;
                break;

            case 'mm/dd/yyyy':
            case 'Short':
                formatted_date = m + "/" + d + "/" + y;
                break;

            case 'dd/mm/yyyy':
                formatted_date = d + "/" + m + "/" + y;
                break;

            default:
                alert("unidentified date format");
                formatted_date = date;
                break;

        }

        return formatted_date;

    }

}