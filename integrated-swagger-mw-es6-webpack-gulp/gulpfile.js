'use strict';

const fileInclude = require('gulp-file-include');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const through = require('through2');
const gutil = require('gulp-util');
const jsYaml = require('js-yaml');

gulp.task('webpack', done => {
  gulp.src('./config.js')  // this is similar to one of multiple entrypoint of webpack
    .pipe(webpack(require('./config.js')))  // multiple configs support ref: https://github.com/shama/webpack-stream#multi-compiler-support
                                            // Unresolved: multiple config will cause HMR incorrect.
    .pipe(gulp.dest('./dist'));  // this is similar to output.path of webpack
  done();
});

gulp.task('yaml', done => {
  gulp.src(['./src/yaml/swagger.yaml'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    // ref: https://stackoverflow.com/questions/27923523/how-can-i-write-a-simple-gulp-pipe-function
    .pipe(through.obj((chunk, enc, cb) => {
      // This is for avoiding HMR of webpack broken.
      try{
        let doc = jsYaml.safeLoad(chunk.contents.toString('utf-8'));
        cb(null, chunk);
      }
      catch(e){
        cb(e, null);
      }
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist'))
  done();
});

gulp.task('watch', () => {
  gulp.watch(['src/yaml/**/*'], gulp.series('yaml'), () => {
    console.log('Yaml is updated!! Please refresh page.');
  });
});

gulp.task('default', gulp.parallel(gulp.series('yaml', 'webpack'), 'watch'), done => done());
