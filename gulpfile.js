// gulp
const gulp = require('gulp');
var sass = require('gulp-sass');
const rename = require('gulp-rename');

// html
const htmlMin = require('gulp-htmlmin');

// style
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
// const autoPrefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');

// script
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
});

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('dist/assets/sass/App.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCSS({
      level: {
        2: {
          all: true,
          removeDuplicateRules: true
        }
      }
    }))
    
    .pipe(minifyCSS())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dist/assets/bundles'));
});

gulp.task('js', function () {
  return gulp.src('dist/assets/js/main.js', {
    sourcemaps: true
  })
    .pipe(browserify())
    .pipe(babel({
      presets: ['@babel/env'],
      compact: false
    }))
    .pipe(uglify({
      mangle: {
        toplevel: true
      },
      sourceMap: true,
      toplevel: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/assets/bundles', {
      sourcemaps: true
    }));
});

gulp.task('watch', function () {
  gulp.watch('dist/assets/sass/*.scss', gulp.series('sass'));
  
  
  gulp.watch([
    'dist/assets/js/*.js',
  ], gulp.registry().get('js'));
})
gulp.task('default', gulp.parallel('sass', 'js', 'watch'));