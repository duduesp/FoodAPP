import axios from "axios";

export function getRecipes() {
    return async function(dispatch) {
        let response = await axios.get("http://localhost:3001/recipes", {

        });
        return dispatch({
            type: "GET_RECIPES",
            payload: response.data,
        })
    }
}
export function getDiet() {
    return function (dispatch) {
        axios.get("http://localhost:3001/diets")
        .then(response => {
            return dispatch({
                type: "GET_DIETS",
                payload: response.data,
             })
        })
    }
}
export function filterDiets(value) {
    return function (dispatch) {
        return dispatch({
            type: "FILTER_DIETS",
            payload: value,
        })
    }
}

export function sortName(value) {
    return function(dispatch) {
        return dispatch({
            type: "SORT_NAME",
            payload: value,
        })
    }
}

export function sortScore(value) {
    return function(dispatch) {
        return dispatch({
            type: "SORT_SCORE",
            payload: value,
        })
    }
}

export function getByName(name) {
    return async function(dispatch) {
        try {
        let response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch ({
            type: "GET_NAME",
            payload: response.data,
        })
        } catch(e) {
            console.log(e.message,"Error en la búsqueda.")
        } }
}

export function postRecipe(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/recipes", payload)
            return response;
        } catch(e) {
            console.log(e.message, "Error en el Post")
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: "GET_DETAIL",
                payload: response.data,
            })
        } catch(e) {
            console.log(e)
        }
    }
}
export function getDetailsreset() {
    return {
        type: "GET_DETAILRESET",
        
    };
  }

export function setPage(number) {
    return function(dispatch) {
        return dispatch({
        type: "CURRENT_PAGE",
        payload: number,
        }
      )
    }
  }
export const Remove = (id) => {
     return(dispatch) => {
         axios.delete(`http://localhost:3001/recipes/${id}`).then((remove) => {
             dispatch({
                 type: "DELETE_RECIPE",
                 payload: remove.id
             });
         }).catch(error => {
             console.log(error)
           })
       }
       }