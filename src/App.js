import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BoardViewModel from './BoardViewModel'
import BoardModel from './BoardModel'

class App extends Component {
  calculatePixels(){
  	var min = Math.max(250, Math.min(this.state.width, this.state.height));
  	return min / 10;
  }

  getScreen(){
  	return {
  		width: this.state.width,
  		height: this.state.height
  	};
  }

  render() {
  	var boardModel = new BoardModel();
  	var boardView = <BoardViewModel model={boardModel} pixels={ this.calculatePixels() } screen={this.getScreen()}/>;

    return (
    	boardView
    );
  }

	updateDimensions = () => {
	    this.setState({width: window.innerWidth, height: window.innerHeight});
	}

	componentWillMount() {
	    this.updateDimensions();
	}

	componentDidMount() {
	    window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
	    window.removeEventListener("resize", this.updateDimensions);
	}
}

export default App;
