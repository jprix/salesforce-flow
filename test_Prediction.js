// // ################ SFDemoAction_QA_GetPrediction ################ //
const request = require('request');
var ai_url = 'https://demo-api.us.dgdeepai.com/api/v1/qa/';
var api_key = '03c06d9a-474d-4b2f-9991-2e674f47309b';
var api_secret = 'mVYvFQ7AA202aixVq1F5w2co0kw8PbaGYgHUF3XX1mJXEWWxuAj3PnKzym6m7ch5vuS4ajR4sMAzjkrB';
var model_group_id = '17cc6e32-ee95-4b8d-ae78-58c56e659d90';
var case_id = '5000X00001TxOwC';
var created_date = '2018-06-11T17:16:52.000+0000';
var question = 'Can I take my pet kitten on the flight?';
var bodyDataJson = [];
bodyDataJson[0] = {};
bodyDataJson[0].action = "create_log";
bodyDataJson[0].params = {"modelgroupId": model_group_id}; bodyDataJson[0].body = {"messages": []};
bodyDataJson[0].body.externalId = case_id; bodyDataJson[0].body.createdAt = created_date;
bodyDataJson[0].body.messages[0] = {};
bodyDataJson[0].body.messages[0].createdAt = created_date;
bodyDataJson[0].body.messages[0].externalId = case_id;
bodyDataJson[0].body.messages[0].from = "customer";
bodyDataJson[0].body.messages[0].content = question;
bodyDataJson[0].body.messages[0].language = "English";
bodyDataJson[0].body.messages[0].channel = "private_messages";
bodyDataJson[0].body.messages[0].answerIds = [];
bodyDataJson[0].body.messages[0].metadata = [];
bodyDataJson[1] = {};
bodyDataJson[1].params = {"modelgroupId": model_group_id}; bodyDataJson[1].body = {}; bodyDataJson[1].body.logExternalId = case_id; bodyDataJson[1].body.logMessageExternalId = case_id; bodyDataJson[1].body.showTopBestAnswers = 3; bodyDataJson[1].action = "create_prediction";

var options = {
    uri: ai_url + "batch", method: 'POST', headers: {
        'X-PrettyPrint': '1', 'Authorization': 'Basic ' + Buffer.from(api_key + ':' + api_secret).toString('base64')
    },
    json: true,
    body: bodyDataJson };
request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var template;
        if (body[1].body.prediction.answers[0].automatable){
            template = body[1].body.prediction.answers[0].automationTemplate;
        } else {
            template = body[1].body.prediction.answers[0].template; }
        console.log("SUCCESS");
        console.log("title:" + body[1].body.prediction.answers[0].title);
        console.log("template:" + template);
        console.log("success_status : " + "true") } else {
        console.log("ERROR: " + JSON.stringify(error)); console.log("RESPONSE: " + JSON.stringify(response));
    }
});
