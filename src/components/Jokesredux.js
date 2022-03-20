import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchJoke, fetchRandomJoke, fetchCategories, saveJoke, toggleShowSaved, getShowSaved, deleteSavedJoke, getEditJokeID, toggleEditing, setEditJokeID} from '../actions/jokeActions';
import PropTypes from 'prop-types';
import { FaSave, FaTimes, FaCheckSquare, FaEdit } from 'react-icons/fa'
import ActionBarRedux from './ActionBarRedux'

class Jokesredux extends Component {

    constructor(props) {
      super(props);
      
      //bind class methods
      this.pullJoke = this.pullJoke.bind(this);
      this.saveJoke = this.saveJoke.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
    }
    
    //used to toggle the editability of an element and store it's textcontent back to savedJokes
    //params: joke object, index of object in savedJokes
    toggleEdit(j, i)
    {
      const editObj = document.getElementById('sj-'+i)

      if(!this.props.editing) // about to start editing
      {
        editObj.setAttribute('contentEditable', true)
        editObj.classList.add('editing')
        this.props.setEditJokeID(i)
      }
  
      else { // just finished editing
        editObj.setAttribute('contentEditable', false)
        editObj.classList.remove('editing')
        this.props.setEditJokeID(-1)
        
        const temp_saved_jokes = []
  
        this.props.savedJokes.forEach((state_joke) => {
              temp_saved_jokes.push(state_joke)
            })
  
            temp_saved_jokes.forEach((temp_joke) => {
              if(j.id===temp_joke.id)
              {
                temp_joke.value = editObj.textContent
              }
            })
  
            this.props.saveJoke(temp_saved_jokes)
      }
      
      this.props.toggleEditing()
    }

    //deletes a joke object from savedJokes
    onDelete(j){
      this.props.deleteSavedJoke(j)
    }

    //pulls a new joke from API
    pullJoke() {
      if(this.props.category==='random')
      {
        this.props.fetchRandomJoke()
      }

      else {
        this.props.fetchJoke(this.props.category)
      }
      
    }

    //saves the current joke in savedJokes
    saveJoke() {
      let duplicates = false

      this.props.savedJokes.map((j) => {
        if(j.value === this.props.joke.value)
        {
          duplicates = true
        }
      })
      
      if(!duplicates)
      {
        this.props.saveJoke([...this.props.savedJokes, this.props.joke])
      }
  }

  //fetch the categories array from the API once component is mounted
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
      return (
        <header>
          <div className="App-header">
            
            <div onClick={this.pullJoke}>{ JSON.stringify(this.props.joke)!=='{}' ? this.props.joke.value : 'Click for a joke' }</div>

            <div className="save-buttons">
              <FaSave onClick={this.saveJoke} style={{ color: 'white', cursor: 'pointer' }} />
              {this.props.showSaved ? <button className="btn" onClick={this.props.toggleShowSaved}>Hide Saved</button> : 
              <button className="btn" onClick={this.props.toggleShowSaved}>Show Saved</button>}
            </div>
          </div>
              
          <ActionBarRedux />

          {/* Saved Jokes ordered by category then mapped to display*/}
          {this.props.showSaved && this.props.savedJokes.length>0 ? 
          <div className="saved-jokes">
            <div className="table-header">
              <div>Category</div>
              <div>Joke</div>
              <div>Delete?</div>
            </div>
            {this.props.savedJokes.sort((a,b) => {
        let fa = a.categories[0].toLowerCase(),
            fb = b.categories[0].toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      }).map((j, index)=> {
              return(
              <div key={index} className="joke-saved">
                <div className="joke-content">
                  <p>{j.categories[0]}</p>
                  <h3 id={'sj-'+index}>{j.value}</h3>
                </div>
              <FaTimes key={j.id} className="delete" onClick={() => {this.onDelete(j)}} style={{ color: 'red', cursor: 'pointer' }} />
              {index===this.props.editJokeID ? <FaCheckSquare className="delete" onClick={() => this.toggleEdit(j, index)} style={{color: 'white', cursor: 'pointer'}} /> : <FaEdit className="delete" onClick={() => this.toggleEdit(j, index)} style={{ color: 'white', cursor: 'pointer'}} />}
          </div>)
            })}
            
          </div> : ''}
        {this.props.showSaved && this.props.savedJokes.length===0 ? 'No Saved Jokes to Show' : ''}
            
        </header>
      );
  }
}

Jokesredux.propTypes = {
  fetchJoke: PropTypes.func,
  joke: PropTypes.object,
  category: PropTypes.string,
  savedJokes: PropTypes.array,
  showSaved: PropTypes.bool,
  deleteSavedJoke: PropTypes.func
}

const mapStateToProps = state => ({
  joke: state.jokes.joke,
  category: state.jokes.category,
  category_list: state.jokes.category_list,
  savedJokes: state.jokes.savedJokes,
  showSaved: state.jokes.showSaved,
  editing: state.jokes.editing,
  editJokeID: state.jokes.editJokeID
})

export default connect(mapStateToProps, { fetchCategories, fetchJoke, fetchRandomJoke, saveJoke, toggleShowSaved, getShowSaved, deleteSavedJoke, getEditJokeID, toggleEditing, setEditJokeID })(Jokesredux);

