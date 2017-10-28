import React, {Component} from 'react';
import Controller from './Controller'

class TileViewModel extends Component {
	constructor(props) {
		super(props);
		this.state  = {
			color : this.props.color, 
			number: this.props.number,
			focused: false
		};

		console.log('Tile created');
	}

	componentDidMount() {
		Controller.AddListener({type: Controller.KEYPRESS}, this.onKeyPressListener);
		Controller.AddListener({type: Controller.CLICK}, this.onClickListener);
	}

	onKeyPressListener = (msg) => {
		if (msg === 'Escape') {
			var num = this.props.model.getNumber(this.props.x, this.props.y);
			this.setState({number : num});
			return;
		}

		if (!this.state.focused)
			return;

		if (typeof msg === 'number') {
			if (!this.props.model.setNumber(this.props.x, this.props.y, msg))
				return;
			this.setState({number : msg});
			if (this.props.model.isSolved()) {
				Controller.SendNotification({type: Controller.SOLVED}, null);
			}
		}
		else if (msg === 'Delete') {
			this.props.model.setNumber(this.props.x, this.props.y, 0);
			this.setState({number : 0});
		}
	}

	onClickListener = (sender) => {
		if (this.props.model.isConstant(this.props.x, this.props.y))
			return;

		if (sender !== this) { 
			this.setState({focused : false});
		}
		else {
			this.setState({focused : true});
		}
	}

	onChangeColor = () => {
		if (this.focused)
			return;
		Controller.SendNotification({type : Controller.CLICK}, this);
	}

	getColor() {
		if (this.props.constant)
			return 'salmon';
		if (this.state.focused) {
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
				<div style={style}>{this.state.number !== 0 ? this.state.number : ''}</div>
			);
		}
		else {
			return (
				<div style={style} onClick={this.onChangeColor}> 
					{this.state.number !== 0 ? this.state.number : ''}
				</div>
			);
		}


	}
}

export default TileViewModel;
