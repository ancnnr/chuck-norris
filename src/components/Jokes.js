import Joke from './Joke'

const Jokes = ( { savedJokes, onDelete }) => {
  return (
    <>
        {
        //let groupedJokes = savedJokes.groupBy( ({ categories }) => categories);
        savedJokes.sort((a,b) => {
          let fa = a.categories[0].toLowerCase(),
              fb = b.categories[0].toLowerCase();
      
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
        }).map((joke) => (
            <Joke key={joke.id} cat={joke.categories} joke={joke} onDelete={onDelete}/>
            
        ))}
    </>
  )
}

export default Jokes
