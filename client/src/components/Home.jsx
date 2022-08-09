import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiet, filterDiets, sortName, sortScore, setPage } from "../redux/actions";
import {Link, useHistory} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado";
//import SearchBar from "./SearchBar";
import s from "./Home.module.css";

export default function Home () {
    const dispatch = useDispatch();
    const history = useHistory();
    const allRecipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets);

    // const [currentPage, setCurrentPage] = useState(1); // Le pasamos la página actual, 
    let currentPage = useSelector((state) => state.currentPage)

    // cuál va a ser la página actual y por dónde arranca (1)
    const [recipesPerPage] = useState(9);
    // Le pasamos cuántas recetas queremos por página (9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    // con los índices ordenamos las recetas en las páginas.
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    // el índice de la última receta - la cantidad de recetas que tenemos por página me da el índice de la primera receta.
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    // Corta el array en las recetas justas de cada página.



    function setCurrentPage(number){
        console.log(number)
        dispatch(setPage(number)) 
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiet());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }
    const handlefilter = (e)=>{
        e.preventDefault()
        dispatch(filterDiets(e.target.value))
        dispatch(setPage(1))
    }
    const handleName = (e) => {
        e.preventDefault();
        dispatch(sortName(e.target.value))
        dispatch(setPage(1))
        history.push("/home")
    }
    const handleScoreMax = (e) => {
        e.preventDefault();
        dispatch(sortScore(">"))
        dispatch(setPage(1))
        history.push("/home")
    }
    const handleScoreMin = (e) => {
        e.preventDefault();
        dispatch(sortScore("<"))
        dispatch(setPage(1))
        history.push("/home")
    }


    return (
        <div className={s.bg}>
                <div className={s.divSelect}>

                <div className={s.divNav}>
                <button className={s.button} value="az" onClick={handleName}>A-Z</button>
                <button className={s.button} value="za" onClick={handleName}>Z-A</button>
                </div>
                <div className={s.divNav}>
                <button className={s.button} value=">" onClick={handleScoreMax}>BEST SCORED</button>
                <button className={s.button} value="<" onClick={handleScoreMin}>WORST SCORED</button>
                </div>
                <select className={s.select} onChange={handlefilter}>
                    {diets?.map(d => (
                    <option value={d.name.toLowerCase()}>{d.name[0].toUpperCase() + d.name.substring(1)}</option>
                    ))}
                </select>
                <button className={s.button} onClick={e => {handleClick(e)}}>
                Refresh
                </button>
                </div>
                <div className={s.divPaginado}>

                <Paginado className={s.paginado}
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado = {paginado}
                />

                </div>
                <div className={s.contDiv}>
                <div className={s.divCard}>
                {
                currentRecipes?.map((e) => {
                    return (
                        
                        <div>
                            <Card className={s.card} title= {e.title} image={e.image} healthScore={e.healthScore}
                            />
                            <Link className={s.link} to={`/recipes/${e.id}`}>
                                <button className={s.button}> See More</button>
                            </Link>
                        </div>
                    )
                })
                }
                </div>
                </div>
                <div className={s.divPaginado}>
                    <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado = {paginado} />
                </div>
        </div>
    )
}