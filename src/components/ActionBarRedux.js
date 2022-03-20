import React, { Component } from 'react'
import { connect } from 'react-redux';
import { chooseCategory, fetchJoke } from '../actions/jokeActions';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


class ActionBarRedux extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.pullJokeByCategory = this.pullJokeByCategory.bind(this);
    }

    pullJokeByCategory()
    {
        this.props.fetchJoke(this.props.category)   
    }

    handleSelect(c){
        this.props.chooseCategory(c)
    }

    
  render() {
    return (
        <div className="action-bar">
        <DropdownButton id="dropdown-basic-button" onSelect={this.handleSelect} title={"Category: " + this.props.category}>
            <Dropdown.Item eventKey='random'>random</Dropdown.Item>
            {this.props.category_list.map((cat) => (
                <Dropdown.Item key={cat} eventKey={cat}>{cat}</Dropdown.Item>
                ))} 
        </DropdownButton>
        <button className="btn" onClick={this.pullJokeByCategory}>New Joke</button>
    </div>
    )
  }
}


ActionBarRedux.propTypes = {
    chooseCategory: PropTypes.func,
    category_list: PropTypes.array,
    category: PropTypes.string,

  }
  
  const mapStateToProps = state => ({
    category: state.jokes.category,
    category_list: state.jokes.category_list
  })
  
  export default connect(mapStateToProps, { chooseCategory, fetchJoke })(ActionBarRedux);
  