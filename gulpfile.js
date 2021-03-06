const argv = require('minimist')(process.argv.slice(2));
const { src, dest, series, watch, task, parallel } = require('gulp');
const browserSync = require('browser-sync');
const { reload } = browserSync;

const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const del = require('del');
const responsive = require('gulp-responsive');

const gulpPngquant = require('gulp-pngquant');

const isDevelopment = argv.env === 'DEV';

/**
 * Logs the error with name of current running task.
 * @param {string} task name of the running task.
 */
const logError = (task, done) => (error) => {
  console.error(`[${task}] ${error.message}`);
  done();
};

// Fonts
const fontTask = () => src('./fonts/*.{ttf,otf}').pipe(dest('./dist/fonts'));

// Views
const reloadTask = (done) => {
  reload();
  done();
};

// Images
const imageTask = () => {
  let images = src('./images/**/*.+(png|jpg|jpeg|gif|svg)');

  if (!isDevelopment) {
    images = images.pipe(
      imagemin({
        verbose: true,
        interlaced: true,
        optimizationLevel: 5
      })
    );
  }

  return images.pipe(dest('dist/images'));
};

const sassTask = (done) =>
  src('./scss/**/*.scss')
    .pipe(
      sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(sass())
    .on('error', logError('sass', done))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(
      reload({
        stream: true
      })
    );

// Compile our sass files.
const cssTask = series(fontTask, sassTask);

// process JS files and return the stream.
const jsTask = (done) =>
  browserify({
    entries: './src/app.js',
    debug: true
  })
    .bundle()
    .on('error', logError('js', done))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(
      sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(
      babel({
        presets: ['es2015'],
        compact: true
      })
    )
    .on('error', logError('js', done))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'));

// create a task that ensures the `js` task is complete before
// reloading browsers
const jsWatchTask = series(jsTask, reloadTask);

const serveTask = (done) => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  done();
};

const cleanupTask = (done) => {
  del('dist');
};

// Sets wacthers for files and runs corresponding tasks.
const watchTask = () => {
  watch('scss/**/*.scss', cssTask);
  watch('src/**/*.js', jsWatchTask);
  watch('views/*.html', reloadTask);
};

task('build', parallel(cssTask, jsTask, imageTask));

exports.default = series(
  parallel(jsTask, series(sassTask, imageTask)),
  serveTask,
  watchTask
);
