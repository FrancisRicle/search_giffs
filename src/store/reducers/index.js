import {Actions} from "../actions";
const initialState = {
    giffs: []
};
export default (state = initialState, action) =>{
    switch(action.type){
        case Actions.START_GET_GIFFS:
            return {
                ...state,
                giffs: null,
            }
        case Actions.SEARCH_GIFFS:
            return{
                ...state,
                giffs: null,
                total: action.payload.search.pagination.total_count,
                limit: action.payload.limit,
                pag : action.payload.pag,
                query: action.payload.query
            }
        case Actions.TRENDING_GIFFS:
            return{
                ...state,
                giffs: null,
                query:null,
            }
        case Actions.PARSE_GIFFS:
            return{
                ...state,
                giffs: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}