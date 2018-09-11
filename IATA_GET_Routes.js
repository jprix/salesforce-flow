// // ################ SFDemoAction_IATACodes_GetRoutes ################ //
const request = require('request');

exports.handler = (event, context, callback) => {
  /*
    var api_key = process.env.api_key;
    var instance_url = process.env.instance_url;
    var departure_iata = event.departure_iata;
    var arrival_iata = event.arrival_iata;
    var airline_iata = event.airline_iata;
    var flight_number = event.flight_number;
    */

var api_key = '72cd49cb-41ea-460a-9bb4-038a366459a6';
var instance_url = 'http://iatacodes.org/api/v7/routes';
var departure_iata = 'LHR';
var arrival_iata = 'SFO';
var airline_iata = 'BA';
var flight_number = 285;

    var options = {
        uri: instance_url, method: 'POST', headers: {
            'X-PrettyPrint': '1' }, qs: {
            api_key: api_key, departure_iata: departure_iata, arrival_iata: arrival_iata, airline_iata: airline_iata, flight_number: flight_number } };
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bodyJson = JSON.parse(body),
                routes   = bodyJson.response.length > 0 ? bodyJson.response[0] : { };

            //console.log (route);
            callback(null,
            //console.log(
                {
                "routes": JSON.stringify(routes),
                    "success_status": "true"
                });
               // );
        } else {
            console.log("ERROR: " + JSON.stringify(error)); console.log("RESPONSE: " + JSON.stringify(response));
            callback(error, response);
        }
    });
};
