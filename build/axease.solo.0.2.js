window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)}}()),function(e){if(!e._$){e._$={};var t=e._$;t.f=function(e){return document.querySelectorAll(e)},t.on=function(e,t,n){for(var r=0;r<t.length;r++)e.addEventListener(t[r],n)},t.log=function(e,t){this.lastLog!=e&&(console.log(e,t),this.lastLog=e)},t.getScreen=function(e){var n=t.f(e)[0],r=n.getContext("2d");return{canvas:n,context:r}},t.img={},t.createImage=function(e,n){function r(){a--,0==a&&n&&n()}if("object"==typeof e){var a=e.length;return void e.forEach(function(e){t.img[e.id]=t.createImage(e.url,r)})}var i=document.createElement("img");return i.onload=function(){n&&n(i)},i.src=e,i},t.getElTop=function(e){return e.getBoundingClientRect().top+t.scrollY},t.isElVisible=function(e){var n=t.getElTop(e),r=e.offsetHeight,a=n+r;return t.scrollY+t.screenHeight>=n&&t.scrollY<a},t.prevTime=Date.now(),t.fps=24,t.dt=1e3/t.fps,t.updates=[],t.draws=[],t.accumulator=0,t.scrollY=0,t.niceY=0,t.scrolled=!1,t.resize=!1,t.screenWidth=0,t.screenHeight=0,t.midpoint=Math.round(window.innerHeight/2),t.start=function(){t._started||(t._started=!0,t.update())},t.addUpdate=function(e,n){e&&t.updates.push(e),n&&t.draws.push(n),t.update(!0)},t._runUpdates=function(){t.updates.forEach(function(e,n){e(t.dt)})},t._runDraw=function(){t.draws.forEach(function(e,n){e(t.dt)})},t.update=function(e){requestAnimationFrame(function(){if(!t.updating){var n=Date.now();t.time=n,t.passed=n-t.prevTime,t.resize=window.innerHeight!==t.screenHeight||window.innerWidth!==t.screenWidth,t.screenWidth=window.innerWidth,t.screenHeight=window.innerHeight;var r=window.scrollY||window.pageYOffset||document.documentElement.scrollTop;if(t.scrolled=r!==t.scrollY,t.scrollY=r,t.niceY=t.scrollY/(document.body.offsetHeight-t.screenHeight),e)t.scrolled=!0,t._runUpdates();else for(t.accumulator+=t.passed;t.accumulator>=t.dt;)t._runUpdates(),t.accumulator-=t.dt;t._runDraw(),t.prevTime=n,t.update()}})}}}(window),_$.ax=function(){var e=this;return e.elements=[],e.addScreen=function(t){"string"==typeof t.screen&&(t.screen=_$.getScreen(t.screen)),t.sprites&&t.sprites.forEach(function(e){"string"==typeof e.spriteId&&(e.img=_$.img[e.spriteId]),e.width||(e.width=t.screen.canvas.width),e.height||(e.height=t.screen.canvas.width/e.img.naturalWidth*e.img.naturalHeight),e.dy||(e.dy=100/_$.fps)}),e.elements.push(t),_$.update(!0)},e.draw=function(){e.elements.forEach(function(e){e.draw&&(e.screen.context.clearRect(0,0,e.screen.canvas.width,e.screen.canvas.height),e.draw.forEach(function(e){e()}))})},e.update=function(){e.elements.forEach(function(t){if(t.draw=!1,_$.isElVisible(t.screen.canvas)){var n={canvas:t.screen.canvas,context:t.screen.context,top:_$.getElTop(t.screen.canvas),halfWidth:.5*t.screen.canvas.width,halfHeight:.5*t.screen.canvas.height};t.sprites.forEach(function(r){var a;if(r.scroll?(a=e.scrollAnimation(r,n),r.dither&&(r.targetY=a.y)):r.mouse?a=e.mouseAnimation(r,n):r.time&&(a=e.timeAnimation(r,n)),a&&r.hasOwnProperty("targetY"))if(r.hasOwnProperty("y")){var i=r.dy;r.targetY>r.y?r.y+i>r.targetY?r.y=r.targetY:r.y+=i:r.targetY<r.y&&(r.y-i<r.targetY?r.y=r.targetY:r.y-=i),r.targetY==r.y&&delete r.targetY,a.y=r.y}else r.y=a.y;a&&(t.draw||(t.draw=[]),t.draw.push(function(){t.screen.context.drawImage(e.currentFrame(r),a.x+n.halfWidth-r.width/2,a.y+n.halfHeight-r.height/2,r.width||r.img.naturalWidth,r.height||r.img.naturalHeight)}))})}})},e.currentFrame=function(e){if(!e.animation)return e.img;if(!e.animation.canvas){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");e.animation.canvas=t,e.animation.context=n,e.animation.hasOwnProperty("animationIndex")||(e.animation.animationIndex=0)}var r=e.animation;return r.length&&(r=e.animation[r.animationIndex]),r.hasOwnProperty("frame")||(r.frame=0,r.lastDraw=Date.now()),_$.time>r.lastDraw+r.duration&&(r.frame++,r.frame>=r.frames.length&&(r.frame=0),r.lastDraw=_$.time),e.animation.context.clearRect(0,0,e.width,e.height),e.animation.context.drawImage(e.img,r.frames[r.frame][0]*e.width,r.frames[r.frame][1]*e.height,e.width,e.height,0,0,e.width,e.height),e.animation.canvas},e.timeAnimation=function(e,t){var n=(t.canvas,t.context,t.halfWidth),r=t.halfHeight,a=e.time;if(x=0,a.hasOwnProperty("frame")||(a.frame=0,a.currentX=a.frames[a.frame][0]*n,a.currentY=a.frames[a.frame][1]*r,a.targetX=a.currentX,a.targetY=a.currentY),a.travelledX>=a.distanceX&&a.travelledY>=a.distanceY||a.currentX==a.targetX&&e.time.currentY>=a.targetY){a.frame++,a.travelledX=0,a.travelledY=0,a.frame>=a.frames.length&&(a.frame=0,a.pingpong||(a.currentX=a.frames[a.frame][0]*n,a.currentY=e.time.frames[a.frame][1]*r)),void 0!==a.frames[a.frame][2]&&e.animation&&(e.animation.animationIndex=a.frames[a.frame][2]);var i=a.frames[a.frame][0]*n,o=a.frames[a.frame][1]*r,c=i-a.currentX,s=o-a.currentY;a.distanceX=Math.abs(c),a.distanceY=Math.abs(s),a.dx=c/a.duration*.001,a.dy=s/a.duration*.001}var d=_$.dt*a.dx,m=_$.dt*a.dy;return a.currentX+=d,a.currentY+=m,a.travelledX+=Math.abs(d),a.travelledY+=Math.abs(m),{x:a.currentX,y:a.currentY}},e.mouseAnimation=function(e,t){},e.scrollAnimation=function(e,t){var n,r,a,i=t.canvas,o=(t.context,t.halfWidth),c=t.halfHeight,s=_$.scrollY+.5*_$.screenHeight-(t.top+.5*i.offsetHeight),d=0>s?"below":s>0?"above":"center";switch(d){case"below":n=e.scroll.center,r=e.scroll.below,a=-1;break;case"center":n=e.scroll.center,r=e.scroll.center,a=0;break;case"above":n=e.scroll.center,r=e.scroll.above,a=1}var m=_$.screenHeight/2,u=0;if(x=0,r.hasOwnProperty("y")){var l=(r.y-n.y)*c,f=a*(l/m);u=f*s+e.scroll.center.y*c}if(r.hasOwnProperty("x")){var l=(r.x-n.x)*o,f=a*l/m;x=f*s+e.scroll.center.x*o}return{x:x,y:u}},_$.addUpdate(e.update,e.draw),e}();