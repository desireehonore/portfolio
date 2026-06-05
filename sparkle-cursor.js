var colour="random"; 
var sparkles=30;
var x=ox=400; var y=oy=300; var swide=800; var shigh=600;
var sleft=sdown=0; var tiny=[], star=[], starv=[], starx=[], stary=[], tinyx=[], tinyy=[], tinyv=[];

window.onload=function() {
  if (document.getElementById) {
    for (let i=0; i<sparkles; i++) {
      let rats=createDiv(3, 3);
      rats.style.visibility="hidden"; rats.style.zIndex="999";
      document.body.appendChild(tiny[i]=rats);
      starv[i]=tinyv[i]=0;
      rats=createDiv(5, 5); rats.style.backgroundColor="transparent";
      rats.style.visibility="hidden"; rats.style.zIndex="999";
      let rlef=createDiv(1, 5); let rdow=createDiv(5, 1);
      rats.appendChild(rlef); rats.appendChild(rdow);
      rlef.style.top="2px"; rlef.style.left="0px";
      rdow.style.top="0px"; rdow.style.left="2px";
      document.body.appendChild(star[i]=rats);
    }
    set_width(); sparkle();
  }
};

function sparkle() {
  let c;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x; oy=y;
    for (c=0; c<sparkles; c++) if (!starv[c]) {
      star[c].style.left=(starx[c]=x)+"px";
      star[c].style.top=(stary[c]=y+1)+"px";
      star[c].style.clip="rect(0px, 5px, 5px, 0px)";
      let color = (colour=="random") ? newColour() : colour;
      star[c].childNodes[0].style.backgroundColor = color;
      star[c].childNodes[1].style.backgroundColor = color;
      star[c].style.visibility="visible";
      starv[c]=50;
      break;
    }
  }
  for (c=0; c<sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  setTimeout(sparkle, 40);
}

function update_star(i) {
  if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
  if (starv[i]) {
    stary[i]+=1+Math.random()*3;
    starx[i]+=(i%5-2)/5;
    if (stary[i]<shigh+sdown) {
      star[i].style.top=stary[i]+"px";
      star[i].style.left=starx[i]+"px";
    } else { star[i].style.visibility="hidden"; starv[i]=0; }
  } else {
    tinyv[i]=50; tiny[i].style.top=(tinyy[i]=stary[i])+"px";
    tiny[i].style.left=(tinyx[i]=starx[i])+"px";
    tiny[i].style.width="2px"; tiny[i].style.height="2px";
    tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility="hidden"; tiny[i].style.visibility="visible";
  }
}

function update_tiny(i) {
  if (--tinyv[i]==25) {
    tiny[i].style.width="1px"; tiny[i].style.height="1px";
  }
  if (tinyv[i]) {
    tinyy[i]+=1+Math.random()*3;
    tinyx[i]+=(i%5-2)/5;
    if (tinyy[i]<shigh+sdown) {
      tiny[i].style.top=tinyy[i]+"px";
      tiny[i].style.left=tinyx[i]+"px";
    } else { tiny[i].style.visibility="hidden"; tinyv[i]=0; }
  } else tiny[i].style.visibility="hidden";
}

document.onmousemove=function(e) {
  y = e.pageY; x = e.pageX;
};

window.onscroll=set_scroll;
function set_scroll() {
  sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

window.onresize=set_width;
function set_width() {
  swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 800;
  shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 600;
}

function createDiv(height, width) {
  let div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  return div;
}

function newColour() {
  let c=[255, Math.floor(Math.random()*256), Math.floor(Math.random()*200)];
  c.sort(()=>0.5 - Math.random());
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}