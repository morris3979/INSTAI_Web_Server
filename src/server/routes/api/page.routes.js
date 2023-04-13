const path = require('path');
const express = require('express');
const pageRouter = express.Router();

pageRouter.get("/", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Register", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Organization/Create", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Organization/Select", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Organization/Management", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Organization/User", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Initial", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Home", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Project/Overview", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Project/Data", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Project/Device", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Project/Model", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Project/Detector", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/Annotation", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

module.exports = pageRouter;