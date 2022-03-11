import './App.css';
import { useState } from 'react'
import Jokes from './components/Jokes'

function App() {

  const [jokes, setJokes] = useState()

  const[showSaved, setShowSaved] = useState(false)
  
  const [savedJokes, setSavedJokes] = useState([])

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
  setSavedJokes([...savedJokes,jokes])
}

const showJokes = () => {
  savedJokes.map((joke) => console.log(joke.value))
}

const deleteJoke = (jokeText) => {
  setSavedJokes(jokes.filter((j) => j.value !== jokeText))
}

const toggleSavedJokes = () => {
  setShowSaved(!showSaved)
}

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={pullJoke}>{ jokes ? jokes.value : 'Click here for a joke' }</div>
        <p className="author">
          - Chuck Norris
        </p>
        <button onClick={saveJoke}>SAVE</button>
        <button onClick={toggleSavedJokes}>Show Saved</button>
        {showSaved && <Jokes savedJokes={savedJokes} onDelete={deleteJoke} />}
      </header>
    </div>
  );
}

export default App;
