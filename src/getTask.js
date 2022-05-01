const AWS = require("aws-sdk");

module.exports.getTask = async (event) => {
  const { id } = event.pathParameters;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDb
    .get({
      TableName: "TaskTable",
      Key: {
        id,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};
