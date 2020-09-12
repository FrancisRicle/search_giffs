export const SEARCH_GIFFS = "SEARCH_GIFFS";
export const TRENDING_GIFFS = "TRENDING_GIFFS";
const API_KEY = process.env.REACT_APP_API_KEY;
export const search_giffs = (query, pag = 0) =>{
    const offset = 25 * (25 - (25 - pag));
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=${offset}&rating=g&lang=es`;
    return dispatch => {
        return fetch(url)
            .then(res => res.json())
            .then(search => dispatch({ type: SEARCH_GIFFS, payload: {search, pag, query} }))
            .catch(err => console.log(err.response))
    }
}
export const trending_giffs = (limit = 25) =>{
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&rating=g`;
    return dispatch => {
        return fetch(url)
            .then(res => res.json())
            .then(trending => dispatch({ type: TRENDING_GIFFS, payload: trending }))
            .catch(err => console.log(err.response))
    }
}