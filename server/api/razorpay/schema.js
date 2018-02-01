
const _ = require('lodash');

const schema = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "razorpay",
    "description": "A payment detail",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a entity",
            "type": "string"
        },
        "amount": {
            "description": "amount"
        }
    },
    "required": ["amount"]
};

module.exports = {
    schema
};
