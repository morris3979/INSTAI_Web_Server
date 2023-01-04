const express = require('express');
const userRouter = express.Router();
const auth = require("../../middleware/auth");
const User = require('../../controllers/user.controller');

// Register a new User
userRouter.post("/register", User.register);

// Register a new User
userRouter.post("/organization", User.createOrganization);

// Register a new User
userRouter.post("/group", User.bindUserGroup);

// Login
userRouter.post("/login", User.login);

// Welcome
userRouter.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
    return;
});

// Retrieve all User
userRouter.get("/", User.findAll);

// Update a User with id
userRouter.patch("/:id", User.update)

// Delete a User with id
userRouter.delete("/:id", User.delete)

module.exports = [userRouter];