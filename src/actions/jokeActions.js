import { FETCH_CATEGORIES, FETCH_JOKE, FETCH_RANDOM, GET_SHOW_SAVED, SAVE_JOKE, TOGGLE_SHOW_SAVED, DELETE_SAVED_JOKE, CHOOSE_CATEGORY, GET_EDIT_JOKEID, TOGGLE_EDITING, SET_EDIT_JOKEID} from "./types";

export const fetchRandomJoke = () => dispatch => {
    
        fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(joke => dispatch({
            type: FETCH_RANDOM,
            payload: joke 
        }));
}

export const fetchJoke = (cat) => dispatch => {
    if(cat=='random')
    {
        fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(joke => dispatch({
            type: FETCH_RANDOM,
            payload: joke 
        }));
    }
    else{
        fetch('https://api.chucknorris.io/jokes/random?category='+cat)
        .then(res => res.json())
        .then(joke => dispatch({
            type: FETCH_JOKE,
            payload: joke
        }));
    }

}

export const fetchCategories = () => dispatch => {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(res => res.json())
    .then(categories => dispatch({
        type: FETCH_CATEGORIES,
        payload: categories
    }));
}

export const saveJoke = (j) => dispatch => {
    
    dispatch({
        type: SAVE_JOKE,
        payload: j
    });
}


export const toggleShowSaved = () => dispatch => {
    dispatch({
        type: TOGGLE_SHOW_SAVED,
        payload: ''
    })
}

export const toggleEditing = () => dispatch => {
    dispatch({
        type: TOGGLE_EDITING,
        payload: ''
    })
}

export const getShowSaved = () => dispatch => {
    dispatch({
        type: GET_SHOW_SAVED,
        payload: ''
    })
}


export const getEditJokeID = () => dispatch => {
    dispatch({
        type: GET_EDIT_JOKEID,
        payload: ''
    })
}

export const setEditJokeID = (i) => dispatch => {
    dispatch({
        type: SET_EDIT_JOKEID,
        payload: i
    })
}

export const deleteSavedJoke = (j) => dispatch => {
    dispatch({
        type: DELETE_SAVED_JOKE,
        payload: j
    })
}

export const chooseCategory = (c) => dispatch => {
    dispatch({
        type: CHOOSE_CATEGORY,
        payload: c
    })
}