/*! countdown - v1.3 - 2013-07-11 11:28:15 AM
* Copyright (c) 2013 jide; Licensed  */
KISSY.add("gallery/countdown/1.3/timer",function(a){function b(){for(;d.length;)d.shift()();var a=+new Date-b.nextTime,e=1+Math.floor(a/100);a=100-a%100,b.nextTime+=100*e;var f,g,h,i;for(h=0,i=c.length;i>h;h+=2)f=c[h+1],0===f?c[h](e):(f+=2*e-1,g=Math.floor(f/20),g>0&&c[h](g),c[h+1]=f%20+1);setTimeout(b,a)}var c=[],d=[];return b.nextTime=+new Date,b(),{add:function(a,b){d.push(function(){c.push(a),c.push(1e3===b?1:0)})},remove:function(b){d.push(function(){var d=a.indexOf(b,c);-1!==d&&c.splice(a.indexOf(b,c),2)})}}}),KISSY.add("gallery/countdown/1.3/countdown",function(a,b,c,d,e){function f(b){if(!(this instanceof f))return new f(b);if(b.el=a.one(b.el),b.el){var c=b.el.attr("data-config");c&&(c=d.parse(c.replace(/'/g,'"')),b=a.merge(c,b)),f.superclass.constructor.call(this,b),this._init()}}var g="afterPaint";return a.extend(f,c,{_init:function(){var b=this,c=b.get("el"),d=[];b.hands=d,b.frequency=1e3,b._notify=[];var f=c.html(),g=b.get("varRegular");g.lastIndex=0,c.html(f.replace(g,function(a,c){("u"===c||"s-ext"===c)&&(b.frequency=100);var e="";return"s-ext"===c?(d.push({type:"s"}),d.push({type:"u"}),e=b._html("","s","handlet")+b._html(".","","digital")+b._html("","u","handlet")):d.push({type:c}),b._html(e,c,"hand")}));var h=b.get("clock");a.each(d,function(a){var b,d=a.type,e=100;for(a.node=c.one(".hand-"+d),b=h.length-3;b>-1&&d!==h[b];b-=3)e*=h[b+1];a.base=e,a.radix=h[b+1],a.bits=h[b+2]}),b._getLeft(),b._reflow();var i=b._reflow;b._reflow=function(){return i.apply(b,arguments)},e.add(b._reflow,b.frequency),c.show()},_getLeft:function(){var b=1e3*this.get("leftTime"),c=1e3*this.get("stopPoint");!b&&c&&(b=c-a.now()),this.left=b-b%this.frequency},_reflow:function(b){b=b||0;var c=this;return c.left=c.left-c.frequency*b,a.each(c.hands,function(a){a.lastValue=a.value,a.value=Math.floor(c.left/a.base)%a.radix}),c._repaint(),c._notify[c.left]&&a.each(c._notify[c.left],function(a){a.call(c)}),c.left<1&&e.remove(c._reflow),c},_repaint:function(){f.Effect[this.get("effect")].paint.apply(this),this.fire(g)},_toDigitals:function(a,b){a=0>a?0:a;for(var c=[];b--;)c[b]=a%10,a=Math.floor(a/10);return c},_html:function(b,c,d){switch(a.isArray(b)&&(b=b.join("")),d){case"hand":c=d+" hand-"+c;break;case"handlet":c=d+" hand-"+c;break;case"digital":c="."===b?d+" "+d+"-point "+c:d+" "+d+"-"+b+" "+c}return'<s class="'+c+'">'+b+"</s>"},notify:function(a,b){a=1e3*a,a-=a%this.frequency;var c=this._notify[a]||[];return c.push(b),this._notify[a]=c,this}},{ATTRS:{el:{},stopPoint:{},leftTime:{value:0},template:{},varRegular:{value:/\$\{([\-\w]+)\}/g},clock:{value:["d",100,2,"h",24,2,"m",60,2,"s",60,2,"u",10,1]},effect:{value:"normal"}}}),f},{requires:["node","base","json","./timer"]}),KISSY.add("gallery/countdown/1.3/effect",function(a){var b={normal:{paint:function(){var b,c=this;a.each(c.hands,function(d){d.lastValue!==d.value&&(b="",a.each(c._toDigitals(d.value,d.bits),function(a){b+=c._html(a,"","digital")}),d.node.html(b))})}},slide:{paint:function(){var c,d,e,f,g=this;a.each(g.hands,function(a){if(a.lastValue!==a.value){for(c="",d=a.bits,e=g._toDigitals(a.value,d),f=void 0===a.lastValue?e:g._toDigitals(a.lastValue,d);d--;)c=f[d]!==e[d]?g._html([g._html(e[d],"","digital"),g._html(f[d],"","digital")],"slide-wrap")+c:g._html(e[d],"","digital")+c;a.node.html(c)}}),b.slide.afterPaint.apply(g)},afterPaint:function(){a.each(this.hands,function(a){if(a.lastValue!==a.value&&void 0!==a.lastValue){var b=a.node,c=b.one(".digital").height();b.css("height",c),b.all(".slide-wrap").css("top",-c).animate("top: 0",.5,"easeIn")}})}},flip:{paint:function(){var c,d,e,f=this;a.each(f.hands,function(b){b.lastValue!==b.value&&(c="",d="",e="",a.each(f._toDigitals(b.value,b.bits),function(a){d+=f._html(a,"","digital")}),void 0===b.lastValue?b.node.html(d):(d=f._html(d,"handlet"),a.each(f._toDigitals(b.lastValue,b.bits),function(a){e+=f._html(a,"","digital")}),c=f._html(e,"handlet mask"),e=f._html(e,"handlet"),b.node.html(d+e+c)))}),b.flip.afterPaint.apply(f)},afterPaint:function(){a.each(this.hands,function(a){if(a.lastValue!==a.value&&void 0!==a.lastValue){var b=a.node,c=b.all(".handlet"),d=c.item(0),e=c.item(1),f=c.item(2),g=b.width(),h=b.height(),i=Math.floor(h/2);e.css({clip:"rect("+i+"px, "+g+"px, "+h+"px, 0)"}),f.css({overflow:"hidden",height:i+"px"}),f.animate({top:i+"px",height:0},.15,"easeNone",function(){f.html(d.html()),f.css({top:0,height:i+"px",clip:"rect("+i+"px, "+g+"px, "+h+"px, 0)"}),f.animate("height: "+h+"px",.3,"bounceOut")})}})}}};return b},{requires:[]}),KISSY.add("gallery/countdown/1.3/index",function(a,b,c){return b.Effect=c,b},{requires:["./countdown","./effect","./index.css"]});