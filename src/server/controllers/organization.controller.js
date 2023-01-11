const db = require('../database');
const Project = db.Project;
const Organization = db.Organization;

// Retrieve a Organization from the database.
exports.findOne = (req, res) => {
    Organization.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Project
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
        }).then(data => {
        if (!data) {
            return res.status(404).send({ message: "Organization Not found." });
        }

        const replacer = (key, value) => {
            if (key == 'createdAt') return undefined
            else if (key == 'updatedAt') return undefined
            else if (key == 'deletedAt') return undefined
            else return value
        }

        res.send(JSON.parse(JSON.stringify(data, replacer)))
        })
        .catch(err => {
        res.status(500).send({ message: err.message })
        })
}
