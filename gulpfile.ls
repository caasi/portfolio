require! <[gulp gulp-livescript gulp-jade gulp-concat event-stream]>

build-path = './'

gulp.task \js ->
  event-stream.concat do
    gulp.src 'src/ls/*.ls'
        .pipe gulp-livescript bare: on
    gulp.src 'src/js/*.js'
  .pipe gulp-concat 'main.js'
  .pipe gulp.dest build-path

gulp.task \html ->
  gulp.src 'src/index.jade'
      .pipe gulp-jade!
      .pipe gulp.dest build-path

gulp.task \default <[js html]>
