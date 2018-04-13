var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'), // for css variables
    nested = require('postcss-nested'), // for nesting properties
    cssImports = require('postcss-import'), // for importing css files into another
    mixins = require('postcss-mixins');

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/styles.css')
			.pipe(postcss([cssImports, mixins, nested, cssvars, autoprefixer]))
			.on('error', function(errorInfo){
				console.log(errorInfo.toString());
				this.emit('end')
			})
			.pipe(gulp.dest('./app/temp/styles'));
});

