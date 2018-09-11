//
// ################ SFDemoAction_SF_Authenticate ################
//
const request = require('request');
exports.handler = (event, context, callback) => {
    var client_id = process.env.client_id;
    var client_secret = process.env.client_secret;
    var username = process.env.username;
    var password = process.env.password;
    var formDataJson = {};
    formDataJson.grant_type = 'password';
    formDataJson.client_id = client_id;
    formDataJson.client_secret = client_secret;
    formDataJson.username = username;
    formDataJson.password = password;
    var options = {
        uri: 'https://login.salesforce.com/services/oauth2/token',
        method: 'POST',
        headers: {
            'X-PrettyPrint': '1'
        },
        formData: formDataJson
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bodyJson = JSON.parse(body);
            callback(null, {
                "access_token": bodyJson.access_token,
                "instance_url": bodyJson.instance_url,
                "success_status": "true"
            });
        } else {
            console.log("ERROR: " + JSON.stringify(error));
            console.log("RESPONSE: " + JSON.stringify(response));
            callback(error, response);
        }
    });
};
