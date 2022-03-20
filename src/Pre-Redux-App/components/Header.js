import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, toggleSaved, saveJoke, showSavedJokes, jokes, pullJoke }) => {

  return (
    <header className='header'>
        <h1>{title}</h1>
        <div onClick={pullJoke}>{ jokes ? jokes.value : 'Click here for a joke' }</div>
        <p className="author">
          - Chuck Norris
        </p>
        <Button color='blue' text='Save' onClick={saveJoke} />
        

        { showSavedJokes ? <Button color='blue' text='Show Saved' onClick={toggleSaved} /> : <Button color='green' text='Show Saved' onClick={toggleSaved} />}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string
}


// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'blue'
// }

export default Header