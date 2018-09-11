// // ################ SFDemoAction_SF_GetCaseData ################ //
const request       = require ('request');


var access_token    = '00D0N000000imNF!AQYAQLPkvVzAMZ6RL0Az94e70z46nyhARz4dpjFucNzdMLko3t_1AzMKtvqL2you0BmKpsP0ZCI4An2PU2uIAXvyi9dLAi_t',
    instance_url    = 'https://demodg.my.salesforce.com',
    case_id         = '5000N00001UOAl8',
    headers_bean    = { 'Authorization': 'Bearer ' + access_token };





//gets the Email Information

    var options         = {
        uri: instance_url + '/services/data/v43.0/sobjects/Case/' + case_id + '?fields=CreatedDate,Subject,Description',
        method: 'GET',
        headers: {
            'X-PrettyPrint': '1',
            'Authorization': 'Bearer ' + access_token
        }
    };



    request (options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bodyJson = JSON.parse(body);
            console.log("SUCCESS");
            console.log("created_date: " + bodyJson.CreatedDate);
            console.log("subject: " + bodyJson.Subject);
            console.log("description: " + bodyJson.Description);
            console.log("success_status : " + "true")
        } else {
            console.log("ERROR: " + JSON.stringify(error));
            console.log("RESPONSE: " + JSON.stringify(response));
        }
    });



//gets the user contact information


var contact_email   = 'jay@digitalgenius.com',
    pretty_print    = true,
    responseObj     = { };

if (pretty_print)
    headers_bean["X-PrettyPrint"] = "1";


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



userIdByEmail (contact_email)
    .then (function (result) {
        if (result.success)
            return contactInfoById (result.id);
    })
    .then (function (payload) {
        responseObj["bookingReference"]   = getKeyInBean (payload.data, "Booking_Reference__c");
        responseObj["departureTime"]      = getKeyInBean (payload.data, "Departure_Time__c");
        responseObj["arrivalTime"]        = getKeyInBean (payload.data, "Arrival_Time__c");
        responseObj["departureAirport"]   = getKeyInBean (payload.data, "Departure_Airport__c");
        responseObj["arrivalAirport"]     = getKeyInBean (payload.data, "Arrival_Airport__c");
        responseObj["class"]              = getKeyInBean (payload.data, "Class__c");
        responseObj["loungeAccess"]       = getKeyInBean (payload.data, "Lounge_Access__c");
        responseObj["firstName"]          = getKeyInBean (payload.data, "First_Name__c");
        responseObj["Flight_Number"]       = getKeyInBean (payload.data, "Flight_Number__c");
        responseObj["airline"]          = getKeyInBean (payload.data, "airline__c");

        // console.log (JSON.stringify (payload, null, '  '))
        console.log (JSON.stringify (responseObj, null, '  '));
    });



