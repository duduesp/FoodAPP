const { Router } = require("express");
const { Recipe, Diet} = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const { getAllRecipes, postRecipes, getById, getByName} = require("../controllers/recipes.js");


const router = Router();

//router.get("/", getAllRecipes);

router.get("/:id", getById);

router.get("/", getByName);

router.post("/", postRecipes);



module.exports = router;