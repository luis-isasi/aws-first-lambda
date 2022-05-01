const AWS = require("aws-sdk");

module.exports.deleteTask = async (event) => {
  const dynamoDb = AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDb
    .delete({
      TableName: "TaskTable",
      key: {
        id,
      },
    })
    .promise();

  return {
    statuCode: 200,
    body: JSON.stringify({
      message: "Task deleted successfully",
    }),
  };
};
