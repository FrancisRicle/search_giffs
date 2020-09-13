import {
    SEARCH_GIFFS,
    TRENDING_GIFFS
} from "../actions";
export default (state, action) =>{
    switch(action.type){
        case SEARCH_GIFFS:
            return{
                ...state,
                giffs: action.payload.search.data,
                total: action.payload.search.pagination.total_count,
                pag : action.payload.pag,
                query: action.payload.query
            }
        case TRENDING_GIFFS:
            return{
                ...state,
                giffs: action.payload.data,
                total:null,
                pag:null,
                query:null,
            }
        default:
            return state
    }
}