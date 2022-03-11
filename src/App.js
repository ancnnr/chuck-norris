import './App.css';
import { useState } from 'react'
import Jokes from './components/Jokes'
import CatLoad from './components/CatLoad'

function App() {

  const [jokes, setJokes] = useState()

  const[showSaved, setShowSaved] = useState(false)
  
  const [savedJokes, setSavedJokes] = useState([])

  const[categories, setCategories] = useState()

  const pullCategories = () => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      setCategories(JSON.parse(xhr.responseText))
    })

    xhr.open('GET', 'https://api.chucknorris.io/jokes/categories')
    xhr.send()
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
    if(joke.value == jokes.value)
    {
      duplicates = true
    }
  })
  
  if(!duplicates)
  {
    jokes.key=savedJokes.length+1
    setSavedJokes([...savedJokes,jokes])
    console.log(categories)
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
      <header className="App-header">
        <div onClick={pullJoke}>{ jokes ? jokes.value : 'Click here for a joke' }</div>
        <p className="author">
          - Chuck Norris
        </p>
        <button onClick={saveJoke}>SAVE</button>
        <button onClick={toggleSavedJokes}>Show Saved</button>
        
        {showSaved && <Jokes savedJokes={savedJokes} onDelete={deleteJoke} /> }
        {showSaved && savedJokes.length == 0 ? 'No Saved Jokes to Show' : ''}
      </header>
    </div>
  );
}

export default App;
