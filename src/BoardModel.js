class BoardModel {
	constructor(width, height) {
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
		this.puzzle = [];
		this.initialPuzzle = [];
		this.width = width;
		this.height = height;

		for(var i = 0; i < this.width; i++) {
			this.puzzle.push([]);
			this.initialPuzzle.push([]);
			for(var j = 0; j < this.height; j++) {
				var pos = j*9 + i;
				var numStr = this.defaultPuzzleStr.charAt(pos);
				var num = parseInt(numStr, 10);
				this.puzzle[i].push(num);
				this.initialPuzzle[i].push(num);
			}
		}
	}
	setNumber(x, y, n) {
		if (this.initialPuzzle[x][y] !== 0)
			return false;
		this.puzzle[x][y] = n;
		return true;
	}
	getNumber(x, y) {
		return this.puzzle[x][y];
	}

	getGroup(x, y) {
		/*
			0 1 2
			3 4 5
			6 7 8
		*/
		// top left is group 0
		// top row middle box is group 1
		// etc.
		var x1 = Math.floor(x / 3);
		var y1 = Math.floor(y / 3);
		return y1 * 3 + x;
	}

	isConstant(x, y) {
		var flag = this.initialPuzzle[x][y] != 0;
		return flag;
	}

	isSolved() {
		var rset = new Set(); 		// check every row
		var cset = new Set();		// check every col

		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) {
				var rval = this.puzzle[i][j];
				if (rval === 0 || rset.has(rval))
					return false;
				rset.add(rval);

				var cval = this.puzzle[j][i];
				if (cval === 0 || cset.has(cval))
					return false;
				cset.add(cval);
			}
			rset.clear();
			cset.clear();
		}

		// checkevery group
		return true;
	}

	resetBoard() {
		for (var i = 0; i < this.width; i++) {
			for ( var j = 0; j < this.height; j++) {
				this.puzzle[i][j] = this.initialPuzzle[i][j];
			}
		}
	}
}

export default BoardModel;