import { FaTimes, FaEdit, FaCheckSquare } from 'react-icons/fa'

const Joke = ({ cat, joke, onDelete, editOn, toggleEdit, editJokeId, index }) => {

   return (
        <div className="joke-saved">
            <div className="joke-content">
              <p>{cat}</p>
              <h3 id={'sj-'+index}>{joke.value}</h3>
            </div>
            <FaTimes className="delete" onClick={() => onDelete(joke.value)} style={{ color: 'red', cursor: 'pointer' }} />
            {console.log(editJokeId)}
            {index===editJokeId ? <FaCheckSquare className="delete" onClick={() => toggleEdit(joke, index)} style={{color: 'white', cursor: 'pointer'}} /> : <FaEdit className="delete" onClick={() => toggleEdit(joke, index)} style={{ color: 'white', cursor: 'pointer'}} />}
        </div>
    )
  }

export default Joke

//