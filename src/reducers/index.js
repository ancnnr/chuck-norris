import { combineReducers } from 'redux'
import jokeReducer from './jokeReducer';

export default combineReducers({
    jokes: jokeReducer
});