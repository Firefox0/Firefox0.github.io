(()=>{var e,t,n;let o,a,l,c;function r(e,t){return Math.trunc(e+Math.random()*(t+1-e))}let d=0,i=document.getElementsByClassName("circle");function u(e,t){let n;switch(d){case 1:n=150+.25*(t-e);break;case 2:n=300+.3*(t-e);break;case 3:n=450+.35*(t-e);break;default:return 0}return Math.trunc(n)}function s(){for(let e=0;e<i.length;e++)i[e].style.backgroundColor="black"}function m(){for(let e=0;e<d;e++)i[e].style.backgroundColor="#fcfc00"}let g=document.getElementById("timerBar"),f=100,h=!1,y=5,b=null;function k(){null!==b&&cancelAnimationFrame(b),h=!0}function B(){f=100,g.style.width="100%"}function v(){c=void 0,y=5,B()}function E(e){return new Animation(new KeyframeEffect(e,[{transform:"translateY(0px)"},{transform:"translateY(-10px)"},{transform:"translateY(0px)"}],{duration:200}),document.timeline)}g.style.transition="none";let I="highscore-",p="cursor",M="difficulty",L="theme";function w(e){let t=localStorage.getItem(e);return null===t?null:Number(t)}function C(e,t){var n;n=String(t),localStorage.setItem(e,n)}let x=document.getElementById("title");function G(e){x.innerText=`Garen Ult Trainer (${function(e){switch(e){case 0:return"Easy";case 1:return"Medium";case 2:return"Hard";case 3:return"Extreme";default:return""}}(e)})`}function A(){C(M,o)}(o=Number(w(M)))>=0||(o=1),G(o);let H=document.getElementById("highscore"),S=document.getElementById("resetHighscoreButton"),T=document.getElementById("score"),N=0,R=0,D=null,P=null;function $(){let e=w(I+o);null===e&&(e=0),W(e)}function U(e){R=e,T.innerText=String(e),D.play()}function W(e){void 0===e&&(e=R)<N||(N=e,H.innerText=String(e),P.play(),N>0?S.removeAttribute("disabled"):S.setAttribute("disabled",""),C(I+o,e))}document.getElementById("resetHighscoreButton").onclick=()=>void(0!==N&&W(0)),D=E(T),P=E(H),$();let Y=0,F=0,q=document.getElementById("hpBar"),K=q.getContext("2d");function V(){q.classList.add("d-none")}function X(e,t,n,o,a){K.fillStyle=a,K.fillRect(e,t,n,o)}function _(){U(0),O(!0),v(),z()}function j(e){k();let t=Y,n=u(t,F);n>=t===e?((y-=.25)<1&&(y=1),B(),U(R+1),z()):J(n)}function z(){var e;let t=o;!function e(){let t=r(1,3);if(t===d){e();return}d=t,s(),m()}(),function(e){let t=0,n=r(Math.floor(400/(e=Math.pow(2,e))),Math.floor(800/e));switch(0===Math.trunc(2*Math.random())&&(n*=-1),d){case 1:t=r(500,2e3);break;case 2:t=r(1e3,2500);break;case 3:t=r(1500,3e3)}F=function(e,t){let n;switch(d){case 1:n=(e-t-150)/.25+e;break;case 2:n=(e-t-300)/.3+e;break;case 3:n=(e-t-450)/.35+e;break;default:return 0}return Math.trunc(n)}(Y=t+n,n)}(t),function(){if(Y>F)return;let e=Y/100,t=Math.trunc(e),n=e%1,o=Math.trunc(F/100),a=Math.trunc(q.offsetWidth/o);(function(e,t,n){let o=Math.trunc(e/10),a=e*t+5*o+(e-o)*2+t*n,l=q.offsetWidth-a;(function(e,t,n,o,a,l){let c=null;c=K.createLinearGradient(0,0,0,o);for(let e=0;e<a.length;e++)c.addColorStop(e/(a.length-1),a[e]);X(0,1,n,o,c)})(0,0,a,q.offsetHeight,["#f48d84","#c64135","#8e0b00"],0),X(a,1,l,q.offsetHeight,"black")})(t,a,n),function(e,t){K.beginPath();let n=0,o=0;for(let a=1;a<=e;a++){let e=a*t+5*n+2*o;K.moveTo(e+.5,1),a%10==0?(X(e,1,5,q.offsetHeight,"black"),n++):(X(e,1,2,q.offsetHeight/2,"black"),o++)}K.closePath(),K.stroke()}(t,a)}(),e=()=>J(u(Y,F)),h=!1,requestAnimationFrame(t=>(function e(t,n){if(void 0===c&&(c=t),f-=(t-c)/(10*y),g.style.width=f+"%",c=t,!h){if(f<=0){n();return}b=requestAnimationFrame(t=>e(t,n))}})(t,e))}function J(e){var t,n,o;O(!1),t=Y,n=F,o=`Correct answer: ${e>=t?"Yes":"No"} <br>
            Enemy current HP: ${t} <br>
            Enemy maximum HP: ${Math.trunc(n)} <br>
            Ult damage: ${Math.trunc(e)} <br>
            Remaining HP: ${Math.trunc(t-e)}`,eP.innerHTML=o,eD.classList.remove("d-none")}function O(e){e?(ex.removeAttribute("disabled"),eG.removeAttribute("disabled")):(ex.setAttribute("disabled",""),eG.setAttribute("disabled",""))}(t=e||(e={}))[t.Up=0]="Up",t[t.Right=1]="Right",t[t.Down=2]="Down",t[t.Left=3]="Left",q.width=q.offsetWidth,q.height=q.offsetHeight,K.rect(0,0,q.offsetWidth,q.offsetHeight),V(),n={1:()=>{ex.click()},2:()=>void eG.click(),Enter:()=>{eA.classList.contains("d-none")?eD.classList.contains("d-none")||eR.click():eA.click()},r:()=>{W(0)}},document.onkeydown=e=>{for(let t in n)e.key===t&&n[t]()},function e(t,n){let o="";document.onkeyup=a=>{(o+=a.key).length>t.length&&(o=o.substring(o.length-t.length)),o===t&&(n(),e(t,n))}}("demacia",()=>W(Number.MAX_VALUE));let Q=document.getElementsByTagName("body")[0],Z=document.getElementsByClassName("card"),ee=document.getElementsByClassName("btn-primary");function et(e){switch(e){case 0:en("default","#c6936f","#314598");break;case 1:en("sanguine","#c33d0f","#55452e");break;case 2:en("deserttrooper","#9c5d33","#86a4ad");break;case 3:en("commando","#41512b","#bea028");break;case 4:en("dreadknight","#708bb6","#9a6b7e");break;case 5:en("rugged","#4e5862","#836b54");break;case 6:en("steellegion","#373737","#744a30");break;case 7:en("rogueadmiral","#503221","#2d2231");break;case 8:en("warringkingdoms","#a26331","#da4040");break;case 9:en("godking","#5c4744","#8bc4d3");break;case 10:en("demaciavice","#10c3e5","#e442ee");break;case 11:en("mechakingdoms","#685c4d","#70b6f9");break;case 12:en("prestigemechakingdoms","#685449","#f6a15f");break;case 13:en("battleacademia","#1c263f","#f92136");break;case 14:en("mythmaker","#d45256","#948c9b");break;default:return}a=e}function en(e,t,n){Q.style.backgroundImage="url('../img/GarenBackground/"+e+".png')",function(e){for(let t=0;t<Z.length;t++)Z[t].style.backgroundColor=e}(t),function(e){for(let t=0;t<ee.length;t++){let n=ee[t];n.style.backgroundColor=e,n.style.borderColor=e,n.addEventListener("mouseenter",()=>{let t=function(e,t){let n=(e=e.slice(1)).slice(0,2),o=e.slice(2,4),a=e.slice(4,6),l=parseInt("0x"+n),c=parseInt("0x"+o),r=parseInt("0x"+a);return"#"+Math.round(Math.min(255,l+50)).toString(16)+Math.round(Math.min(255,c+50)).toString(16)+Math.round(Math.min(255,r+t)).toString(16)}(e,50);n.style.backgroundColor=t,n.style.borderColor=t}),n.addEventListener("mouseleave",()=>{n.style.backgroundColor=e,n.style.borderColor=e})}}(n),q.style.outlineColor=t}et(a=w(L)??0);let eo=document.getElementsByTagName("body")[0],ea=document.getElementsByClassName("btn");function el(e){let t;switch(e){case 0:t="../misc/legacy.cur";break;case 1:t="../misc/modern.cur";break;default:t=""}let n="cursor: url('"+t+"'), auto;";eo.style.cssText+=n;for(let e=0;e<ea.length;e++)ea[e].onmouseenter=()=>{ea[e].style.cssText+=n}}el(l=w(p)??1);let ec=document.getElementById("exampleModal"),er=document.getElementById("modalCloseButton"),ed=document.getElementById("modalApplyButton"),ei={value:-1},eu={value:-1},es={value:-1},em=[],eg=[document.getElementById("difficultyEasyButton"),document.getElementById("difficultyMediumButton"),document.getElementById("difficultyHardButton"),document.getElementById("difficultyExtremeButton")],ef=[document.getElementById("themeGarenDefault"),document.getElementById("themeGarenSanguine"),document.getElementById("themeGarenDeserttrooper"),document.getElementById("themeGarenCommando"),document.getElementById("themeGarenDreadknight"),document.getElementById("themeGarenRugged"),document.getElementById("themeGarenSteellegion"),document.getElementById("themeGarenRogueadmiral"),document.getElementById("themeGarenWarringkingdoms"),document.getElementById("themeGarenGodking"),document.getElementById("themeGarenDemaciavice"),document.getElementById("themeGarenMechakingdoms"),document.getElementById("themeGarenPrestige"),document.getElementById("themeGarenBattleacademia"),document.getElementById("themeGarenMythmaker")],eh=[document.getElementById("cursorLegacy"),document.getElementById("cursorModern")];function ey(){ec.classList.remove("show"),ec.style.display=""}function eb(e,t,n){for(let o=0;o<e.length;o++)e[o].onclick=()=>{eB(e,t.value),ek(e,o),t.value=o,n()}}function ek(e,t){e[t].classList.add("btn-chosen")}function eB(e,t){e[t].classList.remove("btn-chosen")}function ev(){em=[ei.value,eu.value,es.value]}function eE(){et(ei.value)}function eI(){G(eu.value),C(M,o=eu.value)}function ep(){el(es.value)}ei.value=a,ek(ef,ei.value),eu.value=o,ek(eg,eu.value),es.value=l,ek(eh,es.value),ev(),er.onclick=()=>{eB(ef,ei.value),eB(eg,eu.value),eB(eh,es.value),[ei.value,eu.value,es.value]=em,ek(ef,ei.value),ek(eg,eu.value),ek(eh,es.value),eE(),eI(),ep(),ey()},ed.onclick=()=>{C(L,a),C(M,o),C(p,l),ev(),$(),ey()},eb(ef,ei,()=>{eE()}),eb(eg,eu,()=>{eI()}),eb(eh,es,()=>{ep()});let eM=document.getElementById("helpModal"),eL=document.getElementById("helpModalClose"),ew=document.getElementById("helpModalCloseButton");function eC(){eM.classList.remove("show"),eM.style.display=""}eL.onclick=()=>{eC()},ew.onclick=()=>{eC()};let ex=document.getElementById("yes"),eG=document.getElementById("no"),eA=document.getElementById("startButton"),eH=document.getElementById("backButton"),eS=document.getElementById("footer"),eT=document.getElementById("settingsButton"),eN=document.getElementById("helpButton"),eR=document.getElementById("explanationButton"),eD=document.getElementById("explanationRow"),eP=document.getElementById("explanationText");function e$(){eD.classList.add("d-none")}ex.onclick=()=>void(ex.hasAttribute("disabled")||j(!0)),eG.onclick=()=>void(eG.hasAttribute("disabled")||j(!1)),eA.onclick=()=>void(eS.classList.add("d-none"),eA.classList.add("d-none"),eH.classList.remove("d-none"),eT.classList.add("invisible"),eN.classList.add("d-none"),q.classList.remove("d-none"),_()),eH.onclick=()=>void(eS.classList.remove("d-none"),eH.classList.add("d-none"),eA.classList.remove("d-none"),eT.classList.remove("invisible"),eN.classList.remove("d-none"),k(),B(),U(0),O(!1),V(),e$(),d=0,s(),m()),eT.onclick=()=>void(ec.classList.add("show"),ec.style.display="block"),eN.onclick=()=>void(eM.classList.add("show"),eM.style.display="block"),eR.onclick=()=>void(e$(),W(),U(0),v(),_())})();
//# sourceMappingURL=keyboard.js.map
