import Joke from './Joke'

const Jokes = ( { savedJokes, onDelete }) => {
  return (
    <>
        HEY!
        {savedJokes.map((joke) => (
            <Joke cat={joke.categories} jokeText={joke.value} onDelete={onDelete}/>
            
        ))}
    </>
  )
}

export default Jokes

