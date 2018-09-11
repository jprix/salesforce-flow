// // ################ SFDemoAction_SF_GetCaseData ################ //
const request = require('request');

exports.handler = (event, context, callback) => {


var access_token = event.access_token;
var instance_url = event.instance_url;
var case_id = event.case_id;
var email = event.email; //check before uploading


/*
var access_token = "00D0N000000imNF!AQYAQLPkvVzAMZ6RL0Az94e70z46nyhARz4dpjFucNzdMLko3t_1AzMKtvqL2you0BmKpsP0ZCI4An2PU2uIAXvyi9dLAi_t";
var instance_url = "https://demodg.my.salesforce.com";
var case_id = "5000N00001UOeEn";
var email = "jay@digitalgenius.com";
*/

function getKeyInBean (bean, key) {
    var robj = null;

    if (typeof (bean[key]) !== 'undefined')
        robj = bean[key];

    return robj;
}

function userIdByEmail (email) {
    var options         = {
            url: instance_url + '/services/data/v39.0/query/?q=Select+Id,Email+from+Contact+Where+Email=\''+ email +'\'',
            method: 'GET',
            headers: headers_bean
        },
        contact_info    = null,
        contact_id      = null
    returnObj       = { success: false };


    return new Promise (function (resolve, reject) {
        request (options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                contact_info = JSON.parse (body);
                if (contact_info && contact_info.records.length) {
                    contact_info = contact_info.records[0];
                    contact_id = contact_info.Id;

                    if (contact_id) {
                        returnObj["success"] = true;
                        returnObj["id"] = contact_id;
                        resolve (returnObj);
                    } else {
                        returnObj["error"] = "no contact id";
                        reject (returnObj);
                    }
                } else {
                    returnObj["error"] = "no contact info";
                    reject (returnObj);
                }
            } else {
                returnObj["error"] = JSON.stringify (response);
                reject (returnObj);
            }
        });
    });
}

function contactInfoById (contactId) {
    var options     = {
            url: instance_url + '/services/data/v39.0/sobjects/Contact/' + contactId,
            method: 'GET',
            headers: headers_bean
        },
        returnObj   = { success: false };

    return new Promise (function (resolve, reject) {
        request (options, function (e, r, b) {
            if (!e && r.statusCode === 200) {
                returnObj["success"] = true;
                returnObj["data"] = JSON.parse (b);
                resolve (returnObj);
            } else {
                returnObj["error"] = JSON.stringify (r);
                reject (returnObj);
            }
        })
    })
}






    var headers_bean    = { 'Authorization': 'Bearer ' + access_token };


    userIdByEmail (email)
        .then (function (result) {
            if (result.success)
                return contactInfoById (result.id);
        })
        .then (function (payload) {

            /*
            var flight_info = {};

            flight_info["bookingReference"]   = getKeyInBean (payload.data, "Booking_Reference__c");
            flight_info["departureTime"]      = getKeyInBean (payload.data, "Departure_Time__c");
            flight_info["arrivalTime"]        = getKeyInBean (payload.data, "Arrival_Time__c");
            flight_info["departureAirport"]   = getKeyInBean (payload.data, "Departure_Airport__c");
            flight_info["arrivalAirport"]     = getKeyInBean (payload.data, "Arrival_Airport__c");
            flight_info["class"]              = getKeyInBean (payload.data, "Class__c");
            flight_info["loungeAccess"]       = getKeyInBean (payload.data, "Lounge_Access__c");
            flight_info["firstName"]          = getKeyInBean (payload.data, "First_Name__c");
            flight_info["Flight_Number"]       = getKeyInBean (payload.data, "Flight_Number__c");
            flight_info["airline"]              = getKeyInBean (payload.data, "airline__c");

            */

            // console.log (JSON.stringify (payload, null, '  '))
            // console.log (JSON.stringify (responseObj, null, '  '));

            var options = {
                uri: instance_url + '/services/data/v43.0/sobjects/Case/' + case_id + '?fields=CreatedDate,Subject,Description',
                method: 'GET',
                headers: headers_bean
            };
            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var bodyJson = JSON.parse(body);

                                       callback(null, {
                                            "created_date": bodyJson.CreatedDate.toString(),
                                            "subject": bodyJson.Subject.toString(),
                                            "description": bodyJson.Description.toString(),
                                            "airline_iata": getKeyInBean (payload.data, "airline__c").toString(),
                                            "flight_number" : getKeyInBean (payload.data, "Flight_Number__c").toString(),
                                            "departure_iata": getKeyInBean (payload.data, "Departure_Airport__c").toString(),
                                            "arrival_iata": getKeyInBean (payload.data, "Arrival_Airport__c").toString(),
                                            "success_status": "true"
                                        })


                    /*

                                                           console.log (JSON.stringify({
                                                                "created_date": bodyJson.CreatedDate,
                                                                "subject": bodyJson.Subject,
                                                                "description": bodyJson.Description,
                                                                "airline_iata": getKeyInBean (payload.data, "airline__c"),
                                                                "flight_number" : getKeyInBean (payload.data, "Flight_Number__c"),
                                                                "departure_iata": getKeyInBean (payload.data, "Departure_Airport__c"),
                                                                "arrival_iata": getKeyInBean (payload.data, "Arrival_Airport__c"),
                                                                "success_status": "true"
                                                            }))
*/
                    // event.subject
                    // event.flight_info.departureAirport
                } else {
                    console.log("ERROR: " + JSON.stringify(error)); console.log("RESPONSE: " + JSON.stringify(response));
                    callback(error, response);
                }
            });
        });
}
