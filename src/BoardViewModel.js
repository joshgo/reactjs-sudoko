import React, {Component} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import TileViewModel from './TileViewModel';
import BoardModel from './BoardModel';
import ShortcutHelp from './ShortcutHelp';
import SweetAlert from 'sweetalert-react';
import SudokuGames from './SudokuGames';
import 'sweetalert/dist/sweetalert.css';
import Confetti from 'react-confetti';

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
		var model = this.state.model;
		if (event.key === "Escape") {
			model.resetBoard();
			this.setState({model : model});		
		}
		else if (event.key === "?") {
			this.setState({alert: true});
		}
		else if (event.key === "n" || event.key === "N") {
			this.setState(this.getNewBoard());
		}

		var isFocusedOnTile = this.state.focus.x !== -1; 
		if (!isFocusedOnTile) return;

		var value = parseInt(event.key, 10);
		var direction = '';		
		if (!isNaN(value) && value !== 0){
			model.setNumber(this.state.focus.x, this.state.focus.y, value);
			var solved = model.isSolved();
			this.setState({model : model, solved: solved});
		}
		else if (event.key === "Delete") {
			model.setNumber(this.state.focus.x, this.state.focus.y, 0);
			this.setState({model : model});		
		}
		else if (event.key === "Right" || event.key === "ArrowRight") {
			direction = 'r';
		}
		else if (event.key === "Left" || event.key === "ArrowLeft") {
			direction = 'l';
		}
		else if (event.key === "Up" || event.key === "ArrowUp") {
			direction = 'u';
		}
		else if (event.key === "Down" || event.key === "ArrowDown") {
			direction = 'd';
		}

		if (direction !== '') {
			var focus = this.state.model.getNextPosition(this.state.focus.x, this.state.focus.y, direction);
			this.setState({focus : focus});
		}
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown);
	}

	render() {
		var elements = [];
		var val = renderToStaticMarkup(<ShortcutHelp />);

		elements.push(
			<SweetAlert
			show={this.state.alert}
			title="Help / Shortcuts"
			html
			text={val}
			onConfirm={() => this.setState({alert:false})}
			/>
		);

		elements.push (
			<SweetAlert
			show={this.state.solved}
			title="Congratulations! You solved the puzzle!"
			text="Click ok to generate a new game"
			onConfirm={() => this.setState(this.getNewBoard())}
			/>
		);

		if (this.state.solved) {
			elements.push(
				<Confetti width={this.props.screen.width} height={this.props.screen.height} />
			);
		}

		for(var x = 0; x < this.state.model.size; x++) {
			for(var y = 0; y < this.state.model.size; y++) {
				var num = this.state.model.getNumber(x,y);
				var constant = this.state.model.isConstant(x,y);

				var el = <TileViewModel 
							model={this.state.model}
							x={x} y={y}
							focused = { x === this.state.focus.x && y === this.state.focus.y }
							screen={this.props.screen}
							size={this.props.pixels}
							number={num === 0 ? '' : num}
							constant= {constant}
							numberChanged={this.numberChanged}
							setFocus={this.setFocus}
							/>;
				elements.push(el);
			}
		}
		return (elements);
	};
}

export default BoardViewModel;