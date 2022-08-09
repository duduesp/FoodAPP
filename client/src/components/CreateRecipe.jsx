import React, {useState, useEffect} from "react";
import {Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiet } from "../redux/actions";
import s from "./CreateRecipe.module.css";

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const history = useHistory();
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        image:"",
        diets: [],
    })

    const validate = (input) => {
        let errors = {};
        if (input.title === ""){
            errors.title = "Name required!";   
        } else if(input.title.length < 3) {
            errors.title = 'Minimum 4 letters'  
        } else if(!input.healthScore){
            errors.healthScore = "Required field"
        } else if(input.healthScore < 0 ){
            errors.healthScore = "Has to be a positive number"
        } else if(input.healthScore > 99 ){
            errors.healthScore = 'Maximum up to 100'
        } else if(!input.summary){
            errors.summary= "Summary must be complete";
        } else if(input.summary.length < 20){
            errors.summary = 'Minimum 20 letters';
        } else if(!input.steps){
            errors.steps = "Required field"
        } else if(input.steps.length < 20){
            errors.steps = "Minimum 20 letters"
        } else if (!input.image || !input.image.includes("https")) {
            errors.image = 'Please insert an image type URL'
        } else if(input.diets.length === 0){
            errors.diets = "It has to be a different diet"
        }
        return errors;
    }

    useEffect(() => {
        dispatch(getDiet())
    }, [dispatch]);

     function handleChange(e) {
         setInput({
            ...input,
            [e.target.name]: e.target.value
        })
         setErrors(validate({
             ...input,
             [e.target.name]: e.target.value
         }))
         console.log(input)
     }

    function handleSelect(e){
        if(input.diets.includes(e.target.value)){
            alert("Can't repite option")
        }else if (input.diets.length > 3) {
            alert("Only four types of diets can be added")
        }else {
            setInput({
                ...input,
                diets:[...input.diets,e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    const handleDelete = (p) => {
        setInput({
        ...input,
        diets: input.diets.filter(d => d !== p)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       if((!input.title) || (!input.healthScore) || (!input.summary) || (!input.steps) ||(!input.image) || (!input.diets)) alert("Input cannot be an empty value")
       else if(errors.title) alert(errors.name)
       else if(errors.healthScore) alert(errors.healthScore)
       else if(errors.summary) alert(errors.summary)
       else if(errors.steps) alert(errors.steps)
       else if(errors.image) alert(errors.image)
       else if(errors.diets) alert(errors.diets)
       else if (input.title && input.healthScore && input.summary && input.steps && input.image && input.diets) {

           dispatch(postRecipe(input))
           alert("Recipe created successfully")
           setInput({
               title: "",
               summary: "",
               healthScore: "",
               steps: "",
               image:"",
               diets: [],
           })
           history.push("/recipe") 
       }
    }
 
    return (
        <div className={s.bg}>
            <div className={s.divGen}>
             <h1>Create your recipe</h1>
                    <form className={s.form}>
                <div className={s.title}>
                    <label className={s.label}
                    >Recipe name: </label>
                    <input
                    autoFocus
                    className={s.input2}
                    placeholder="Name..."
                    type="text"
                    value={input.title}
                    name="title" 
                    onChange={(e) => handleChange(e) }>
                    </input>
                    {
                        errors.title && (
                            <p>{errors.title}</p>
                        )
                    }
                </div>
                <div className={s.health}>
                    <label className={s.label}
                    >Health Score: </label>
                    <input
                    className={s.input2}
                    placeholder="From 1 to 100"
                    type="number"
                    value={input.healthScore}
                    name="healthScore" 
                    onChange={(e) => handleChange(e)}>
                    </input>
                            <p>{errors.healthScore}</p>
                </div>
                <div className={s.summary}>
                    <label className={s.label}
                    >Summary: </label>
                    <textarea
                    className={s.input}
                    rows="5"
                    cols="40"
                    maxLength="200"
                    required
                    autocomplete= "off" 
                    type="text"
                    placeholder="A summary of the recipe..."
                    value={input.summary}
                    name="summary"
                    onChange={(e) => handleChange(e)} >
                    </textarea>
                    {
                        errors.summary && (
                            <p>{errors.summary}</p>
                        )
                    }
                    </div>
                <div className={s.steps}>
                    <label className={s.label}
                    >Steps: </label>
                    <textarea
                    className={s.input}
                    type="text"
                    value={input.steps}
                    placeholder="Write the recipe steps..."
                    name="steps"
                    rows="7"
                    cols="40"
                    maxLength="200"
                    required
                    autoComplete= "off" 
                    onChange={(e) => handleChange(e)}>
                    </textarea>
                    {
                        errors.steps && (
                            <p>{errors.steps}</p>
                        )
                    }
                </div>
                <div className={s.image}>
                    <label className={s.label}
                    >Image: </label>
                    <input
                    className={s.input2}
                    placeholder="A valid link starting with 'https'"
                    type="text"
                    value={input.image}
                    name="image" 
                    onChange={(e) => handleChange(e)}>
                    </input>
                    {
                        errors.image && (
                            <p>{errors.image}</p>
                        )
                    }
                </div>
                <div className={s.diets}>
                    <label className={s.label}
                    >Diets: </label>
                    <select onChange={(e)=> handleSelect(e)}
                    className={s.input2}
                    name="diets" 
                    value={input.diets}>
                    <option value='hidden' hidden>Select diet types</option>
                    {diets?.map(d => (
                    <option
                     value={d.id}>
                        {d.name[0].toUpperCase() + d.name.substring(1)}
                    </option>
                    
                    ))}
                    </select>
                    {
                        errors.diets && (
                            <p>{errors.diets}</p>
                        )
                    } 
                    <div>
                        {
                        input.diets?.map((p) => {
                            console.log(p)
                            let asd = diets.find(d => d.id === p)
                            return (
                                <>
                                <div className={s.divDel}>
                                <p>{asd?.name[0].toUpperCase() + asd.name.substring(1)}</p>
                                <button className={s.butDel}
                                onClick={()=> handleDelete(p)}>x</button>
                                </div>
                                </>
                            )
                        }
                    )
                }
                    </div>
                </div>  
                <div className={s.divBtn}>
                    <button className={s.button}
                    onClick={(e) => handleSubmit(e)}
                    type="submit">
                        Create Recipe</button>
                    
                    <Link to="/home">
                    <button className={s.button}
                        >
                        Back</button>
                    </Link>
                </div>
                </form>
            </div>
        </div>
    )
}