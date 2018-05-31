export function capitalize_first_letter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function create_random_string(string_length) {

    // based on https://www.mediacollege.com/internet/javascript/number/random.html
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = "";

    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
} 