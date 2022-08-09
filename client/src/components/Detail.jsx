import React from "react";
import { useEffect } from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailsreset, Remove } from "../redux/actions/index";
import s from "./Detail.module.css";

export default function Detail(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams(); // useParams te permite acceder a los params de la ruta actual.

    useEffect(()=> {
        dispatch(getDetail(id)) // Accedo al ID 
        return function() {
            dispatch(getDetailsreset())
        }
    }, [dispatch])

    const detailed = useSelector((state) => state.detail)

function handleDelete (e){
    e.preventDefault(e)
    dispatch(Remove(id))
    alert("Successfully deleted")
    history.push("/home")
    }
    
    return (
        
        <div className={s.divGen}>
            { detailed ? 
            <div className={s.divUno}>
                <div className={s.divDos}>
 {detailed.id?.length === 36 ?
     <button className={s.buttonH}
     onClick={(e)=> handleDelete(e)}>Remove</button>
 : <br></br> } 
            <h1>{detailed.title}</h1>
            <h3>HealthScore: {detailed.healthScore}</h3>
            <img className={s.img}
            src={detailed.image} alt={detailed.image}></img>
            <p><h1>Diets: </h1>{ detailed.id?.length === 36 ?
                detailed.diets?.map((diets)=> ( <li>{diets.name}</li> )) : 
                detailed.dietTypes?.map(d => (<li> {d[0].toUpperCase() + d.substring(1)} </li>))
            }</p>
            </div>
            <div className={s.divTres}>
            <p><h1 className={s.p}>Summary: </h1>{detailed.summary && detailed.summary.length > 0 ? detailed.summary.replace(/<[^>]*>/g, '') : "Summary not found"}</p>
            <p><h1 className={s.p}>Instructions </h1>{ Array.isArray(detailed.steps) ? detailed.steps.map(e => <li>{e.step}</li>)
                        : <p>{detailed.steps}</p>
                    }</p>

             </div>
                </div>
             : <h1>Recipe not Found</h1>
            }
            <div>
            <Link to="/home" >
                <button className={s.buttonH}>Back</button>
            </Link>
            </div>      
        </div>
        
    )
}

// <img src={detailed.image} alt="" />aaa
// <p>Summary: {detailed.summary}</p>aaaaaaa
// <h3>HealthScore: {detailed.healthScore}</h3>
// <p>Steps: {detailed.steps}</p>
// <p>Diets: {detailed.dietsTypes}</p>