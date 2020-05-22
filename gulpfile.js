// Plugins
const {
  parallel,
  series,
  watch,
  src,
  dest,
} = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const smartgrid = require('smart-grid');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// Globs
const config = {
  root: './src/',
  html: {
    src: 'index.html',
  },
  css: {
    src: 'less/+(styles).less',
    watch: 'less/**/*.less',
    dest: 'css',
  },
  js: {
    src: 'js/+(common).mjs',
    watch: 'js/**/*.mjs',
    dest: 'js',
  },
};

/**
 * Compile pug to html
 *
 * @return {string} Return file's paths
 */
function html(done) {
  browserSync.reload();

  done();
}

/**
 * Compile less to css
 *
 * @return {string} Return file's paths
 */
function css() {
  return src(config.root + config.css.src)
    .pipe(less())
    .pipe(gcmq())
    .pipe(dest(config.root + config.css.dest))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(dest(config.root + config.css.dest))
    .pipe(browserSync.stream());
}

/**
 * Save js to prod directory
 *
 * @return {string} Return file's paths
 */
function js() {
  return src(config.root + config.js.src)
      .pipe(babel())
      .pipe(uglify({
        toplevel: true,
      }))
      .pipe(rename({
        extname: '.js',
      }))
      .pipe(dest(config.root + config.js.dest));
}

/**
 * Initialize smart-grid library
 *
 * @param {*} done End async function
 */
function grid(done) {
  smartgrid('./src/less', {
    container: {
      maxWidth: '1000px',
    },
  });
  done();
}

/**
 * Initialize live reload
 *
 * @param {*} done End async function
 */
function livereload(done) {
  browserSync.init({
    server: {
      baseDir: './src/',
    },
  });

  done();
}

/**
 * Task's assignment
 */
exports.css = css;
exports.grid = grid;
// Build final bundle from html, less, js
exports.build = parallel(css, js);
// Watch changes from pug (html), less, js
exports.watch = series(parallel(css, js), livereload,
  function () {
    watch(config.root + config.html.src, html);

    watch(config.root + config.css.watch, css);

    watch(config.root + config.js.watch, series(js, function (done) {
      browserSync.reload();

      done();
    }));
  });