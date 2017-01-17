/**
 * Created by hikingyo on 15/01/17.
 */
const BackPack = require('./../Entity/BackPack');

class User {

	constructor(name) {
		this._health = 20;
		this._name = name;
		this._strengh = 1;
		this._backpack = new BackPack();
		this._weapon = null;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}

	get health() {
		return this._health;
	}

	set health(value) {
		this._health = value;
	}


	get strengh() {
		return this._strengh;
	}

	set strengh(value) {
		this._strengh = value;
	}

	get backpack() {
		return this._backpack;
	}

	set backpack(value) {
		this._backpack = value;
	}

	get weapon() {
		return this._weapon;
	}

	set weapon(value) {
		this._weapon = value;
	}

	takeDamage(damage){
		let _damage = damage > 0 ? -damage : damage;
		this.health(_damage);
	}

	hit(target) {
		target.takeDamage(this.strengh())
	}

}

module.exports = User;
