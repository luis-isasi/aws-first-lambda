"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

module.exports.createTask = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  const newTask = {
    id,
    description,
    title,
    createdAt,
  };

  await dynamoDb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};
