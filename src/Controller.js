
class Controller {
	constructor() {
		this.Listeners = new Map();
		this.KEYPRESS = "KEYPRESS";
		this.CLICK    = "CLICK";
		this.SOLVED   = "SOLVED";
		this.AllowedEvents = new Set();
		this.AllowedEvents.add(this.KEYPRESS);
		this.AllowedEvents.add(this.CLICK);
		this.AllowedEvents.add(this.SOLVED);
	}

	AddListener(event, cb) {
		if (!this.AllowedEvents.has(event.type))
			throw "Invalid event.type : " + event.type;
		if (cb == null)
			throw "Invalid callback";

		if (!this.Listeners.has(event.type)) {
			this.Listeners.set(event.type, []);
		}

		this.Listeners.get(event.type).push(cb);		
	}

	SendNotification(event, msg) {
		if (!this.Listeners.has(event.type))
			return;

		for(var i = 0; i < this.Listeners.get(event.type).length; i++) {
			this.Listeners.get(event.type)[i](msg);				
		}
	}
}

export default (new Controller());