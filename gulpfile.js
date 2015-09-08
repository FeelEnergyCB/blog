var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    md = require('gulp-remarkable'),
    cheerio = require('gulp-cheerio'),
    file = require('gulp-file'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver'),
    date, file, header,
    json = [];
 
  gulp.task('less', function () {
    gulp.src('assets/less/**/*.less')
      .pipe(less())
      .on('error', function (err) {
        console.log(err.message.toUpperCase());
      })
      .pipe(gulp.dest('assets/css/'));
  });

  gulp.task('markdown', function () {
    return gulp.src('posts/src/**/*.md')
    .pipe(md({
      preset: 'full',
      remarkableOptions: {
        html: true,
        breaks: true
      }
      }))
    .on('error', function (err) {
      console.log(err.message.toUpperCase());
    })
    .pipe(gulp.dest('posts/dist'));
  });

  gulp.task('sync', ['markdown'] , function () {
    return gulp.src(['posts/dist/*.html'])
      .pipe(cheerio(function ($, file) {

        date = new Date($('time').text());
        header = $('h1').text();
        if ( file.history[0].lastIndexOf('/') < 0 ) {
          path = file.history[0].slice(file.history[0].lastIndexOf('\\') + 1, -5);
        } else {
          path = file.history[0].slice(file.history[0].lastIndexOf('/') + 1, -5);
        }

        json.push({
          date: date,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          header: header,
          path: path
        });

        $('*').removeAttr('id');
      }))
      .pipe(gulp.dest('posts/dist/'));
  });


  gulp.task('json', ['sync'] , function() {
    file('data.json', JSON.stringify(json))
      .pipe(gulp.dest('assets/json'));
    json = [];
  });

  gulp.task('clear', function () {
    gulp.src('posts/dist/*.html', {read: false})
      .pipe(clean());
  });

  gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
        fallback: 'index.html',
        livereload: true,
        directoryListing: true,
        open: true
      }));
  });

  gulp.task('default', ['webserver'] , function() {

    gulp.watch('assets/less/**/*.less', ['less']);

    gulp.watch('posts/src/**/*.md', ['json']);

  });
