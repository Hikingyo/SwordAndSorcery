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
			foo: 'bar',
		};

		const self = this;

		// Connect to the socket.
		const socket = io();

		self.settings = {};

		//TODO more stymish n efficent selector for elements
		const $element = $(element);
		const $window = $(window);
		const $loginPage = $('.login_page');
		const $gameBoard = $('.game_board');
		const $usernameInput = $('.input_field');
		let $currentInput = $usernameInput.focus();

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


		// Sets the player name
		const _setUsername = () => {
			const username = _cleanInput($usernameInput.val().trim());

			// If the username is valid
			if (username) {
				$loginPage.fadeOut();
				$gameBoard.show();
				$loginPage.off('click');
				//$currentInput = $usernameInput.focus();
				$currentInput = null;
				// Tell the server your username
				socket.emit('add user', username);
			}
		};

		// Keyboard events

		$window.keydown(function (event) {
			// Auto-focus the current input when a key is typed
			if (!(event.ctrlKey || event.metaKey || event.altKey)) {
				$currentInput.focus();
			}
			// When the client hits ENTER on their keyboard
			if (event.which === 13) {
				if (connected) {
					/*sendMessage();
					 socket.emit('stop typing');
					 typing = false;*/
				} else {
					console.log('plop');
					_setUsername();
				}
			}
		});

		// Socket event
		socket.on('logged', (data) => {
			console.dir(data.user);
		});

		self.init();

	};

	$.fn.SAS = function (options) {

		return this.each(function () {
			if (undefined == $(this).data('pluginName')) {
				let plugin = new $.SAS(this, options);
				$(this).data('pluginName', plugin);
			}
		});

	}

})(jQuery);
