import { FaTimes, FaEdit, FaCheckSquare } from 'react-icons/fa'

const Joke = ({ cat, joke, onDelete }) => {

  let editOn = false

  const onEdit = (jokeObj) => {
    editOn = !editOn
    console.log(editOn)
  }

  return (
        <div className="joke-saved">
            <div id="joke-content">
              <p>{cat}</p>
              <h3 id="joke-text">{joke.value}</h3>
            </div>
            <FaTimes className="delete" onClick={() => onDelete(joke.value)} style={{ color: 'red', cursor: 'pointer' }} />
            {editOn ? <FaCheckSquare className="delete" onClick={() => onEdit(joke)} style={{color: 'white', cursor: 'pointer'}} /> : <FaEdit className="delete" onClick={() => onEdit(joke)} style={{ color: 'white', cursor: 'pointer'}} />}
            
            
        </div>
    )
  }

export default Joke

