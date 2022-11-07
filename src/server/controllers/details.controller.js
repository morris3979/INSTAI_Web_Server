const db = require('../database');
const Details = db.Details;

// Retrieve all Details from the database.
exports.findAll = (req, res) => {
  Details.findAll({
      include: [{
        model: db.Event,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
        include: [{
          model: db.Device,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'HwUpdateLogs']
          },
          include: [{
            model: db.Host,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            include: [{
              model: db.Project,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
              },
            }]
          }]
        }]
      }],
      order: [
        ['id', 'DESC']
      ],
      attributes: {
          exclude: ['updatedAt', 'deletedAt']
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

// Update a Details by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Details.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Details was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Details with id=${id}. Maybe Details was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Project with id=" + id
        });
      });
};