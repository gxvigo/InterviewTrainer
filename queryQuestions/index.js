// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});
var attr = require('dynamodb-data-types').AttributeValue;


exports.handler = (event, context, callback) => {

  console.log("### queryQuestions");

  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({
    apiVersion: '2012-10-08'
  });

  var params = {
    TableName: 'questions',
    Key: {
      "id": {
        S: "0"
      }
    }
    //ProjectionExpression: 'ATTRIBUTE_NAME'
  };

  // Call DynamoDB to read the item from the table
  ddb.getItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
      context.succeed(data.Item);
    }
  });

};