// // ################ SFDemoAction_SF_SendEmailWithRoutes ################ //
const request = require('request');
var access_token = '00D0N000000imNF!AQYAQHDMiw2NkyYXzF2tOn48XYg1AeHyVJv79G98eYFoycXr9mbagILtEdYs9oTfnSzP_LtydHxKuCrwYg3Tx2ERGVIMlaVI';
var instance_url = 'https://demodg.my.salesforce.com';
var case_id = '5000N00001UOUkv';
var subject = 'Lounge';
var html_body = 'Dear {!Case.SuppliedName}, This is my first automated email. Boom!';
var routesJson = JSON.parse('[{"airline_iata":"5K","flight_number":"30"},{"airline_iata":"5K","flight_number":"40"},{"airline_iata":"5K","flight_number":"50"}]');
var route_information =
    '<hr>' + '<h3>Requested Route Information</h3>' + '<table>' +
    '<tr>' +
    '<th>Airline</th>' + '<th>Flight Number</th>' + '</tr>';
var i; for (i = 0; i < routesJson.length; i++) {
    route_information = route_information +
        '<tr>' +
        '<td>' + routesJson[i].airline_iata + '</td>' + '<td>' + routesJson[i].flight_number + '</td>' + '</tr>'; }
route_information = route_information +
    '</table>' + '<hr>';
var bodyDataJson = []; bodyDataJson[0] = {}; bodyDataJson[0].subject = subject; bodyDataJson[0].htmlBody = html_body + route_information;
bodyDataJson[0].caseId = case_id;
var options = {
    uri: instance_url + '/services/apexrest/dg-send-email', method: 'POST', headers: {
        'X-PrettyPrint': '1',
        'Authorization': 'Bearer ' + access_token }, json: true, body: bodyDataJson };
request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("SUCCESS"); console.log("success_status : " + "true") } else {
        console.log("ERROR: " + JSON.stringify(error)); console.log("RESPONSE: " + JSON.stringify(response));
    }
});
