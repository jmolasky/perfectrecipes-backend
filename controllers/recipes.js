const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/recipe");

// Recipes index route
recipesRouter.get("/", async (req, res) => {
  try {
    res.json(await Recipe.find({}));
  } catch (err) {
    res.status(400).json(err);
  }
});

// Recipe Create Route
recipesRouter.post("/", async (req, res) => {
  try {
    res.json(await Recipe.create(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
});

// Recipe Delete Route
recipesRouter.delete("/:id", async (req, res) => {
  try {
    res.json(await Recipe.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.status(400).json(err);
  }
});

recipesRouter.put("/:id", async (req, res) => {
  try {
    res.json(
      await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = recipesRouter;
