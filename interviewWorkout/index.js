var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-east-1'
});


exports.handler = function (event, context) {

  console.log('### interviewWorkout');

  var interviewData = {};

  function getInterviewData() {

    console.log("### getInterviewData");

    return new Promise(function (resolve, reject) {

      //// Get interview data
      var params = {
        FunctionName: 'queryAwsPeopleQuestions', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: '{}'
      };

      lambda.invoke(params, function (err, data) {
        if (err) {
          console.log('### interviewWorkout - completed. invoked function queryAwsPeopleQuestions failed. Error: ' + err);
          reject('Reject!!! It does not works');
        } else {
          console.log('### interviewWorkout - completed. Data from invoked function queryAwsPeopleQuestions: ' + data.Payload);
          interviewData = JSON.parse(data.Payload);
          console.log("### interviewData: " + JSON.stringify(interviewData));
          resolve(data.Payload)
        }
      });
    })

  }


  // WORKING
  getInterviewData()
    .then(function (fullfilled) { 
      console.log("Promise resolved" + JSON.stringify(fullfilled)); // Log the value once it is resolved

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


    })
    .catch(function (error) {
      // Or do something else if it is rejected 
      // (it would not happen in this example, since `reject` is not called).
      console.log("Promise NOT resolved" + error.message); // Log the value once it is resolved
    });

};
