const initialState = {
    recipes: [],
    backup: [],
    diets: [],
    detail: {},
    currentPage: 1,
    delete: [],
};

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                backup: action.payload,
            }
        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload
            }
        case "FILTER_DIETS":
            { let filtrado = []
                filtrado = state.backup?.filter(s => s.id.length !== 36 ? s.dietTypes?.find(n => n === action.payload) : s.diets?.find(d => d.name === action.payload))
                return {
                    ...state,
                    recipes: filtrado
                }
            }
        case "SORT_NAME": 
            return {
                ...state,
                recipes: action.payload === 'za' ? state.recipes.sort((a, b) => {
                        if(a.title.toLowerCase() > b.title.toLowerCase()) return -1
                    }) : state.recipes.sort((a, b) => {
                        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1}),
            }
        case "SORT_SCORE":
            return {
                ...state,
                recipes: action.payload === ">" ? state.recipes.sort((a, b )=> {
                    if(a.healthScore > b.healthScore) return -1 }
                ) : state.recipes.sort((a, b) => {
                    if (a.healthScore < b.healthScore) return -1
                })
            }
        case "GET_NAME": 
        return {
            ...state,
            recipes: action.payload
        }
        case "POST_RECIPE":
            return {
                ...state,
            }
        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload,
            }
        case "GET_DETAILRESET":
                let reset = {};
                return {
                  ...state,
                  detail: reset,
            }
        case "CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        case "DELETE_RECIPE":
         return {
             ...state,
             delete: action.payload
         }
            default: 
                return state;
    }
}

export default rootReducer;