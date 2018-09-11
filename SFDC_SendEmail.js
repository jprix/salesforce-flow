// // ################ SFDemoAction_SF_SendEmail ################ //
const request = require('request');
exports.handler = (event, context, callback) => {
    var access_token = event.access_token;
    var instance_url = event.instance_url;
    var case_id = event.case_id;
    var subject = event.subject;
    var html_body = event.html_body;
    var bodyDataJson = []; bodyDataJson[0] = {}; bodyDataJson[0].subject = subject; bodyDataJson[0].htmlBody = html_body; bodyDataJson[0].caseId = case_id;
    var options = {
        uri: instance_url + '/services/apexrest/dg-send-email', method: 'POST', headers: {
            'X-PrettyPrint': '1',
            'Authorization': 'Bearer ' + access_token }, json: true, body: bodyDataJson };
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(null, {
                "success_status": "true" }); } else {
            console.log("ERROR: " + JSON.stringify(error)); console.log("RESPONSE: " + JSON.stringify(response));
            callback(error, response); }
    });
}