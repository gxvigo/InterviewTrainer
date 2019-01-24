var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-east-1'
});


exports.handler = function (event, context) {

  console.log('### interviewWorkout');

  var interviewData = {};


  //// Get interview person
  var params = {
    FunctionName: 'queryAwsPeople', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{}'
  };

  lambda.invoke(params, function (err, data) {
    if (err) {
      console.log('### interviewWorkout - completed. invoked function queryAwsPeople failed. Error: ' + err);
      context.fail(err);
    } else {
      console.log('### interviewWorkout - completed. Data from invoked function queryAwsPeople: ' + data.Payload);
      interviewData.person = JSON.parse(data.Payload);
      console.log("### interviewData: " + JSON.stringify(interviewData));
      //   context.succeed('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    }
  })


  //// Get interview question
  var params = {
    FunctionName: 'queryQuestions', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{}'
  };

  lambda.invoke(params, function (err, data) {
    if (err) {
      console.log('### interviewWorkout - completed. invoked function queryAwsPeople failed. Error: ' + err);
      context.fail(err);
    } else {
      console.log('### interviewWorkout - completed. Data from invoked function queryQuestions: ' + data.Payload);
      interviewData.question = JSON.parse(data.Payload);
      console.log("### interviewData: " + JSON.stringify(interviewData));
      //   context.succeed('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    }
  })



  //// Send email

  console.log("### interviewData: " + JSON.stringify(interviewData));

  var emailH = `
  <p style="font-size: 24px;">Do you want the <span style="background-color: #000000; color: #ff9900;">job</span>? .. I I gotta keep you on your toes</p>
  <p>&nbsp;</p>
  <p><img src="https://s3.amazonaws.com/peoplephotos/aws/scottGillet.png" />&nbsp; <span style="font-size: 18px;"><strong>Scott Gillet</strong></span></p>
  <p>Regional Account Manager in New Zealand - Auckland wants to know:</p>
  <p>&nbsp;<span style="text-decoration: underline; font-size: 18px;">"When you are working with a large number of customers, it&rsquo;s tricky to deliver excellent service to them all. How do you go about prioritizing your customers"</span></p>
  `


  var emailbodyE = Buffer.from(emailH).toString('base64');

  var emailbody = '{"html": "' + emailbodyE + '"}';
  var params = {
    FunctionName: 'sendEmail', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: emailbody
  };

  lambda.invoke(params, function (err, data) {
    if (err) {
      console.log('### interviewWorkout - completed. invoked function sendEmail failed. Error: ' + err);
      context.fail(err);
    } else {
      console.log('### interviewWorkout - completed. Data from invoked function sendEmail: ' + data.Payload);
      //   context.succeed('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    }
  })


};
