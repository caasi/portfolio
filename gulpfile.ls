require! <[gulp gulp-livescript gulp-concat event-stream]>

gulp.task \test ->
  event-stream.concat do
    gulp.src 'src/ls/*.ls'
        .pipe gulp-livescript bare: on
    gulp.src 'src/js/*.js'
  .pipe gulp-concat 'main.js'
  .pipe gulp.dest './'

gulp.task \default <[test]>
