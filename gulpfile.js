var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    md = require('gulp-remarkable'),
    cheerio = require('gulp-cheerio'),
    file = require('gulp-file'),
    clean = require('gulp-clean'),
    time, file, header,
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

        time = $('time').text();
        header = $('h1').text();
        file = file.history[0].slice(file.history[0].lastIndexOf('/') + 1);

        json.push({
          time: time,
          header: header,
          file: file
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

  gulp.task('default', function() {

    gulp.watch('assets/less/**/*.less', ['less']);

    gulp.watch('posts/src/**/*.md', ['json']);

  });
