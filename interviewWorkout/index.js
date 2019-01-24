var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-east-1' 
});


exports.handler = function(event, context) {
  
  console.log('### interviewWorkout');


  //// Get interview question
  var params = {
    FunctionName: 'queryAwsPeople', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{}'
  };

  lambda.invoke(params, function(err, data) {
    if (err) {
      console.log('### interviewWorkout - completed. invoked function queryAwsPeople failed. Error: '+err);
      context.fail(err);
    } else {
      console.log('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    //   context.succeed('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    }
  })


  //// Get interview person
  var params = {
    FunctionName: 'queryQuestions', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{}'
  };

  lambda.invoke(params, function(err, data) {
    if (err) {
      console.log('### interviewWorkout - completed. invoked function queryAwsPeople failed. Error: '+err);
      context.fail(err);
    } else {
      console.log('### interviewWorkout - completed. Data from invoked function queryQuestions: '+ data.Payload);
    //   context.succeed('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    }
  })



  //// Send email
  var emailH = `
        <h1>This text should be large, because it is formatted as a header in HTML.</h1>
        <p>Here is a formatted link: <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html">Amazon Simple Email Service Developer Guide</a>.</p>
        <img src="https://media.licdn.com/dms/image/C4E03AQFQy8Gv5CIE1w/profile-displayphoto-shrink_200_200/0?e=1553126400&v=beta&t=z1dFcaQbFwKzzBAeseLDVp2wp3LHs1YzVs3BSsaU1aA">
    `
  var emailbodyE = Buffer.from(emailH).toString('base64');
  
  var emailbody = '{"html": "' + emailbodyE + '"}';
  var params = {
    FunctionName: 'sendEmail', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: emailbody
  };

  lambda.invoke(params, function(err, data) {
    if (err) {
      console.log('### interviewWorkout - completed. invoked function sendEmail failed. Error: '+err);
      context.fail(err);
    } else {
      console.log('### interviewWorkout - completed. Data from invoked function sendEmail: '+ data.Payload);
    //   context.succeed('### interviewWorkout - completed. Data from invoked function queryAwsPeople: '+ data.Payload);
    }
  })
  

};

  