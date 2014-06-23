/*! Socket.IO.min.js build:0.9.16, production. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
var io="undefined"==typeof module?{}:module.exports;(function(){(function(a,b){var c=a;c.version="0.9.16",c.protocol=1,c.transports=[],c.j=[],c.sockets={},c.connect=function(a,d){var e=c.util.parseUri(a),f,g;b&&b.location&&(e.protocol=e.protocol||b.location.protocol.slice(0,-1),e.host=e.host||(b.document?b.document.domain:b.location.hostname),e.port=e.port||b.location.port),f=c.util.uniqueUri(e);var h={host:e.host,secure:"https"==e.protocol,port:e.port||("https"==e.protocol?443:80),query:e.query||""};c.util.merge(h,d);if(h["force new connection"]||!c.sockets[f])g=new c.Socket(h);return!h["force new connection"]&&g&&(c.sockets[f]=g),g=g||c.sockets[f],g.of(e.path.length>1?e.path:"")}})("object"==typeof module?module.exports:this.io={},this),function(a,b){var c=a.util={},d=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];c.parseUri=function(a){var b=d.exec(a||""),c={},f=14;while(f--)c[e[f]]=b[f]||"";return c},c.uniqueUri=function(a){var c=a.protocol,d=a.host,e=a.port;return"document"in b?(d=d||document.domain,e=e||(c=="https"&&document.location.protocol!=="https:"?443:document.location.port)):(d=d||"localhost",!e&&c=="https"&&(e=443)),(c||"http")+"://"+d+":"+(e||80)},c.query=function(a,b){var d=c.chunkQuery(a||""),e=[];c.merge(d,c.chunkQuery(b||""));for(var f in d)d.hasOwnProperty(f)&&e.push(f+"="+d[f]);return e.length?"?"+e.join("&"):""},c.chunkQuery=function(a){var b={},c=a.split("&"),d=0,e=c.length,f;for(;d<e;++d)f=c[d].split("="),f[0]&&(b[f[0]]=f[1]);return b};var f=!1;c.load=function(a){if("document"in b&&document.readyState==="complete"||f)return a();c.on(b,"load",a,!1)},c.on=function(a,b,c,d){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,d)},c.request=function(a){if(a&&"undefined"!=typeof XDomainRequest&&!c.ua.hasCORS)return new XDomainRequest;if("undefined"!=typeof XMLHttpRequest&&(!a||c.ua.hasCORS))return new XMLHttpRequest;if(!a)try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(b){}return null},"undefined"!=typeof window&&c.load(function(){f=!0}),c.defer=function(a){if(!c.ua.webkit||"undefined"!=typeof importScripts)return a();c.load(function(){setTimeout(a,100)})},c.merge=function(b,d,e,f){var g=f||[],h=typeof e=="undefined"?2:e,i;for(i in d)d.hasOwnProperty(i)&&c.indexOf(g,i)<0&&(typeof b[i]!="object"||!h?(b[i]=d[i],g.push(d[i])):c.merge(b[i],d[i],h-1,g));return b},c.mixin=function(a,b){c.merge(a.prototype,b.prototype)},c.inherit=function(a,b){function c(){}c.prototype=b.prototype,a.prototype=new c},c.isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"},c.intersect=function(a,b){var d=[],e=a.length>b.length?a:b,f=a.length>b.length?b:a;for(var g=0,h=f.length;g<h;g++)~c.indexOf(e,f[g])&&d.push(f[g]);return d},c.indexOf=function(a,b,c){for(var d=a.length,c=c<0?c+d<0?0:c+d:c||0;c<d&&a[c]!==b;c++);return d<=c?-1:c},c.toArray=function(a){var b=[];for(var c=0,d=a.length;c<d;c++)b.push(a[c]);return b},c.ua={},c.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var a=new XMLHttpRequest}catch(b){return!1}return a.withCredentials!=undefined}(),c.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),c.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)}("undefined"!=typeof io?io:module.exports,this),function(a,b){function c(){}a.EventEmitter=c,c.prototype.on=function(a,c){return this.$events||(this.$events={}),this.$events[a]?b.util.isArray(this.$events[a])?this.$events[a].push(c):this.$events[a]=[this.$events[a],c]:this.$events[a]=c,this},c.prototype.addListener=c.prototype.on,c.prototype.once=function(a,b){function d(){c.removeListener(a,d),b.apply(this,arguments)}var c=this;return d.listener=b,this.on(a,d),this},c.prototype.removeListener=function(a,c){if(this.$events&&this.$events[a]){var d=this.$events[a];if(b.util.isArray(d)){var e=-1;for(var f=0,g=d.length;f<g;f++)if(d[f]===c||d[f].listener&&d[f].listener===c){e=f;break}if(e<0)return this;d.splice(e,1),d.length||delete this.$events[a]}else(d===c||d.listener&&d.listener===c)&&delete this.$events[a]}return this},c.prototype.removeAllListeners=function(a){return a===undefined?(this.$events={},this):(this.$events&&this.$events[a]&&(this.$events[a]=null),this)},c.prototype.listeners=function(a){return this.$events||(this.$events={}),this.$events[a]||(this.$events[a]=[]),b.util.isArray(this.$events[a])||(this.$events[a]=[this.$events[a]]),this.$events[a]},c.prototype.emit=function(a){if(!this.$events)return!1;var c=this.$events[a];if(!c)return!1;var d=Array.prototype.slice.call(arguments,1);if("function"==typeof c)c.apply(this,d);else{if(!b.util.isArray(c))return!1;var e=c.slice();for(var f=0,g=e.length;f<g;f++)e[f].apply(this,d)}return!0}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(exports,nativeJSON){function f(a){return a<10?"0"+a:a}function date(a,b){return isFinite(a.valueOf())?a.getUTCFullYear()+"-"+f(a.getUTCMonth()+1)+"-"+f(a.getUTCDate())+"T"+f(a.getUTCHours())+":"+f(a.getUTCMinutes())+":"+f(a.getUTCSeconds())+"Z":null}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i instanceof Date&&(i=date(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict";if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")},JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}("undefined"!=typeof io?io:module.exports,typeof JSON!="undefined"?JSON:undefined),function(a,b){var c=a.parser={},d=c.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],e=c.reasons=["transport not supported","client not handshaken","unauthorized"],f=c.advice=["reconnect"],g=b.JSON,h=b.util.indexOf;c.encodePacket=function(a){var b=h(d,a.type),c=a.id||"",i=a.endpoint||"",j=a.ack,k=null;switch(a.type){case"error":var l=a.reason?h(e,a.reason):"",m=a.advice?h(f,a.advice):"";if(l!==""||m!=="")k=l+(m!==""?"+"+m:"");break;case"message":a.data!==""&&(k=a.data);break;case"event":var n={name:a.name};a.args&&a.args.length&&(n.args=a.args),k=g.stringify(n);break;case"json":k=g.stringify(a.data);break;case"connect":a.qs&&(k=a.qs);break;case"ack":k=a.ackId+(a.args&&a.args.length?"+"+g.stringify(a.args):"")}var o=[b,c+(j=="data"?"+":""),i];return k!==null&&k!==undefined&&o.push(k),o.join(":")},c.encodePayload=function(a){var b="";if(a.length==1)return a[0];for(var c=0,d=a.length;c<d;c++){var e=a[c];b+="\ufffd"+e.length+"\ufffd"+a[c]}return b};var i=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;c.decodePacket=function(a){var b=a.match(i);if(!b)return{};var c=b[2]||"",a=b[5]||"",h={type:d[b[1]],endpoint:b[4]||""};c&&(h.id=c,b[3]?h.ack="data":h.ack=!0);switch(h.type){case"error":var b=a.split("+");h.reason=e[b[0]]||"",h.advice=f[b[1]]||"";break;case"message":h.data=a||"";break;case"event":try{var j=g.parse(a);h.name=j.name,h.args=j.args}catch(k){}h.args=h.args||[];break;case"json":try{h.data=g.parse(a)}catch(k){}break;case"connect":h.qs=a||"";break;case"ack":var b=a.match(/^([0-9]+)(\+)?(.*)/);if(b){h.ackId=b[1],h.args=[];if(b[3])try{h.args=b[3]?g.parse(b[3]):[]}catch(k){}}break;case"disconnect":case"heartbeat":}return h},c.decodePayload=function(a){if(a.charAt(0)=="\ufffd"){var b=[];for(var d=1,e="";d<a.length;d++)a.charAt(d)=="\ufffd"?(b.push(c.decodePacket(a.substr(d+1).substr(0,e))),d+=Number(e)+1,e=""):e+=a.charAt(d);return b}return[c.decodePacket(a)]}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b){function c(a,b){this.socket=a,this.sessid=b}a.Transport=c,b.util.mixin(c,b.EventEmitter),c.prototype.heartbeats=function(){return!0},c.prototype.onData=function(a){this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout();if(a!==""){var c=b.parser.decodePayload(a);if(c&&c.length)for(var d=0,e=c.length;d<e;d++)this.onPacket(c[d])}return this},c.prototype.onPacket=function(a){return this.socket.setHeartbeatTimeout(),a.type=="heartbeat"?this.onHeartbeat():(a.type=="connect"&&a.endpoint==""&&this.onConnect(),a.type=="error"&&a.advice=="reconnect"&&(this.isOpen=!1),this.socket.onPacket(a),this)},c.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var a=this;this.closeTimeout=setTimeout(function(){a.onDisconnect()},this.socket.closeTimeout)}},c.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket.onDisconnect(),this},c.prototype.onConnect=function(){return this.socket.onConnect(),this},c.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)},c.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout)},c.prototype.packet=function(a){this.send(b.parser.encodePacket(a))},c.prototype.onHeartbeat=function(a){this.packet({type:"heartbeat"})},c.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen()},c.prototype.onClose=function(){var a=this;this.isOpen=!1,this.socket.onClose(),this.onDisconnect()},c.prototype.prepareUrl=function(){var a=this.socket.options;return this.scheme()+"://"+a.host+":"+a.port+"/"+a.resource+"/"+b.protocol+"/"+this.name+"/"+this.sessid},c.prototype.ready=function(a,b){b.call(this)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){this.options={port:80,secure:!1,document:"document"in c?document:!1,resource:"socket.io",transports:b.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":Infinity,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},b.util.merge(this.options,a),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1;if(this.options["sync disconnect on unload"]&&(!this.isXDomain()||b.util.ua.hasCORS)){var d=this;b.util.on(c,"beforeunload",function(){d.disconnectSync()},!1)}this.options["auto connect"]&&this.connect()}function e(){}a.Socket=d,b.util.mixin(d,b.EventEmitter),d.prototype.of=function(a){return this.namespaces[a]||(this.namespaces[a]=new b.SocketNamespace(this,a),a!==""&&this.namespaces[a].packet({type:"connect"})),this.namespaces[a]},d.prototype.publish=function(){this.emit.apply(this,arguments);var a;for(var b in this.namespaces)this.namespaces.hasOwnProperty(b)&&(a=this.of(b),a.$emit.apply(a,arguments))},d.prototype.handshake=function(a){function f(b){b instanceof Error?(c.connecting=!1,c.onError(b.message)):a.apply(null,b.split(":"))}var c=this,d=this.options,g=["http"+(d.secure?"s":"")+":/",d.host+":"+d.port,d.resource,b.protocol,b.util.query(this.options.query,"t="+ +(new Date))].join("/");if(this.isXDomain()&&!b.util.ua.hasCORS){var h=document.getElementsByTagName("script")[0],i=document.createElement("script");i.src=g+"&jsonp="+b.j.length,h.parentNode.insertBefore(i,h),b.j.push(function(a){f(a),i.parentNode.removeChild(i)})}else{var j=b.util.request();j.open("GET",g,!0),this.isXDomain()&&(j.withCredentials=!0),j.onreadystatechange=function(){j.readyState==4&&(j.onreadystatechange=e,j.status==200?f(j.responseText):j.status==403?c.onError(j.responseText):(c.connecting=!1,!c.reconnecting&&c.onError(j.responseText)))},j.send(null)}},d.prototype.getTransport=function(a){var c=a||this.transports,d;for(var e=0,f;f=c[e];e++)if(b.Transport[f]&&b.Transport[f].check(this)&&(!this.isXDomain()||b.Transport[f].xdomainCheck(this)))return new b.Transport[f](this,this.sessionid);return null},d.prototype.connect=function(a){if(this.connecting)return this;var c=this;return c.connecting=!0,this.handshake(function(d,e,f,g){function h(a){c.transport&&c.transport.clearTimeouts(),c.transport=c.getTransport(a);if(!c.transport)return c.publish("connect_failed");c.transport.ready(c,function(){c.connecting=!0,c.publish("connecting",c.transport.name),c.transport.open(),c.options["connect timeout"]&&(c.connectTimeoutTimer=setTimeout(function(){if(!c.connected){c.connecting=!1;if(c.options["try multiple transports"]){var a=c.transports;while(a.length>0&&a.splice(0,1)[0]!=c.transport.name);a.length?h(a):c.publish("connect_failed")}}},c.options["connect timeout"]))})}c.sessionid=d,c.closeTimeout=f*1e3,c.heartbeatTimeout=e*1e3,c.transports||(c.transports=c.origTransports=g?b.util.intersect(g.split(","),c.options.transports):c.options.transports),c.setHeartbeatTimeout(),h(c.transports),c.once("connect",function(){clearTimeout(c.connectTimeoutTimer),a&&typeof a=="function"&&a()})}),this},d.prototype.setHeartbeatTimeout=function(){clearTimeout(this.heartbeatTimeoutTimer);if(this.transport&&!this.transport.heartbeats())return;var a=this;this.heartbeatTimeoutTimer=setTimeout(function(){a.transport.onClose()},this.heartbeatTimeout)},d.prototype.packet=function(a){return this.connected&&!this.doBuffer?this.transport.packet(a):this.buffer.push(a),this},d.prototype.setBuffer=function(a){this.doBuffer=a,!a&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer())},d.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[]},d.prototype.disconnect=function(){if(this.connected||this.connecting)this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted");return this},d.prototype.disconnectSync=function(){var a=b.util.request(),c=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,b.protocol,"",this.sessionid].join("/")+"/?disconnect=1";a.open("GET",c,!1),a.send(null),this.onDisconnect("booted")},d.prototype.isXDomain=function(){var a=c.location.port||("https:"==c.location.protocol?443:80);return this.options.host!==c.location.hostname||this.options.port!=a},d.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"))},d.prototype.onOpen=function(){this.open=!0},d.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer)},d.prototype.onPacket=function(a){this.of(a.endpoint).onPacket(a)},d.prototype.onError=function(a){a&&a.advice&&a.advice==="reconnect"&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",a&&a.reason?a.reason:a)},d.prototype.onDisconnect=function(a){var b=this.connected,c=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1;if(b||c)this.transport.close(),this.transport.clearTimeouts(),b&&(this.publish("disconnect",a),"booted"!=a&&this.options.reconnect&&!this.reconnecting&&this.reconnect())},d.prototype.reconnect=function(){function e(){if(a.connected){for(var b in a.namespaces)a.namespaces.hasOwnProperty(b)&&""!==b&&a.namespaces[b].packet({type:"connect"});a.publish("reconnect",a.transport.name,a.reconnectionAttempts)}clearTimeout(a.reconnectionTimer),a.removeListener("connect_failed",f),a.removeListener("connect",f),a.reconnecting=!1,delete a.reconnectionAttempts,delete a.reconnectionDelay,delete a.reconnectionTimer,delete a.redoTransports,a.options["try multiple transports"]=c}function f(){if(!a.reconnecting)return;if(a.connected)return e();if(a.connecting&&a.reconnecting)return a.reconnectionTimer=setTimeout(f,1e3);a.reconnectionAttempts++>=b?a.redoTransports?(a.publish("reconnect_failed"),e()):(a.on("connect_failed",f),a.options["try multiple transports"]=!0,a.transports=a.origTransports,a.transport=a.getTransport(),a.redoTransports=!0,a.connect()):(a.reconnectionDelay<d&&(a.reconnectionDelay*=2),a.connect(),a.publish("reconnecting",a.reconnectionDelay,a.reconnectionAttempts),a.reconnectionTimer=setTimeout(f,a.reconnectionDelay))}this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var a=this,b=this.options["max reconnection attempts"],c=this.options["try multiple transports"],d=this.options["reconnection limit"];this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(f,this.reconnectionDelay),this.on("connect",f)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a,b){this.socket=a,this.name=b||"",this.flags={},this.json=new d(this,"json"),this.ackPackets=0,this.acks={}}function d(a,b){this.namespace=a,this.name=b}a.SocketNamespace=c,b.util.mixin(c,b.EventEmitter),c.prototype.$emit=b.EventEmitter.prototype.emit,c.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)},c.prototype.packet=function(a){return a.endpoint=this.name,this.socket.packet(a),this.flags={},this},c.prototype.send=function(a,b){var c={type:this.flags.json?"json":"message",data:a};return"function"==typeof b&&(c.id=++this.ackPackets,c.ack=!0,this.acks[c.id]=b),this.packet(c)},c.prototype.emit=function(a){var b=Array.prototype.slice.call(arguments,1),c=b[b.length-1],d={type:"event",name:a};return"function"==typeof c&&(d.id=++this.ackPackets,d.ack="data",this.acks[d.id]=c,b=b.slice(0,b.length-1)),d.args=b,this.packet(d)},c.prototype.disconnect=function(){return this.name===""?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this},c.prototype.onPacket=function(a){function d(){c.packet({type:"ack",args:b.util.toArray(arguments),ackId:a.id})}var c=this;switch(a.type){case"connect":this.$emit("connect");break;case"disconnect":this.name===""?this.socket.onDisconnect(a.reason||"booted"):this.$emit("disconnect",a.reason);break;case"message":case"json":var e=["message",a.data];a.ack=="data"?e.push(d):a.ack&&this.packet({type:"ack",ackId:a.id}),this.$emit.apply(this,e);break;case"event":var e=[a.name].concat(a.args);a.ack=="data"&&e.push(d),this.$emit.apply(this,e);break;case"ack":this.acks[a.ackId]&&(this.acks[a.ackId].apply(this,a.args),delete this.acks[a.ackId]);break;case"error":a.advice?this.socket.onError(a):a.reason=="unauthorized"?this.$emit("connect_failed",a.reason):this.$emit("error",a.reason)}},d.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments)},d.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){b.Transport.apply(this,arguments)}a.websocket=d,b.util.inherit(d,b.Transport),d.prototype.name="websocket",d.prototype.open=function(){var a=b.util.query(this.socket.options.query),d=this,e;return e||(e=c.MozWebSocket||c.WebSocket),this.websocket=new e(this.prepareUrl()+a),this.websocket.onopen=function(){d.onOpen(),d.socket.setBuffer(!1)},this.websocket.onmessage=function(a){d.onData(a.data)},this.websocket.onclose=function(){d.onClose(),d.socket.setBuffer(!0)},this.websocket.onerror=function(a){d.onError(a)},this},b.util.ua.iDevice?d.prototype.send=function(a){var b=this;return setTimeout(function(){b.websocket.send(a)},0),this}:d.prototype.send=function(a){return this.websocket.send(a),this},d.prototype.payload=function(a){for(var b=0,c=a.length;b<c;b++)this.packet(a[b]);return this},d.prototype.close=function(){return this.websocket.close(),this},d.prototype.onError=function(a){this.socket.onError(a)},d.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"},d.check=function(){return"WebSocket"in c&&!("__addTask"in WebSocket)||"MozWebSocket"in c},d.xdomainCheck=function(){return!0},b.transports.push("websocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function d(a){if(!a)return;b.Transport.apply(this,arguments),this.sendBuffer=[]}function e(){}a.XHR=d,b.util.inherit(d,b.Transport),d.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this},d.prototype.payload=function(a){var c=[];for(var d=0,e=a.length;d<e;d++)c.push(b.parser.encodePacket(a[d]));this.send(b.parser.encodePayload(c))},d.prototype.send=function(a){return this.post(a),this},d.prototype.post=function(a){function d(){this.readyState==4&&(this.onreadystatechange=e,b.posting=!1,this.status==200?b.socket.setBuffer(!1):b.onClose())}function f(){this.onload=e,b.socket.setBuffer(!1)}var b=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),c.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=f:this.sendXHR.onreadystatechange=d,this.sendXHR.send(a)},d.prototype.close=function(){return this.onClose(),this},d.prototype.request=function(a){var c=b.util.request(this.socket.isXDomain()),d=b.util.query(this.socket.options.query,"t="+ +(new Date));c.open(a||"GET",this.prepareUrl()+d,!0);if(a=="POST")try{c.setRequestHeader?c.setRequestHeader("Content-type","text/plain;charset=UTF-8"):c.contentType="text/plain"}catch(e){}return c},d.prototype.scheme=function(){return this.socket.options.secure?"https":"http"},d.check=function(a,d){try{var e=b.util.request(d),f=c.XDomainRequest&&e instanceof XDomainRequest,g=a&&a.options&&a.options.secure?"https:":"http:",h=c.location&&g!=c.location.protocol;if(e&&(!f||!h))return!0}catch(i){}return!1},d.xdomainCheck=function(a){return d.check(a,!0)}}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function d(){b.Transport.XHR.apply(this,arguments)}function e(){}a["xhr-polling"]=d,b.util.inherit(d,b.Transport.XHR),b.util.merge(d,b.Transport.XHR),d.prototype.name="xhr-polling",d.prototype.heartbeats=function(){return!1},d.prototype.open=function(){var a=this;return b.Transport.XHR.prototype.open.call(a),!1},d.prototype.get=function(){function b(){this.readyState==4&&(this.onreadystatechange=e,this.status==200?(a.onData(this.responseText),a.get()):a.onClose())}function d(){this.onload=e,this.onerror=e,a.retryCounter=1,a.onData(this.responseText),a.get()}function f(){a.retryCounter++,!a.retryCounter||a.retryCounter>3?a.onClose():a.get()}if(!this.isOpen)return;var a=this;this.xhr=this.request(),c.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=d,this.xhr.onerror=f):this.xhr.onreadystatechange=b,this.xhr.send(null)},d.prototype.onClose=function(){b.Transport.XHR.prototype.onClose.call(this);if(this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=e;try{this.xhr.abort()}catch(a){}this.xhr=null}},d.prototype.ready=function(a,c){var d=this;b.util.defer(function(){c.call(d)})},b.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function e(a){b.Transport["xhr-polling"].apply(this,arguments),this.index=b.j.length;var c=this;b.j.push(function(a){c._(a)})}var d=c.document&&"MozAppearance"in c.document.documentElement.style;a["jsonp-polling"]=e,b.util.inherit(e,b.Transport["xhr-polling"]),e.prototype.name="jsonp-polling",e.prototype.post=function(a){function i(){j(),c.socket.setBuffer(!1)}function j(){c.iframe&&c.form.removeChild(c.iframe);try{h=document.createElement('<iframe name="'+c.iframeId+'">')}catch(a){h=document.createElement("iframe"),h.name=c.iframeId}h.id=c.iframeId,c.form.appendChild(h),c.iframe=h}var c=this,d=b.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);if(!this.form){var e=document.createElement("form"),f=document.createElement("textarea"),g=this.iframeId="socketio_iframe_"+this.index,h;e.className="socketio",e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.display="none",e.target=g,e.method="POST",e.setAttribute("accept-charset","utf-8"),f.name="d",e.appendChild(f),document.body.appendChild(e),this.form=e,this.area=f}this.form.action=this.prepareUrl()+d,j(),this.area.value=b.JSON.stringify(a);try{this.form.submit()}catch(k){}this.iframe.attachEvent?h.onreadystatechange=function(){c.iframe.readyState=="complete"&&i()}:this.iframe.onload=i,this.socket.setBuffer(!0)},e.prototype.get=function(){var a=this,c=document.createElement("script"),e=b.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),c.async=!0,c.src=this.prepareUrl()+e,c.onerror=function(){a.onClose()};var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f),this.script=c,d&&setTimeout(function(){var a=document.createElement("iframe");document.body.appendChild(a),document.body.removeChild(a)},100)},e.prototype._=function(a){return this.onData(a),this.isOpen&&this.get(),this},e.prototype.ready=function(a,c){var e=this;if(!d)return c.call(this);b.util.load(function(){c.call(e)})},e.check=function(){return"document"in c},e.xdomainCheck=function(){return!0},b.transports.push("jsonp-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a){b.Transport.XHR.apply(this,arguments)}a.htmlfile=c,b.util.inherit(c,b.Transport.XHR),c.prototype.name="htmlfile",c.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile"),this.doc.open(),this.doc.write("<html></html>"),this.doc.close(),this.doc.parentWindow.s=this;var a=this.doc.createElement("div");a.className="socketio",this.doc.body.appendChild(a),this.iframe=this.doc.createElement("iframe"),a.appendChild(this.iframe);var c=this,d=b.util.query(this.socket.options.query,"t="+ +(new Date));this.iframe.src=this.prepareUrl()+d,b.util.on(window,"unload",function(){c.destroy()})},c.prototype._=function(a,b){a=a.replace(/\\\//g,"/"),this.onData(a);try{var c=b.getElementsByTagName("script")[0];c.parentNode.removeChild(c)}catch(d){}},c.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(a){}this.doc=null,this.iframe.parentNode.removeChild(this.iframe),this.iframe=null,CollectGarbage()}},c.prototype.close=function(){return this.destroy(),b.Transport.XHR.prototype.close.call(this)},c.check=function(a){if(typeof window!="undefined"&&["Active"].concat("Object").join("X")in window)try{var c=new(window[["Active"].concat("Object").join("X")])("htmlfile");return c&&b.Transport.XHR.check(a)}catch(d){}return!1},c.xdomainCheck=function(){return!1},b.transports.push("htmlfile")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),typeof define=="function"&&define.amd&&define([],function(){return io})})();
// Console.Re Client Script ver: 0.2.1
if (!window.console) window.console = {};
(function (root, console) {
  "use strict";

  var chost = 'console.re',
    cport = '80',
    ctransport = 'cretransport.io',
    name = 'toServerRe',
    channel;
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
      if (fromIndex == null) {
        fromIndex = 0;
      }
      else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
      }
      for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
          return i;
      }
      return -1;
    };
  }
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
      var i, len;
      for (i = 0, len = this.length; i < len; ++i) {
        if (i in this) {
          fn.call(scope, this[i], i, this);
        }
      }
    };
  }
  var isArray = Array.isArray || function (a) {
      return Object.prototype.toString.call(a) === "[object Array]";
  };
  if (!window.location.origin)
    window.location.origin = window.location.protocol + "//" + window.location.host;
  if (window.consolere === undefined || window.consolere.channel === 'YOUR-CHANNEL-NAME') {
    channel = document.getElementById('consolerescript').getAttribute('data-channel') || '';
  }
  else {
    channel = window.consolere.channel || '';
  }

  if (!channel) {
    channel = askChannel(); 
  }

  function askChannel(t) {
    t = t || '';
    var c = prompt(t + "Enter Channel to using on Console.Re/Your-Channel-Name","Your-Channel-Name");
    if (c && c!==null && c !== 'Your-Channel-Name') {
        return c;
    } else {
      askChannel('Please ');
    }
  }

  function getCaller(d) {
    d = d || 7;
    var t = printStackTrace(),
      c = t[d], p;
    if (c !== undefined) {
      p = c.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)?$/);
      if (p === null) p = c.match(/^.*([\/<][^\/>]*>?):(\d*)?$/);
    }
    else {
      // IE 7-9
      p[1] = '';
      p[2] = '0';
      p[3] = '0';
    }
    return {
      file: p ? p[1] : '',
      line: p ? p[2] : '0',
      col: p ? p[3] : '0'
    };
  }

  function getWindowSize() {
    var w = document.width || window.outerWidth || document.documentElement.clientWidth,
        h = document.height || window.outerHeight || document.documentElement.clientHeight;
    return 'Window Size: [number]' + w + 'px[/number] by [number]' + h + 'px[/number]';
  }

  function getOtherTypes(t) {
    var e, 
        o = '';
    try {
      e = eval(t);
      if (e === true) {
        o = '[booltrue]true[/booltrue]';
      }
      else if (e === false) {
        o = '[boolfalse]false[/boolfalse]';
      }
      else if (!isNaN(parseFloat(e)) && isFinite(e)) {
        o = '[number]' + e + '[/number]';
      }
      else if (typeof e === 'number') {
        o = '[number][Number][/number]';
      }
      else if (typeof e === 'string') {
        o = '"String"';
      }
      else if (typeof e === 'function') {
        o = '[Function]';
      }
      else if (e.nodeType) {
        o = '<' + e.nodeName + ' Element>';
      }
      else if (typeof e === 'object') {
        o = '{Object}';
        if (isArray(e)) o = '[Array]';
      }
      else {
        o = '[color=red]undefined[/color]';
      }
    }
    catch (err) {
      o = '[color=red]' + err + '[/color]';
    }
    return o;
  }

  function getType(t) {
    var o = '';
    if (typeof t !== 'string') return getOtherTypes(t);
    try {
      var obj = JSON.parse(t);
      if (typeof obj === 'object') {
        o = '{Object}';
        if (isArray(obj)) o = '[Array]';
      }
      else {
        o = getOtherTypes(t);
      }
    }
    catch (err) {
      o = getOtherTypes(t);
    }
    return o;
  }

  function replaceWithNum(s) {
    var st = '' + s;
    return st.replace(/([0-9]+)(px|em||)/g, '[number]$1$2[/number]');
  }

  function getSize(targetElement) {
    var w, 
        h;
    if (targetElement) {
      w = getStyle(targetElement, 'width');
      h = getStyle(targetElement, 'height');
      return '[number]' + w + '[/number]' + ' by ' + '[number]' + h + '[/number]';
    }
    return '';
  }

  function getStyle(targetElement, styleProp) {
    if (targetElement) {
      if (targetElement.currentStyle) return targetElement.currentStyle[styleProp];
      else if (window.getComputedStyle) return document.defaultView.getComputedStyle(targetElement, null).getPropertyValue(styleProp);
    }
  }

  function stringify(obj, cmd, prop) {
    if (typeof obj !== 'object') return obj;
    var cache = [], k_map = [], t_array, i, d_node = {}, nid = '', nclass = '', ps, 
      s = JSON.stringify(obj, function (k, v) {
      if (!v) return v;
      if (v.nodeType) {
        if (v.id) nid = v.id;
        if (v.className) nclass = v.className;
        if (cmd === 'size') {
          return '[tag]<' + v.nodeName + '>[/tag] ' + getSize(v);
        }
        else if (cmd === 'css') {
          if (isArray(prop)) {
            prop.forEach(function (p) {
              d_node[p] = replaceWithNum(getStyle(v, p));
            });
            return d_node;
          }
          else if (prop) {
            ps = ' ' + prop + ':' + getStyle(v, prop) + ';';
            if (nid) nid = " [attr]id=[/attr][string]'" + nid + "'[/string]";
            if (nclass) nclass = " [attr]class=[/attr][string]'" + nclass + "'[/string]";
            return '[tag]<' + v.nodeName + '' + nid + '' + nclass + '>[/tag]' + replaceWithNum(ps);
          }
        }
        else {
          d_node.element = v.nodeName;
          if (nid) d_node.id = nid;
          if (nclass) d_node["class"] = nclass;
          d_node.visible = VISIBILITY.isVisible(v);
          d_node.size = getSize(v);
          d_node.html = v.outerHTML;
        }
        return d_node;
      }
      if (v.window && v.window == v.window.window) return '{Window Object}';
      if (typeof v === 'function') return '[Function]';
      if (typeof v === 'object' && v !== null) {
        if (v.length && (t_array = Array.prototype.slice.call(v)).length === v.length) v = t_array;
        i = cache.indexOf(v);
        if (i !== -1) {
          return '[ Circular {'+(k_map[i]||'root')+'} ]';
        }
        cache.push(v);
        k_map.push(k);
      }
      return v;
    });
    return s;
  }
  root[name] = (function () {
    var socket,
      caller = [],
      cache = [],
      gcount = [],
      gtimer = [],
      or_change = false,
      api = {
        client: true,
        server: true,
        loaded: false
      },
      levels = [
        'trace',
        'debug',
        'info',
        'log',
        'warn',
        'error',
        'size',
        'test',
        'assert',
        'count',
        'css',
        'media',
        'time',
        'time',
        'command'
      ];

    function emit(level, args, cmd, cal) {
      caller = cal || getCaller();
      if ((!args.length || levels.indexOf(level) === -1) && level !== 'command') return;
      if (api.client) logConsole.apply(null, arguments);
      if (api.server) logIo.apply(null, arguments);
      if (!socket) return api.connect();
    }

    function logConsole(level, args) {
      level = level === 'trace' ? 'debug' : level;
      if (console.log) {
        var a = args.toString().replace(/\[(\w+)[^w]*?](.*?)\[\/\1]/g, '$2');
        Function.prototype.apply.call(console.log, console, ['console.re [' + level + ']'].concat(a));
      }
    }

    function logIo(level, args, cmd) {
      var data, counter, timer, t_end, last, command = '';
      cmd = cmd || '';      
      if (typeof args === 'object' && !args.length) data = args;
      else {
        if (level == 'command') command = cmd;
        data = {
          command: command,
          channel: channel,
          browser: browser,
          level: level,
          args: args,
          caller: caller
        };
      }
      if (cmd === 'css') {
        last = args[args.length - 1];
        if (isArray(last) || "string" === typeof last) args.pop();
        else cmd = '';
      }
      else if (cmd === 'count') {
        counter = args.toString();
        if (isNaN(gcount[counter])) {
          gcount[counter] = 1;
        }
        else {
          gcount[counter]++;
        }
        args.push(gcount[counter]);
      }
      else if (cmd === 'time') {
        timer = args.toString();
        gtimer[timer] = new Date().getTime();
        args.push('[white]started[/white]');
      }
      else if (cmd === 'timeEnd') {
        timer = args.toString();
        t_end = (new Date().getTime() - gtimer[timer]);
          if (!isNaN(t_end)) {
           args.push('[white]ends[/white] in [number]' + t_end + '[/number] ms');
          } else {
           args.push('[white]not started[/white]');
          }
      }

      for (var i = 0; i < args.length; i++) {
        args[i] = stringify(args[i], cmd, last);
      }
      if (socket) {
        if (cache.length) {
          sendCached(cache);
        }
        socket.emit(name, data);
      }
      else {
        cache.push([level, data]);
      }
    }

    for (var i = 0, l; i < levels.length; i++) {
      l = levels[i];
      api[l] = logLevel(l);
    }

    function logLevel(level) {
      return function () {
        api._dispatch(level, [].slice.call(arguments));
        return this;
      };
    }

    function onConnect() {
      if (socket) {
        socket.emit('channel', channel);
      }
      sendCached(cache);
    }

    function sendCached(c) {
      var ced = null;
      while (ced = c.shift()) {
        logIo.apply(null, ced);
      }
    }

    api.connect = function(redux) {
      if (root.io) {
        socket = root.io.connect("http://" + chost + ":" + cport, {
          'resource': ctransport
        });
        socket.on('connect', onConnect);
      }
      else if (!redux) {
        api.connect(true);
      }
    };

    api.size = function(s) {
      if (!s || (typeof s === 'undefined') || s == 'window') {
        api._dispatch('size', [getWindowSize()]);
      }
      else {
        api._dispatch('size', [].slice.call(arguments), 'size');
      }
      return this;
    };

    api.count = function() {
      api._dispatch('count', [].slice.call(arguments), 'count');
      return this;
    };

    api.time = function() {
      api._dispatch('time', [].slice.call(arguments), 'time');
      return this;
    };

    api.timeEnd = function() {
      api._dispatch('time', [].slice.call(arguments), 'timeEnd');
      return this;
    };    

    api.trace = function() {
      var t = printStackTrace(),
        out = [],
        a = [].slice.call(arguments);
      for (i = 0; t.length > i; i++) {
        if (!/console.re.js/gi.test(t[i])) out.push(t[i]);
      }
      api._dispatch('trace', [a.toString(), out]);
      return this;
    };

    api.css = function() {
      api._dispatch('css', [].slice.call(arguments), 'css');
      return this;
    };

    api.test = function() {
      var a = [].slice.call(arguments),
        type = '',
        out = [];
      a.forEach(function(t) {
        type = getType(t);
        if (/|[Function]|{Object}|[Array]|Element|/gi.test(type)) {
          type = '[color=#BBB519]' + type + '[/color]';
        }
        out.push('[color=#BC9044]' + t + '[/color]' + '[color=gray] is [/color]' + type);
      });
      api._dispatch('test', out);
      return this;
    };

    api.assert = function() {
      var a = [].slice.call(arguments), out = [];
      a.forEach(function (t,i) {
        if (typeof t !== 'string') {
          if (!t) {
            if (typeof a[i+1] === 'string') {
              out.push('[color=red]'+a[i+1]+'[/color]');  
            } else {
              out.push('[color=red]Assertion Failure[/color]');  
            }
          } 
        }
      });
      if (out.length) api._dispatch('assert', out);
      return this;
    };

    api._dispatch = function(level, args, cmd, cal) {
      emit(level, args, cmd, cal);
    };

    api.media = function(a, cal) {
      var mq_list = [],
        out = [],
        m = [],
        s_type = false,
        s_query = true,
        o_t = 'landscape',
        o_r = window.orientation || 0,
        timer_cal;
      if (a === 'type') {
        s_type = true;
        s_query = false;
      }
      else if (a === 'all-types' || a === 'all') {
        s_query = s_type = true;
      }
      if (a === 'watch') {
        var _timerVar;
        timer_cal = getCaller(5);
        if (window.addEventListener) {
          window.addEventListener('resize', function () {
            watchMediaQuery(timer_cal);
          }, false);
          window.addEventListener("orientationchange", function() {
            if (o_r !== window.orientation) or_change = true;
            watchMediaQuery(timer_cal);
          }, false);
        }
      }
      createMQList();
      m = mqChange();
      if (m.length) {
        if (m.length == 1) out.push(mqChange()[0]);
        else out.push(mqChange());
      }
      else {
        out.push('[yellow]No Media Query Rules[/yellow]');
      }
      if (a === 'w') {
        out.push(getWindowSize()); 
        if (or_change) {
          if (Math.abs(window.orientation) !== 90) o_t = 'portrait';
          out.push('Orientation: [yellow]'+o_t+'[/yellow]'); 
        }
        api._dispatch('media', out, '', cal);
      }
      else {
        api._dispatch('media', out);
      }
      return this;

      function watchMediaQuery(t) {
        if (window.matchMedia) {
          clearTimeout(_timerVar);
          _timerVar = setTimeout(function () {
            api.media('w', t);
          }, 500);
        }
      }

      function inList(media) {
        for (var i = mq_list.length - 1; i >= 0; i--) {
          if (mq_list[i].media === media) {
            return true;
          }
        }
        return false;
      }

      function createMQList() {
        var mq = getMediaQueries(), i;
        if (s_query) {
          for (i = mq.length - 1; i >= 0; i--) {
            if (!inList(mq[i])) {
              mq_list.push(window.matchMedia(mq[i]));
            }
          }
        }
        if (s_type) {
          var links = document.getElementsByTagName('link');
          for (i = links.length - 1; i >= 0; i--) {
            if (links[i].media) {
              mq_list.push(window.matchMedia(links[i].media));
            }
          }
        }
      }

      function getMediaQueries() {
        var s = document.styleSheets,
          r, i, j,
          mq = [];
        for (i = s.length - 1; i >= 0; i--) {
          try {
            r = s[i].cssRules;
            if (r) {
              for (j = 0; j < r.length; j++) {
                if (r[j].type == CSSRule.MEDIA_RULE) {
                  mq.push(r[j].media.mediaText);
                }
              }
            }
          }
          catch (e) {}
        }
        return mq;
      }

      function mqChange() {
        var q = [];
        for (var i in mq_list) {
          if (mq_list[i].matches) {
            q.push(replaceWithNum(mq_list[i].media));
          }
        }
        return q;
      }
    };

    api.clear = function () {
      api._dispatch('command', '', 'clear');
      return this;
    };

    return api;
  })();
  console.re = root[name];
  var BrowserDetect = {
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var d_string = data[i].str;
      var d_prop = data[i].prop;
      this.versionSearchString = data[i].vsearch || data[i].name;
      if (d_string) {
        if (d_string.indexOf(data[i].substr) != -1)
          return data[i].name;
      }
      else if (d_prop)
        return data[i].name;
    }
  },
  searchVersion: function (dString) {
    var i = dString.indexOf(this.versionSearchString);
    if (i == -1) return;
    return parseFloat(dString.substr(i + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    str: navigator.userAgent,
    substr: "OPR",
    vsearch: "OPR",
    name: {
      f: "Opera",
      s: "OP"
    }
  }, {
    str: navigator.userAgent,
    substr: "Chrome",
    vsearch: "Chrome",
    name: {
      f: "Chrome",
      s: "CR"
    }
  }, {
    str: navigator.userAgent,
    substr: "OmniWeb",
    vsearch: "OmniWeb",
    name: {
      f: "OmniWeb",
      s: "OW"
    }
  }, {
    str: navigator.vendor,
    substr: "Apple",
    name: {
      f: "Safari",
      s: "SF"
    },
    vsearch: "Version"
  }, {
    prop: window.opera,
    name: {
      f: "Opera",
      s: "OP"
    },
    vsearch: "Version"
  }, {
    str: navigator.vendor,
    substr: "iCab",
    name: {
      f: "iCab",
      s: "iC"
    }
  }, {
    str: navigator.vendor,
    substr: "KDE",
    name: {
      f: "Konqueror",
      s: "KDE"
    }
  }, {
    str: navigator.userAgent,
    substr: "Firefox",
    name: {
      f: "Firefox",
      s: "FF"
    },
    vsearch: "Firefox"
  }, {
    str: navigator.vendor,
    substr: "Camino",
    name: {
      f: "Camino",
      s: "CM"
    }
  }, {
    str: navigator.userAgent,
    substr: "Netscape",
    name: {
      f: "Netscape",
      s: "NS"
    }
  }, {
    str: navigator.userAgent,
    substr: "MSIE",
    name: {
      f: "Explorer",
      s: "IE"
    },
    vsearch: "MSIE"
  }, {
    str: navigator.userAgent,
    substr: "Trident",
    name: {
      f: "Explorer",
      s: "IE"
    },
    vsearch: "rv"
  }, {
    str: navigator.userAgent,
    substr: "Mozilla",
    name: {
      f: "Netscape",
      s: "NS"
    },
    vsearch: "Mozilla"
  }],
  dataOS: [{
    str: navigator.platform,
    substr: "Win",
    name: "Win"
  }, {
    str: navigator.platform,
    substr: "Mac",
    name: "Mac"
  }, {
    str: navigator.userAgent,
    substr: "iPhone",
    name: "iOS"
  }, {
    str: navigator.userAgent,
    substr: "iPad",
    name: "iOS"
  }, {
    str: navigator.userAgent,
    substr: "Android",
    name: "Android"
  }, {
    str: navigator.platform,
    substr: "Linux",
    name: "Linux"
  }],
  init: function () {
    return {
      browser: this.searchString(this.dataBrowser) || "An unknown browser",
      version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "",
      OS: this.searchString(this.dataOS) || "an unknown OS"
    };
  }
};
var browser = BrowserDetect.init();

  function handleError(msg, url, num) {
    if (!url && msg.indexOf("Script error") === 0 && num === 0) return;
    var r = new RegExp(window.location.origin, "g");
    url = url.replace(r, '');
    console.re.error('[color=red]' + msg + '[/color] in [i]' + url + '[/i] Line: [b]' + num + '[/b]');
    /* return true; */
  }
  window.onerror = handleError;
  window.ConsoleRe = true;
})(this, window.console);
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css";t.id="matchmediajs-test";n.parentNode.insertBefore(t,n);r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=n}else{t.textContent=n}return r.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());

var VISIBILITY=function(){function e(r,i,s,o,u,a,f){var l=r.parentNode,c=2;if(!n(r)){return false}if(9===l.nodeType){return true}if("0"===t(r,"opacity")||"none"===t(r,"display")||"hidden"===t(r,"visibility")){return false}if("undefined"===typeof i||"undefined"===typeof s||"undefined"===typeof o||"undefined"===typeof u||"undefined"===typeof a||"undefined"===typeof f){i=r.offsetTop;u=r.offsetLeft;o=i+r.offsetHeight;s=u+r.offsetWidth;a=r.offsetWidth;f=r.offsetHeight}if(l){if("hidden"===t(l,"overflow")||"scroll"===t(l,"overflow")){if(u+c>l.offsetWidth+l.scrollLeft||u+a-c<l.scrollLeft||i+c>l.offsetHeight+l.scrollTop||i+f-c<l.scrollTop){return false}}if(r.offsetParent===l){u+=l.offsetLeft;i+=l.offsetTop}return e(l,i,s,o,u,a,f)}return true}function t(e,t){if(window.getComputedStyle){return document.defaultView.getComputedStyle(e,null)[t]}if(e.currentStyle){return e.currentStyle[t]}}function n(e){while(e=e.parentNode){if(e==document){return true}}return false}return{getStyle:t,isVisible:e}}();

(function(e,t){e.printStackTrace=t()})(this,function(){function e(t){t=t||{guess:true};var n=t.e||null,r=!!t.guess;var i=new e.implementation,s=i.run(n);return r?i.guessAnonymousFunctions(s):s}e.implementation=function(){};e.implementation.prototype={run:function(e,t){e=e||this.createException();t=t||this.mode(e);if(t==="other"){return this.other(arguments.callee)}else{return this[t](e)}},createException:function(){try{this.undef()}catch(e){return e}},mode:function(e){if(e["arguments"]&&e.stack){return"chrome"}else if(e.stack&&e.sourceURL){return"safari"}else if(e.stack&&e.number){return"ie"}else if(e.stack&&e.fileName){return"firefox"}else if(e.message&&e["opera#sourceloc"]){if(!e.stacktrace){return"opera9"}if(e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length){return"opera9"}return"opera10a"}else if(e.message&&e.stack&&e.stacktrace){if(e.stacktrace.indexOf("called from line")<0){return"opera10b"}return"opera11"}else if(e.stack&&!e.fileName){return"chrome"}return"other"},instrumentFunction:function(t,n,r){t=t||window;var i=t[n];t[n]=function(){r.call(this,e().slice(4));return t[n]._instrumented.apply(this,arguments)};t[n]._instrumented=i},deinstrumentFunction:function(e,t){if(e[t].constructor===Function&&e[t]._instrumented&&e[t]._instrumented.constructor===Function){e[t]=e[t]._instrumented}},chrome:function(e){return(e.stack+"\n").replace(/^\s+(at eval )?at\s+/gm,"").replace(/^([^\(]+?)([\n$])/gm,"{anonymous}() ($1)$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm,"{anonymous}() ($1)").replace(/^(.+) \((.+)\)$/gm,"$1@$2").split("\n").slice(1,-1)},safari:function(e){return e.stack.replace(/\[native code\]\n/m,"").replace(/^(?=\w+Error\:).*$\n/m,"").replace(/^@/gm,"{anonymous}()@").split("\n")},ie:function(e){return e.stack.replace(/^\s*at\s+(.*)$/gm,"$1").replace(/^Anonymous function\s+/gm,"{anonymous}() ").replace(/^(.+)\s+\((.+)\)$/gm,"$1@$2").split("\n").slice(1)},firefox:function(e){return e.stack.replace(/(?:\n@:0)?\s+$/m,"").replace(/^(?:\((\S*)\))?@/gm,"{anonymous}($1)@").split("\n")},opera11:function(e){var t="{anonymous}",n=/^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;var r=e.stacktrace.split("\n"),i=[];for(var s=0,o=r.length;s<o;s+=2){var u=n.exec(r[s]);if(u){var a=u[4]+":"+u[1]+":"+u[2];var f=u[3]||"global code";f=f.replace(/<anonymous function: (\S+)>/,"$1").replace(/<anonymous function>/,t);i.push(f+"@"+a+" -- "+r[s+1].replace(/^\s+/,""))}}return i},opera10b:function(e){var t=/^(.*)@(.+):(\d+)$/;var n=e.stacktrace.split("\n"),r=[];for(var i=0,s=n.length;i<s;i++){var o=t.exec(n[i]);if(o){var u=o[1]?o[1]+"()":"global code";r.push(u+"@"+o[2]+":"+o[3])}}return r},opera10a:function(e){var t="{anonymous}",n=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;var r=e.stacktrace.split("\n"),i=[];for(var s=0,o=r.length;s<o;s+=2){var u=n.exec(r[s]);if(u){var a=u[3]||t;i.push(a+"()@"+u[2]+":"+u[1]+" -- "+r[s+1].replace(/^\s+/,""))}}return i},opera9:function(e){var t="{anonymous}",n=/Line (\d+).*script (?:in )?(\S+)/i;var r=e.message.split("\n"),i=[];for(var s=2,o=r.length;s<o;s+=2){var u=n.exec(r[s]);if(u){i.push(t+"()@"+u[2]+":"+u[1]+" -- "+r[s+1].replace(/^\s+/,""))}}return i},other:function(e){var t="{anonymous}",n=/function\s*([\w\-$]+)?\s*\(/i,r=[],i,s,o=10;try{while(e&&e["arguments"]&&r.length<o){i=n.test(e.toString())?RegExp.$1||t:t;s=Array.prototype.slice.call(e["arguments"]||[]);r[r.length]=i+"("+this.stringifyArguments(s)+")";e=e.caller}return r}catch(e){return""}},stringifyArguments:function(e){var t=[];var n=Array.prototype.slice;for(var r=0;r<e.length;++r){var i=e[r];if(i===undefined){t[r]="undefined"}else if(i===null){t[r]="null"}else if(i.constructor){if(i.constructor===Array){if(i.length<3){t[r]="["+this.stringifyArguments(i)+"]"}else{t[r]="["+this.stringifyArguments(n.call(i,0,1))+"..."+this.stringifyArguments(n.call(i,-1))+"]"}}else if(i.constructor===Object){t[r]="#object"}else if(i.constructor===Function){t[r]="#function"}else if(i.constructor===String){t[r]='"'+i+'"'}else if(i.constructor===Number){t[r]=i}}}return t.join(",")},sourceCache:{},ajax:function(e){var t=this.createXMLHTTPObject();if(t){try{t.open("GET",e,false);t.send(null);return t.responseText}catch(n){}}return""},createXMLHTTPObject:function(){var e,t=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var n=0;n<t.length;n++){try{e=t[n]();this.createXMLHTTPObject=t[n];return e}catch(r){}}},isSameDomain:function(e){return typeof location!=="undefined"&&e.indexOf(location.hostname)!==-1},getSource:function(e){if(!(e in this.sourceCache)){this.sourceCache[e]=this.ajax(e).split("\n")}return this.sourceCache[e]},guessAnonymousFunctions:function(e){for(var t=0;t<e.length;++t){var n=/\{anonymous\}\(.*\)@(.*)/,r=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,i=e[t],s=n.exec(i);if(s){var o=r.exec(s[1]);if(o){var u=o[1],a=o[2],f=o[3]||0;if(u&&this.isSameDomain(u)&&a){var l=this.guessAnonymousFunction(u,a,f);e[t]=i.replace("{anonymous}",l)}}}}return e},guessAnonymousFunction:function(e,t,n){var r;try{r=this.findFunctionName(this.getSource(e),t)}catch(i){r="getSource failed with url: "+e+", exception: "+i.toString()}return r},findFunctionName:function(e,t){var n=/function\s+([^(]*?)\s*\(([^)]*)\)/;var r=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;var i=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;var s="",o,u=Math.min(t,20),a,f;for(var l=0;l<u;++l){o=e[t-l-1];f=o.indexOf("//");if(f>=0){o=o.substr(0,f)}if(o){s=o+s;a=r.exec(s);if(a&&a[1]){return a[1]}a=n.exec(s);if(a&&a[1]){return a[1]}a=i.exec(s);if(a&&a[1]){return a[1]}}}return"(?)"}};return e});