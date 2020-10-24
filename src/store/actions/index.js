import axios from "axios";
export const Actions = {
    START_GET_GIFFS: "START_GET_GIFFS",
    SEARCH_GIFFS : "SEARCH_GIFFS",
    TRENDING_GIFFS : "TRENDING_GIFFS",
    FETCH_GIFFS : "FETCH_GIFFS",
    PARSE_GIFFS: "PARSE_GIFFS"
}
const API_KEY = process.env.REACT_APP_API_KEY;
export const toBase64 = (giffs) =>{
    const base64giffs = giffs.map(giff =>{
        return `data:${giff.headers["content-type"]};base64,${Buffer.from(giff.data).toString('base64')}`
    })
    return dispatch => {
        dispatch({type: Actions.PARSE_GIFFS, payload: base64giffs})
        console.timeEnd("search")
        console.timeEnd("trending")
    }
}
export const fetch_giffs = (giffs) =>{
    const fetched_giffs = giffs.map(giff => axios.get(giff.images.original.url,{ 
        responseType: "arraybuffer" 
    }));
    return dispatch => {
        Promise.all(fetched_giffs)
            .then(giffs => {
                dispatch({type: Actions.FETCH_GIFFS, payload: giffs});
                dispatch(toBase64(giffs));
            })
            .catch(err => console.log(err.response))
    }
}
export const search_giffs = (query, pag = 1, limit= 25) =>{
    const offset = -(limit - (limit * pag));
    console.time("search")
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=es`;
    return dispatch => {
        dispatch({type: Actions.START_GET_GIFFS})
        axios.get(url)
            .then(({data : search}) => {
                dispatch({ type: Actions.SEARCH_GIFFS, payload: {search, pag, query, limit} })
                dispatch(fetch_giffs(search.data))
            })
            .catch(err => console.log(err.response))
    }
}
export const trending_giffs = (limit = 25) =>{
    console.time("trending");
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&rating=g`;
    return dispatch => {
        dispatch({type: Actions.START_GET_GIFFS})
        axios.get(url)
            .then(({data : trending}) => {
                dispatch({ type: Actions.TRENDING_GIFFS, payload: trending })
                dispatch(fetch_giffs(trending.data))
            })
            .catch(err => console.log(err.response))
    }
}