import React from "react";
import s from "../components/Paginado.module.css"
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../redux/actions";
import {useState} from "react";


export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
    let currentPage = useSelector(state => state.currentPage)
    const pageNumbers = [];
    const dispatch = useDispatch();

    const totalPage = Math.ceil(allRecipes/recipesPerPage)

    const [pageNumberLimit] = useState(11)
    const [maxPageNumberLimit, setmaxPageNumberLimit]= useState(12);
    const [minPageNumberLimit, setminPageNumberLimit]= useState(0);

    for(let i = 1;  i <= totalPage ; i++) {
        pageNumbers.push(i)
    }

    function setCurrentPage(number){
        console.log(number)
        dispatch(setPage(number)) 
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if ((currentPage + 1) > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
  
    const handlePrev = () => {  
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }



    return (
        <div className={s.divPag}>
               <button onClick={handlePrev}
                disabled={currentPage <= 1 ? true : false}
                className={s.btnPag}>Prev</button>
            <ul className={s.paginado}>
                
            {pageNumbers && 
            pageNumbers.map((number) => (
                <li className={s.li} key={number}>
                <button className={currentPage === number ? s.btnSelec : s.btnPag}  onClick={()=> paginado(number)}>{number}</button>
                </li>
            ))}
            </ul>
            <button onClick={handleNext}
                    disabled={currentPage >= totalPage ? true : false}
                    className={s.btnPag}>Next</button>
        </div> 
    )
}