import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchJoke, fetchRandomJoke, fetchCategories, saveJoke, toggleShowSaved, getShowSaved, deleteSavedJoke} from '../actions/jokeActions';
import PropTypes from 'prop-types';
import { FaSave, FaTimes } from 'react-icons/fa'
//import ActionBar from './components/ActionBar'

class Jokesredux extends Component {

    constructor(props) {
      super(props);

      

      this.pullJoke = this.pullJoke.bind(this);
      this.saveJoke = this.saveJoke.bind(this);
      this.onDelete = this.onDelete.bind(this);
    }
    
    onDelete(j){
      this.props.deleteSavedJoke(j)
    }

    pullJoke() {
      if(this.props.category==='random')
      {
        console.log('fetching1')
        this.props.fetchRandomJoke()
      }

      else {
        this.props.fetchJoke(this.props.category)
      }
      
    }

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

    componentDidMount() {
      this.props.fetchCategories();
      //this.props.fetchRandomJoke();
    }

    render() {
        return (
          <header>
            <div className="App-header">
                {console.log(this.props)}
              <div onClick={this.pullJoke}>{ JSON.stringify(this.props.joke)!=='{}' ? this.props.joke.value : 'Click for a joke' }</div>

              <div className="save-buttons">
                <FaSave onClick={this.saveJoke} style={{ color: 'white', cursor: 'pointer' }} />
                {this.props.showSaved ? <button className="btn" onClick={this.props.toggleShowSaved}>Hide Saved</button> : 
                <button className="btn" onClick={this.props.toggleShowSaved}>Show Saved</button>}
              </div>
            </div>
               
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
                <div className="joke-saved">
                  <div className="joke-content">
                    <p>{j.categories[0]}</p>
                    <h3 id={'sj-'+index}>{j.value}</h3>
                  </div>
                <FaTimes key={j.id} className="delete" onClick={() => {this.onDelete(j)}} style={{ color: 'red', cursor: 'pointer' }} />
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
  showSaved: state.jokes.showSaved
})

export default connect(mapStateToProps, { fetchCategories, fetchJoke, fetchRandomJoke, saveJoke, toggleShowSaved, getShowSaved, deleteSavedJoke })(Jokesredux);


/*


{index===editJokeId ? <FaCheckSquare className="delete" onClick={() => toggleEdit(joke, index)} style={{color: 'white', cursor: 'pointer'}} /> : <FaEdit className="delete" onClick={() => toggleEdit(joke, index)} style={{ color: 'white', cursor: 'pointer'}} />}

<ActionBar categories={categories} catChosen={catChosen} chooseCat={chooseCategory} onJoke={pullJoke}/>

            

            */