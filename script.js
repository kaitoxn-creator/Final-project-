var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
var up=document.getElementById("top");
window.addEventListener("scroll",function(){up.style.display=window.scrollY>400?"block":"none";});
up.addEventListener("click",function(){window.scrollTo({top:0});});
var v=document.getElementById("verse");
if(v){var vs=[["Thy word is a lamp unto my feet, and a light unto my path.","Psalm 119:105"],["Let your light so shine before men.","Matthew 5:16"],["The integrity of the upright shall guide them.","Proverbs 11:3"],["Be ye kind one to another.","Ephesians 4:32"],["I am the light of the world.","John 8:12"]],n=0;
document.getElementById("nv").addEventListener("click",function(){n=(n+1)%vs.length;v.firstChild.textContent="\u201C"+vs[n][0]+"\u201D";document.getElementById("vc").textContent=vs[n][1];});}
var L=document.getElementById("list");
if(L){var items=[];try{items=JSON.parse(localStorage.getItem("tcgcJournal2")||"[]");}catch(e){}
var save=function(){try{localStorage.setItem("tcgcJournal2",JSON.stringify(items));}catch(e){}};
var show=function(){L.innerHTML="";if(!items.length){L.innerHTML="<p>No reflections yet. Write your first one above.</p>";}
items.forEach(function(x,i){var d=document.createElement("div");d.className="entry";var s=document.createElement("div");s.textContent=x.t;var m=document.createElement("small");m.textContent=x.d;s.appendChild(m);var b=document.createElement("button");b.textContent="Delete";b.addEventListener("click",function(){items.splice(i,1);save();show();});d.appendChild(s);d.appendChild(b);L.appendChild(d);});
document.getElementById("cnt").textContent=items.length;};
var t=document.getElementById("t");
document.querySelectorAll(".chip").forEach(function(c){c.addEventListener("click",function(){t.value=c.textContent+" ";t.focus();});});
document.getElementById("add").addEventListener("click",function(){var x=t.value.trim();if(!x){t.focus();return;}items.unshift({t:x,d:new Date().toLocaleDateString()});save();t.value="";show();});
show();}
if(document.getElementById("bar")){var cb=document.querySelectorAll(".pledge input"),bar=document.getElementById("bar");
cb.forEach(function(c){c.addEventListener("change",function(){var k=document.querySelectorAll(".pledge input:checked").length;bar.style.width=(k/cb.length*100)+"%";document.getElementById("pc").textContent=k+" of "+cb.length+" done";});});}
var ids=["login","home","faith","integrity","digital"];
function inn(){try{return sessionStorage.getItem("tcgcIn")==="1";}catch(e){return false;}}
function route(){
var h=(location.hash||"#login").slice(1);
if(ids.indexOf(h)<0){h="login";}
if(h!=="login"&&!inn()){h="login";}
if(h==="login"){try{sessionStorage.removeItem("tcgcIn");}catch(e){}}
ids.forEach(function(i){document.getElementById(i).hidden=(i!==h);});
document.body.classList.toggle("is-login",h==="login");
document.querySelectorAll("nav a").forEach(function(a){a.classList.toggle("on",a.getAttribute("data-v")===h);});
var t=document.getElementById(h).getAttribute("data-title");
document.title=(t?t+" | ":"")+"TCGC Light of the World";
window.scrollTo(0,0);}
window.addEventListener("hashchange",route);
document.getElementById("f").addEventListener("submit",function(e){e.preventDefault();
var u=document.getElementById("u").value.trim(),p=document.getElementById("p").value;
if(u===""||p.length<4){document.getElementById("msg").textContent="Enter a username and a password of at least 4 characters.";return;}
try{sessionStorage.setItem("tcgcIn","1");}catch(x){}
document.getElementById("msg").textContent="";
if(location.hash==="#home"){route();}else{location.hash="#home";}});
document.getElementById("sp").addEventListener("change",function(){document.getElementById("p").type=this.checked?"text":"password";});
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(){if(a.getAttribute("href")===location.hash){route();}});});
route();
