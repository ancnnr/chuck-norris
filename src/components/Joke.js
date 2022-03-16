import { FaTimes } from 'react-icons/fa'

const Joke = ({ cat, jokeText, onDelete }) => {

  return (
        <div className="joke-saved">
          <p>{ cat }</p>
            <h3>{ jokeText } </h3>
            <FaTimes className="delete" onClick={() => onDelete(jokeText)} style={{ color: 'red', cursor: 'pointer' }} />
        </div>
    )
  }

export default Joke

