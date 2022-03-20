import { FETCH_CATEGORIES, FETCH_JOKE, FETCH_RANDOM, GET_SHOW_SAVED, SAVE_JOKE, TOGGLE_SHOW_SAVED, DELETE_SAVED_JOKE } from "./types";

export const fetchRandomJoke = () => dispatch => {
    console.log('fetching2')
        fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(joke => dispatch({
            type: FETCH_RANDOM,
            payload: joke 
        }));
}

export const fetchJoke = (cat) => dispatch => {
    fetch('https://api.chucknorris.io/jokes/random?category='+cat)
    .then(res => res.json())
    .then(joke => dispatch({
        type: FETCH_JOKE,
        payload: joke
    }));
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

export const getShowSaved = () => dispatch => {
    dispatch({
        type: GET_SHOW_SAVED,
        payload: ''
    })
}

export const deleteSavedJoke = (j) => dispatch => {
    dispatch({
        type: DELETE_SAVED_JOKE,
        payload: j
    })
}