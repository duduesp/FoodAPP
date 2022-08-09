const { Router } = require("express");
const { postRecipes, getById, getByName, deleteRecipe} = require("../controllers/recipes.js");


const router = Router();

//router.get("/", getAllRecipes);

router.get("/:id", getById);

router.get("/", getByName);

router.post("/", postRecipes);

router.delete("/:id", deleteRecipe);

module.exports = router;