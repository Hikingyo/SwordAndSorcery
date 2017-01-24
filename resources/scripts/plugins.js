// Avoid `console` errors in browsers that lack a console.
"use strict";
(function () {
	let noop = function () {
	};
	const methods = [
		"assert", "clear", "count", "debug", "dir", "dirxml", "error",
		"exception", "group", "groupCollapsed", "groupEnd", "info", "log",
		"markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
		"timeline", "timelineEnd", "timeStamp", "trace", "warn"
	];
	let console = (window.console = window.console || {});
	methods.forEach((method) => {
		if (!console[method]) {
			console[method] = noop;
		}
	})
}());

// Sword And Sorcery jQuery plugin

(function ($) {

	$.SAS = function (element, options) {

		const defaults = {
			FADE_IN_DURATION: 300,
		};

		const self = this;

		// Connect to the socket.
		let socket = io();

		self.settings = {};

		//TODO more stymish n efficent selector for elements
		const $element = $(element);
		const $window = $(window);
		const $loginPage = $('#login_page');
		const $gameBoard = $('#gameboard');
		const $gameBook = $('#game_book');
		const $controls = $('#controls');
		const $usernameInput = $('.input_field');
		const $help = $('#help');
		const $hud = $('#hud');
		const $backpack = $('#backpack');
		let $currentInput = $usernameInput.focus();
		const $nodeTitle = $gameBoard.find('.narration-title');
		const $nodeText = $gameBoard.find('.narration');

		let player;
		let connected = false;

		self.init = function () {
			console.log('Here we go !');
			self.settings = $.extend({}, defaults, options);
			// code goes here
		};

		self.foo_public_method = function () {
			// code goes here
		};

		// Prevents input from having injected markup
		const _cleanInput = (input) => {
			return $('<div/>').text(input).text() || false;
		};

		const _showGameboard = () => {
			$loginPage.hide();
			$gameBook.fadeIn(self.settings.FADE_IN_DURATION);
			$loginPage.off('click');
			//$currentInput = $usernameInput.focus();
			$currentInput = null;
		};

		const _showLoggingPage = () => {
			$gameBook.hide();
			$loginPage.fadeIn(self.settings.FADE_IN_DURATION);
			$currentInput = $usernameInput;
		};


		// Sets the player name
		const _setUsername = () => {
			const username = _cleanInput($usernameInput.val().trim());

			// If the username is valid
			if (username) {
				// Tell the server your username
				socket.emit('add user', username);
			}
		};

		// TODO rework. { eventName : hit|action|nextNode..., args :{ ...args} }
		const _userAction = (eventName, args) => {
			if(args == undefined){
				args = {};
			}
			console.log(eventName);
			args['event'] = eventName;
			socket.emit('action', args);
		};

		/**
		 * Display text, action button. Bind button event to _userAction()
		 * @param node
		 * @private
		 */
		const _displayNode = (node) => {
			const _node = JSON.parse(node);
			console.dir(_node);
			$nodeTitle.text(_node._title);
			$nodeText.html(_node._narration);
			_node._userActions.map((useraction) => {
				let $button = $('<button/>').attr('name', useraction.title);
				$button.css('background-image', 'url("../img/' + useraction.image);
				$button.on('click', () => {
					_userAction(useraction.type, {target: useraction.target});
				});
				console.dir($controls);
				$button.appendTo($controls);
			})
		};

		const _toggleHelp = () => {
			$help.toggle(() => {
					$help.show();
				},
				() => {
					$help.hide();
				})
		};

		const _toggleBackpack = () => {
			$help.toggle(() => {
					$backpack.show();
				},
				() => {
					$backpack.hide();
				})
		};

		/****************************
		 *                            *
		 *        Keyboard event        *
		 *                            *
		 ****************************/

		$window.keydown(function (event) {
			// Auto-focus the current input when a key is typed
			if (!(event.ctrlKey || event.metaKey || event.altKey) && $currentInput != null) {
				$currentInput.focus();
			}
			console.log(event.which);
			switch (event.which) {
				case 13: // ENTER
					if (!connected) {
						_setUsername();
					}
					break;
				case 72: // h
					break;
				case 73 : // i
					break;
				default:
					break;
			}
			// When the client hits ENTER on their keyboard
			/*if (event.which === 13) {
			 if (connected) {
			 /!*sendMessage();
			 socket.emit('stop typing');
			 typing = false;*!/
			 } else {
			 _setUsername();
			 }
			 }*/
		});

		// Socket event
		socket.on('connect', () => {
			socket.emit('userIncoming');
		});

		socket.on('alreadyLogged', (data) => {
			_showGameboard();
		});

		socket.on('notLogged', () => {
			_showLoggingPage();
		});

		socket.on('connected', (data) => {
			console.dir(data.user);
		});

		socket.on('SASerror', (data) => {
			console.error(data);
		});

		socket.on('nextNode', (data) => {
			_displayNode(data);
		});

		socket.on('updateHUD', (data) => {
			console.dir(data);
		});

		self.init();

	};

	$.fn.SAS = function (options) {

		return this.each(function () {
			if (undefined == $(this).data('SAS')) {
				let plugin = new $.SAS(this, options);
				$(this).data('SAS', plugin);
			}
		});

	}

})(jQuery);
