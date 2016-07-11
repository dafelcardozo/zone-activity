/*jshint esnext: true */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
  });
  gulp.watch("*.html").on("change", browserSync.reload);
//  gulp.watch("*.js").on("change", browserSync.reload);
});
gulp.task('js', () =>
     gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/angular/angular.js', 'bower_components/Chart.js/dist/Chart.js',
    'bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/angular-chart.js/angular-chart.js'])
        .pipe(concat('build.js', {newLine: ';'}))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
);

gulp.task('css', () =>
   gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css', 'bower_components/angular/angular-csp.css', 'bower_components/sidebar/simple-sidebar.css', 'all.css'])
   .pipe(concat('build.css', {newLine: '\n'}))
   .pipe(gulp.dest('dist'))
   .pipe(rename('all.min.css'))
   .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
   .pipe(gulp.dest('dist'))
);

gulp.task('copyfonts',() =>
   gulp.src('./bower_components/bootstrap/fonts/*.{ttf,woff,woff2,eof,svg}')
   .pipe(gulp.dest('./fonts'))
);

gulp.task('watch', ['browserSync'], function (){
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('*.js', browserSync.reload);
  gulp.watch('*.css', browserSync.reload);
});
// Lint Task
gulp.task('lint', () =>
    gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
);

// Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch('./*.js', ['scripts']);  //'lint',
// //    gulp.watch('scss/*.scss', ['sass']);
// });
/*
var useref = require('gulp-useref');

gulp.task('useref', function(){
  return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});
*/
gulp.task('default',['js','lint', 'css', 'copyfonts', 'watch'],function(){
});
