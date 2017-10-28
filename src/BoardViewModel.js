import React, {Component} from 'react';
import TileViewModel from './TileViewModel';
import Controller from './Controller'

class BoardViewModel extends Component {
	componentDidMount() {
		Controller.AddListener({type: Controller.SOLVED}, this.onSolved);
	}

	onSolved = (o) => {
		alert('Congratulations, you solved the puzzle!!!');
	}

	onKeyDown = (event) => {
		var value = parseInt(event.key, 10);
		if (!isNaN(value) && value != 0){
			Controller.SendNotification({type: Controller.KEYPRESS}, value);
		}
		else if (event.key === "Escape") {
			this.props.model.resetBoard();
			Controller.SendNotification({type: Controller.KEYPRESS}, event.key);
		}
		else if (event.key === "Delete") {
			Controller.SendNotification({type: Controller.KEYPRESS}, event.key);			
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
		for(var x = 0; x < this.props.model.width; x++) {
			for(var y = 0; y < this.props.model.height; y++) {
				var num = this.props.model.getNumber(x,y);
				var constant = this.props.model.isConstant(x,y);

				var el = <TileViewModel 
							model={this.props.model}
							x={x} y={y}
							screen={this.props.screen}
							size={this.props.pixels}
							number={num === 0 ? '' : num}
							constant= {constant}
							/>;
				tiles.push(el);
			}
		}

		return (tiles);
	};
}

export default BoardViewModel;