const path = require('path');
const express = require('express');
const pageRouter = express.Router();

pageRouter.get("/", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Register", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Organization", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Home", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

module.exports = pageRouter;