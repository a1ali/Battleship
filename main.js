/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e=(e,t=0)=>{let r=document.createElement("div");for(let n=1;n<=100;n++){let a=document.createElement("div");a.innerText="",a.id=`${n}-${e.name}`,1==t&&(a.id=`${n}-${e.name}-start`),a.className="grids",r.appendChild(a)}let n="";for(let e=0;e<10;e++)n+="auto ";return r.className="grid-container",r.style["grid-template-columns"]=n,r.style.display="grid",r.id=`${e.name}-grid`,1===t&&(r.id=`${e.name}-grid-start`),r},t=(e,t)=>{document.getElementById(`${e}-${t.name}`).style.backgroundColor="#ff3333"},r=(e,t)=>{let r=e.indexOf(t);return r>-1&&e.splice(r,1),e};let n=document.getElementById("app"),a=new Typewriter(n,{loop:!1,delay:60});function s(e){a.pauseFor(300).typeString(e).pauseFor(300).start()}function i(){a.deleteAll(10)}const l=()=>{let e=[],n=[],a=[],l=[];const o=()=>{for(let t=0;t<e.length;t++)if(!e[t].isSunk())return!1;return!0},d=(e,t)=>Math.floor(Math.random()*(t-e+1)+e),c=()=>{let e=d(1,5),t=d(1,9);return parseInt(`${t}${e}`)},p=e=>{let t=c(),r=[];for(;;)if(l.includes(t))r=[],t=c();else if(r.push(t),t+=1,5===r.length)break;return r};return{placeShip:(t,n)=>{let a=t,s=(e=>{let t=e;return{isHit:e=>!!t.includes(e)&&((e=>{t=r(t,e)})(e),!0),isSunk:()=>0===t.length,getPos:()=>t,positionArr:t}})(a);e.push(s),((e,t)=>{t||e.forEach((e=>{document.getElementById(`${e}-player`).style.backgroundColor="#595959"}))})(a,n),a.forEach((e=>{l.push(e)}))},receiveAttack:(r,l)=>{if(n.includes(r)||a.includes(r)||o())return!1;{let o=!1;for(let n=0;n<e.length;n++)if(e[n].isHit(r)){o=!0,a.push(r),t(r,l),"computer"===l.name&&(i(),s("It's a hit!"));break}return o||(n.push(r),((e,t)=>{document.getElementById(`${e}-${t.name}`).style.backgroundColor="#000099"})(r,l),"computer"===l.name&&(i(),s("You missed."))),!0}},allShipSunk:o,ships:e,occupiedPlaces:l,generateCarrier:()=>p(),generateBattleship:()=>p().slice(1,5),generateDestroyer:()=>p().slice(1,4),generateSubmarine:()=>p().slice(1,4),generatePatrolBoat:()=>p().slice(1,3)}},o=e=>{let t=l();const r=()=>{t.placeShip(t.generateCarrier(),e),t.placeShip(t.generateBattleship(),e),t.placeShip(t.generateDestroyer(),e),t.placeShip(t.generateSubmarine(),e),t.placeShip(t.generatePatrolBoat(),e)};e&&r();const n=e=>{let t=Math.floor(100*Math.random())+1;for(;e.attacks.includes(t);)t=Math.floor(100*Math.random())+1;return t};return{computerMove:t=>{if(e){let e=n(t);t.board.receiveAttack(e,t),t.attacks.push(e),t.board.allShipSunk()&&(i(),s("Defeat! The enemy has destroyed our fleet!"))}},humanMove:(t,r)=>{if(!e&&!r.attacks.includes(t)&&r.board.receiveAttack(t,r))return r.attacks.push(t),r.board.allShipSunk()&&(i(),s("Victory! The enemy has been defeated.")),!0},getRandomLoc:n,name:e?"computer":"player",attacks:[],board:t,createShipsForComputer:r,deployFleet:e=>{t.placeShip(e,!1)}}},d=()=>{const e=document.querySelector(".player1-start"),t=document.querySelector(".carrier-container"),n=document.querySelector(".battleship-container"),a=document.querySelector(".destroyer-container"),l=document.querySelector(".sub-container"),o=document.querySelector(".patrol-container");let d=null,c=null,p="",u=null,m=!1;function g(e){p=e.target.classList[1].split("")[0],p=parseInt(p),u=e.target.classList[1].split("")[1]}function h(e){m=!1,d=this.id,c=e,this.className+=" hold",setTimeout((()=>this.className="invisible"),0)}function y(){this.className=m?"invisible":this.id}function f(e){e.preventDefault()}function S(e){e.preventDefault()}function I(){this.className="grids"}function N(e){e.preventDefault();let t=parseInt(this.id.split("-")[0]),n=document.getElementById(d);!function(e,t,n){let a=[],l={c:5,b:4,d:3,s:3,p:2},o=t-e+1,d=l[n];o="c"==n?function(e,t,r,n,a,s){let i=a,l=s,o=parseInt(i.toString().split("")[0]),d=parseInt(i.toString().split("")[1]),c=parseInt(t.toString().split("")[1]),p=parseInt(t.toString().split("")[0]);return(5==l&&d>5||5==l&&isNaN(d)&&o>5)&&(i=isNaN(d)?6:parseInt(`${o}6`)),(e>c||isNaN(c)&&e>p)&&(console.log("in"),i=isNaN(c)?1:parseInt(`${p}1`)),(1==e&&0==d||0===d&&1===o)&&(i=parseInt(o-1+"6")),i}(e,t,0,0,o,d):"b"==n?function(e,t,r,n,a,s){let i=a,l=s,o=parseInt(i.toString().split("")[0]),d=parseInt(i.toString().split("")[1]),c=parseInt(t.toString().split("")[1]),p=parseInt(t.toString().split("")[0]);return(4==l&&d>6||4==l&&isNaN(d)&&o>6)&&(i=isNaN(d)?7:parseInt(`${o}7`)),(e>c||isNaN(c)&&e>p)&&(console.log("in"),i=isNaN(c)?1:parseInt(`${p}1`)),(1==e&&0==d||0===d&&1===o)&&(i=parseInt(o-1+"7")),i}(e,t,0,0,o,d):"d"==n||"s"==n?function(e,t,r,n,a,s){let i=a,l=s,o=parseInt(i.toString().split("")[0]),d=parseInt(i.toString().split("")[1]),c=parseInt(t.toString().split("")[1]),p=parseInt(t.toString().split("")[0]);return(3==l&&d>7||3==l&&isNaN(d)&&o>7)&&(i=isNaN(d)?8:parseInt(`${o}8`)),(e>c||isNaN(c)&&e>p)&&(console.log("in"),i=isNaN(c)?1:parseInt(`${p}1`)),(1==e&&0==d||0===d&&1===o)&&(i=parseInt(o-1+"8")),i}(e,t,0,0,o,d):function(e,t,r,n,a,s){let i=a,l=s,o=parseInt(i.toString().split("")[0]),d=parseInt(i.toString().split("")[1]),c=parseInt(t.toString().split("")[1]),p=parseInt(t.toString().split("")[0]);return(2==l&&d>8||2==l&&isNaN(d)&&o>8)&&(i=isNaN(d)?9:parseInt(`${o}9`)),(e>c||isNaN(c)&&e>p)&&(console.log("in"),i=isNaN(c)?1:parseInt(`${p}1`)),(1==e&&0==d||0===d&&1===o)&&(i=parseInt(o-1+"9")),i}(e,t,0,0,o,d);let c=!0;for(let e=o;e<d+o;e++){if(E.includes(e)){a.forEach((e=>{document.getElementById(`${e}-player-start`).style.backgroundColor="#00bfff",E=r(E,e)})),c=!1;break}document.getElementById(`${e}-player-start`).style.backgroundColor="#595959",E.push(e),a.push(e)}return a=[],v()&&(i(),s("Press play to attack the enemy.")),!!c}(p,t,u)?(n.className=n.id,m=!1):(n.className="invisible",m=!0)}let E=[];function v(){return 17==E.length}return{createStartBoard:function(t){e.appendChild(t)},createEventListeners:function(){t.addEventListener("mousedown",g),t.addEventListener("dragstart",h),t.addEventListener("dragend",y),n.addEventListener("mousedown",g),n.addEventListener("dragstart",h),n.addEventListener("dragend",y),a.addEventListener("mousedown",g),a.addEventListener("dragstart",h),a.addEventListener("dragend",y),l.addEventListener("mousedown",g),l.addEventListener("dragstart",h),l.addEventListener("dragend",y),o.addEventListener("mousedown",g),o.addEventListener("dragstart",h),o.addEventListener("dragend",y);for(let e=1;e<=100;e++){let t=document.getElementById(`${e}-player-start`);t.addEventListener("dragover",f),t.addEventListener("dragenter",S),t.addEventListener("dragleave",I),t.addEventListener("drop",N)}},allShipsplaced:v,resetBoard:function(){E.forEach((e=>{document.getElementById(`${e}-player-start`).style.backgroundColor="#00bfff"})),console.log(E,"in reset"),t.className="carrier-container",n.className="battleship-container",a.className="destroyer-container",l.className="sub-container",o.className="patrol-container"},resetCellsWithShip:function(){E=[]},getCellsWithShip:function(){return E}}};let c=(()=>{let t=document.querySelector(".player1"),r=document.querySelector(".player2"),n=(document.querySelector(".player1-start"),document.querySelector(".container")),a=document.getElementById("reset"),l=[],c=document.getElementById("play"),p=document.querySelector(".gameStartScreen"),u=d(),m=o(!1),g=o(!0);return t.appendChild(e(m)),r.appendChild(e(g)),u.createStartBoard(e(m,1)),u.createEventListeners(),s("Admiral, deploy your fleet by dragging and dropping ships on to the grid!"),a.addEventListener("click",(()=>{u.resetBoard(),u.resetCellsWithShip()})),c.addEventListener("click",(()=>{l=u.getCellsWithShip(),p.style.display="none",n.style.display="grid",m.deployFleet(l),i(),s("Choose a location to attack.")})),{playGame:e=>{m.humanMove(e,g)&&g.computerMove(m)}}})();document.getElementById("computer-grid").addEventListener("click",(e=>{if("computer-grid"!==e.target.id){let t=e.target.id,r=parseInt(t.split("-")[0]);c.playGame(r)}}))})();