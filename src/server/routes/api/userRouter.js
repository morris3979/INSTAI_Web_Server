require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const auth = require("../../middleware/auth");
const { register, login, getUser, patchUser, deleteUser } = require("../../controllers/user.controller")

//POST register
userRouter.post("/register", async(req, res) => {
    const { username, password } = req.body;
    try {
        const userRegister = await register(username, password);
        res.status(201).json(userRegister);
    } catch (e) {
        res.send(e);
    }
})

//POST login
userRouter.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const userLogin = await login(username, password);
        res.status(200).json(userLogin);
    } catch (e) {
        res.send(e);
    }
});

// POST welcome
userRouter.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
    return;
});

// GET
userRouter.get("/", async(req, res) => {
    try {
        const users = await getUser();
        res.status(200).json(users);
    } catch (e) {
        res.send(e);
    }
})

// PATCH, 其餘選填, 密碼必填!
userRouter.patch("/:id", async(req, res) => {
    try {
        const id = Number(req.params.id)
        const { username, admin, authA, authB, authC } = req.body;
        const users = await patchUser(id, username, admin, authA, authB, authC);
        res.status(204).json(users);
    } catch (e) {
        res.send(e);
    }
})

// DELETE
userRouter.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const users = await deleteUser(id);
        res.status(204).json(users);
    } catch (e) {
        res.send(e);
    }
})

module.exports = [userRouter];