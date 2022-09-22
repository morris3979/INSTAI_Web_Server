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

// Update a Model by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Model.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Model was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Model with id=${id}. Maybe Model was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Model with id=" + id
        });
      });
};

// Delete a Model with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Model.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Model was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Model with id=${id}. Maybe Model was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Model with id=" + id
        });
      });
  };