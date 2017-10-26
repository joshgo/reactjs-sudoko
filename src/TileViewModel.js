import React, {Component} from 'react';

class TileViewModel extends Component {
	constructor(props) {
		super(props);
		this.state  = {color : this.props.color};
	}

	changeColor = () => {
		this.setState({color : this.state.color === 'blue' ? 'red' : 'blue' });
	}

	render() {
		var style = {
			position: 'absolute', 
			top:  this.props.size *  this.props.row + 'px',
			left: this.props.size *  this.props.col + 'px', 
			width: this.props.size + 'px',
			height: this.props.size + 'px',
			background: this.state.color
		};

		return (
			<div style={style} onClick={this.changeColor}> 
					{this.props.row}, {this.props.col} 
			</div>
		);
	}
}

export default TileViewModel;
