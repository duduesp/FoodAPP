import React from "react";
import s from "./Card.module.css"

export default function Card ({title, healthScore, image}) {
    return (
            <div className={s.card} >
            <h3 className={s.h3}>{title}</h3>
            <h5 className={s.h5}>Health Score: {healthScore}</h5>
            <img className={s.img}
             src={image} alt="img not found" width="200px" height="250px" />
        </div>
    );
}