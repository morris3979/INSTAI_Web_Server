const db = require('../database');
const Event = db.Event;


// Retrieve all Event from the database.
exports.findAll = (req, res) => {
    Event.findAll({
        include: [{
            model: db.Device,
            attributes:['id', 'deviceId']
        }, {
            model: db.Details,
            attributes:['id', 'details', 'image', 'video']
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
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
