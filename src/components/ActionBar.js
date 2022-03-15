import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const ActionBar = ({ categories, catChosen, chooseCat, onJoke}) => {
    
       
    const handleSelect = (e) => {
        chooseCat(e)
        }

  return (
    <div className="action-bar">
        <DropdownButton id="dropdown-basic-button" onSelect={handleSelect} title={"Category: " + catChosen}>
            <Dropdown.Item eventKey='random'>random</Dropdown.Item>
            
            {categories.map((cat) => (
                <Dropdown.Item key={cat} eventKey={cat}>{cat}</Dropdown.Item>
                ))} 
        </DropdownButton>
        <button className="btn" onClick={onJoke}>New Joke</button>
    </div>
  )
}

export default ActionBar
