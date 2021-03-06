const schema = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "Candidate",
    "description": "candidate detail",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a entity",
            "type": "string"
        },
        "firstname": {
            "description": "FirstName of the user",
            "type": "string",
            "pattern": "^[a-zA-Z]+$"
        },
        "lastname": {
            "type": "string",
            "pattern": "^[a-zA-Z]+$"
        },
        "aid": {
            "description": "Aadhaar Number",
            "type": "integer",
            "minimum": 100000000000,
            "maximum": 999999999999
        }
    },
    "required": ["firstname", "lastname", "aid"],
    "errorMessages": {

    }
};

module.exports = { schema };

 // "birthdate": {
        //     "type": "string",
        //     "pattern": "^\d{1,2}\/\d{1,2}\/\d{4}$"
        // },
        // "gender": {
        //     "type": "integer",
        //     "enum": [0, 1, 2]
        // },
        // "education": {
        //     "type": "integer",
        //     "enum": [0, 1, 2, 3, 4]
        // },
        // "mobile": {
        //     "type": "integer",
        //     "pattern": "^\d{10}$"
        // },
        // "email": {
        //     "type": "integer"
        // },
        // "password": {
        //     "type": "string"
        // }