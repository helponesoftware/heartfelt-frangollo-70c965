/* Lightbox for .h1shot product shots. Vanilla, delegated (survives post-hydration swaps). */
(function(){
var ov,img,cap,list=[],idx=0,last=null;
function shots(){return [].slice.call(document.querySelectorAll("figure.h1shot img"));}
function prep(){shots().forEach(function(i){if(i.dataset.lb)return;i.dataset.lb=1;i.tabIndex=0;i.setAttribute("role","button");i.setAttribute("aria-haspopup","dialog");i.title="Click to enlarge";var f=i.closest("figure");if(!f.querySelector(".h1shot-zoom")){var s=document.createElement("span");s.className="h1shot-zoom";s.setAttribute("aria-hidden","true");s.innerHTML="<b>\u2922</b><em>Click to enlarge</em>";f.appendChild(s);}});}
function build(){ov=document.createElement("div");ov.className="h1lb";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");ov.setAttribute("aria-label","Product screenshot");ov.hidden=true;
ov.innerHTML='<button type="button" class="h1lb-x" aria-label="Close">\u00d7</button><button type="button" class="h1lb-p" aria-label="Previous screenshot">\u2039</button><figure class="h1lb-f"><img alt=""/><figcaption></figcaption></figure><button type="button" class="h1lb-n" aria-label="Next screenshot">\u203a</button>';
document.body.appendChild(ov);img=ov.querySelector("img");cap=ov.querySelector("figcaption");
ov.addEventListener("click",function(e){var t=e.target;if(t.closest(".h1lb-x")||t===ov)close();else if(t.closest(".h1lb-p"))go(-1);else if(t.closest(".h1lb-n"))go(1);});
var sx=null;ov.addEventListener("touchstart",function(e){sx=e.touches.length===1?e.touches[0].clientX:null;},{passive:true});
ov.addEventListener("touchend",function(e){if(sx===null||(window.visualViewport&&visualViewport.scale>1.05))return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)go(d<0?1:-1);sx=null;},{passive:true});}
function show(){var s=list[idx],f=s.closest("figure"),b=f.dataset.h1shot;img.src=b?"/assets/product-shots/"+b+"-1440.webp":s.currentSrc||s.src;img.alt=f.dataset.fullAlt||s.alt;var c=f.querySelector("figcaption");cap.textContent=c?c.textContent:"";var m=list.length>1;ov.querySelector(".h1lb-p").hidden=!m;ov.querySelector(".h1lb-n").hidden=!m;}
function open(i){if(!ov)build();list=shots();idx=Math.max(0,list.indexOf(i));last=i;show();ov.hidden=false;document.documentElement.classList.add("h1lb-open");ov.querySelector(".h1lb-x").focus();}
function close(){ov.hidden=true;document.documentElement.classList.remove("h1lb-open");var r=last&&document.contains(last)?last:shots()[idx];if(r)r.focus();}
function go(d){idx=(idx+d+list.length)%list.length;show();}
document.addEventListener("click",function(e){var i=e.target.closest&&e.target.closest("figure.h1shot");if(i&&!(ov&&ov.contains(i))){e.preventDefault();open(i.querySelector("img"));}});
document.addEventListener("keydown",function(e){if(ov&&!ov.hidden){if(e.key==="Escape")close();else if(e.key==="ArrowRight")go(1);else if(e.key==="ArrowLeft")go(-1);else if(e.key==="Tab"){var b=[].slice.call(ov.querySelectorAll("button:not([hidden])")),a=document.activeElement,k=b.indexOf(a);e.preventDefault();b[(k+(e.shiftKey?-1:1)+b.length)%b.length].focus();}return;}
var t=e.target;if((e.key==="Enter"||e.key===" ")&&t.matches&&t.matches("figure.h1shot img")){e.preventDefault();open(t);}});
prep();new MutationObserver(prep).observe(document.documentElement,{childList:true,subtree:true});
})();
