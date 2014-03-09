require! <[gulp gulp-concat gulp-livereload event-stream node-static tiny-lr]>
gutil             = require \gulp-util
livescript        = require \gulp-livescript
jade              = require \gulp-jade
livereload-server = tiny-lr!
livereload        = -> gulp-livereload livereload-server

build-path = './'

gulp.task \js ->
  gulp.src do
    * 'LICENSE'
      'src/ls/actor.ls'
      'src/ls/main.ls'
  .pipe gulp-concat 'main.ls'
  .pipe livescript!
  .pipe gulp.dest build-path
  .pipe livereload!

gulp.task \html ->
  gulp.src 'src/index.jade'
  .pipe jade!
  .pipe gulp.dest build-path
  .pipe livereload!

gulp.task \img ->
  gulp.src 'src/img/*.png'
  .pipe gulp.dest "#{build-path}img/"
  .pipe livereload!

gulp.task \build <[js html img]>

gulp.task \static (next) ->
  server = new node-static.Server build-path
  port = 8888
  require \http .createServer (req, res) !->
    req.addListener(\end -> server.serve req, res)resume!
  .listen port, !->
    gutil.log "Server listening on port: #{gutil.colors.magenta port}"
    next!

gulp.task \watch ->
  gulp.watch 'src/ls/*.ls'    <[js]>
  gulp.watch 'src/index.jade' <[html]>
  gulp.watch 'src/img/*.png'  <[img]>

gulp.task \livereload ->
  port = 35729
  livereload-server.listen port, ->
    return gulp.log it if it
    gutil.log "LiveReload listening on port: #{gutil.colors.magenta port}"

gulp.task \default <[build static watch livereload]>
