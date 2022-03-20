import { FETCH_JOKE, FETCH_RANDOM, FETCH_CATEGORIES, SAVE_JOKE, TOGGLE_SHOW_SAVED, GET_SHOW_SAVED, DELETE_SAVED_JOKE } from "../actions/types";

const initialState = {
    savedJokes: [],
    joke: {},
    category: 'random',
    category_list: [],
    showSaved: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_RANDOM:
            console.log('reducing')
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
                category: action.payload.categories
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

        default:
            return state;
    }
}