import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getByName, setPage } from "../redux/actions";
import {Link, useHistory} from "react-router-dom";
import s from "./SearchBar.module.css";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const history = useHistory();

    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        if(!name) return alert("Escribí algo")
        dispatch(getByName(name))
        dispatch(setPage(1))
        setName("")
    }
    
    function handleHome(e) {
        e.preventDefault()
        dispatch(setPage(1))
        history.push("/home")
    }

return(
    <div className={s.cont}>
        <div className={s.divHome}>
            <button onClick={handleHome}
            className={s.button}>Home</button>
        <Link to= "/recipe">
            <button className={s.button}>Create recipe
            </button>
        </Link>
        </div>
        <div className={s.divSearch}>
            <form>
        <input 
        className={s.search}
        type = "text"
        placeholder="Search a recipe..."
        onChange={(e) => handleInput(e)}
        value={name}
        />
        <button 
        className={s.button}
        type="submit"
        onClick={(e)=> handleSubmit(e)}
        value=""
        >Search</button>
        </form>
        </div>
        

    </div>

)
}