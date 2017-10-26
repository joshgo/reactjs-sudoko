import React, {Component} from 'react';
import TileViewModel from './TileViewModel';

class BoardViewModel extends Component {
	constructor(props) {
		super(props);

		this.width = this.props.model.getWidth();
		this.height = this.props.model.getHeight();
	}

	render() {

		var tiles = [];
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				var num = this.props.model.getNumber(i,j); 

				var el = <TileViewModel 
							row={j}
							col={i}
							screen={this.props.screen}
							size={this.props.pixels}
							color={'white'}
							number={num == '0' ? ' ' : num}
							/>;

				tiles.push(el);

			}
		}

		return (tiles);
	};
}

export default BoardViewModel;