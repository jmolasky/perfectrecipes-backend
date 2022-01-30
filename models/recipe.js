const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: String,
    ingredients: Array,
    instructions: String,
    image: String,
    url: String,
    uId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
