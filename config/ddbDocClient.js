// Create a service client module using ES6 syntax.
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

import { ddbClient } from "./dbconfig.js";

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: true, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

// Create the DynamoDB document client.

const ddbDocClient = DynamoDBDocument.from(ddbClient, {
    marshallOptions,
    unmarshallOptions,
});

export { ddbDocClient };
