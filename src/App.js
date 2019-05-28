import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount(){
    axios.get('https://i1i35qkgci.execute-api.us-east-2.amazonaws.com/Dev/employee/1/status')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  state = {

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}