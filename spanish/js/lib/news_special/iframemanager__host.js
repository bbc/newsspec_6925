!function(){var IframeWatcher=function(a,b,c){var d=window.location.origin;if(this.hostIsNewsApp(b)&&(d=b),this.elm=document.createElement("iframe"),this.elm.className="responsive-iframe",this.elm.scrolling="no",this.elm.allowfullscreen=!0,this.elm.frameBorder="0",this.updateFrequency=32,window.postMessage){var e=this.getPath(a);this.setupPostMessage(e)}else a.search(window.location.protocol+"//"+window.location.hostname)>-1?this.setupIframeBridge():(this.data.height=c,this.elm.scrolling="yes");this.elm.src=a+"?hostid="+d.split("//")[1]+"&onbbcdomain="+(window.location.host.search("bbc.co.uk")>-1),this.lastRecordedHeight=this.elm.height,this.iframeInstructionsRan=!1;var f=this;this.elm.onload=function(){f.getAnyInstructionsFromIframe(),f.setDimensions()}};IframeWatcher.prototype={data:{},setupPostMessage:function(a){var b=this;window.addEventListener("message",function(c){c.data&&c.data.split("::")[0]===a&&(b.data=JSON.parse(c.data.split("::")[1]),b.setDimensions())},!1)},setupIframeBridge:function(){var a=this;window.setInterval(function(){a.elm.contentWindow.iframeBridge&&(a.data=a.elm.contentWindow.iframeBridge,a.setDimensions())},a.updateFrequency)},hostIsNewsApp:function(a){return a.indexOf("bbc_news_app")>-1},getIframeContentHeight:function(){return this.data.height&&(this.lastRecordedHeight=this.data.height),this.lastRecordedHeight},setDimensions:function(){this.elm.width=this.elm.parentNode.clientWidth,this.elm.height=this.getIframeContentHeight()},getAnyInstructionsFromIframe:function(){this.data.setup&&!this.iframeInstructionsRan&&(eval("var func = "+this.data.setup),func(),this.iframeInstructionsRan=!0)},getPath:function(a){var b=a.replace("http://","");return b.substring(b.indexOf("/")).split("?")[0]}};var iframeManager={iframe:null,init:function(){this.renderIframe(),this.startWatching()},renderIframe:function(){var a=document.getElementById("<%= iframeUid %>"),b=new IframeWatcher(a.href,a.parentNode.className,a.getAttribute("data-static-iframe-height"));a.parentNode.appendChild(b.elm),a.parentNode.removeChild(a),iframeManager.iframe=b,b.setDimensions()},startWatching:function(){window.addEventListener("resize",function(){iframeManager.iframe.setDimensions()},!1)}};iframeManager.init()}();