import Joke from './Joke'

const Jokes = ( { savedJokes, onDelete }) => {
  return (
    <>
        {savedJokes.map((joke) => (
            <Joke key={joke.key} cat={joke.categories} jokeText={joke.value} onDelete={onDelete}/>
            
        ))}
    </>
  )
}

export default Jokes

