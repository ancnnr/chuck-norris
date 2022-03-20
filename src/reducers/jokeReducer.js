import { FETCH_JOKE, FETCH_RANDOM, FETCH_CATEGORIES, SAVE_JOKE, TOGGLE_SHOW_SAVED, GET_SHOW_SAVED, DELETE_SAVED_JOKE, CHOOSE_CATEGORY, TOGGLE_EDITING, GET_EDIT_JOKEID, SET_EDIT_JOKEID } from "../actions/types";

const initialState = {
    savedJokes: [],
    joke: {},
    category: 'random',
    category_list: [],
    showSaved: false,
    editJokeID: -1,
    editing: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_RANDOM:
            
            const newJoke = action.payload
            newJoke.categories.push('random')

            return {
                ...state,
                joke: newJoke,
                category: 'random'
            }

        case FETCH_JOKE:
            return {
                ...state,
                joke: action.payload,
                category: action.payload.categories[0]
            }

        case FETCH_CATEGORIES:
            return {
                ...state,
                category_list: action.payload
            }

        case SAVE_JOKE:
            
            return {
                ...state,
                savedJokes: action.payload
            }


        case TOGGLE_SHOW_SAVED:
            return {
                ...state, 
                showSaved: !state.showSaved
            }
        
        case GET_SHOW_SAVED:
            return state.showSaved;

        case DELETE_SAVED_JOKE:
            return {
                ...state, 
                savedJokes: state.savedJokes.filter((j) => j !== action.payload)
            }

        case CHOOSE_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        case TOGGLE_EDITING:
            return{
                ...state,
                editing: !state.editing
            }

        case GET_EDIT_JOKEID:
            return state.editJokeID;
        
        case SET_EDIT_JOKEID:
            return {
                ...state, 
                editJokeID: action.payload
            }

        default:
            return state;
    }
}