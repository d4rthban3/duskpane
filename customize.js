/* Customizer for Duskpane (store page only). Written separately from the template; it shares no code with it. */
(function(){
"use strict";
var FONTS={system:["System",'-apple-system,BlinkMacSystemFont,"Inter",system-ui,sans-serif'],serif:["Serif",'"Iowan Old Style","Palatino Linotype",Georgia,"Times New Roman",serif'],rounded:["Rounded",'ui-rounded,"SF Pro Rounded","Nunito","Varela Round",system-ui,sans-serif'],humanist:["Humanist",'"Avenir Next","Seravek","Gill Sans","Trebuchet MS",system-ui,sans-serif'],mono:["Monospace",'ui-monospace,"SF Mono","JetBrains Mono",Menlo,monospace']};
var COLS=[["background","Page background"],["text","Main text"],["muted","Quieter text"],["accent","Accent (buttons, highlights)"],["accent2","Second accent"],["accentText","Text on accent"],["glass","Glass card tint"],["glow","Background glow"],["headingChip","Heading chips (above page titles)"],["choiceChip","Choice chips (filter pills)"],["tag","Tag labels (chips)"]];
var C=function(a){return {background:a[0],text:a[1],muted:a[2],accent:a[3],accent2:a[4],accentText:a[5],glass:a[6],glow:a[7],tag:a[8],headingChip:a[9],choiceChip:a[10]}};
var LOOKS=[
 {id:"duskpane",name:"Duskpane",corners:22,font:"system",chipFont:"same",dark:C(["#130e1f","#fbeee6","#a99fb4","#ffb36b","#ff7a9a","#1a0f10","#06030e","#cd508c","#ffa9c4","#ff8fb6","#ffb36b"]),light:C(["#f3e2d6","#2a1620","#5a4650","#a8481f","#a3235f","#ffffff","#fcf3ec","#be3c6e","#be3c6e","#a3235f","#a8481f"])},
 {id:"moss",name:"Moss",corners:10,font:"serif",chipFont:"same",dark:C(["#0d1a14","#e8f5ec","#8fa89a","#7be0a4","#f2c15e","#08140d","#03100a","#2f9e6b","#9be8bd","#f2c15e","#7be0a4"]),light:C(["#e4efe6","#14261b","#44584b","#1f7a4a","#8a5a00","#ffffff","#f2f9f3","#2f9e6b","#1f7a4a","#8a5a00","#1f7a4a"])},
 {id:"harbor",name:"Harbor",corners:30,font:"rounded",chipFont:"same",dark:C(["#0a1422","#e6f0fb","#8ea3bb","#5cc2ff","#ff8fa3","#04121f","#030a14","#2b6fd1","#9fd8ff","#ff8fa3","#5cc2ff"]),light:C(["#e3edf7","#112033","#465a70","#0b6bb8","#b8325a","#ffffff","#f1f7fc","#2b6fd1","#0b6bb8","#b8325a","#0b6bb8"])},
 {id:"graphite",name:"Graphite",corners:4,font:"humanist",chipFont:"mono",dark:C(["#121212","#f0f0f0","#9a9a9a","#f5d547","#ff6b5e","#141000","#060606","#6b6b6b","#e0e0e0","#ff6b5e","#f5d547"]),light:C(["#e9e9e6","#1b1b1b","#555555","#1b1b1b","#b3261e","#ffffff","#f7f7f5","#8a8a8a","#333333","#b3261e","#1b1b1b"])}
];
var $=function(id){return document.getElementById(id)};
var state,look="duskpane",mode="dark",width="desktop",screen="home";
function clone(o){return JSON.parse(JSON.stringify(o))}
function load(id){var l=LOOKS.filter(function(x){return x.id===id})[0];look=id;state={corners:l.corners,font:l.font,chipFont:l.chipFont,dark:clone(l.dark),light:clone(l.light)}}
function hex(v){var s=String(v==null?"":v).trim().replace(/^#/,"");if(!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s))return null;if(s.length===3)s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2];return "#"+s.toLowerCase()}
function rgb(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)].join(",")}
function fontCss(f){return FONTS[f]?FONTS[f][1]:String(f).replace(/[{};<>]/g,"")}

/* ---- preview: sample screens, built here from small helpers ---- */
function ico(inner){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+inner+'</svg>'}
function sunIcon(){var r="",a,k;for(k=0;k<8;k++){a=k*Math.PI/4;r+='<line x1="'+(12+Math.cos(a)*7.4).toFixed(1)+'" y1="'+(12+Math.sin(a)*7.4).toFixed(1)+'" x2="'+(12+Math.cos(a)*9.6).toFixed(1)+'" y2="'+(12+Math.sin(a)*9.6).toFixed(1)+'"/>'}return ico('<circle r="4" cx="12" cy="12"/>'+r)}
function sq(x,y){return '<rect rx="2" width="7" height="7" x="'+x+'" y="'+y+'"/>'}
var ICON={
 moon:function(){return ico('<path d="M20 14.5 A8 8 0 0 1 9.5 4 A8 8 0 1 0 20 14.5 Z"/>')},
 sun:sunIcon,
 menu:function(){return ico('<polyline points="4,6 20,6"/><polyline points="4,12 20,12"/><polyline points="4,18 20,18"/>')},
 home:function(){return ico(sq(4,4)+sq(13,4)+sq(4,13)+sq(13,13))},
 list:function(){return ico('<path d="M8 6H20M8 12H20M8 18H20"/><path d="M4 6v.01M4 12v.01M4 18v.01"/>')},
 map:function(){return ico('<polyline points="4,9 4,4 9,4"/><polyline points="15,4 20,4 20,9"/><polyline points="20,15 20,20 15,20"/><polyline points="9,20 4,20 4,15"/><rect rx="1.5" x="9" y="9" width="6" height="6"/>')},
 about:function(){return ico('<circle cx="12" cy="12" r="9"/><path d="M12 11V16M12 8v.01"/>')}
};
function h(tag,cls,inner,extra){return '<'+tag+(cls?' class="'+cls+'"':'')+(extra||'')+'>'+inner+'</'+tag+'>'}
var GOODS=[["Lamp","LMP-01",64,"4.9",66,"",120],["Chair","CHR-02",182,"4.2",71,"Low stock",8],["Notebook","NTB-03",5.4,null,null,"",900],["Planter","PLT-04",41,null,null,"New",35],["Desk","DSK-05",97.5,"4.6",58,"",22],["Bench","BNC-06",233,"4.4",90,"Bundle",15]];
function money(n){return "$"+(n%1===0?n:n.toFixed(2))}
function score(g){return g[3]==null?h("div","score",h("b","","—")+" no reviews yet"):h("div","score",h("b",+g[3]>=4.5?"":"soft",g[3])+" / 5 ("+g[4]+")")}
function disc(t){return h("div","disc",t)}
function panels(list){return h("div","panels",list.map(function(c){return h("div","panel frost",h("h3","",c[0])+h("p","",c[1]))}).join(""))}
var SCREENS={
 home:function(){
  var cards=[GOODS[0],GOODS[2]].map(function(g){return h("div","tile frost",disc(g[0].charAt(0))+h("h3","","Sample "+g[0])+h("span","sku",g[1])+(g[5]?h("span","label",g[5]):"")+h("div","foot-meta","PRICE "+money(g[2]))+score(g))}).join("");
  return h("span","gchip","Starter page")+h("h1","","Welcome")+h("p","intro","A starter page: product cards, a pill filter, a list and a detail view, in light and dark. Replace this text and the sample data with your own.")+h("div","choices",h("span","choice sel","Home")+h("span","choice","Office")+h("span","choice","Outdoor"))+h("div","tiles",cards)},
 list:function(){
  var head=h("div","line colhead",h("span","gap","")+h("span","who","Name")+h("span","","Price")+h("span","hide","Rating")+h("span","num","Stock"));
  var rows=GOODS.map(function(g){var low=g[6]<=10,meh=g[3]&&+g[3]<4.5;return h("div","line",disc(g[0].charAt(0))+h("span","who",h("b","","Sample "+g[0])+"<br>"+h("span","sku",g[1]))+h("span","mono",money(g[2]))+h("span","mono hide"+(meh?" warn":""),g[3]||"—")+h("span","mono num"+(low?" warn":""),low?"Low ("+g[6]+")":g[6]))}).join("");
  return h("span","gchip","Table")+h("h1","","List")+h("p","intro","A table that collapses neatly on a phone.")+h("div","grid-table frost",head+rows)},
 item:function(){
  var g=GOODS[0],facts=[["Price","$64"],["Rating","4.9"],["Reviews","66"],["Stock","120"],["Sold","1840"],["Listed","12d ago"]].map(function(f){return h("div","fact",h("small","",f[0])+h("b","",f[1]))}).join("");
  return h("span","goback","← Back")+h("section","detail frost",h("span","gchip","Detail",' style="margin:0 0 10px"')+disc("L")+h("h1","","Sample Lamp")+h("div","sku",g[1],' style="font-size:20px"')+score(g)+h("div","facts",facts))},
 map:function(){return h("span","gchip","Pages")+h("h1","","Map")+h("p","intro","Every page at a glance.")+panels([["Home","Welcome and product cards"],["List","A table of everything"],["Item","One product in detail"],["About","Who you are"]])},
 about:function(){return h("span","gchip","Info")+h("h1","","About")+h("p","intro","This page is a template. Tell visitors who you are and what this site is for.")+panels([["Fast","Plain HTML, CSS and a little script. No build step."],["Light and dark","Follows the visitor’s setting; the button in the header switches it."],["Phone first","Layouts fit narrow screens and grow to a wide page."]])+h("span","cta","Get started")}
};
var pv=$("pv");
function render(){
 var c=state[mode],chipF=state.chipFont==="same"?state.font:state.chipFont;
 var map={"--ink":c.background,"--text":c.text,"--mute":c.muted,"--acc":c.accent,"--acc2":c.accent2,"--acct":c.accentText,"--glow":c.glow,"--fg-rgb":rgb(c.text),"--glass-rgb":rgb(c.glass),"--acc-rgb":rgb(c.accent),"--glow-rgb":rgb(c.glow),"--chead-rgb":rgb(c.headingChip),"--cchoice-rgb":rgb(c.choiceChip),"--tag-rgb":rgb(c.tag),"--r":state.corners+"px","--font":fontCss(state.font),"--chip-font":fontCss(chipF)};
 Object.keys(map).forEach(function(k){pv.style.setProperty(k,map[k])});
 pv.className="pv "+mode+(width==="phone"?" narrow":" wide");
 var tabs=[["home","Home"],["list","List"],["map","Map"],["about","About"]];
 var dock=tabs.map(function(t){var here=screen===t[0]||(screen==="item"&&t[0]==="home");return '<button type="button" data-s="'+t[0]+'"'+(here?' class="here" aria-current="page"':'')+'>'+ICON[t[0]]()+t[1]+'</button>'}).join("");
 pv.innerHTML=h("div","scene",'<i class="ring r1"></i><i class="ring r2"></i><i class="ring r3"></i>',' aria-hidden="true"')+h("div","page",h("header","bar frost",h("span","round",ICON[mode==="light"?"moon":"sun"]())+h("span","logo","<i></i>Duskpane")+h("span","round",ICON.menu()))+SCREENS[screen]()+h("p","small-print","Duskpane · sample content only"))+h("nav","dock frost",dock,' aria-label="Preview screens"');
 fit();
 var tile=pv.querySelector(".tile");if(tile)tile.onclick=function(){screen="item";render()};
 [].forEach.call(pv.querySelectorAll(".dock button"),function(b){b.onclick=function(){screen=b.getAttribute("data-s");render()}});
 var back=pv.querySelector(".goback");if(back)back.onclick=function(){screen="home";render()};
}

function fit(){var st=document.querySelector(".cz-stage"),f=$("fit"),W=width==="phone"?390:900,avail=st.clientWidth-26,k=Math.min(1,avail/W);pv.style.transform="scale("+k+")";f.style.width=(W*k)+"px";f.style.height=(pv.offsetHeight*k)+"px"}
addEventListener("resize",fit);
/* ---- controls ---- */
function buildLooks(){
 $("looks").innerHTML=LOOKS.map(function(l){var s=l[mode];return '<button type="button" class="look" data-l="'+l.id+'" aria-pressed="'+(l.id===look)+'"><span class="sw">'+[s.background,s.accent,s.accent2,s.glow,s.text].map(function(x){return '<i style="background:'+x+'"></i>'}).join("")+'</span><b>'+l.name+(l.id==="duskpane"?" (dark and light)":"")+'</b></button>'}).join("");
 [].forEach.call(document.querySelectorAll(".look"),function(b){b.onclick=function(){load(b.dataset.l);sync()}});
}
function buildCols(){
 $("cols").innerHTML=COLS.map(function(c){return '<label class="col"><input type="color" data-k="'+c[0]+'" aria-label="'+c[1]+'"><span>'+c[1]+'</span><input type="text" data-t="'+c[0]+'" maxlength="7" aria-label="'+c[1]+' (hex)" autocomplete="off" spellcheck="false"></label>'}).join("");
 [].forEach.call(document.querySelectorAll("#cols input[type=color]"),function(i){i.oninput=function(){state[mode][i.dataset.k]=i.value;syncCols();render();note()}});
 [].forEach.call(document.querySelectorAll("#cols input[type=text]"),function(i){i.oninput=function(){var h=hex(i.value);i.setAttribute("aria-invalid",h?"false":"true");if(h){state[mode][i.dataset.t]=h;document.querySelector('input[data-k="'+i.dataset.t+'"]').value=h;render();note()}}});
}
function syncCols(){
 $("editing").textContent="(editing "+mode+")";
 COLS.forEach(function(c){var v=state[mode][c[0]];document.querySelector('input[data-k="'+c[0]+'"]').value=v;var t=document.querySelector('input[data-t="'+c[0]+'"]');if(document.activeElement!==t){t.value=v;t.setAttribute("aria-invalid","false")}});
}
function sync(){
 buildLooks();syncCols();
 $("font").value=FONTS[state.font]?state.font:"custom";$("customRow").hidden=!!FONTS[state.font];if(!FONTS[state.font])$("fontCustom").value=state.font;
 $("chipFont").value=state.chipFont;
 $("corners").value=state.corners;$("cornersOut").textContent=state.corners;
 [].forEach.call(document.querySelectorAll("[data-m]"),function(b){b.setAttribute("aria-pressed",b.dataset.m===mode)});
 [].forEach.call(document.querySelectorAll("[data-w]"),function(b){b.setAttribute("aria-pressed",b.dataset.w===width)});
 document.querySelector(".cz-stage").className="cz-stage "+width;
 render();note(true);
}
function note(clear){$("saved").textContent=clear?"":"Changed. Download the file when you are happy with it."}
$("font").innerHTML=Object.keys(FONTS).map(function(k){return '<option value="'+k+'">'+FONTS[k][0]+'</option>'}).join("")+'<option value="custom">Your own…</option>';
$("chipFont").innerHTML='<option value="same">Same as the main font</option>'+Object.keys(FONTS).map(function(k){return '<option value="'+k+'">'+FONTS[k][0]+'</option>'}).join("");
$("chipFont").onchange=function(){state.chipFont=this.value;render();note()};
$("font").onchange=function(){var v=this.value;if(v==="custom"){$("customRow").hidden=false;state.font=$("fontCustom").value||"Georgia, serif";$("fontCustom").value=state.font}else{$("customRow").hidden=true;state.font=v}render();note()};
$("fontCustom").oninput=function(){state.font=this.value||"system";render();note()};
$("corners").oninput=function(){state.corners=+this.value;$("cornersOut").textContent=this.value;render();note()};
[].forEach.call(document.querySelectorAll("[data-m]"),function(b){b.onclick=function(){mode=b.dataset.m;sync()}});
[].forEach.call(document.querySelectorAll("[data-w]"),function(b){b.onclick=function(){width=b.dataset.w;sync()}});
$("reset").onclick=function(){load(look);sync()};

/* ---- the settings file: same shape as the one in the template ---- */
function q(s){return JSON.stringify(s)}
function file(){
 var pad=function(k){return k+":"+new Array(Math.max(1,12-k.length)).join(" ")};
 var blk=function(o){return COLS.map(function(c,i){return "    "+pad(c[0])+q(o[c[0]])+(i<COLS.length-1?",":"")}).join("\n")};
 return "/* Duskpane settings, made with the Duskpane customizer. Keep this file next to index.html (replace the one that is there).\n   Delete a line to get the original value back. Colours are hex, like #ffb36b. */\nwindow.DUSKPANE_SETTINGS = {\n  /* corners: 0 = square, 22 = original, 40 = very round (pixels) */\n  corners: "+state.corners+",\n  /* font: \"system\", \"serif\", \"rounded\", \"humanist\", \"mono\", or your own CSS font-family text */\n  font: "+q(state.font)+",\n  /* chipFont: font of the small glass chips: \"same\" (as the main font), or the same choices as font */\n  chipFont: "+q(state.chipFont)+",\n  dark: {\n"+blk(state.dark)+"\n  },\n  light: {\n"+blk(state.light)+"\n  }\n};\n";
}
$("dl").onclick=function(){
 var b=new Blob([file()],{type:"text/javascript"}),a=document.createElement("a");
 a.href=URL.createObjectURL(b);a.download="duskpane-settings.js";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000);
 $("saved").textContent="Downloaded duskpane-settings.js. Put it next to index.html in the template.";
};
window.__duskFile=file; // lets the side-by-side check read the exact text

/* ---- the store's own light/dark ---- */
var r=document.documentElement;
function smode(t){r.setAttribute("data-mode",t);try{localStorage.setItem("mode",t)}catch(e){}}
var m=/[?&]mode=(light|dark)/.exec(location.search),s0=null;try{s0=localStorage.getItem("mode")}catch(e){}
smode(m?m[1]:(s0||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")));
$("mode").onclick=function(){smode(r.getAttribute("data-mode")==="dark"?"light":"dark")};

/* options in the address (for pictures and sharing): ?look=moss&pv=light&w=phone&s=list */
var qs=location.search,g=function(k){var x=new RegExp("[?&]"+k+"=([a-z]+)").exec(qs);return x?x[1]:null};
load(LOOKS.some(function(l){return l.id===g("look")})?g("look"):"duskpane");
if(g("pv")==="light"||g("pv")==="dark")mode=g("pv");
if(g("w")==="phone")width="phone";
if(SCREENS[g("s")])screen=g("s");
buildCols();sync();
})();
