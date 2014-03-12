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
(function(){
  var script, scriptParser, current, i, branch, talk, x$, y$, ref$, $win, config, dimension, computePosScale, loader;
  script = {
    caasi: [
      {
        dialog: 'Hello.',
        response: function(){
          var this$ = this;
          console.log('Hi, I am...');
          return setTimeout(function(){
            console.log('caasi.');
            return this$.done();
          }, 2000);
        },
        children: [{
          dialog: 'Bye.',
          response: function(done){
            console.log('Bye!');
            return done();
          }
        }]
      }, {
        dialog: 'Bye.'
      }
    ]
  };
  scriptParser = function(script){
    var i$, len$, results$ = [];
    script == null && (script = []);
    for (i$ = 0, len$ = script.length; i$ < len$; ++i$) {
      results$.push((fn$.call(this, script[i$])));
    }
    return results$;
    function fn$(branch){
      return {
        dialog: branch.dialog,
        execute: function(){
          var dialogs;
          dialogs = scriptParser(branch.children);
          return new Promise(function(resolve, reject){
            var context;
            if (branch.response) {
              context = {
                done: function(){
                  resolve(dialogs);
                }
              };
              return branch.response.call(context, context.done);
            } else {
              return resolve(dialogs);
            }
          });
        }
      };
    }
  };
  script.caasi = scriptParser(script.caasi);
  current = script.caasi;
  for (i in current) {
    branch = current[i];
    console.log(i + ". " + branch.dialog);
  }
  talk = function(index){
    if (index < 0 || current.length <= index) {
      return;
    }
    console.log("> " + current[index].dialog);
    current[index].execute().then(function(it){
      var i, branch, results$ = [];
      current = it;
      for (i in it) {
        branch = it[i];
        results$.push(console.log(i + ". " + branch.dialog));
      }
      return results$;
    });
  };
  x$ = window;
  y$ = (ref$ = x$.P) != null
    ? ref$
    : x$.P = {};
  y$.ActorManager == null && (y$.ActorManager = {
    get: function(){
      return console.log('foo');
    },
    talk: talk
  });
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
  loader = new PIXI.AssetLoader([config.path.image + "title-background.png", config.path.image + "title.png"]);
  loader.addEventListener('onComplete', function(){
    var stage, dim, setting, x$, gameStage, colorCount, colorMatrix, filter, title, titleBg, titleText, y$, base, boss, z$, renderer, animate;
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
    base = PIXI.BaseTexture.fromImage(config.path.image + "boss.png");
    boss = new PIXI.MovieClip([
      new PIXI.Texture(base, {
        x: 0,
        y: 0,
        width: 39,
        height: 51
      }), new PIXI.Texture(base, {
        x: 0,
        y: 0,
        width: 39,
        height: 51
      }), new PIXI.Texture(base, {
        x: 39,
        y: 0,
        width: 39,
        height: 51
      }), new PIXI.Texture(base, {
        x: 78,
        y: 0,
        width: 39,
        height: 51
      }), new PIXI.Texture(base, {
        x: 78,
        y: 0,
        width: 39,
        height: 51
      }), new PIXI.Texture(base, {
        x: 117,
        y: 0,
        width: 39,
        height: 51
      })
    ]);
    console.log(boss);
    z$ = boss;
    z$.x = 10;
    z$.y = 60;
    z$.animationSpeed = 0.5;
    z$.play();
    gameStage.addChild(boss);
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
    return requestAnimationFrame(animate);
  });
  loader.load();
}).call(this);
