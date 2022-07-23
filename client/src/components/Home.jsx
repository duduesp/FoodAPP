import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/actions";
import {Link} from "react-router-dom";

export default function Home () {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    useEffect(()=> {
        dispatch(getRecipes())
    }, [])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    return (
        <div>
            <Link to= "/recipe">Crear recipe</Link>
            <h1> HOME </h1>
            <button onClick={e => {handleClick(e)}}>
                Recargar
            </button>
            <div>
                
            </div>
        </div>
    )
}