import React, {Component} from 'react';
import TileViewModel from './TileViewModel';

class BoardViewModel extends Component {
	constructor(props) {
		super(props);

		this.width = 9;
		this.height = 9;
		this.defaultPuzzleStr = "\
			003020600\
			900305001\
			001806400\
			008102900\
			700000008\
			006708200\
			002609500\
			800203009\
			005010300";

		// Remove all the whitespace
		this.defaultPuzzleStr = this.defaultPuzzleStr.replace(/\s/g, '');
	}

	render() {
		var tiles = [];
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				var pos = j*9 + i;
				var num = this.defaultPuzzleStr.charAt(pos);

				var el = <TileViewModel 
							row={j}
							col={i}
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