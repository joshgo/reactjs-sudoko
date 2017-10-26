class BoardModel {
	constructor() {
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
	getWidth() {
			return 9;
	}
	getHeight() {
			return 9;
	}

	getNumber(x, y) {
		var pos = y*9 + x;
		var num = this.defaultPuzzleStr.charAt(pos);
		return num == '0' ? '' : num;
	}
}

export default BoardModel;