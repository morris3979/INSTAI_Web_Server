const db = require('../database');
const Details = db.Details;

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