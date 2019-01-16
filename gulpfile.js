const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const wait = require("gulp-wait");
const minifyHTML = require("gulp-minify-html");
const gulpif = require("gulp-if");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const uglifyCSS = require("gulp-uglifycss");
const uglify = require("gulp-uglify");

const babel = require("gulp-babel");

const sassSource = "components/sass/",
	jsSource = "components/scripts/*.js";

let production = false;

//set output directory according to production type
let outputDir = production ? "builds/production/" : "builds/development/";

//serve all the files on specific port
gulp.task("connect", function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

// Process HTML files and reload
// the server
gulp.task("processHTML", function() {
	gulp.src("builds/development/*.html").pipe(connect.reload());
});

// Process Sass files to css files
// and reload the server
gulp.task("processSass", function() {
	gulp
		.src(sassSource + "main.scss")
		.pipe(wait(1500))
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest(outputDir + "css"))
		.pipe(connect.reload());
});

// Process JS files scripts from ES6
// to ES2015 using babel
// and reload the server
gulp.task("processJS", function() {
	gulp
		.src(jsSource)
		.pipe(babel({ presets: [ "env" ] }))
		.pipe(gulp.dest(outputDir + "js"))
		.pipe(connect.reload());
});

// Watch for an change in .scss and .js
// file and reload trigger the associated
// function for each task
gulp.task("watch", [ "connect" ], function() {
	gulp.watch([ "components/sass/*.scss", "components/sass/*/*.scss" ], [ "processSass" ]);
	gulp.watch("builds/development/*.html", [ "processHTML" ]);
	gulp.watch(jsSource, [ "processJS" ]);
});

/*=============================
    Production Based Functions
 ==============================*/

gulp.task("minifyHTML", function() {
	gulp
		.src("builds/development/*.html")
		.pipe(
			htmlReplace({
				cssSrc: "css/all.min.css",
				jsSrc: "js/all.min.js"
			})
		)
		.pipe(gulpif(production, minifyHTML()))
		.pipe(gulpif(production, gulp.dest(outputDir)));
});

gulp.task("minifyCSS", function() {
	gulp
		.src("builds/development/css/*.css")
		.pipe(gulpif(production, concat("all.min.css")))
		.pipe(gulpif(production, uglifyCSS()))
		.pipe(gulpif(production, gulp.dest(outputDir + "css")));
});

gulp.task("minifyJS", function() {
	gulp
		.src("builds/development/js/*.js")
		.pipe(gulpif(production, concat("all.min.js")))
		.pipe(gulpif(production, uglify()))
		.pipe(gulpif(production, gulp.dest(outputDir + "js")));
});

gulp.task("build-prod", [ "minifyHTML", "minifyCSS", "minifyJS" ]);
