const { Diet, Recipe } = require("../db");
require("dotenv").config();
const axios = require("axios");
const {v4:uuid} = require("UUID");

// const dietType = [
//     {name:'gluten free'}, 
//     {name:'ovo-vegetarian'}, 
//     {name:'lacto-vegetarian'}, 
//     {name:'vegan'}, 
//     {name:'paleo'}, 
//     {name:'primal'}, 
//     {name:'whole 30'},
//     {name:'pescetarian'},
//     {name:'ketogenic'},
//     {name:'fodmap friendly'},
//     {name:'vegetarian'}

const getDiets = async (req, res) => {
    try {
        const dietList = await Diet.findAll();
        if(dietList.length > 0) {
            res.send(dietList)
        } else {
            let dietsApi = [
                {name:'gluten free'}, 
                {name:'dairy free'}, 
                {name:'lacto ovo vegetarian'}, 
                {name:'vegan'}, 
                {name:'paleolithic'}, 
                {name:'primal'}, 
                {name:'whole 30'},
                {name:'pescetarian'},
                {name:'ketogenic'},
                {name:'fodmap friendly'},
                {name:'vegetarian'}
                ];
            dietsApi.map(d => {const id = uuid(); Diet.create({id: id, name: d.name})})
            res.send(dietList)
        }
    } catch (e) {
        res.status(400).send("Receta ya creada/ receta incorrecta.")
    }
} 

module.exports = {
    getDiets,
  };