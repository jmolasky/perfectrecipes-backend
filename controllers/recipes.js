const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/recipe");
const admin = require("firebase-admin");

// authentication middleware
async function isAuthenticated(req, res, next) {
  try {
    const token = req.get("Authorization");
    if (!token) throw new Error("You must be logged in first");
    const user = await admin.auth().verifyIdToken(token.replace("Bearer ", ""));
    if (!user) throw new Error("Something went wrong");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
}

// Recipes index route
recipesRouter.get("/", isAuthenticated, async (req, res) => {
  try {
    res.json(await Recipe.find({ uId: req.user.uid }));
  } catch (err) {
    res.status(400).json(err);
  }
});

// Recipe Create Route
recipesRouter.post("/", isAuthenticated, async (req, res) => {
  try {
    req.body.uId = req.user.uid;
    res.json(await Recipe.create(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
});

// Recipe Delete Route
recipesRouter.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    res.json(await Recipe.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

recipesRouter.put("/:id", isAuthenticated, async (req, res) => {
  try {
    res.json(
      await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = recipesRouter;
