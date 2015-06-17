"use strict";
var gulp = require('gulp');
var eslint = require('gulp-eslint');

var globs = {
    lintSourceJs: ['server/**/*.js']
};

gulp.task('lint', function () {
    return gulp.src(globs.lintSourceJs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('default', ['lint'], function () {
});
