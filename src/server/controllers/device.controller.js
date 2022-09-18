const db = require('../database');
const Device = db.Device;

// Create and Save a new Device
exports.create = (req, res) => {
    const {deviceId, deviceName, description} = req.body;

    // Validate request
    if (!(deviceId && deviceName)) {
        res.status(400).send({
            message: "deviceId and deviceName can not be empty!"
        });
        return;
    }

    // Create a Device
    const device = {
        deviceId: deviceId,
        deviceName: deviceName,
        description: description
    };

    // Save Device in the database
    Device.create(device)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Device."
        });
    });
}

// Retrieve all Device from the database.
exports.findAll = (req, res) => {
    Device.findAll({
        include: [{
            model: db.Model,
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving devices."
        });
    });
};

// Update a Device by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Device.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Device was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Project with id=" + id
        });
      });
  };