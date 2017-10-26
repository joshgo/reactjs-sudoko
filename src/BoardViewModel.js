import React, {Component} from 'react';
import TileViewModel from './TileViewModel';

class BoardViewModel extends Component {
	render() {
		var tiles = [];
		for(var i = 0; i < this.props.width; i++) {
			for(var j = 0; j < this.props.height; j++)
					tiles.push(<TileModel row={j} col={i} size={this.props.pixels} color={'blue'}/>);
		}

		return (tiles);
	};
}

export default BoardViewModel;