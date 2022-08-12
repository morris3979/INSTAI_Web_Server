const db = require('../database');
const Model = db.Model;

// Create and Save a new Model
exports.create = (req, res) => {
    const {modelName, modelVersion} = req.body;

    // Validate request
    if (!(modelName && modelVersion)) {
        res.status(400).send({
            message: "modelName and modelVersion can not be empty!"
        });
        return;
    }

    // Create a Model
    const model = {
        modelName: modelName,
        modelVersion: modelVersion
    };

    // Save Model in the database
    Model.create(model)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Model."
        });
    });
}

// Retrieve all Model from the database.
exports.findAll = (req, res) => {
    Model.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving models."
        });
    });
};