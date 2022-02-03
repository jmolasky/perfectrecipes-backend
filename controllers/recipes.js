const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/recipe");
const admin = require("firebase-admin");
const recipeScraper = require("recipe-scraper");

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
    res.status(400).json({ message: err.message });
  }
}

async function parseRecipe(url) {
  let recipe = await recipeScraper(url);
  return recipe;
}

// Recipes index route
recipesRouter.get("/", isAuthenticated, async (req, res) => {
  try {
    res.json(await Recipe.find({ uId: req.user.uid }));
  } catch (err) {
    res.status(400).json(err);
  }
});

// Recipe Input Form Populate Route
recipesRouter.post("/add", isAuthenticated, async (req, res) => {
  try {
    const url = req.body.url;
    const recipe = await parseRecipe(url);
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
