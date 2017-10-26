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
		var style = {
			position: 'absolute', 
			top:  this.props.size *  this.props.row + 'px',
			left: this.props.size *  this.props.col + 'px', 
			width: this.props.size + 'px',
			height: this.props.size + 'px',
			background: this.state.color,
			textAlign: 'center',
			verticalAlign: 'middle',
			lineHeight: this.props.size + 'px',
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
