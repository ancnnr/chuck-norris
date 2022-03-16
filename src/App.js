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

function Home({pullCategories, pullJoke, jokes, saveJoke, showSaved, toggleSavedJokes, categories, catChosen, chooseCategory, savedJokes, deleteJoke}) {
 
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
  const myStory = ["My name is Adam Conner. I am a software developer who has a degree in Mathematics \
  and Computer Science. I have been working as a high school CS and Math teacher for 13 years but am now \
  moving into the software engineer field full time.",
"My experience is varied but it includes the following areas:"
]

  return (
    <div>
      <header className='about-container'>
        <div>
          <h1>About Me</h1>
        </div>

        
        <div className="my-story">
         <h2>My Story</h2>
         <p>{myStory[0]}</p>
        </div>
        
        <div className="my-story">
         <h2>My Experience</h2>
         <p>{myStory[1]}</p>
         <ul>
           <li>Java</li>
           <li>Python</li>
           <li>Flask</li>
           <li>React</li>
           <li>Vue</li>
           <li>Ruby</li>
           <li>NodeJS</li>
           <li>JavaScript</li>
           <li>CSS</li>
         </ul>
        </div>


      </header>
    </div>
  );
}


function App() {

  const [jokes, setJokes] = useState()

  const[showSaved, setShowSaved] = useState(false)
  
  const [savedJokes, setSavedJokes] = useState([])

  const[categories, setCategories] = useState([])

  const[catChosen, setCatChosen] = useState("random")

  async function pullCategories(){
    const response = await ky.get('https://api.chucknorris.io/jokes/categories').json()
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
    setSavedJokes([...savedJokes,jokes])
    
    /*
    const tempSavedJokes = savedJokes
    tempSavedJokes.sort((a, b) => {
      let fa = a.categories[0].toLowerCase(),
          fb = b.categories[0].toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });

  //setSavedJokes(tempSavedJokes)
  */

  }

}


const deleteJoke = (jokeText) => {
  setSavedJokes(savedJokes.filter((j) => j.value !== jokeText))
}

const toggleSavedJokes = () => {
  setShowSaved(!showSaved)
}  
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
        <Route path="/" element={<Home pullCategories={pullCategories} pullJoke={pullJoke} jokes={jokes} saveJoke={saveJoke} showSaved={showSaved} toggleSavedJokes={toggleSavedJokes} categories={categories} catChosen={catChosen} chooseCategory={chooseCategory} savedJokes={savedJokes} deleteJoke={deleteJoke} />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      </div>
      </div>
    </Router>
    
  );
}

export default App;
