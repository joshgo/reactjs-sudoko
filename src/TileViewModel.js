import React, {Component} from 'react';

class TileViewModel extends Component {
	constructor(props) {
		super(props);
		this.state  = {color : this.props.color, 
			number : this.props.number};
	}

	changeColor = () => {
		this.setState({color : this.state.color === 'white' ? 'gold' : 'white' });
	}

	render() {
		var hoffset = this.props.screen.width / 2 - (this.props.size * 9 / 2);
		var voffset = this.props.screen.height/ 2 - (this.props.size * 9 / 2);

		var style = {
			position: 'absolute', 
			top:  this.props.size *  this.props.row + voffset + 'px',
			left: this.props.size *  this.props.col + hoffset + 'px', 
			width: this.props.size + 'px',
			height: this.props.size + 'px',
			background: this.state.color,
			textAlign: 'center',
			verticalAlign: 'middle',
			lineHeight: this.props.size + 'px',
			fontSize : (this.props.size * .8) + 'px',
			borderStyle: 'solid',
			borderColor: 'black'
		};

		return (
			<div style={style} onClick={this.changeColor} onBlur={this.changeColor} contentEditable> 
				{this.state.number}
			</div>
		);
	}
}

export default TileViewModel;
