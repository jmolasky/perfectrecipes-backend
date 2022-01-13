const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: String,
    ingredients: String,
    instructions: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
