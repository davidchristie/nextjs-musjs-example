(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Mus=b()})(this,function(){"use strict";function a(){return void 0===this?void console.error("Have you initialized Mus with \"new\" statement? (i.e. var mus = new Mus())"):void(this.frames=[],this.timeouts=[],this.pos=0,this.currPos=0,this.startedAt=0,this.finishedAt=0,this.timePoint=!1,this.recording=!1,this.playing=!1,this.playbackSpeed=this.speed.NORMAL,this.window={width:window.outerWidth,height:window.outerHeight},this.onmousemove=window.onmousemove,this.onmousedown=window.onmousedown,this.onscroll=window.onscroll)}return a.prototype={moveListener:function(a){return function(b){a&&a(["m",b.clientX,b.clientY])}},clickListener:function(a){return function(b){a&&a(["c",b.clientX,b.clientY])}},scrollListener:function(a){return function(){a&&a(["s",document.scrollingElement.scrollLeft,document.scrollingElement.scrollTop])}},record:function(a){if(!this.recording){var b=this;0==b.startedAt&&(b.startedAt=new Date().getTime()/1e3),b.frames.push(["s",document.scrollingElement.scrollLeft,document.scrollingElement.scrollTop]),window.onmousemove=this.moveListener(function(c){b.frames.push(b.timePoint?c.concat(new Date().getTime()-1e3*b.startedAt):c),a instanceof Function&&a()}),window.onmousedown=this.clickListener(function(c){b.frames.push(b.timePoint?c.concat(new Date().getTime()-1e3*b.startedAt):c),a instanceof Function&&a()}),window.onscroll=this.scrollListener(function(c){b.frames.push(b.timePoint?c.concat(new Date().getTime()-1e3*b.startedAt):c),a instanceof Function&&a()}),b.recording=!0}},stop:function(){this.finishedAt=new Date().getTime()/1e3,window.onmousemove=this.onmousemove,window.onmousedown=this.onmousedown,window.onscroll=this.onscroll,this.timeouts=[],this.recording=!1,this.playing=!1,this.pos=0},pause:function(){this.playing&&(this.pos=this.currPos,this.playing=!1,this.clearTimeouts())},play:function(a){if(!this.playing){var b=this;b.createCursor();for(var c,d=document.getElementById("musCursor");b.pos<b.frames.length;b.pos++)c=3<b.frames[b.pos].length?b.frames[b.pos][3]:b.pos*b.playbackSpeed,b.timeouts.push(setTimeout(function(c){b.playFrame(b,b.frames[c],d),b.currPos=c,c==b.frames.length-1&&(d.style.backgroundColor="transparent",b.timeouts=[],b.playing=!1,b.pos=0,a&&a())},c,b.pos));this.playing=!0}},release:function(){this.frames=[],this.startedAt=0,this.finishedAt=0,this.stop(),this.destroyCursor(),this.destroyClickSnapshot()},playFrame:function(a,b,c){"m"==b[0]?(c.style.left=a.getXCoordinate(b[1])+"px",c.style.top=a.getYCoordinate(b[2])+"px"):"c"==b[0]?a.createClickSnapshot(b[2],b[1]):"s"==b[0]&&window.scrollTo(b[1],b[2])},clearTimeouts:function(){for(var a in this.timeouts)clearTimeout(this.timeouts[a]);this.timeouts=[]},timeElapsed:function(){return this.finishedAt-this.startedAt},createCursor:function(){if(!document.getElementById("musCursor")){var a=document.createElement("div");a.id="musCursor",a.style.position="fixed",a.style.width="32px",a.style.height="32px",a.style.top="-100%",a.style.left="-100%",a.style.borderRadius="32px",a.style.backgroundImage="url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCSB2aWV3Qm94PSIwIDAgMjggMjgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI4IDI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjguMiwyMC45IDguMiw0LjkgMTkuOCwxNi41IDEzLDE2LjUgMTIuNiwxNi42ICIvPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTcuMywyMS42IDEzLjcsMjMuMSA5LDEyIDEyLjcsMTAuNSAiLz48cmVjdCB4PSIxMi41IiB5PSIxMy42IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjkyMjEgLTAuMzg3MSAwLjM4NzEgMC45MjIxIC01Ljc2MDUgNi41OTA5KSIgd2lkdGg9IjIiIGhlaWdodD0iOCIvPjxwb2x5Z29uIHBvaW50cz0iOS4yLDcuMyA5LjIsMTguNSAxMi4yLDE1LjYgMTIuNiwxNS41IDE3LjQsMTUuNSAiLz48L3N2Zz4=)",document.body.appendChild(a)}},destroyCursor:function(){var a=document.getElementById("musCursor");a&&a.remove()},createClickSnapshot:function(a,b){var c=document.scrollingElement.scrollLeft,d=document.scrollingElement.scrollTop,e=document.createElement("div");e.className="musClickSnapshot",e.style.position="absolute",e.style.width="32px",e.style.height="32px",e.style.top=a+d+"px",e.style.left=b+c+"px",e.style.borderRadius="32px",e.style.backgroundColor="red",e.style.opacity=.2,document.body.appendChild(e)},destroyClickSnapshot:function(){for(var a=document.getElementsByClassName("musClickSnapshot");0<a.length;)a[0].remove()},getXCoordinate:function(a){return window.outerWidth>this.window.width?parseInt(this.window.width*a/window.outerWidth):parseInt(window.outerWidth*a/this.window.width)},getYCoordinate:function(a){return window.outerHeight>this.window.height?parseInt(this.window.height*a/window.outerHeight):parseInt(window.outerHeight*a/this.window.height)},getData:function(){return{frames:this.frames,timeElapsed:this.timeElapsed(),window:{width:window.outerWidth,height:window.outerHeight}}},isTimePoint:function(){return this.timePoint},setData:function(a){a.frames&&(this.frames=a.frames),a.window&&(this.window=a.window)},setFrames:function(a){this.frames=a},setWindowSize:function(a,b){this.window.width=a,this.window.height=b},setPlaybackSpeed:function(a){this.playbackSpeed=a},setTimePoint:function(a){this.timePoint=a},isRecording:function(){return this.recording},isPlaying:function(){return this.playing},speed:{SLOW:35,NORMAL:15,FAST:5}},a});
