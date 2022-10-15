const path = require('path');
const express = require('express');
const pageRouter = express.Router();

pageRouter.get("/map", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/labels", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/project", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/host", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/device", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/model", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/resource", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/account", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/test", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/report/:project",
    async (req, res) => {
        res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
      return;
    }
  );

module.exports = pageRouter;