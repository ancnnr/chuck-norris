import { FaTimes } from 'react-icons/fa'

const Joke = ({ jokeText, onDelete }) => {

  return (
        <div>
            <h3>{ jokeText }</h3>
        </div>
    )
  }

export default Joke

// <FaTimes onClick={() => onDelete(joke)} style={{ color: 'red', cursor: 'pointer' }} />