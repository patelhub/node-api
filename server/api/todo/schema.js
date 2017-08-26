
const _ = require('lodash');

const schema = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "Candidate",
    "description": "A user detail",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a entity",
            "type": "string"
        },
        "text": {
            "description": "Todo text",
            "type": "string",
            "minlength": 1
        },
        "completed": {
            "type": "boolean",
            "default": false
        }
    },
    "required": ["text"]
};

module.exports = {
    // get: () => {
    //     return _.cloneDeep(schema);
    // },
    schema
};
