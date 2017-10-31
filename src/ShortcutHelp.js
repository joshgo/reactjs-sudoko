import React, {Component} from 'react';

class ShortcutHelp extends Component {
	render() {
        var style = {
            listStyle:'none',
            textAlign:'left'
        }
		return(
			<ul style={style}>
            <li>Click on any available tile to activate</li>
            <li>[n] - Gets a new random board </li>
			<li>[Esc] - Resets the current board</li>
			<li>[Del] - Clear current cell</li>
			<li>[Arrow keys] - To move to next available tile</li>
			<li>[1-9] - Enter a number in highlighted cell</li>
			</ul>
		);
	}
}

export default ShortcutHelp;