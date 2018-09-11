// // ################ SFDemoAction_SF_SendEmailWithRoutes ################ //
const request = require('request');
exports.handler = (event, context, callback) => {

   var access_token = event.access_token;
    var instance_url = event.instance_url;
    var case_id = event.case_id;
    var subject = event.subject;
    var html_body = event.html_body;
    var routesJson = JSON.parse(event.routes);




/*
    var access_token = '00D0N000000imNF!AQYAQI2NrBMCZ8pXXnmfM0SsvunNxs3of6SGQB4cCpp9AO6Pi8P1bv2Oqbi5cR.8JDqqg2wO1XrFfdsZib7SvGKtxbtYQ5og';
    var instance_url = 'https://demodg.my.salesforce.com';
    var case_id = '5000N00001UOUkv';
    var subject = 'Lounge';
    var html_body = 'Dear Lorenzo, This is my first automated email. Boom!';
    var routesJson = "{"departure_iata":"LHR","departure_icao":"EGLL","departure_terminal":"5","departure_time":"14:05:00","arrival_iata":"SFO","arrival_icao":"KSFO","arrival_terminal":"INTL","arrival_time":"16:59:00","airline_iata":"BA","airline_icao":"BAW","flight_number":"287","codeshares":[{"airline_code":"AA","flight_number":"6190"},{"airline_code":"AY","flight_number":"5527"},{"airline_code":"EI","flight_number":"8987"},{"airline_code":"IB","flight_number":"4671"}],"reg_number":["G-XLEA","G-XLEB","G-XLEC","G-XLED","G-XLEE","G-XLEF","G-XLEG","G-XLEH","G-XLEI","G-XLEJ","G-XLEK"]}";

    var routes = routesJson.toString();
    console.log(routesJson);
*/
    var route_information = '';

    if (routesJson.airline_iata !== undefined) {
        route_information +=
            '<hr>' + '<h3>Your Route Information</h3>' +
            '<table><thead><tr>' +
                '<th>Airline</th>' +
                '<th>Flight Number</th>' +
                '<th>Departure Airport</th>' +
                '<th>Arrival Airport</th>' +
                '<th>Departure Terminal</th>' +
                '<th>Arrival Time</th>' +
            '</tr></thead>';


        route_information += '<tbody><tr>';
        route_information += '<td>'+ routesJson.airline_iata +'</td>';
        route_information += '<td>'+ routesJson.flight_number +'</td>';
        route_information += '<td>'+ routesJson.departure_iata +'</td>';
        route_information += '<td>'+ routesJson.arrival_iata +'</td>';
        route_information += '<td>'+ routesJson.departure_terminal +'</td>';
        route_information += '<td>'+ routesJson.arrival_time +'</td>';


        route_information += '</tr></tbody></table><hr>';
    }




    var bodyDataJson = [];
        bodyDataJson[0] = {};
        bodyDataJson[0].subject = subject;
        bodyDataJson[0].htmlBody = html_body + route_information;
        bodyDataJson[0].caseId = case_id;

    var options = {
        uri: instance_url + '/services/apexrest/dg-send-email',
        method: 'POST',
        headers: {
            'X-PrettyPrint': '1',
            'Authorization': 'Bearer ' + access_token
        },
        json: true,
        body: bodyDataJson
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(null, { "success_status": "true" }); } else {
            //console.log("ERROR: " + JSON.stringify(error));
            //console.log("RESPONSE: " + JSON.stringify(response));

            callback(error, response);
        }
    });
}
