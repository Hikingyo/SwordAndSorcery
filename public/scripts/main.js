"use strict";$(document).ready(function(){$.SAS()}),function(){var n=function(){},o=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],t=window.console=window.console||{};o.forEach(function(o){t[o]||(t[o]=n)})}(),function(n){n.SAS=function(o,t){var e={FADE_IN_DURATION:300},i=this,a=io();i.settings={};var r=(n(o),n(window)),c=n("#login_page"),s=n("#gameboard"),u=n("#game_book"),l=n("#controls"),f=n(".input_field"),d=n(".help"),g=n(".backpack"),m=s.find(".narration-title"),p=s.find(".narration"),v=g.find(".inventory__content__item-box"),h=[],_=!1;i.init=function(){console.log("Here we go !"),i.settings=n.extend({},e,t)},i.foo_public_method=function(){};var y=function(o){return n("<div/>").text(o).text()||!1},S=function(){_=!0,c.hide(),u.fadeIn(i.settings.FADE_IN_DURATION),c.off("click")},w=function(){u.hide(),c.fadeIn(i.settings.FADE_IN_DURATION)},k=function(){var n=y(f.val().trim());n&&a.emit("add user",n)},A=function(n,o){void 0==o&&(o={}),o.event=n,a.emit("action",o)},b=function(o){var t=JSON.parse(o);console.dir(t),m.text(t._title),p.html(t._narration),l.empty(),t._userActions.map(function(o){var t=n("<button/>").attr("name",o.title);t.css("background-image",'url("../img/'+o.image),t.on("click",function(){A(o.type,{target:o.target})}),t.appendTo(l)})},I=function(){_&&(d.hasClass("overlay")||n(".overlay").toggleClass("overlay"),d.toggleClass("overlay"))},N=function(){_&&(g.hasClass("overlay")||!function(){n(".overlay").toggleClass("overlay");var o=0,t=h.length;for(o;o<t;o++){n(v[o]).empty();var e=n("<img>").attr("src","img/"+h[o]._img);e.data.id=o,e.appendTo(v[o]),"weapon"!=h[o]._type&&e.on("click",function(){E(h[o])})}}(),g.toggleClass("overlay"))},x=function(){a.emit("godMode")},E=function(n){console.dir(n)},C=function(n){h=[];for(var o in n._backpack._content)h.push(o);h.push(n._weapon)};r.keydown(function(n){switch(console.log(n.which),n.which){case 13:_||k();break;case 72:I();break;case 73:N();break;case 71:x()}}),a.on("connect",function(){a.emit("userIncoming")}),a.on("alreadyLogged",function(n){S(),C(n.user)}),a.on("notLogged",function(){w()}),a.on("connected",function(n){S()}),a.on("SASerror",function(n){console.error(n)}),a.on("nextNode",function(n){b(n)}),a.on("updateHUD",function(n){console.dir(n)}),a.on("reward",function(n){console.dir(n),h.push(JSON.parse(n))}),i.init()},n.fn.SAS=function(o){return this.each(function(){if(void 0==n(this).data("SAS")){var t=new n.SAS(this,o);n(this).data("SAS",t)}})}}(jQuery);