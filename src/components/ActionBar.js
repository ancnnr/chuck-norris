import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const ActionBar = ({ catChosen, chooseCat, onJoke}) => {
    
       
    const handleSelect = (e) => {
        console.log(e)
        chooseCat(e)
        }

  return (
    <div className="action-bar">
        <DropdownButton id="dropdown-basic-button" onSelect={handleSelect} title={"Category: " + catChosen}>
            <Dropdown.Item eventKey='animal'>animal</Dropdown.Item>
            <Dropdown.Item eventKey='career'>career</Dropdown.Item>
            <Dropdown.Item eventKey='celebrity'>celebrity</Dropdown.Item>
            <Dropdown.Item eventKey='explicit'>explicit</Dropdown.Item>
            <Dropdown.Item eventKey='dev'>dev</Dropdown.Item>
            <Dropdown.Item eventKey='fashion'>fashion</Dropdown.Item>
            <Dropdown.Item eventKey='food'>food</Dropdown.Item>
            <Dropdown.Item eventKey='history'>history</Dropdown.Item>
            <Dropdown.Item eventKey='money'>money</Dropdown.Item>
            <Dropdown.Item eventKey='movie'>movie</Dropdown.Item>
            <Dropdown.Item eventKey='music'>music</Dropdown.Item>
            <Dropdown.Item eventKey='political'>political</Dropdown.Item>
            <Dropdown.Item eventKey='religion'>religion</Dropdown.Item>
            <Dropdown.Item eventKey='science'>science</Dropdown.Item>
            <Dropdown.Item eventKey='sport'>sport</Dropdown.Item>
            <Dropdown.Item eventKey='travel'>travel</Dropdown.Item>
        </DropdownButton>
        <button className="btn" onClick={onJoke}>New Joke</button>
    </div>
  )
}

export default ActionBar