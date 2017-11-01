import React, {Component} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import TileViewModel from './TileViewModel';
import BoardModel from './BoardModel';
import ShortcutHelp from './ShortcutHelp';
import SweetAlert from 'sweetalert-react';
import SudokuGames from './SudokuGames';
import 'sweetalert/dist/sweetalert.css';

class BoardViewModel extends Component {
	constructor(props) {
		super(props);
		this.state = this.getNewBoard();
	}

	getNewBoard() {
		return { 
			model : new BoardModel(SudokuGames.getRandomGame()), 
			focus : {x:-1, y:-1},
			alert : false,
			solved : false
		};
	}

	setFocus = (x, y) => {
		this.setState({ focus : {x:x, y:y}});
	}

	onKeyDown = (event) => {
		var value = parseInt(event.key, 10);
		var isFocusedOnTile = this.state.focus.x != -1; 
		if (isFocusedOnTile && !isNaN(value) && value != 0){
			this.state.model.setNumber(this.state.focus.x, this.state.focus.y, value);
			var solved = this.state.model.isSolved();
			this.setState({model : this.state.model, solved});
		}
		else if (event.key === "Escape") {
			this.state.model.resetBoard();
			this.setState({model : this.state.model});		
		}
		else if (event.key === "Delete" && isFocusedOnTile) {
			this.state.model.setNumber(this.state.focus.x, this.state.focus.y, 0);
			this.setState({model : this.state.model});		
		}
		else if (event.key === "ArrowRight" && isFocusedOnTile) {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'r');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "ArrowLeft" && isFocusedOnTile) {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'l');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "ArrowUp" && isFocusedOnTile) {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'u');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "ArrowDown" && isFocusedOnTile) {
			this.state.focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, 'd');
			this.setState({focus : this.state.focus});
		}
		else if (event.key === "?") {
			this.setState({alert: true});
		}
		else if (event.key === "n" || event.key == "N") {
			this.setState(this.getNewBoard());
		}
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown);
	}

	render() {
		var tiles = [];
		for(var x = 0; x < this.state.model.size; x++) {
			for(var y = 0; y < this.state.model.size; y++) {
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

				var val = renderToStaticMarkup(<ShortcutHelp />);

				tiles.push(
					<SweetAlert
					show={this.state.alert}
					title="Help / Shortcuts"
					html
					text={val}
					onConfirm={() => this.setState({alert:false})}
				  >
				  </SweetAlert>
				);

				tiles.push (
					<SweetAlert
					show={this.state.solved}
					title="Congratulations! You solved the puzzle!"
					text="Click ok to generate a new game"
					onConfirm={() => this.setState(this.getNewBoard())}
				  	></SweetAlert>
				);
			}
		}
		return (tiles);
	};
}

export default BoardViewModel;