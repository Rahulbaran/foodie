const {src,dest,series,watch} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');



//SCSS Task
const scssTask = function () {
	return src('./static/scss/*.scss')
	.pipe(scss())
	.pipe(sourcemaps.init())
	.pipe(postcss([prefixer(),cssnano()]))
	.pipe(sourcemaps.write('./'))
	.pipe(dest('./static/css'))
};



//JS Task
const jsTask = function () {
	return src('./static/js/*.js')
	.pipe(sourcemaps.init())
	.pipe(terser())
	.pipe(sourcemaps.write('./'))
	.pipe(dest('./static/minjs/'))
};



//watchTask
const watchTask = function () {
	watch('./static/scss/*.scss', scssTask);
	watch('./static/js/*.js', jsTask);
}



exports.default = series (
	scssTask,
	jsTask,
	watchTask
);