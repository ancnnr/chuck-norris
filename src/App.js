import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react'
import Jokes from './components/Jokes'
import CatLoad from './components/CatLoad'
import { FaSave } from 'react-icons/fa'
import ActionBar from './components/ActionBar'


function App() {

  const [jokes, setJokes] = useState()

  const[showSaved, setShowSaved] = useState(false)
  
  const [savedJokes, setSavedJokes] = useState([])

  const[categories, setCategories] = useState()

  const[catChosen, setCatChosen] = useState("random")

  const pullCategories = () => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      setCategories(JSON.parse(xhr.responseText))
    })

    xhr.open('GET', 'https://api.chucknorris.io/jokes/categories')
    xhr.send()
  }

  const chooseCategory = (cat) => {
    setCatChosen(cat)
  }
  const pullJoke = () => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
        const newJoke = JSON.parse(xhr.responseText)
        setJokes(newJoke)
    })

    xhr.open('GET','https://api.chucknorris.io/jokes/random')
    xhr.send()
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
    <div className="App">
      <CatLoad cat={ pullCategories }/>
      <header className="App-container">
        <div className="App-header">
          <div onClick={pullJoke}>{ jokes ? jokes.value : 'Click for a joke' }</div>
          <div className="save-buttons">
            <FaSave onClick={() => {saveJoke()}} style={{ color: 'white', cursor: 'pointer' }} />
            {showSaved ? <button className="btn" onClick={toggleSavedJokes}>Hide Saved</button> : 
            <button className="btn" onClick={toggleSavedJokes}>Show Saved</button>}
          </div>
        </div>

        <ActionBar catChosen={catChosen} chooseCat={chooseCategory} onJoke={pullJoke}/>

        {showSaved ? 
        <div className="saved-jokes">
          {<Jokes savedJokes={savedJokes} onDelete={deleteJoke} /> }
          {savedJokes.length === 0 ? 'No Saved Jokes to Show' : ''}
        </div> : ''}
        
      </header>
    </div>
  );
}

export default App;
