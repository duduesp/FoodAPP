const {Diet, Recipe} = require("../db.js")
require("dotenv").config();
const {API_KEY, GET_URL} = process.env;
const {v4:uuid} = require("UUID");
const axios = require("axios");
const db = require("../db");

const getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await axios.get(`${GET_URL}${API_KEY}`);
        const sinBasura = allRecipes?.data.results.map(d => {
            return {
            id: d.id,
            image: d.image,
            title: d.title,
            dietTypes: d.diets,
            summary: d.summary,
            healthScore: d.healthScore,
            steps: d.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                    }
                })
            }
        })
        const dbInfo = await Recipe.findAll({include: Diet})
        const dbData = dbInfo.map(e => {
          return e.dataValues
          //el método findAll no solo te trae la información si no también la instancia de modelo
          // y un montón de información que no necesitamos
        })
        const totalInfo = dbData?.concat(sinBasura);
        return totalInfo;
        } catch (e) {
    res.status(400).send("No hay recetas, MEN.")
}
}

const getByName = async (req, res) => {
    try {
        const { name } = req.query;
        const recipe = await getAllRecipes();
        if(!name) {
            res.send(recipe)
        } else {
            const filtred = [];
            recipe.forEach(e => {
                // SEARCH
                if(e.title.toLowerCase().includes(name.toLowerCase())) {
                    filtred.push(e)
                }
            })
            filtred.length > 0 ? res.send(filtred) : res.status(404).send("No se encontró MAN")
        }
    } catch (e) {
        console.log("Error API. Creo que te quedaste sin request OTRA VEZ....")
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if(id.length !== 36) {
            const apiId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${API_KEY}`)
            const recipe = {
                title: apiId.data.title,
                image: apiId.data.image,
                dietTypes: apiId.data.diets,
                dishTypes: apiId.data.dishTypes,
                summary: apiId.data.summary,
                healthScore: apiId.data.healthScore,
                steps: apiId.data.analyzedInstructions[0]?.steps.map(e => {
                    return {
                        number: e.number,
                        step: e.step
                        }
                    })
            }
            res.send(recipe)
        } else {
            const dbId = await Recipe.findOne({
                where: {id: id},
                include: Diet,
            })
            res.send(dbId)
        }
    } catch (e) {
        res.status(404).send("Poné bien el ID MEN")
    }
}

 const postRecipes = async (req, res) => {
    try {
         const {title, summary, healthScore, steps, diets, image} = req.body;
         const id = uuid();
         const newRecipe = await Recipe.create({
            id: id,
            title: title,
            image: image,
            summary: summary,
            healthScore: healthScore,
            steps: steps,
        })
            diets.map(d => newRecipe.addDiet(d))
            // add es un método que agrega relación entre las tablas. Siempre y cuando tengas relacionadas las tablas.
            res.send("Receta creada correctamente.")
    } catch(e) {
        console.log(e.message)
    }
 }
 const deleteRecipe = async (req, res) => {
         let {id} = req.params;
             await Recipe.destroy({
                where: {
                    id: id,
                }
            })
               res.status(204).send();
            }   

  
module.exports = {
    getAllRecipes,
    postRecipes,
    getByName,
    getById,
    deleteRecipe,
  };