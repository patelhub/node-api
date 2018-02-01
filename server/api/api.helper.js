const _ = require('lodash');
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, useDefaults: true }); // options can be passed, e.g. {allErrors: true}
var ajvPatch = new Ajv({ allErrors: true });
const { ObjectID } = require('mongodb');

function validate_Id(req, res) {
    var id = req.params.id;
    if (id && !ObjectID.isValid(id)) {
        res.status(404).send();
        return null;
    }
    return id;
}

function getModel(entityName) {
    return require('./' + entityName + '/model').model;
}
function getSchema(entityName) {
    return require('./' + entityName + '/schema').schema;
}

module.exports = {
    router: require('express').Router(),
    authenticate: require('../middleware/authenticate').authenticate,
    readData: (req, res, entityName) => {
        var jsonSchema = getSchema(entityName);
        delete jsonSchema.properties.id;
        var fieldToRead = Object.keys(jsonSchema.properties);
        var data = _.pick(req.body, fieldToRead);
        try {
            var validate = ajv.compile(jsonSchema);
            if (validate(data)) {
                return data;
            } else {
                res.status(400).send(validate.errors);
            }
        } catch (error) {
            console.log(error);
        }
    },
    saveDoc: (res, entityName, data, handler) => {
        var entity = new (getModel(entityName))(data);
        entity.save().then((item) => {
            if (handler) {
                handler(item);
            } else {
                res.send({ 'data': item });
            }
        }, (e) => {
            res.status(400).send(e);
        });
    },
    readPatchData: (req, res, entityName) => {
        var jsonSchema = getSchema(entityName);
        const id = validate_Id(req, res);
        if (!id) {
            return null;
        }
        delete jsonSchema.properties.id;
        delete jsonSchema.required;
        var fieldToRead = Object.keys(jsonSchema.properties);
        const data = _.pick(req.body, fieldToRead);

        try {
            var validate = ajvPatch.compile(jsonSchema);
            if (validate(data)) {
                return { id: id, patchData: data };
            } else {
                res.status(400).send(validate.errors);
            }
        } catch (error) {
            console.log(error);
        }
    },
    patchDoc: (res, entityName, data, options = {}) => {
        var findBy = (Object.assign({ _id: data.id }, options.findBy));
        getModel(entityName).findOneAndUpdate(findBy, { $set: data.patchData }, { new: true }).then((item) => {
            if (!item) {
                res.status(404).send();
            }
            res.send({ 'data': item });
        }).catch((e) => {
            res.status(400).send();
        })
    },
    deleteById: (req, res, entityName, options = {}) => {
        const id = validate_Id(req, res);
        if (!id) {
            return null;
        }

        var findBy = (Object.assign({ _id: id }, options.findBy));
        getModel(entityName).findOneAndRemove(findBy).then((item) => {
            if (!item) {
                res.status(404).send();
            }
            res.send({ 'data': item });

        }).catch((e) => {
            res.status(400).send();
        });
    },
    getById: (req, res, entityName, options = {}) => {
        const id = validate_Id(req, res);
        if (!id) {
            return null;
        }
        var findBy = (Object.assign({ _id: id }, options.findBy));
        getModel(entityName).findOne(findBy).then((item) => {
            if (!item) {
                res.status(404).send();
            }
            res.send({ 'data': item });

        }).catch((e) => {
            res.status(400).send();
        });
    },
    getByList: (req, res, entityName, options = {}) => {
        getModel(entityName).find(options.findBy).then((items) => {
            res.send({ 'dataList': items });
        }, (e) => {
            res.status(400).send(e);
        });
    }
}
