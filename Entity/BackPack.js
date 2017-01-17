'use strict';

class BackPack{

	constructor() {
		this._content = {};
	}

	//TODO quantity
	addItem (item){
		this._content.push(item);
	}

	//TODO quantity
	removeItem(itemId){
		this._content.remove(item);
	}

	get content() {
		return this._content;
	}
}

module.exports = BackPack;
