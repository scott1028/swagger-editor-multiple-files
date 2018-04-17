var fileinclude = require('gulp-file-include'),
    gulp = require('gulp');

gulp.task('default', function() {
  gulp.src(['index.yml'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true // must be true for indent your included filess.
    }))
    .pipe(gulp.dest('./dist'));
});