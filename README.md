# axease
Simple library for creating canvas parallax animations in Javascript.

Demo
------------

Demo is WIP. Much nicer version soon!
[Demo 1](http://studiouniver.se/github/axease/demo1.html)

Instructions
------------

The following are some basic instructions, which will most likely change as I improve things. Please refer to demo1.html for a full working example.

You need to include axease:

    <script type="text/javascript" src="js/axease.solo.0.2.js"></script>

You need to have a <canvas> element in the page. A number of my functions will refer to these as "screens".

    <canvas id="one"></canvas>

I'm not sure if this is essential, but I would fully recommend including this CSS. (This should cause most browsers to resize canvas elements the same was as image elements):

    canvas {
      width: 100%;
      height: auto;
    }

You should preload all your image assets. Assets get added to the _$.img object using the id supplied:

    // Preload our content
    _$.createImage([{
      id: "bg",
      url: "bokeh-bg.png"
    }, {
      id: "fg",
      url: "bokeh-fg.png"
    }], onload);

The magic should happen in your onload function. First select your screen (canvas). Then build up and push your screen animation object. A screen animation object consists of; the screen; the sprites (images) to draw; and the animation to apply.

For scroll animations each of your sprite objects should have a 'scroll' object. This has three attributes: "below", "center", "above". Below refers to the location sprites should be when the screen is below the center of the window (window.innerHeight / 2), and above defines the location of the sprites as the screen gets closer to the top of the window.

Sprite objects have an optional width & height properties. I think the defaults values are a good place to start though.

Instead of hard pixel values I use a (-1 -> 1) co-ordinate value. When adjusting the y values, -1 is the top of your screen and 1 is the bottom. I don't really have any plans to change this, I really like the simplicity!

    function onload() {


      // Push the screens (canvas) to Axease
      _$.ax.addElement({
        "screen": "#one", // Canvas selector
        "sprites": [{
          spriteId: "bg",
          scroll: {
            below: { y: 0.2 }, // 1 - bottom of canvas
            center: { y: 0 }, // 0 - middle of canvas
            above: { y: -0.2 } // -1 top of canvas
          }
        }, {
          spriteId: "fg",
          scroll: {
            below: { x: -0.8, y: 0.8 }, // 1 - right/bottom of canvas
            center: { x: -0.4, y: 0.4 }, // 0 - middle of canvas
            above: { x: 0, y: 0 } // -1 left/top of canvas
          }
        }]
      });

      ...

Axease also supports time based animations. Again, I think they are quite simple to setup because of the co-ordinate system. Instead of a .scroll attribute, use .time.

A time animation object has a duration (in seconds). This is how long it should take to transition between each frame, not how long to complete an animation cycle! Frames are an array of x,y values (using the -1,1 values). There is also a pingpong attribute; when true the animation will transition back to the first frame, rather than instantly snapping to it.

      _$.ax.addScreen({
        "screen": "#four",
        "sprites": [{
          spriteId: "bg",
          time: {
            pingpong: true,
            duration: 10, //s
            frames: [[2.0, 0], [-2.0, 0]]
          }
        }]
      });

Finally, make sure you start the logic tick by running _$.start(). Ideally, do this when you are happy all your screen animation objects have been pushed, and your assets have loaded.

    function onload() {
      // Your animations here
      ...

      // Start the tick!
      _$.start();
    }

Code/Performance
-----------

* I do not use any onScroll events.

* The global scope should only be getting polluted by _$.

* Screens are only updated when they need to be.

* I am polyfilling requestAnimationFrame

* You can change target fps by modifying _$.fps (default is 24 right now)

* There's always more optimisations to make...

Future
------

* The library will also support mouse animations (when mouse is over canvas at x,y sprites should be at x,y). No real work has been done here yet.
