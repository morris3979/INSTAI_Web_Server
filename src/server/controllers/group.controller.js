const db = require('../database');
const Group = db.Group;

// Create and Save a new Group
exports.create = (req, res) => {
    // Validate request
    if (!req.body.groupName) {
        res.status(400).send({
            message: "groupName can not be empty!"
        });
        return;
    }

    // Create a Group
    const group = {
        groupName: req.body.groupName,
        ProjectId: req.body.ProjectId
    };

    // Save Group in the database
    Group.create(group)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Group."
        });
    });
}

// Retrieve all Group from the database.
exports.findAll = (req, res) => {
    Group.findAll({
        include: [{
            model: db.Project,
            as: 'Project'
        }]
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