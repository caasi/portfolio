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

var $win, config, dimension, computePosScale, stage, dim, setting, x$, gameStage, colorCount, colorMatrix, filter, title, titleBg, titleText, y$, renderer, animate;
$win = $(window);
config = {
  width: 160,
  height: 120,
  path: {
    image: './img/'
  },
  color: {
    step: Math.PI * 9 / 8
  }
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
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEARST;
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
colorCount = 0;
colorMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
filter = new PIXI.ColorMatrixFilter;
filter.matrix = colorMatrix;
title = new PIXI.DisplayObjectContainer;
titleBg = PIXI.Sprite.fromImage(config.path.image + "title-background.png");
titleBg.filters = [filter];
titleText = PIXI.Sprite.fromImage(config.path.image + "title.png");
y$ = title;
y$.addChild(titleBg);
y$.addChild(titleText);
y$.x = (config.width - titleBg.width) / 2;
y$.y = 10;
gameStage.addChild(title);
renderer = PIXI.autoDetectRenderer($win.width(), $win.height());
renderer.view.className = 'rendererView';
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
  var x$;
  requestAnimationFrame(animate);
  renderer.render(stage);
  x$ = colorMatrix;
  x$[1] = 3 * Math.sin(colorCount);
  x$[2] = Math.cos(colorCount);
  x$[3] = 1.5 * Math.cos(colorCount);
  x$[4] = 2 * Math.cos(colorCount / 3);
  x$[5] = Math.cos(colorCount / 2);
  x$[6] = Math.cos(colorCount / 4);
  colorCount += config.color.step;
};
requestAnimationFrame(animate);