const AWS = require("aws-sdk");

module.exports.deleteTask = async (event) => {
  const { id } = event.pathParameters;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  console.log(`Deleting task with id ${id}`);
  console.log({ parameters: event.pathParameters });

  await dynamoDb
    .delete({
      TableName: "TaskTable",
      Key: { id },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Task deleted successfully",
    }),
  };
};
