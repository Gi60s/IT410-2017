'use strict';
const gulp          = require('gulp');
const marked        = require('gulp-marked');
const pygmentize    = require('pygmentize-bundled');

gulp.task('convert', function() {
    gulp.src('./src/*.md')
        .pipe(marked({
            /*highlight: function (code, lang, callback) {
                pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
                    callback(err, result);
                });
            }*/
        }))
        .pipe(gulp.dest('./www/lessons/'))
});

gulp.task('watch', function() {
    gulp.watch('./src/*.md', ['convert']);
});

gulp.task('default', ['watch']);