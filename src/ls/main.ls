$win   = $ window
config =
  width:  320
  height: 240

dimension = ->
  w: $win.width!
  h: $win.height!

compute-pos-scale = (dim) ->
  ratio =
    w: dim.w / config.width
    h: dim.h / config.height
  s = Math.min ratio.w, ratio.h
  scale:
    x: s
    y: s
  offset:
    x: (dim.w - config.width  * s) / 2
    y: (dim.h - config.height * s) / 2

stage = new PIXI.Stage 0x000000

dim = dimension!
setting = compute-pos-scale dim
game-stage = new PIXI.Graphics
  ..beginFill 0xff9900
  ..drawRect 0 0 config.width, config.height
  ..endFill!
  ..position = setting.offset
  ..scale    = setting.scale
stage.addChild game-stage

renderer = PIXI.autoDetectRenderer $win.width!, $win.height!
renderer.view.className = \renderView
$(\body).append renderer.view

$(window).resize !->
  dim = dimension!
  setting = compute-pos-scale dim
  renderer.resize dim.w, dim.h
  game-stage
    ..position = setting.offset
    ..scale    = setting.scale

animate = !->
  requestAnimationFrame animate
  renderer.render stage
requestAnimationFrame animate
