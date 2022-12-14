const path = require('path');
const express = require('express');
const pageRouter = express.Router();

// pageRouter.get("/map", async (req, res) => {
//     res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
// });

pageRouter.get("/overview", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/label", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/caffe", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/InstantDetector", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/ObjectDetector", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/YoloDetector", async (req, res) => {
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

// pageRouter.get("/resource", async (req, res) => {
//     res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
// });

pageRouter.get("/account", async (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../../../../dist") });
});

pageRouter.get("/TrendChart", async (req, res) => {
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