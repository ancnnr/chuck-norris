import { FaTimes } from 'react-icons/fa'

const Joke = ({ jokeText, onDelete }) => {

  return (
        <div>
            <h3>{ jokeText } <FaTimes onClick={() => onDelete(jokeText)} style={{ color: 'red', cursor: 'pointer' }} /></h3>
        </div>
    )
  }

export default Joke

