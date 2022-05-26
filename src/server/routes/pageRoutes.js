const path = require('path');
const express = require('express');

const pageRouter = express.Router();

pageRouter.get("/map", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

pageRouter.get("/modelA", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

pageRouter.get("/modelB", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

pageRouter.get("/modelC", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

pageRouter.get("/modelVersion", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

pageRouter.get("/resource", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

pageRouter.get("/account", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../public") });
});

module.exports = pageRouter;