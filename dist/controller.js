(()=>{var e,t;let n,l,o,c;function a(e,t){return Math.trunc(e+Math.random()*(t+1-e))}let u=0,i=document.getElementsByClassName("circle");function s(e,t){switch(u){case 1:return 150+.25*(t-e);case 2:return 300+.3*(t-e);case 3:return 450+.35*(t-e);default:return 0}}function r(){for(let e=0;e<i.length;e++)i[e].style.backgroundColor="black"}function d(){for(let e=0;e<u;e++)i[e].style.backgroundColor="#fcfc00"}let m=document.getElementById("timerBar"),f=100,g=!1,y=5,h=null;function b(){null!==h&&cancelAnimationFrame(h),g=!0}function B(){f=100,m.style.width="100%"}function v(){c=void 0,y=5,B()}function E(e){return new Animation(new KeyframeEffect(e,[{transform:"translateY(0px)"},{transform:"translateY(-10px)"},{transform:"translateY(0px)"}],{duration:200}),document.timeline)}m.style.transition="none";let k="highscore-",I="cursor",L="difficulty",p="theme";function M(e){let t=localStorage.getItem(e);return null===t?null:Number(t)}function w(e,t){var n;n=String(t),localStorage.setItem(e,n)}let x=document.getElementById("title");function A(e){x.innerText=`Garen Ult Trainer (${function(e){switch(e){case 0:return"QMaxGaren";case 1:return"Medium";case 2:return"Riste";case 3:return"Erislash";default:return""}}(e)})`}function C(){w(L,n)}(n=Number(M(L)))>=0||(n=1),A(n);let H=document.getElementById("highscore"),T=document.getElementById("resetHighscoreButton"),N=document.getElementById("score"),R=0,S=0,$=null,P=null;function U(){let e=M(k+n);null===e&&(e=0),Y(e)}function W(e){S=e,N.innerText=String(e),$.play()}function Y(e){void 0===e&&(e=S)<R||(R=e,H.innerText=String(e),P.play(),R>0?T.removeAttribute("disabled"):T.setAttribute("disabled",""),w(k+n,e))}document.getElementById("resetHighscoreButton").onclick=()=>void(0!==R&&Y(0)),$=E(N),P=E(H),U();let D=0,F=0,G=document.getElementById("hpBar"),q=G.getContext("2d");function K(e,t,n,l,o){q.fillStyle=o,q.fillRect(e,t,n,l)}(t=e||(e={}))[t.Up=0]="Up",t[t.Right=1]="Right",t[t.Down=2]="Down",t[t.Left=3]="Left",G.width=G.offsetWidth,G.height=G.offsetHeight,q.rect(0,0,G.offsetWidth,G.offsetHeight);let Q=document.getElementById("explanationButton"),j=document.getElementById("explanationText"),z=document.getElementById("explanationRow");function J(){z.classList.add("d-none")}let O=document.getElementsByTagName("body")[0],V=document.getElementsByClassName("card"),X=document.getElementById("startButton");function Z(e){switch(e){case 0:O.style.backgroundColor="#434c5e",_("#4c566a"),X.style.backgroundColor="";break;case 1:O.style.backgroundColor="#2e3440",_("#3b4252");break;default:return}l=e}function _(e){for(let t=0;t<V.length;t++)V[t].style.backgroundColor=e}Z(l=M(p)??0);let ee=document.getElementsByTagName("body")[0],et=document.getElementsByClassName("btn");function en(e){let t;switch(e){case 0:t="../misc/legacy.cur";break;case 1:t="../misc/modern.cur";break;default:t=""}let n="cursor: url('"+t+"'), auto;";ee.style.cssText+=n;for(let e=0;e<et.length;e++)et[e].onmouseenter=()=>{et[e].style.cssText+=n}}en(o=M(I)??1);let el=document.getElementById("settingsButton"),eo=document.getElementById("exampleModal"),ec=document.getElementById("modalCloseButton"),ea=document.getElementById("modalApplyButton"),eu={value:-1},ei={value:-1},es={value:-1},er=[],ed=[document.getElementById("difficultyEasyButton"),document.getElementById("difficultyMediumButton"),document.getElementById("difficultyHardButton"),document.getElementById("difficultyRisteButton")],em=[document.getElementById("themeNordRegular"),document.getElementById("themeNordDark")],ef=[document.getElementById("cursorLegacy"),document.getElementById("cursorModern")];function eg(){eo.classList.remove("show"),eo.style.display=""}function ey(e,t,n){for(let l=0;l<e.length;l++)e[l].onclick=()=>{eb(e,t.value),eh(e,l),t.value=l,n()}}function eh(e,t){e[t].classList.add("btn-chosen")}function eb(e,t){e[t].classList.remove("btn-chosen")}function eB(){er=[eu.value,ei.value,es.value]}function ev(){Z(eu.value)}function eE(){A(ei.value),w(L,n=ei.value)}function ek(){en(es.value)}eu.value=l,eh(em,eu.value),ei.value=n,eh(ed,ei.value),es.value=o,eh(ef,es.value),eB(),el.onclick=()=>{eo.classList.add("show"),eo.style.display="block"},ec.onclick=()=>{eb(em,eu.value),eb(ed,ei.value),eb(ef,es.value),[eu.value,ei.value,es.value]=er,eh(em,eu.value),eh(ed,ei.value),eh(ef,es.value),ev(),eE(),ek(),eg()},ea.onclick=()=>{w(p,l),w(L,n),w(I,o),eB(),U(),eg()},ey(em,eu,()=>{ev()}),ey(ed,ei,()=>{eE()}),ey(ef,es,()=>{ek()});let eI=document.getElementById("helpButton"),eL=document.getElementById("helpModal"),ep=document.getElementById("helpModalClose"),eM=document.getElementById("helpModalCloseButton");function ew(){eL.classList.remove("show"),eL.style.display=""}eI.onclick=()=>{eL.classList.add("show"),eL.style.display="block"},ep.onclick=()=>{ew()},eM.onclick=()=>{ew()};let ex=document.getElementById("yes"),eA=document.getElementById("no"),eC=document.getElementById("startButton"),eH=document.getElementById("backButton"),eT=document.getElementById("footer");function eN(){W(0),eP(!0),v(),eS()}function eR(e){b();let t=D,n=s(t,F);n>=t===e?((y-=.25)<1&&(y=1),B(),W(S+1),eS()):e$(n)}function eS(){var e;let t=n;!function e(){let t=a(1,3);if(t===u){e();return}u=t,r(),d()}(),function(e){let t=0,n=a(Math.floor(400/(e=Math.pow(2,e))),Math.floor(800/e));switch(0===Math.trunc(2*Math.random())&&(n*=-1),u){case 1:t=a(500,2e3);break;case 2:t=a(1e3,2500);break;case 3:t=a(1500,3e3)}F=function(e,t){switch(u){case 1:return(e-t-150)/.25+e;case 2:return(e-t-300)/.3+e;case 3:return(e-t-450)/.35+e;default:return 0}}(D=t+n,n)}(t),function(){if(D>F)return;let e=D/100,t=Math.trunc(e),n=e%1,l=Math.trunc(F/100),o=Math.trunc(G.offsetWidth/l);(function(e,t,n){let l=Math.trunc(e/10),o=e*t+5*l+(e-l)*2+t*n,c=G.offsetWidth-o;(function(e,t,n,l,o,c){let a=null;a=q.createLinearGradient(0,0,0,l);for(let e=0;e<o.length;e++)a.addColorStop(e/(o.length-1),o[e]);K(0,1,n,l,a)})(0,0,o,G.offsetHeight,["#f48d84","#c64135","#8e0b00"],0),K(o,1,c,G.offsetHeight,"black")})(t,o,n),function(e,t){q.beginPath();let n=0,l=0;for(let o=1;o<=e;o++){let e=o*t+5*n+2*l;q.moveTo(e+.5,1),o%10==0?(K(e,1,5,G.offsetHeight,"black"),n++):(K(e,1,2,G.offsetHeight/2,"black"),l++)}q.closePath(),q.stroke()}(t,o)}(),e=()=>e$(s(D,F)),g=!1,requestAnimationFrame(t=>(function e(t,n){if(void 0===c&&(c=t),f-=(t-c)/(10*y),m.style.width=f+"%",c=t,!g){if(f<=0){n();return}h=requestAnimationFrame(t=>e(t,n))}})(t,e))}function e$(e){var t,n;eP(!1),t=D,n=F,j.innerHTML=`Correct answer: ${e>=t?"Yes":"No"} <br>
                                        Enemy current HP: ${t} <br>
                                        Enemy maximum HP: ${Math.trunc(n)} <br>
                                        Ult damage: ${Math.trunc(e)} <br>
                                        Remaining HP: ${Math.trunc(t-e)}`,z.classList.remove("d-none")}function eP(e){e?(ex.removeAttribute("disabled"),eA.removeAttribute("disabled")):(ex.setAttribute("disabled",""),eA.setAttribute("disabled",""))}ex.setAttribute("disabled",""),eA.setAttribute("disabled",""),ex.onclick=()=>{ex.hasAttribute("disabled")||eR(!0)},eA.onclick=()=>{eA.hasAttribute("disabled")||eR(!1)},eC.onclick=()=>{eI.classList.add("d-none"),el.classList.add("invisible"),eT.classList.add("d-none"),eC.classList.add("d-none"),G.classList.remove("d-none"),eH.classList.remove("d-none"),eN()},eH.onclick=()=>{eI.classList.remove("d-none"),eT.classList.remove("d-none"),b(),B(),W(0),eH.classList.add("d-none"),eC.classList.remove("d-none"),el.classList.remove("invisible"),eP(!1),G.classList.add("d-none"),J(),u=0,r(),d()},Q.onclick=()=>{J(),Y(),W(0),v(),eN()}})();
//# sourceMappingURL=controller.js.map
