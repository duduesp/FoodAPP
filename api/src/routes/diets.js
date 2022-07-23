const { Router } = require("express");
const { Recipe, Diet} = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const { getDiets} = require("../controllers/diets.js");

const router = Router();

router.get("/", getDiets);

module.exports = router;