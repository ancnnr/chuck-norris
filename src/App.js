import logo from './logo.svg';
import './App.css';
import Joke from './components/Joke'
import { useState } from 'react'

function App() {

  const [jokes, setJokes] = useState()
  
  const pullJoke = () => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
        const newJoke = JSON.parse(xhr.responseText)
        setJokes(newJoke)
    })

    xhr.open('GET','https://api.chucknorris.io/jokes/random')
    xhr.send()
}


  return (
    <div className="App">
      <header className="App-header">
        <Joke onClick={pullJoke} joke={ jokes ? jokes.value : 'Click here for a joke' }/>
        <p>
          Chuck Norris
        </p>
      </header>
    </div>
  );
}

export default App;
