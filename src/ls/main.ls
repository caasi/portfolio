$win   = $ window
config =
  width:  160
  height: 120
  path:
    image: './img/'
  color:
    step: Math.PI * 9 / 8

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

# setup stage and engine
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEARST

# preload images
loader = new PIXI.AssetLoader [
  "#{config.path.image}title-background.png"
  "#{config.path.image}title.png"
]

loader.addEventListener \onComplete ->
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

  # sprites
  color-count = 0
  color-matrix = [
    1 0 0 0
    0 1 0 0
    0 0 1 0
    0 0 0 1
  ]
  filter = new PIXI.ColorMatrixFilter
  filter.matrix = color-matrix
  title = new PIXI.DisplayObjectContainer
  title-bg   = PIXI.Sprite.fromImage "#{config.path.image}title-background.png"
  title-bg.filters = [filter]
  title-text = PIXI.Sprite.fromImage "#{config.path.image}title.png"
  title
    ..addChild title-bg
    ..addChild title-text
    ..x = (config.width - title-bg.width) / 2
    ..y = 10
  game-stage.addChild title

  renderer = PIXI.autoDetectRenderer $win.width!, $win.height!
  renderer.view.className = \rendererView
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
    # change color
    color-matrix
      ..1 =   3 * Math.sin color-count
      ..2 =       Math.cos color-count
      ..3 = 1.5 * Math.cos color-count
      ..4 =   2 * Math.cos color-count / 3
      ..5 =       Math.cos color-count / 2
      ..6 =       Math.cos color-count / 4
    color-count += config.color.step
  requestAnimationFrame animate
loader.load!
