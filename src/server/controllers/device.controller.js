const db = require('../database');
const Device = db.Device;
const Project = db.Project;

// Create and Save a new Device
exports.create = async (req, res) => {
    const {serialNumber, deviceName, ProjectId} = req.body;

    // Validate request
    if (!(serialNumber && deviceName)) {
      res.status(400).send({
        message: "serialNumber and deviceName can not be empty!"
      });
      return;
    }
    const findProject = await Project.findOne({
      where: { id: ProjectId },
    })
    if (!findProject) {
      res.status(400).send({
        message: "Project not existed, please create a new Project!"
      })
      return
    }

    // Create a Device
    const newDevice = {
      serialNumber: serialNumber,
      deviceName: deviceName,
      ProjectId: ProjectId
    };

    // Save Device in the database
    Device.create(newDevice)
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
