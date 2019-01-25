// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});
var attr = require('dynamodb-data-types').AttributeValue;

var configParm = require('./config.json'); // configuration file


exports.handler = (event, context, callback) => {

  //// query DynamoDB table 
  function queryTable(questionId, personId) {

    console.log("### queryTable");

    return new Promise(function (resolve, reject) {

      var interviewData = {};

      // Create the DynamoDB service object
      var ddb = new AWS.DynamoDB({
        apiVersion: '2012-10-08'
      });

      var params = {
        TableName: 'awspeople',
        Key: {
          "id": {
            S: personId
          }
        }
      };

      // Call DynamoDB to read the item from the table
      ddb.getItem(params, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject('REJECT!!! It does not works');
        } else {
          // unwrap: unmarshall data back to the orignal
          //console.log("Success", attr.unwrap(data.Item));
          console.log("Success awspoeple: ", data.Item);
          interviewData.person = attr.unwrap(data.Item);
          //interviewData.person = data.Item;

          var params = {
            TableName: 'questions',
            Key: {
              "id": {
                S: questionId
              }
            }
            //ProjectionExpression: 'ATTRIBUTE_NAME'
          };

          // Call DynamoDB to read the item from the table
          ddb.getItem(params, function (err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              // unwrap: unmarshall data back to the orignal
              //console.log("Success", attr.unwrap(data.Item));
              console.log("Success questions: ", data.Item);
              interviewData.question = attr.unwrap(data.Item);
              //interviewData.question = data.Item;

              console.log("interviewData: ", interviewData);
              resolve(interviewData); // resolve the promise sending back the combined result of the 2 queries
            }
          });

        }
      });
    });
  }


  // WORKING

  // get random index for questions
  var qIds = parseInt(configParm.questionsTotalRecords); // total number (+1) of records in the AwsPeoeple table in DynamoDB
  var qId = String(Math.floor(Math.random() * Math.floor(qIds))); // random record id (index) from AwsPeoeple table in DynamoDB

  // get random index for awspeople
  var pIds = parseInt(configParm.awsPeopleTotalRecords); // total number (+1) of records in the AwsPeoeple table in DynamoDB
  var pId = String(Math.floor(Math.random() * Math.floor(qIds))); // random record id (index) from AwsPeoeple table in DynamoDB


  queryTable(qId, pId)
    .then(function (fullfilled) { // `delay` returns a promise
      console.log("Promise resolved" + JSON.stringify(fullfilled)); // Log the value once it is resolved
      context.succeed(fullfilled);
      //context.succeed(fullfilled);
    })
    .catch(function (error) {
      // Or do something else if it is rejected 
      // (it would not happen in this example, since `reject` is not called).
      console.log("Promise NOT resolved" + error.message); // Log the value once it is resolved
    });

};
