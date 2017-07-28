const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

/**
 * Logs the error with name of current running task.
 * @param {string} task name of the running task. 
 */
function logError(task) {
    return (error) => {
        console.error(`[${task}] ${error.message}`);
    };
}

// Compile our sass files.
gulp.task('sass', () => {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass())
        .on('error', logError('sass'))
        .pipe(cssnano())
        .pipe(gulp.dest('app/dist/css'))
        .pipe(reload({ stream: true }));
});

// process JS files and return the stream.
gulp.task('js', () => {
    return gulp.src('./app/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

// Sets wacthers for files and runs corresponding tasks.
gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/src/**/*.js', ['js-watch']);
});

gulp.task('default', ['sass', 'js', 'serve', 'watch']);