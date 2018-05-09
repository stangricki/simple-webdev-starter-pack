// require('./gulp/tasks/watch');

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  postcss = require('gulp-postcss'),
	  autoprefixer = require('autoprefixer'),
	  hexrgba = require('postcss-hexrgba'),
	  watch = require('gulp-watch'),
	  cssnano = require('gulp-cssnano'),
	  browserSync = require('browser-sync').create();

/* PATHS */

const STYLES_DEV_SASS_DIR = './app/assets/scss/**/*.scss',
	  STYLES_TEMP_CSS_DIR = './app/temp/styles/',
	  INDEX_HTML_FILE = './app/index.html';

/****************DEFAULT*******************/
gulp.task('default', function(){
	console.log("Default task started!")
})


/****************STYLES*******************/
gulp.task('styles', function(){
	gulp.src(STYLES_DEV_SASS_DIR)
		.pipe(sass())
		.pipe(postcss([autoprefixer, hexrgba]))
		.on('error', function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end')
		})
		 // .pipe(cssnano()) // uncomment to minify CSS file
		.pipe(gulp.dest(STYLES_TEMP_CSS_DIR))
})

/****************WATCH*******************/
gulp.task('watch', function(){

	browserSync.init({
		notify: false,
        server: {
            baseDir: "./app"
        }
    });

	watch(STYLES_DEV_SASS_DIR, function(){
		gulp.start('styles');
	})

	watch(INDEX_HTML_FILE, function(){
		browserSync.reload();
	})

	watch(STYLES_TEMP_CSS_DIR, function(){
		browserSync.reload();
	})
})