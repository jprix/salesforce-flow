// // ################ SFDemoAction_INT_ParseRouteField ################ // // Note: the route field has the format [[departure_iata,arrival_iata,airline_iata]] with airline_iata being an optional filter. //
exports.handler = (event, context, callback) => {
    var string_to_parse = event.string_to_parse;
    var start_pos; var end_pos;
    var iata_codes;
    var departure_iata = ''; var arrival_iata = ''; var airline_iata = '';
    start_pos = string_to_parse.indexOf('[['); end_pos = string_to_parse.indexOf(']]');
    if (start_pos == -1 && end_pos == -1) {
        callback(null, {
            "departure_iata": departure_iata, "arrival_iata": arrival_iata, "airline_iata": airline_iata, "success_status": "false" }); } else if (start_pos == -1 || end_pos == -1 || end_pos < start_pos) {
        callback("MALFORMED ROUTE FIELD - Incorrect field delimiters", {
            "departure_iata": departure_iata, "arrival_iata": arrival_iata, "airline_iata": airline_iata, "success_status": "false" }); } else {
        iata_codes = string_to_parse.slice(start_pos + 2, end_pos).split(',');
        if (iata_codes.length < 2 || iata_codes.length > 3) {
            callback("MALFORMED ROUTE FIELD - Incorrect number of elements", {
                "departure_iata": departure_iata, "arrival_iata": arrival_iata, "airline_iata": airline_iata, "success_status": "false" }); } else {
            departure_iata = iata_codes[0].trim().toUpperCase(); arrival_iata = iata_codes[1].trim().toUpperCase();
            if (departure_iata.length == 0 || arrival_iata.length == 0) {
                callback("MALFORMED ROUTE FIELD - Empty departure or arrival elements", {
                    "departure_iata": departure_iata, "arrival_iata": arrival_iata, "airline_iata": airline_iata, "success_status": "false" }); } else {
                if (iata_codes.length == 3) {
                    airline_iata = iata_codes[2].trim().toUpperCase(); }
                callback(null, {
                    "departure_iata": departure_iata, "arrival_iata": arrival_iata, "airline_iata": airline_iata, "success_status": "true"
                });
            }
        }
    }
};
