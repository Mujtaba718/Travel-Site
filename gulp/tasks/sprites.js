var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    svg2png = require('gulp-svg2png');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function() {
    return del(['./app/temp/sprite', './app/assets/images/sprite']);
});


// creates an svg sprite
gulp.task('createSprite', ['beginClean'], function() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
            .pipe(svgSprite(config))
            .pipe(gulp.dest('./app/temp/sprites/'));
});

// creates png copy
gulp.task('createPngCopy', ['createSprite'], function(){
    return gulp.src('./app/temp/sprites/css/*.svg')
            .pipe(svg2png())
            .pipe(gulp.dest('./app/temp/sprites/css'));
});

// moves sprite files from temp folder to img folder
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
    return gulp.src('./app/temp/sprites/css/**/*.{svg,png}')
            .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('./app/temp/sprites/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
    return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);