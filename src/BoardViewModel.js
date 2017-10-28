import React, {Component} from 'react';
import TileViewModel from './TileViewModel';
import Controller from './Controller'
import BoardModel from './BoardModel'

class BoardViewModel extends Component {
	constructor(props) {
		super(props);
		this.state = { model : new BoardModel(9,9), 
			focus : {x:-1, y:-1} };
	}

	numberChanged = (x, y, num) => {
		this.state.model.setNumber(x, y, num);
		if (this.props.model.isSolved()) {
			Controller.SendNotification({type: Controller.SOLVED}, null);
		}	
		this.setState({model : this.state.model});
	}

	setFocus = (x, y) => {
		this.setState({ focus : {x:x, y:y}});
	}

	componentDidMount() {
		Controller.AddListener({type: Controller.SOLVED}, this.onSolved);
	}

	onSolved = (o) => {
		alert('Congratulations, you solved the puzzle!!!');
	}

	onKeyDown = (event) => {
		var value = parseInt(event.key, 10);
		if (!isNaN(value) && value != 0){
			this.state.model.setNumber(this.state.focus.x, this.state.focus.y, value);
			this.setState({model : this.state.model});		
		}
		else if (event.key === "Escape") {
			this.state.model.resetBoard();
			this.setState({model : this.state.model});		
		}
		else if (event.key === "Delete" && this.state.focus.x > -1 && this.state.focus.y > -1) {
			this.state.model.setNumber(this.state.focus.x, this.state.focus.y, 0);
			this.setState({model : this.state.model});		
		}
		else if (event.key === "ArrowRight") {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'r');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "ArrowLeft") {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'l');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "ArrowUp") {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'u');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "ArrowDown") {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'd');
			this.setState({focus : this.state.focus});
		}
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onKeyDown);
		Controller.AddListener({type: Controller.SOLVED}, this.onSolved);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown);
	}

	render() {
		var tiles = [];
		for(var x = 0; x < this.state.model.width; x++) {
			for(var y = 0; y < this.state.model.height; y++) {
				var num = this.state.model.getNumber(x,y);
				if(x == 0 && y == 0)
					console.log(num);
				var constant = this.state.model.isConstant(x,y);

				var el = <TileViewModel 
							model={this.state.model}
							x={x} y={y}
							focused = { x == this.state.focus.x && y == this.state.focus.y }
							screen={this.props.screen}
							size={this.props.pixels}
							number={num === 0 ? '' : num}
							constant= {constant}
							numberChanged={this.numberChanged}
							setFocus={this.setFocus}
							/>;
				tiles.push(el);
			}
		}

		return (tiles);
	};
}

export default BoardViewModel;