/**
 * Created by hikingyo on 15/01/17.
 */
/**
 *
 */

const ejs = require('ejs');
const debug = require('debug');
const nodeDebug = debug('SAS:Node');

class Node{
	constructor (fileName, data){
		this._name = fileName.charAt(0).toUpperCase() + fileName.slice(1);
		try {
			const _data = require('../Nodes/' + this._name);
			this._type = _data.type;
			this._title = _data.title;
			this._narration = ejs.render(_data.narration, data);
			this._userActions = _data.useractions;
		}
		catch (error){
			nodeDebug ('Huho : ' + error);
		}
	}


	get name() {
		return this._name;
	}

	get type() {
		return this._type;
	}

	get narration() {
		return this._narration;
	}

	get userActions() {
		return this._userActions;
	}
}

module.exports = Node;
