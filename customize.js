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
function hex(h){var m=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(h||"").trim());if(!m)return null;var x=m[1];if(x.length===3)x=x.replace(/./g,"$&$&");return "#"+x.toLowerCase()}
function rgb(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)].join(",")}
function fontCss(f){return FONTS[f]?FONTS[f][1]:String(f).replace(/[{};<>]/g,"")}

/* ---- preview ---- */
var SVG={sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>',
 moon:'<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
 menu:'<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
 home:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>',
 list:'<svg viewBox="0 0 24 24"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
 map:'<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>',
 about:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'};
var ITEMS=[["Lamp","LMP-01",64,"4.9",66,"",120],["Chair","CHR-02",182,"4.2",71,"Low stock",8],["Notebook","NTB-03",5.4,null,null,"",900],["Planter","PLT-04",41,null,null,"New",35],["Desk","DSK-05",97.5,"4.6",58,"",22],["Bench","BNC-06",233,"4.4",90,"Bundle",15]];
function p(n){return "$"+(Number.isInteger(n)?n:n.toFixed(2))}
function rating(i){return i[3]==null?'<div class="rating"><strong>—</strong> no reviews yet</div>':'<div class="rating"><strong class="'+(+i[3]>=4.5?"":"mid")+'">'+i[3]+'</strong> / 5 ('+i[4]+')</div>'}
var SCREENS={
 home:function(){return '<span class="pchip">Starter page</span><h1>Welcome</h1><p class="plead">A starter page: product cards, a pill filter, a list and a detail view, in light and dark. Replace this text and the sample data with your own.</p><div class="pills"><span class="pill on">Home</span><span class="pill">Office</span><span class="pill">Outdoor</span></div><div class="field">'+[ITEMS[0],ITEMS[2]].map(function(i){return '<div class="tile glass"><div class="av">'+i[0][0]+'</div><h3>Sample '+i[0]+'</h3><span class="code">'+i[1]+'</span>'+(i[5]?'<span class="ptag">'+i[5]+'</span>':'')+'<div class="meta">PRICE '+p(i[2])+'</div>'+rating(i)+'</div>'}).join("")+'</div>'},
 list:function(){return '<span class="pchip">Table</span><h1>List</h1><p class="plead">A table that collapses neatly on a phone.</p><div class="table glass"><div class="tr head"><span></span><span>Name</span><span>Price</span><span>Rating</span><span>Stock</span></div>'+ITEMS.map(function(i){return '<div class="tr"><div class="av">'+i[0][0]+'</div><span><b>Sample '+i[0]+'</b><br><span class="code">'+i[1]+'</span></span><span class="mono">'+p(i[2])+'</span><span class="mono '+(i[3]&&+i[3]<4.5?"down":"")+'">'+(i[3]||"—")+'</span><span class="mono '+(i[6]<=10?"down":"")+'">'+(i[6]<=10?"Low ("+i[6]+")":i[6])+'</span></div>'}).join("")+'</div>'},
 item:function(){var i=ITEMS[0];return '<span class="back">← Back</span><section class="hero2 glass"><span class="pchip" style="margin:0 0 10px">Detail</span><div class="av">L</div><h1>Sample Lamp</h1><div class="code" style="font-size:20px">LMP-01</div>'+rating(i)+'<div class="stats">'+[["Price","$64"],["Rating","4.9"],["Reviews","66"],["Stock","120"],["Sold","1840"],["Listed","12d ago"]].map(function(s){return '<div class="stat"><span>'+s[0]+'</span><b>'+s[1]+'</b></div>'}).join("")+'</div></section>'},
 map:function(){return '<span class="pchip">Pages</span><h1>Map</h1><p class="plead">Every page at a glance.</p><div class="cards">'+[["Home","Welcome and product cards"],["List","A table of everything"],["Item","One product in detail"],["About","Who you are"]].map(function(c){return '<div class="pcard glass"><h3>'+c[0]+'</h3><p>'+c[1]+'</p></div>'}).join("")+'</div>'},
 about:function(){return '<span class="pchip">Info</span><h1>About</h1><p class="plead">This page is a template. Tell visitors who you are and what this site is for.</p><div class="cards">'+[["Fast","Plain HTML, CSS and a little script. No build step."],["Light and dark","Follows the visitor’s setting; the button in the header switches it."],["Phone first","Layouts fit narrow screens and grow to a wide page."]].map(function(c){return '<div class="pcard glass"><h3>'+c[0]+'</h3><p>'+c[1]+'</p></div>'}).join("")+'</div><span class="btn2">Get started</span>'}
};
var pv=$("pv");
function render(){
 var c=state[mode];
 var v={"--ink":c.background,"--text":c.text,"--mute":c.muted,"--acc":c.accent,"--acc2":c.accent2,"--acct":c.accentText,  "--fg-rgb":rgb(c.text),"--glass-rgb":rgb(c.glass),"--acc-rgb":rgb(c.accent),"--glow-rgb":rgb(c.glow),"--glow":c.glow,"--r":state.corners+"px","--font":fontCss(state.font),"--chead-rgb":rgb(c.headingChip),"--cchoice-rgb":rgb(c.choiceChip),"--tag-rgb":rgb(c.tag),"--chip-font":state.chipFont==="same"?fontCss(state.font):fontCss(state.chipFont)};
 for(var k in v)pv.style.setProperty(k,v[k]);
 pv.className="pv "+mode+(width==="phone"?" narrow":" wide");
 var nav=[["home","Home"],["list","List"],["map","Map"],["about","About"]];
 pv.innerHTML='<div class="bg" aria-hidden="true"><i></i><i></i><i></i></div><div class="app"><header class="ptop glass"><span class="ib">'+(mode==="light"?SVG.moon:SVG.sun)+'</span><span class="pbrand"><b></b>Duskpane</span><span class="ib">'+SVG.menu+'</span></header>'+SCREENS[screen]()+'<p class="foot">Duskpane · sample content only</p></div><nav class="dock glass" aria-label="Preview screens">'+nav.map(function(n){var cur=(screen===n[0]||(screen==="item"&&n[0]==="home"));return '<button type="button" data-s="'+n[0]+'"'+(cur?' aria-current="page"':'')+'>'+SVG[n[0]]+n[1]+'</button>'}).join("")+'</nav>';
 // item screen reachable from a tile
 fit();
 var t=pv.querySelector(".tile");if(t){t.style.cursor="pointer";t.onclick=function(){screen="item";render()}}
 [].forEach.call(pv.querySelectorAll(".dock button"),function(b){b.onclick=function(){screen=b.dataset.s;render()}});
 var bk=pv.querySelector(".back");if(bk){bk.style.cursor="pointer";bk.onclick=function(){screen="home";render()}}
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
