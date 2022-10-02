const db = require('../database');
const Host = db.Host;

// Create and Save a new Host
exports.create = (req, res) => {
    // Validate request
    if (!req.body.serialNumber) {
        res.status(400).send({
            message: "serialNumber can not be empty!"
        });
        return;
    }

    // Create a Host
    const host = {
        serialNumber: req.body.serialNumber,
        ProjectId: req.body.ProjectId
    };

    // Save Host in the database
    Host.create(host)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Host."
        });
    });
}

// Retrieve all Host from the database.
exports.findAll = (req, res) => {
    Host.findAll({
        include: [{
            model: db.Project,
            attributes:['id', 'project', 'displayName']
        }, {
            model: db.Device,
            attributes:['id', 'deviceId', 'deviceName']
        }],
        order: [
          ['id', 'DESC'],
        ],
        attributes: {
            exclude: ['accessKey', 'secretKey', 'createdAt', 'updatedAt', 'deletedAt']
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving groups."
        });
    });
};

// Update a Host by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Host.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Host was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Host with id=${id}. Maybe Host was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Host with id=" + id
        });
      });
};

// Delete a Host with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Host.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Host was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Host with id=${id}. Maybe Host was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Host with id=" + id
        });
      });
};