const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const paths = {
    styles: {
      src: 'src/styles/**/*.styl',
      dest: 'build/assets/styles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts'
    },
    templates: {
        src: 'src/templates/**/*.pug',
        dest: 'build/html'
    }
};

function clean() {
    return del([ 'build/assets','build/html' ]);
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(stylus())
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest));
}

function templates() {
    return gulp.src(paths.templates.src)
        .pipe(pug({}))
        .pipe(gulp.dest(paths.templates.dest))
}

gulp.task('templates', () => templates());
gulp.task('styles', () => styles());
gulp.task('cls', () => clean());

gulp.task('watch', () => {
    gulp.watch(paths.templates.src, gulp.series('templates'));
    gulp.watch(paths.styles.src, gulp.series('styles'));
});

gulp.task('default', gulp.series('cls', gulp.parallel('templates', 'styles')));