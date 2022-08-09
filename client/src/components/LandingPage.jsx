import React from "react";
import {Link} from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
    return(
        <div className={s.bg}>
        <div className={s.mainDiv}>
            <h1 className={s.h1}> "We all eat, an it would be a sad waste of opportunity to eat badly" </h1>
            <Link to = "/home">
                <button className={s.btn}> Get Into</button>
            </Link>
        </div>
        </div>
    )
}
