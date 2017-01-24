/**
 * Gulp tasks config
 */

"use strict";

const src = "./resources";
const view = "./views";
const dest = "./public";
const tmp = "./.tmp";
const bin = "./bin";

module.exports = {
	html: {
		"src": view,
		"dest": dest,
		"useref": {
			"searchPath": [
				tmp,
				src,
				'.'
			]
		},
		"minifyCss": {
			"compatibility": "*"
		}
	},
	styles: {
		"src": src + "/styles/*" + ".less",
		"dest": tmp + "/styles",
		"autoprefixer": {
			"browsers": ['last 2 versions'],
			"cascade": false
		}
	},
	scripts: {
		"src": src + "/scripts/**/*.js",
		"dest": tmp + "/scripts"
	},
	img: {
		"src": src + "/img/**/*",
		"dest": dest + "/img",
		"imagemin": {
			"progressive": true,
			"svgoPlugins": [{
				"removeViewBox": false,
				"cleanupIDs": false
			}]
		}
	},
	fonts: {
		"src": src + "/fonts/**/*",
		"dest": dest + "/fonts",
		"tmp": tmp + "/fonts"
	},
	serve: {
		"browsersync": {
			proxy: 'http://localhost:3000',
			port: '3030',
			files: [src + "/**/*"],
			serveStatic: [tmp, './bower_components']
		},
		"watch_reload": [
			view + "/**/*.ejs",
			tmp + "/fonts/**/*",
			dest + "/img/**/*",

		],
		"watch": {
			"styles": src + "/styles/*" + ".less",
			"fonts": src + "/fonts/**/*",
			"bower": "bower.json",
			"scripts": src + "/scripts/**/*.js",
			"img": src + "/img/**/*"
		},
		"test": {
			"browsersync": {
				"notify": false,
				"port": 9001,
				"ui": false,
				"server": {
					"baseDir": "test",
					routes: {
						'/scripts': 'resources/scripts',
						'/bower_components': 'bower_components'
					}
				}
			},
			"watch": {
				"spec": "test/spec/**/*.js"
			}
		},
		"dist": {
			"browsersync": {
				"notify": false,
				"port": 9002,
				"server": {
					"baseDir": [dest]
				}
			}
		}
	},
	clean: {
		"dest": dest
	},
	wiredep: {
		"styles": {
			"src": src + "/styles/*" + ".less",
			"dest": src + "/styles",
			"wiredepStream": {
				"exclude": ["bootstrap/dist"],
				"ignorePath": /^(\.\.\/)+/
			}
		},
		"html": {
			"src": src + "/**/*.ejs",
			"dest": src,
			"wiredepStream": {

				"ignorePath": /^(\.\.\/)*\.\./
			}
		}
	},
	lint: {
		"reload": {
			"stream": true,
			"once": true
		},
		"src": src + "/scripts/**/*.js",
		"test": {
			"src": "test/spec/**/*.js",
			"options": {
				"env": {
					"node": true,
					"mocha": true
				}
			}
		}
	},
	build: {
		"src": src + "/**/*"
	},
	extras: {
		"src": [
			src + "/*.*",
			"!" + src + "/*.ejs"
		],
		"options": {
			"dot": true
		},
		"dest": dest
	},
	nodemon: {
		script: bin + '/www',
		env: {
			'NODE_ENV': 'development',
			'DEBUG': 'SAS:*'
		},
		watch: [
			bin + '/*',
			'controllers/*',
			'app.js',
			'Entity/*',
			'Nodes/*',
			'Gulp/**/*'
		],
		reload_delay : 400
	}
};
