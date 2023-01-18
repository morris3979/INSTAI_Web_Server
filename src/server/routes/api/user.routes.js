const express = require('express');
const userRouter = express.Router();
const auth = require("../../middleware/auth");
const User = require('../../controllers/user.controller');

// Register
userRouter.post("/register", User.register);

// User Bind Organization
userRouter.post("/group", User.bindOrganization);

// User Bind Organization
userRouter.post("/invite", User.inviteMember);

// Login
userRouter.post("/login", User.login);

// Login With Token
userRouter.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
    return;
});

// Get UserBelongs Organization
userRouter.get("/:id", User.findOrganizations);

module.exports = [userRouter];