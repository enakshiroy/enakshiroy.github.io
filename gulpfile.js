const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const del = require('del');

/**
 * Logs the error with name of current running task.
 * @param {string} task name of the running task. 
 */
function logError(task, done) {
    return (error) => {
        console.error(`[${task}] ${error.message}`);
        done();
    };
}

// Fonts
gulp.task('fonts', function () {
    return gulp.src('./app/fonts/*.{ttf,otf}')
        .pipe(gulp.dest('./app/dist/fonts'));
});

// Compile our sass files.
gulp.task('sass', ['fonts'], (done) => {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass())
        .on('error', logError('sass', done))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dist/css'))
        .pipe(reload({
            stream: true
        }));
});

// process JS files and return the stream.
gulp.task('js', (done) => {
    return browserify({
            entries: './app/src/app.js',
            debug: true
        }).bundle()
        .on('error', logError('js', done))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(babel({
            presets: ['es2015'],
            compact: true
        }))
        .on('error', logError('js', done))
        .pipe(uglify())
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

gulp.task('cleanup', function () {
    del('app/dist');
});

// Sets wacthers for files and runs corresponding tasks.
gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/src/**/*.js', ['js-watch']);
});

gulp.task('build', cb => {
    runSequence('sass',
        'js',
        cb);
});

gulp.task('default', ['sass', 'js', 'serve', 'watch']);