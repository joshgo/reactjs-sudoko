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

		// map/sets used for determining if puzzle has been solved.
		this.ySets = new Map();
		this.xSets = new Map();
		this.groupSets = new Map();
		this.resetBoard();
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
		return y1 * 3 + x1;
	}

	isConstant(x, y) {
		var flag = this.initialPuzzle[x][y] != 0;
		return flag;
	}

	isSolved() {
		this.ySets.clear();
		this.xSets.clear();
		this.groupSets.clear();

		for (var i = 0; i < 9; i++) {
			this.ySets.set(i, new Set());
			this.xSets.set(i, new Set());
			this.groupSets.set(i, new Set());
		}

		for (var x = 0; x < this.width; x++) {
			for ( var y = 0; y < this.height; y++) {
				if (this.puzzle[x][y] !== 0)
					this.xSets.get(x).add(this.puzzle[x][y]);					
				if (this.puzzle[y][x] !== 0)
					this.ySets.get(x).add(this.puzzle[y][x]);

				var g = this.getGroup(x, y);
				if (this.puzzle[x][y] !== 0)
					this.groupSets.get(g).add(this.puzzle[x][y]);
			}
		}

		for(var i = 0; i < this.width; i++) {
			// check the rows
			if (this.xSets.get(i).size !== 9)
				return false;
			// check the cols
			if (this.ySets.get(i).size !== 9)
				return false;
			// check the groups
			if (this.groupSets.get(i).size !== 9)
				return false;
		}

		return true;
	}

	getNextPosition(x, y, dir) {
		var inc = 1;

		// move left or right
		if (dir == 'l' || dir == 'r') {
			if(dir == 'l')
				inc = -1;

			for(var i = x+inc; 0 <= i && i < this.width; i += inc) {
				if (!this.isConstant(i, y)) {
					return {x:i, y:y};
				}
			}
		}

		// move up or down
		if (dir == 'u' || dir == 'd') {
			if(dir == 'u')
				inc = -1;

			for(var i = y+inc; 0 <= i && i < this.height; i += inc) {
				if (!this.isConstant(x, i)) {
					return {x:x, y:i};
				}
			}
		}

		return {x:x, y:y};
	}

	resetBoard() {
		this.ySets.clear();
		this.xSets.clear();
		this.groupSets.clear();

		for (var x = 0; x < this.width; x++) {
			for ( var y = 0; y < this.height; y++) {
				this.puzzle[x][y] = this.initialPuzzle[x][y];
			}
		}
	}
}

export default BoardModel;