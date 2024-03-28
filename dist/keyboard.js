(()=>{var e,t;let n,l,o;function r(e,t){return Math.floor(e+Math.random()*(t-e))}function c(e){return new Animation(new KeyframeEffect(e,[{transform:"translateY(0px)"},{transform:"translateY(-10px)"},{transform:"translateY(0px)"}],{duration:200}),document.timeline)}let i=document.getElementById("ultLevel"),a=0,u=null;function s(e,t){switch(a){case 1:return 150+.25*(t-e);case 2:return 300+.3*(t-e);case 3:return 450+.35*(t-e);default:return 0}}u=c(i);let d=document.getElementById("timerBar"),m=null,f=100,g=1;function y(){g=1,f=100,d.style.width="100%"}function h(){null!==m&&(clearInterval(m),m=null)}function b(e){return localStorage.getItem(e)}function B(e,t){localStorage.setItem(e,t)}function v(e){let t=b(e);return null===t?null:Number(t)}d.style.transition="none",(n=Number(b("difficulty")))>=0||(n=1);let E=document.getElementById("highscore"),I=document.getElementById("resetHighscoreButton"),k=0,L=0,p=document.getElementById("score"),w=null,x=null;function M(){let e=v("highscore-"+n);(null===e||0==e)&&(e=0),A(e)}function T(e){L=e,p.innerText=String(e),w.play()}function A(e){var t;void 0===e&&(e=L),k=e,E.innerText=String(e),x.play(),k>0?I.removeAttribute("disabled"):I.setAttribute("disabled",""),t=String(e),B("highscore-"+String(n),String(t))}document.getElementById("resetHighscoreButton").onclick=()=>void(0!==k&&A(0)),w=c(p),x=c(E),M();let S=0,C=0,N=document.getElementById("hpBar"),R=N.getContext("2d");function H(e,t,n,l,o){R.fillStyle=o,R.fillRect(e,t,n,l)}(t=e||(e={}))[t.Up=0]="Up",t[t.Right=1]="Right",t[t.Down=2]="Down",t[t.Left=3]="Left",N.width=750,N.height=150,R.rect(0,0,750,150);let $=document.getElementById("explanationButton"),P=document.getElementById("explanationText"),U=document.getElementById("explanationRow");function Y(){U.classList.add("d-none")}let D=document.getElementById("title");function G(e){D.innerText=`Garen Ult Trainer (${function(e){switch(e){case 0:return"QMaxGaren";case 1:return"Medium";case 2:return"Riste";case 3:return"Erislash";default:return""}}(e)})`}let K=document.getElementsByTagName("body")[0],Q=document.getElementsByClassName("card-body"),j=document.getElementById("startButton");function q(e){switch(e){case 0:K.style.backgroundColor="#434c5e",z("#4c566a"),j.style.backgroundColor="";break;case 1:K.style.backgroundColor="#2e3440",z("#3b4252");break;default:return}B("theme",l=e)}function z(e){for(let t=0;t<Q.length;t++)Q[t].style.backgroundColor=e}let F=document.getElementsByTagName("body")[0],J=document.getElementsByClassName("btn");function O(e){let t;switch(e){case 0:t="../misc/legacy.cur";break;case 1:t="../misc/modern.cur";break;default:t=""}let n="cursor: url('"+t+"'), auto;";F.style.cssText+=n;for(let e=0;e<J.length;e++)J[e].onmouseenter=()=>{J[e].style.cssText+=n};B("cursor",String(e))}null!==(o=v("cursor"))&&O(o);let V=document.getElementById("settingsButton"),W=document.getElementById("exampleModal"),X=document.getElementById("modalCloseButton"),Z=document.getElementById("modalApplyButton"),_={value:-1},ee={value:-1},et={value:0},en=[document.getElementById("difficultyEasyButton"),document.getElementById("difficultyMediumButton"),document.getElementById("difficultyHardButton"),document.getElementById("difficultyRisteButton")],el=[document.getElementById("themeNordRegular"),document.getElementById("themeNordDark")],eo=[document.getElementById("cursorLegacy"),document.getElementById("cursorModern")];function er(){W.classList.remove("show"),W.style.display=""}function ec(e,t,n){console.log(e);for(let l=0;l<e.length;l++)e[l].onclick=()=>{e[t.value].classList.remove("btn-chosen"),e[l].classList.add("btn-chosen"),t.value=l,n()}}function ei(e,t){e[t].classList.add("btn-chosen")}ee.value=n,ei(en,ee.value),G(ee.value),_.value=(function(){let e=Number(b("theme"));if(!e){l=0;return}l=e}(),q(l),l),ei(el,_.value),V.onclick=()=>{W.classList.add("show"),W.style.display="block"},X.onclick=()=>{er()},Z.onclick=()=>{M(),er()},ec(el,_,()=>{q(_.value)}),ec(en,ee,()=>{B("difficulty",String(n=ee.value)),G(n)}),ec(eo,et,()=>{O(et.value)});let ea=document.getElementById("yes"),eu=document.getElementById("no"),es=document.getElementById("startButton"),ed=document.getElementById("backButton"),em=document.getElementById("footer");function ef(e){h();let t=S,n=s(t,C);n>=t===e?(T(L+1),eg()):eh(n)}function eg(){var e;let t=n;!function e(){let t=r(1,3);if(t===a){e();return}a=t,i.innerText=String(t),u.play()}(),function(e){let t=0;e++;let n=r(Math.floor(1e3/(e*=2)),Math.floor(2e3/e));switch(0===Math.floor(2*Math.random())&&(n*=-1),a){case 1:t=r(500,2e3);break;case 2:t=r(1e3,2500);break;case 3:t=r(1500,3e3)}C=function(e,t){switch(a){case 1:return(e-t-150)/.25+e;case 2:return(e-t-300)/.3+e;case 3:return(e-t-450)/3.5+e;default:return 0}}(S=t,n)}(t),function(){if(S>C)return;let e=Math.trunc(S/100),t=Math.trunc(C/100),n=N.width/t;(function(e,t,n,l,o,r){let c=null;c=R.createLinearGradient(0,0,0,l);for(let e=0;e<o.length;e++)c.addColorStop(e/(o.length-1),o[e]);H(0,1,n,l,c)})(0,0,e*n,N.height,["#bf616a","#dd4f52","#870a0e"],0),H(e*n,1,(t-e)*n,150,"black"),function(e,t){R.beginPath();for(let n=1;n<=e;n++){let e=n*t;R.moveTo(e,2),n%10==0?R.lineTo(e,N.height):R.lineTo(e,N.height/2)}R.closePath(),R.stroke()}(e,n)}(),y(),e=()=>eh(s(S,C)),m=setInterval(()=>{f-=g,d.style.width=f+"%",f<=0&&(h(),e())},1e3/60)}function ey(){T(0),eb(!0),eg()}function eh(e){var t,n;eb(!1),t=S,n=C,P.innerHTML=`Correct answer: ${e>=t?"Yes":"No"} <br>
                                        Enemy current HP: ${t} <br>
                                        Enemy maximum HP: ${Math.trunc(n)} <br>
                                        Ult damage: ${Math.trunc(e)} <br>
                                        Remaining HP: ${Math.trunc(t-e)}`,U.classList.remove("d-none")}function eb(e){e?(ea.removeAttribute("disabled"),eu.removeAttribute("disabled")):(ea.setAttribute("disabled",""),eu.setAttribute("disabled",""))}ed.classList.add("invisible"),ea.setAttribute("disabled",""),eu.setAttribute("disabled",""),ea.onclick=()=>{ea.hasAttribute("disabled")||ef(!0)},eu.onclick=()=>{eu.hasAttribute("disabled")||ef(!1)},es.onclick=()=>{V.classList.add("invisible"),em.classList.add("d-none"),es.classList.add("d-none"),N.classList.remove("d-none"),ed.classList.remove("invisible"),ey()},ed.onclick=()=>{em.classList.remove("d-none"),h(),y(),T(0),ed.classList.add("invisible"),es.classList.remove("d-none"),V.classList.remove("invisible"),eb(!1),N.classList.add("d-none"),Y()},$.onclick=()=>{Y(),A(),ey()}})();
//# sourceMappingURL=keyboard.js.map
