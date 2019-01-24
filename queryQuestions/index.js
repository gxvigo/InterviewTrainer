// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});
var attr = require('dynamodb-data-types').AttributeValue;

var configParm = require('./config.json'); // configuration file


exports.handler = (event, context, callback) => {

  console.log("### queryQuestions");

  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({
    apiVersion: '2012-10-08'
  });

  // Get interview person
  var qIds = parseInt(configParm.tableRecords); // total number (+1) of records in the AwsPeoeple table in DynamoDB
  var qId = String(Math.floor(Math.random() * Math.floor(qIds))); // random record id (index) from AwsPeoeple table in DynamoDB


  var params = {
    TableName: 'questions',
    Key: {
      "id": {
        S: qId
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
      console.log("Success", attr.unwrap(data.Item));
      context.succeed(attr.unwrap(data.Item));
    }
  });

};