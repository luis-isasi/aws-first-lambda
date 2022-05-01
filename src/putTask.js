const AWS = require("aws-sdk");

module.exports.putTask = async (event) => {
  const { id, title, description } = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  await dynamoDb
    .update({
      TableName: "TaskTable",
      Key: { id },
      UpdateExpression: "set title = :title, description = :description",
      ExpressionAttributeValues: {
        ":title": title,
        ":description": description,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Task updated successfully",
    }),
  };
};
