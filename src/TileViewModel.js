import React, {Component} from 'react';
import Controller from './Controller'

class TileViewModel extends Component {
	constructor(props) {
		super(props);
		console.log('Tile created');
	}

	componentDidMount() {
		Controller.AddListener({type: Controller.KEYPRESS}, this.onKeyPressListener);
		Controller.AddListener({type: Controller.CLICK}, this.onClickListener);
	}

	onKeyPressListener = (msg) => {
		if (!this.props.focused)
			return;

		if (typeof msg === 'number') {
			this.props.numberChanged(this.props.x, this.props.y, msg);
		}
		else if (msg === 'Delete') {
			this.props.numberChanged(this.props.x, this.props.y, 0);
		}
	}

	onClickListener = (sender) => {
		if (this.props.model.isConstant(this.props.x, this.props.y))
			return;

		if (sender !== this) { 
			this.props.setFocus(this.props.x, this.props.y);
		}
		else {
			this.props.setFocus(this.props.x, this.props.y);
		}
	}

	onChangeColor = () => {
		if (this.props.focused)
			return;
		this.props.setFocus(this.props.x, this.props.y);
	}

	getColor() {
		if (this.props.constant)
			return 'salmon';
		if (this.props.focused) {
			return 'gold';
		} else {
			return 'white';
		}
	}

	render() {
		var hoffset = this.props.screen.width / 2 - (this.props.size * 9 / 2);
		var voffset = this.props.screen.height/ 2 - (this.props.size * 9 / 2);

		var style = {
			position: 'absolute', 
			top:  this.props.size *  this.props.y + voffset + 'px',
			left: this.props.size *  this.props.x + hoffset + 'px', 
			width: this.props.size + 'px',
			height: this.props.size + 'px',
			background: this.getColor(),
			textAlign: 'center',
			verticalAlign: 'middle',
			lineHeight: this.props.size + 'px',
			fontSize : (this.props.size * .8) + 'px',
			borderStyle: 'solid',
			borderColor: 'black' 
		};

		if (this.props.model.isConstant(this.props.x, this.props.y)) {
			return (
				<div style={style}>{this.props.number !== 0 ? this.props.number : ''}</div>
			);
		}
		else {
			return (
				<div style={style} onClick={this.onChangeColor}> 
					{this.props.number !== 0 ? this.props.number : ''}
				</div>
			);
		}


	}
}

export default TileViewModel;
