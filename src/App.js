import React, { Component } from 'react'
import Jokesredux from './components/Jokesredux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default class App extends Component {
  render() {
    return (
        <div className="App">
            <div className="App-container">
                <Jokesredux />
            </div>
      </div>
    )
  }
}
