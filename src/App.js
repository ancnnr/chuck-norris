import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { useState } from 'react'
import Jokes from './components/Jokes'
import CatLoad from './components/CatLoad'
import { FaSave } from 'react-icons/fa'
import ActionBar from './components/ActionBar'
import ky from 'ky';
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom";

function Home() {
  const [jokes, setJokes] = useState()

  const[showSaved, setShowSaved] = useState(false)
  
  const [savedJokes, setSavedJokes] = useState([])

  const[categories, setCategories] = useState([])

  const[catChosen, setCatChosen] = useState("random")

  async function pullCategories(){
    const response = await ky.get('https://api.chucknorris.io/jokes/categories').json()
    console.log(response)
    setCategories(response)
  }

  const chooseCategory = (cat) => {
    setCatChosen(cat)
  }

  async function pullJoke(){
    let response

    if(catChosen==="random")
    {
      response = await ky.get('https://api.chucknorris.io/jokes/random').json()
    }
    else{
      response = await ky.get('https://api.chucknorris.io/jokes/random?category='+catChosen).json()
    }
    
    console.log(response)
    setJokes(response)
}

const saveJoke = () => {

  let duplicates = false

  savedJokes.map((joke) => {
    if(joke.value === jokes.value)
    {
      duplicates = true
    }
  })
  
  if(!duplicates)
  {
    jokes.key=savedJokes.length+1
    setSavedJokes([...savedJokes,jokes])
  }

}

const showJokes = () => {
  savedJokes.map((joke) => console.log(joke.value))
}

const deleteJoke = (jokeText) => {
  setSavedJokes(savedJokes.filter((j) => j.value !== jokeText))
}

const toggleSavedJokes = () => {
  setShowSaved(!showSaved)
}
return (
  <div>
      <CatLoad cat={ pullCategories }/>
      <header>
        <div className="App-header">
          <div onClick={pullJoke}>{ jokes ? jokes.value : 'Click for a joke' }</div>
          <div className="save-buttons">
            <FaSave onClick={() => {saveJoke()}} style={{ color: 'white', cursor: 'pointer' }} />
            {showSaved ? <button className="btn" onClick={toggleSavedJokes}>Hide Saved</button> : 
            <button className="btn" onClick={toggleSavedJokes}>Show Saved</button>}
          </div>
        </div>

        <ActionBar categories={categories} catChosen={catChosen} chooseCat={chooseCategory} onJoke={pullJoke}/>

        {showSaved ? 
        <div className="saved-jokes">
          {<Jokes savedJokes={savedJokes} onDelete={deleteJoke} /> }
          {savedJokes.length === 0 ? 'No Saved Jokes to Show' : ''}
        </div> : ''}
        
      </header>
    </div>
);
}

function About() {
  return (
    <div>
      <header>
        <div className="App-header">
          <h1>About Me</h1>
        </div>

        
        <div className="saved-jokes">
         <h2>Here is my story</h2>
         <p>And there it goes on and on and on</p>
        </div>
        
      </header>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-container">
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/">Jokes</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      </div>
      </div>
    </Router>
    
  );
}

export default App;
