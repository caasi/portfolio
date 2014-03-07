/**
 * Copyright (c) 2014, caasi Huang <caasi.igd@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 **/

var $win, config, dimension, computePosScale, stage, dim, setting, x$, gameStage, renderer, animate;
$win = $(window);
config = {
  width: 320,
  height: 240
};
dimension = function(){
  return {
    w: $win.width(),
    h: $win.height()
  };
};
computePosScale = function(dim){
  var ratio, s;
  ratio = {
    w: dim.w / config.width,
    h: dim.h / config.height
  };
  s = Math.min(ratio.w, ratio.h);
  return {
    scale: {
      x: s,
      y: s
    },
    offset: {
      x: (dim.w - config.width * s) / 2,
      y: (dim.h - config.height * s) / 2
    }
  };
};
stage = new PIXI.Stage(0x000000);
dim = dimension();
setting = computePosScale(dim);
x$ = gameStage = new PIXI.Graphics;
x$.beginFill(0xff9900);
x$.drawRect(0, 0, config.width, config.height);
x$.endFill();
x$.position = setting.offset;
x$.scale = setting.scale;
stage.addChild(gameStage);
renderer = PIXI.autoDetectRenderer($win.width(), $win.height());
renderer.view.className = 'renderView';
$('body').append(renderer.view);
$(window).resize(function(){
  var dim, setting, x$;
  dim = dimension();
  setting = computePosScale(dim);
  renderer.resize(dim.w, dim.h);
  x$ = gameStage;
  x$.position = setting.offset;
  x$.scale = setting.scale;
});
animate = function(){
  requestAnimationFrame(animate);
  renderer.render(stage);
};
requestAnimationFrame(animate);