import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import{ Component } from 'react'

export default class App extends Component {
  componentDidMount(){
    axios.get('employee/1')
      .then((response) => {
        this.setState(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  state = {

  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to {this.state.name}.
          </p>
        </header>
      </div>
    )
  }
}