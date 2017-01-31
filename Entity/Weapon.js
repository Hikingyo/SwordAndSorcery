/**
 * Created by hikingyo on 31/01/17.
 */

class Weapon {

	constructor(name) {
		this._name = name.charAt(0).toUpperCase() + name.slice(1);
		this._damages = 2;
		this._type = 'weapon';
		this._name = name;
		this._img = 'sword.png';

	}

	get name() {
		return this._name;
	}

	get damages() {
		return this._damages;
	}

	get type() {
		return this._type;
	}

	get img() {
		return this._img;
	}


	set name(value) {
		this._name = value;
	}

	set damages(value) {
		this._damages = value;
	}

	set type(value) {
		this._type = value;
	}

	set img(value) {
		this._img = value;
	}
}

module.exports = Weapon;
