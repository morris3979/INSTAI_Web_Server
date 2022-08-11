const path = require('path');
const express = require('express');
const pageRouter = express.Router();

pageRouter.get("/map", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

pageRouter.get("/modelA", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

pageRouter.get("/modelB", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

pageRouter.get("/modelC", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

pageRouter.get("/modelVersion", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

pageRouter.get("/resource", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

pageRouter.get("/account", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../dist") });
});

module.exports = pageRouter;