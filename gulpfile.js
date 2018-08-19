"use strict";

var fs = require("fs");
var gulp = require("gulp");
var path = require("path");
var log = require("fancy-log");
var colors = require("ansi-colors");

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync("./src/assets/gulp").filter(function(file) {
	return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
	require("./src/assets/gulp/" + file);
});

gulp.task("default", function () {
	gulp.start("build");
});

/**
 *  These are the variables used in other gulp files.
 *  By design, we only put very generic config values
 *  which are used in different places to keep a good
 *  readability of the tasks
 */

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
	root: path.join(__dirname),
	src: "src",
	dist: "dist",
	www: "www",
	tmp: ".tmp",
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 *
 *  Example
 *  exports.wiredep = {
 *  	directory: "bower_components"
 *  };
 */

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
	"use strict";

	return function(err) {
		log(
			colors.red("[" + title + "]"),
			err.toString()
		);
		this.emit("end");
	};
};
