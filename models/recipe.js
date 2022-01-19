const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: String,
    measurement: String,
    amount: Number,
  },
  { timestamps: true }
);

const recipeSchema = new Schema(
  {
    name: String,
    ingredients: [ingredientSchema],
    instructions: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
