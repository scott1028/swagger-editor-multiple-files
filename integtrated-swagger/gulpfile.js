const fileInclude = require('gulp-file-include');
const gulp = require('gulp');

gulp.task('default', function() {
  gulp.src(['./src/swagger.yaml'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(gulp.dest('./dist'));
});