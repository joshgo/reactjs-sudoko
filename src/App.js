import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BoardViewModel from './BoardViewModel'

class App extends Component {
  render() {
  	var boardView = <BoardViewModel pixels={50}/>;

    return (
    	boardView
    );
  }
}

export default App;
