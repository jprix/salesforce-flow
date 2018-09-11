// // ################ SFDemoAction_QA_GetPrediction ################ //
const request = require('request');

exports.handler = (event, context, callback) => {
    var ai_url = process.env.ai_url;
    var api_key = process.env.api_key;
    var api_secret = process.env.api_secret;
    var model_group_id = process.env.model_group_id;
    var case_id = event.case_id;
    var created_date = event.created_date;
    var question = event.question;
    var bodyDataJson = [];
        bodyDataJson[0] = {};
        bodyDataJson[0].action = "create_log";
        bodyDataJson[0].params = {"modelgroupId": model_group_id};
        bodyDataJson[0].body = {"messages": []};
        bodyDataJson[0].body.externalId = case_id;
        bodyDataJson[0].body.createdAt = created_date; bodyDataJson[0].body.messages[0] = {};
        bodyDataJson[0].body.messages[0].createdAt = created_date;
        bodyDataJson[0].body.messages[0].externalId = case_id;
        bodyDataJson[0].body.messages[0].from = "customer";
        bodyDataJson[0].body.messages[0].content = question;
        bodyDataJson[0].body.messages[0].language = "English";
        bodyDataJson[0].body.messages[0].channel = "private_messages";
        bodyDataJson[0].body.messages[0].answerIds = [];
        bodyDataJson[0].body.messages[0].metadata = [];
        bodyDataJson[1] = {};
        bodyDataJson[1].params = {"modelgroupId": model_group_id};
        bodyDataJson[1].body = {};
        bodyDataJson[1].body.logExternalId = case_id;
        bodyDataJson[1].body.logMessageExternalId = case_id;
        bodyDataJson[1].body.showTopBestAnswers = 3;
        bodyDataJson[1].action = "create_prediction";
    var options = {
        uri: ai_url + "batch", method: 'POST', headers: {
            'X-PrettyPrint': '1', 'Authorization': 'Basic ' + Buffer.from(api_key + ':' + api_secret).toString('base64')
        },
        json: true,
        body: bodyDataJson
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var template;
            if (body[1].body.prediction.answers[0].automatable){
                template = body[1].body.prediction.answers[0].automationTemplate;
            } else {
                template = body[1].body.prediction.answers[0].template; }
            callback(null, {"title": body[1].body.prediction.answers[0].title, "template": template, "success_status": "true" });
        } else {
            console.log("ERROR: " + JSON.stringify(error)); console.log("RESPONSE: " + JSON.stringify(response));
            callback(error, response);
        }
    });
}

