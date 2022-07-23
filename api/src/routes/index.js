const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const diets = require("./diets")
const recipes = require("./recipes")

const router = Router();

router.use("/diets", diets)

router.use("/recipes", recipes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
