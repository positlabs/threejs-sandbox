var gulp = require('gulp');

var browserify 			= require('browserify');			// http://browserify.org/
var watchify 			= require('watchify');				// https://github.com/ben-ng/minifyify
var source 				= require('vinyl-source-stream');
var browserifyShader 	= require("browserify-shader")


function scriptTask(){

	var src = './src/index.js';
	var dest = './dist/';

	bundler = browserify(src, { 
		debug: true,
		paths:[
			'node_modules/', // default
			'bower_components/',
			'src/'
		],

		cache: {}, 			// for watchify
		packageCache: {}, 	// for watchify

	});
	
	bundler.add(src);

	return bundler
	  	.transform(browserifyShader)
		.bundle()
		.on('error', function(err){
			this.emit('end');
		})
		.pipe(source('index.js'))
		.pipe(gulp.dest(dest))

}

gulp.task('copy', ['scripts'], function(){
	return gulp.src(['./src/index.html'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', [], function(){
	return scriptTask();
});

gulp.task('watch', ['scripts', 'copy'], function(){
	// scriptTask.watch();
	gulp.watch(['./src/**/*.js', './src/**/*.glsl'], function(){
		return scriptTask();
	});
});

gulp.task('default', ['scripts', 'copy'], function(){

});