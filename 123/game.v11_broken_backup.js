if(typeof THREE==="undefined"){alert("Three.js не загрузился");throw new Error("Three.js missing");}
const ui={menu:document.getElementById("menu"),mode:document.getElementById("mode"),map:document.getElementById("map"),difficulty:document.getElementById("difficulty"),sens:document.getElementById("sens"),skinSelect:document.getElementById("skin-select"),openCase:document.getElementById("open-case"),cases:document.getElementById("cases"),caseLog:document.getElementById("case-log"),start:document.getElementById("start"),hud:document.getElementById("hud"),hp:document.getElementById("hp"),kills:document.getElementById("kills"),deaths:document.getElementById("deaths"),modeLabel:document.getElementById("mode-label"),time:document.getElementById("time"),state:document.getElementById("state"),acc:document.getElementById("acc"),weaponLabel:document.getElementById("weapon-label"),teamScore:document.getElementById("team-score"),scoreboard:document.getElementById("scoreboard"),scoreContent:document.getElementById("score-content"),pause:document.getElementById("pause"),resume:document.getElementById("resume"),back:document.getElementById("back"),buy:document.getElementById("buy"),buyTime:document.getElementById("buy-time"),buyPicked:document.getElementById("buy-picked"),buyClose:document.getElementById("buy-close"),buyItems:Array.from(document.querySelectorAll(".buy-item")),death:document.getElementById("death"),deathText:document.getElementById("death-text"),retry:document.getElementById("retry"),menuBtn:document.getElementById("menu-btn")};
const canvas=document.getElementById("game");
const MAPS=[{id:"dust",name:"Dust Yard",size:66,spawns:{ally:{x:-25,z:24},enemy:{x:25,z:-24},shared:{x:-23,z:23}},zones:[{name:"CT",color:0x3c77c5,x:-25,z:24,w:12,d:10},{name:"T",color:0xc34f4f,x:25,z:-24,w:12,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:12,d:10},{name:"A",color:0xcd6751,x:21,z:14,w:9,d:9},{name:"B",color:0x4f83c7,x:-21,z:-14,w:9,d:9}],walls:[{x:0,z:0,w:2,d:24},{x:-14,z:8,w:14,d:2},{x:14,z:-8,w:14,d:2},{x:-24,z:2,w:2,d:14},{x:24,z:-2,w:2,d:14},{x:0,z:16,w:10,d:2},{x:0,z:-16,w:10,d:2}],props:[{x:-8,z:-3,w:2,d:2,h:1.2,color:0x6d7c90},{x:8,z:3,w:2,d:2,h:1.2,color:0x6d7c90},{x:-18,z:14,w:3,d:2,h:1.2,color:0x74839a},{x:18,z:-14,w:3,d:2,h:1.2,color:0x74839a}],secrets:[{name:"Нычка A",x:24,z:15,w:2.6,d:2.6,found:false},{name:"Нычка Mid",x:-3,z:0,w:2.4,d:2.4,found:false},{name:"Нычка B",x:-24,z:-15,w:2.6,d:2.6,found:false}]},{id:"mirage",name:"Mirage Plaza",size:68,spawns:{ally:{x:-26,z:0},enemy:{x:26,z:0},shared:{x:-26,z:0}},zones:[{name:"CT",color:0x3c77c5,x:-26,z:0,w:11,d:10},{name:"T",color:0xc34f4f,x:26,z:0,w:11,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:12,d:12},{name:"A",color:0xcd6751,x:20,z:-18,w:9,d:9},{name:"B",color:0x4f83c7,x:-20,z:18,w:9,d:9}],walls:[{x:-10,z:0,w:2,d:30},{x:10,z:0,w:2,d:30},{x:0,z:0,w:20,d:2},{x:0,z:18,w:24,d:2},{x:0,z:-18,w:24,d:2},{x:-24,z:-8,w:2,d:12},{x:24,z:8,w:2,d:12}],props:[{x:-16,z:-14,w:2,d:3,h:1.2,color:0x718098},{x:16,z:14,w:2,d:3,h:1.2,color:0x718098},{x:0,z:10,w:3,d:2,h:1.2,color:0x5f7086},{x:0,z:-10,w:3,d:2,h:1.2,color:0x5f7086}],secrets:[{name:"Нычка Palace",x:22,z:-22,w:2.6,d:2.6,found:false},{name:"Нычка Window",x:-1,z:14,w:2.2,d:2.2,found:false},{name:"Нычка Apps",x:-22,z:22,w:2.6,d:2.6,found:false}]},{id:"inferno",name:"Inferno Lane",size:64,spawns:{ally:{x:-24,z:18},enemy:{x:24,z:-18},shared:{x:-23,z:17}},zones:[{name:"CT",color:0x3c77c5,x:-24,z:18,w:11,d:10},{name:"T",color:0xc34f4f,x:24,z:-18,w:11,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:10,d:10},{name:"A",color:0xcd6751,x:18,z:14,w:9,d:9},{name:"B",color:0x4f83c7,x:-18,z:-14,w:9,d:9}],walls:[{x:-8,z:8,w:2,d:24},{x:8,z:-8,w:2,d:24},{x:0,z:0,w:14,d:2},{x:-20,z:0,w:2,d:16},{x:20,z:0,w:2,d:16},{x:-2,z:22,w:12,d:2},{x:2,z:-22,w:12,d:2}],props:[{x:-12,z:-4,w:2,d:2,h:1.2,color:0x6e7d93},{x:12,z:4,w:2,d:2,h:1.2,color:0x6e7d93},{x:0,z:14,w:2,d:2,h:1.3,color:0x5f7086},{x:0,z:-14,w:2,d:2,h:1.3,color:0x5f7086}],secrets:[{name:"Нычка Balcony",x:20,z:20,w:2.6,d:2.6,found:false},{name:"Нычка Arch",x:0,z:0,w:2.2,d:2.2,found:false},{name:"Нычка Banana",x:-20,z:-20,w:2.6,d:2.6,found:false}]}];
const SKINS=[{id:"default",name:"Default Gray",icon:"◉",rarity:"Base",weight:0,color:0x74859a},{id:"desert",name:"Desert",icon:"◈",rarity:"Common",weight:50,color:0xcc9b5f},{id:"neon",name:"Neon",icon:"◆",rarity:"Rare",weight:28,color:0x2fd8ff},{id:"venom",name:"Venom",icon:"⬢",rarity:"Epic",weight:15,color:0x45d66f},{id:"obsidian",name:"Obsidian",icon:"✦",rarity:"Legendary",weight:7,color:0xe56b37}];
const WEAPONS={rifle:{id:"rifle",name:"AKR-12",slot:1,damage:33,fireRate:0.1,spread:0.008,range:42,auto:true,recoil:0.008,pellets:1},smg:{id:"smg",name:"Vector",slot:1,damage:21,fireRate:0.072,spread:0.014,range:30,auto:true,recoil:0.006,pellets:1},shotgun:{id:"shotgun",name:"M590",slot:1,damage:11,fireRate:0.72,spread:0.045,range:16,auto:false,recoil:0.016,pellets:6},pistol:{id:"pistol",name:"P350",slot:2,damage:25,fireRate:0.24,spread:0.007,range:32,auto:false,recoil:0.005,pellets:1},knife:{id:"knife",name:"Knife",slot:3,damage:58,fireRate:0.58,spread:0,range:1.95,auto:false,recoil:0.003,pellets:1},claws:{id:"claws",name:"Claws",slot:3,damage:0,fireRate:0.58,spread:0,range:1.95,auto:true,recoil:0,pellets:1}};
const AI={easy:{reaction:0.62,aimError:0.28,burst:0.28,strafe:0.6,cover:0.2},normal:{reaction:0.36,aimError:0.16,burst:0.52,strafe:1,cover:0.48},hard:{reaction:0.22,aimError:0.09,burst:0.84,strafe:1.35,cover:0.74}};
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.setSize(window.innerWidth,window.innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x0a1018);scene.fog=new THREE.Fog(0x0a1018,24,104);
const camera=new THREE.PerspectiveCamera(78,window.innerWidth/window.innerHeight,0.1,240);camera.rotation.order="YXZ";scene.add(camera);
scene.add(new THREE.HemisphereLight(0xd9e7ff,0x1e2b3a,0.9));const d=new THREE.DirectionalLight(0xfff2dc,1.25);d.position.set(22,30,10);d.castShadow=true;d.shadow.mapSize.set(1024,1024);d.shadow.camera.left=-40;d.shadow.camera.right=40;d.shadow.camera.top=40;d.shadow.camera.bottom=-40;scene.add(d);
const clock=new THREE.Clock();const keys=new Set();const mouse={fire:false,just:false};
const game={started:false,paused:false,mode:"duel",state:"menu",timeLeft:0,scoreLimit:0,buyPhase:false,buyTime:0,teamScore:{ally:0,enemy:0},status:"",statusTimer:0,reservedCover:new Set(),dirtyScore:true,caseRolling:false};
const player={team:"ally",hp:100,maxHp:100,alive:true,kills:0,deaths:0,pos:new THREE.Vector3(),prev:new THREE.Vector3(),eye:1.68,y:1.68,vy:0,onGround:true,speed:7.7,r:0.42,yaw:Math.PI,pitch:0,slot:1,primary:"rifle",shootCd:0,recoil:0,shots:0,hits:0,moved:0,step:0,respawn:0};
const inv={cases:3,owned:{default:1},equipped:"default"};
let selectedMap=MAPS[0],world=null,worldMeshes=[],bots=[],botId=0,fpWeapon=null,fpMats=[],audioCtx=null;const fx={muzzle:[],impacts:[]};const texCache={};
const clamp=(a,b,v)=>Math.max(a,Math.min(b,v));const rand=(a,b)=>a+Math.random()*(b-a);const rint=(a,b)=>Math.floor(rand(a,b+1));const ch=(p)=>Math.random()<p;
const modeName=(m)=>m==="duel"?"Duel 1v1":m==="team"?"Team 5v5":"Zombie Infection";const fmt=(s)=>{s=Math.max(0,Math.ceil(s));const m=Math.floor(s/60),r=s%60;return String(m).padStart(2,"0")+":"+String(r).padStart(2,"0")};
function disposeNode(n){n.traverse(x=>{if(x.geometry)x.geometry.dispose();if(x.material){if(Array.isArray(x.material))x.material.forEach(m=>m.dispose());else x.material.dispose();}})}
function clearWorld(){for(const b of bots){scene.remove(b.mesh);disposeNode(b.mesh)}bots=[];for(const m of worldMeshes){scene.remove(m);if(m.geometry)m.geometry.dispose();if(m.material){if(Array.isArray(m.material))m.material.forEach(x=>x.dispose());else m.material.dispose();}}worldMeshes=[];if(fpWeapon){camera.remove(fpWeapon);disposeNode(fpWeapon);fpWeapon=null;}game.reservedCover.clear();}
function addWorld(m){worldMeshes.push(m);scene.add(m)}
function inRect(x,z,r,p=0){const minX=r.x-r.w/2-p,maxX=r.x+r.w/2+p,minZ=r.z-r.d/2-p,maxZ=r.z+r.d/2+p;return x>minX&&x<maxX&&z>minZ&&z<maxZ}
function blockedAt(x,z,p=0){if(!world)return false;for(const b of world.blockers)if(inRect(x,z,b,p))return true;return false}
function mkGrid(map){const cell=2,half=map.size/2,cells=Math.floor(map.size/cell),blocked=new Array(cells*cells).fill(false);for(let gz=0;gz<cells;gz++)for(let gx=0;gx<cells;gx++){const x=-half+gx*cell+cell/2,z=-half+gz*cell+cell/2,edge=x<-half+1||x>half-1||z<-half+1||z>half-1;if(edge||blockedAt(x,z,0.68))blocked[gz*cells+gx]=true;}return{cell,half,cells,blocked}}
const walk=(g,x,z)=>x>=0&&z>=0&&x<g.cells&&z<g.cells&&!g.blocked[z*g.cells+x];const ckey=(x,z)=>x+"|"+z;
function toCell(g,x,z){return{gx:clamp(0,g.cells-1,Math.floor((x+g.half)/g.cell)),gz:clamp(0,g.cells-1,Math.floor((z+g.half)/g.cell))}}
const toWorld=(g,gx,gz)=>({x:-g.half+gx*g.cell+g.cell/2,z:-g.half+gz*g.cell+g.cell/2});
function nearWalk(g,gx,gz,max=6){if(walk(g,gx,gz))return{gx,gz};for(let r=1;r<=max;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.abs(dx)!==r&&Math.abs(dz)!==r)continue;const nx=gx+dx,nz=gz+dz;if(walk(g,nx,nz))return{gx:nx,gz:nz}}return null}
function aStar(g,from,to){const dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],open=[from],came=new Map(),G=new Map([[ckey(from.gx,from.gz),0]]),F=new Map([[ckey(from.gx,from.gz),0]]),inOpen=new Set([ckey(from.gx,from.gz)]);let guard=0;while(open.length&&guard<1900){guard++;open.sort((a,b)=>(F.get(ckey(a.gx,a.gz))??1e9)-(F.get(ckey(b.gx,b.gz))??1e9));const cur=open.shift(),k=ckey(cur.gx,cur.gz);inOpen.delete(k);if(cur.gx===to.gx&&cur.gz===to.gz){const out=[cur];let kk=k;while(came.has(kk)){const p=came.get(kk);out.push(p);kk=ckey(p.gx,p.gz)}out.reverse();return out;}for(const [dx,dz] of dirs){const nx=cur.gx+dx,nz=cur.gz+dz;if(!walk(g,nx,nz))continue;const diag=dx!==0&&dz!==0;if(diag&&(!walk(g,cur.gx,nz)||!walk(g,nx,cur.gz)))continue;const nk=ckey(nx,nz),tent=(G.get(k)??1e9)+(diag?1.41:1);if(tent<(G.get(nk)??1e9)){came.set(nk,cur);G.set(nk,tent);F.set(nk,tent+Math.hypot(nx-to.gx,nz-to.gz));if(!inOpen.has(nk)){open.push({gx:nx,gz:nz});inOpen.add(nk);}}}}return[]}
function coverPts(map){const p=[];for(const b of map.walls.concat(map.props)){const ox=b.w/2+0.9,oz=b.d/2+0.9;p.push({x:b.x-ox,z:b.z-oz},{x:b.x+ox,z:b.z-oz},{x:b.x-ox,z:b.z+oz},{x:b.x+ox,z:b.z+oz})}return p}
function showStatus(t,s=2){game.status=t;game.statusTimer=s;ui.state.textContent=t}
function mkTex(c1,c2,step=8){const key=c1+"|"+c2+"|"+step;if(texCache[key])return texCache[key];const s=64,cv=document.createElement("canvas");cv.width=s;cv.height=s;const g=cv.getContext("2d"),h=n=>"#"+n.toString(16).padStart(6,"0");g.fillStyle=h(c1);g.fillRect(0,0,s,s);g.fillStyle=h(c2);for(let y=0;y<s;y+=step)for(let x=0;x<s;x+=step)if(((x/step+y/step)&1)===0)g.fillRect(x,y,step,step);for(let i2=0;i2<160;i2++){g.fillStyle="rgba(255,255,255,0.05)";g.fillRect(Math.random()*s,Math.random()*s,1,1)}const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;texCache[key]=t;return t}
function buildMap(map){clearWorld();const pit={x:0,z:0,w:12,d:10,y:-1.4},pLy=1.2,pL=[{x:-map.size*0.24,z:map.size*0.2,w:8,d:6,y:pLy},{x:map.size*0.24,z:-map.size*0.2,w:8,d:6,y:pLy}],ramps=[{x:0,z:-pit.d*0.5-1.2,w:4,d:5,axis:"z",from:0,to:pit.y,inv:false},{x:0,z:pit.d*0.5+1.2,w:4,d:5,axis:"z",from:0,to:pit.y,inv:true},{x:pL[0].x-3,z:pL[0].z,w:6,d:4,axis:"x",from:0,to:pLy,inv:false},{x:pL[1].x+3,z:pL[1].z,w:6,d:4,axis:"x",from:0,to:pLy,inv:true}],alley=[];for(let k=-2;k<=2;k++){if(k===0)continue;alley.push({x:map.size*0.34,z:k*8,w:2,d:6},{x:-map.size*0.34,z:k*8,w:2,d:6})}const allWalls=map.walls.concat(alley);world={...map,walls:allWalls.map(w=>({...w,h:3.1})),props:map.props.map(p=>({...p})),pits:[pit],platforms:pL,ramps,blockers:allWalls.map(w=>({...w})).concat(map.props.map(p=>({x:p.x,z:p.z,w:p.w,d:p.d}))),secrets:map.secrets.map(s=>({...s,found:false})),cover:coverPts({walls:allWalls,props:map.props})};world.grid=mkGrid(world);const pal=map.id==="dust"?[0x7b6848,0x8a7653,0x6b5a3f,0x9a855f]:map.id==="mirage"?[0x9b8c74,0x84765f,0x6f6351,0xa6977e]:[0x6b6f63,0x767a70,0x5e6259,0x868b7f],wallColor=map.id==="dust"?0x7f8897:map.id==="mirage"?0x8b8f9a:0x747b86,fTex=mkTex(pal[0],pal[1],8),wTex=mkTex(wallColor,0x2f3744,8),pTex=mkTex(0x4a5668,0x3e4756,10);fTex.repeat.set(map.size/6,map.size/6);wTex.repeat.set(3,3);pTex.repeat.set(2,2);const floor=new THREE.Mesh(new THREE.PlaneGeometry(map.size,map.size),new THREE.MeshStandardMaterial({color:pal[0],map:fTex,roughness:0.93,metalness:0.02}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;addWorld(floor);const cell=4,half=map.size/2;for(let z=-half+cell/2;z<half;z+=cell){for(let x=-half+cell/2;x<half;x+=cell){const idx=Math.abs(Math.floor(x*0.37)+Math.floor(z*0.41))%pal.length;const t=new THREE.Mesh(new THREE.PlaneGeometry(cell-0.12,cell-0.12),new THREE.MeshStandardMaterial({color:pal[idx],roughness:0.96,metalness:0.01,transparent:true,opacity:0.62}));t.rotation.x=-Math.PI/2;t.position.set(x,0.01,z);addWorld(t)}}const pitFloor=new THREE.Mesh(new THREE.PlaneGeometry(pit.w,pit.d),new THREE.MeshStandardMaterial({color:0x2a2f39,map:mkTex(0x2d323c,0x232730,6),roughness:0.96}));pitFloor.rotation.x=-Math.PI/2;pitFloor.position.set(pit.x,pit.y+0.01,pit.z);addWorld(pitFloor);const pitWallM=new THREE.MeshStandardMaterial({color:0x4a5565,roughness:0.78});for(const s of [{x:pit.x-pit.w/2,y:pit.y*0.5,z:pit.z,w:0.6,h:Math.abs(pit.y),d:pit.d},{x:pit.x+pit.w/2,y:pit.y*0.5,z:pit.z,w:0.6,h:Math.abs(pit.y),d:pit.d},{x:pit.x,y:pit.y*0.5,z:pit.z-pit.d/2,w:pit.w,h:Math.abs(pit.y),d:0.6},{x:pit.x,y:pit.y*0.5,z:pit.z+pit.d/2,w:pit.w,h:Math.abs(pit.y),d:0.6}]){const m=new THREE.Mesh(new THREE.BoxGeometry(s.w,s.h,s.d),pitWallM);m.position.set(s.x,s.y,s.z);m.castShadow=true;m.receiveShadow=true;addWorld(m)}for(const pl of pL){const top=new THREE.Mesh(new THREE.BoxGeometry(pl.w,0.35,pl.d),new THREE.MeshStandardMaterial({color:0x7f8da0,map:pTex,roughness:0.75}));top.position.set(pl.x,pl.y,pl.z);top.castShadow=true;top.receiveShadow=true;addWorld(top);for(const sx of [-pl.w*0.36,pl.w*0.36])for(const sz of [-pl.d*0.36,pl.d*0.36]){const col=new THREE.Mesh(new THREE.BoxGeometry(0.5,pl.y+0.2,0.5),new THREE.MeshStandardMaterial({color:0x4a5567,roughness:0.82}));col.position.set(pl.x+sx,(pl.y+0.2)/2,pl.z+sz);col.castShadow=true;addWorld(col)}}for(const r of ramps){const ang=Math.atan2(Math.abs(r.to-r.from),r.axis==="x"?r.w:r.d),len=(r.axis==="x"?r.w:r.d)/Math.cos(ang),th=0.35,mesh=new THREE.Mesh(new THREE.BoxGeometry(r.axis==="x"?len:r.w,th,r.axis==="x"?r.d:len),new THREE.MeshStandardMaterial({color:0x8f7f67,map:mkTex(0x8d7c64,0x776850,8),roughness:0.82}));mesh.rotation[r.axis==="x"?"z":"x"]=(r.inv?-1:1)*ang;const high=Math.max(r.from,r.to),low=Math.min(r.from,r.to),cy=(high+low)/2+th*0.2;mesh.position.set(r.x,cy,r.z);mesh.castShadow=true;mesh.receiveShadow=true;addWorld(mesh)}for(const z of map.zones){const m=new THREE.Mesh(new THREE.PlaneGeometry(z.w,z.d),new THREE.MeshStandardMaterial({color:z.color,transparent:true,opacity:0.42,roughness:0.9}));m.rotation.x=-Math.PI/2;m.position.set(z.x,groundY(z.x,z.z)+0.02,z.z);addWorld(m)}for(const w of world.walls){const m=new THREE.Mesh(new THREE.BoxGeometry(w.w,w.h,w.d),new THREE.MeshStandardMaterial({color:wallColor,map:wTex,roughness:0.66,metalness:0.2}));m.position.set(w.x,w.h/2,w.z);m.castShadow=true;m.receiveShadow=true;addWorld(m)}for(const p of world.props){const m=new THREE.Mesh(new THREE.BoxGeometry(p.w,p.h,p.d),new THREE.MeshStandardMaterial({color:p.color,map:pTex,roughness:0.72,metalness:0.15}));m.position.set(p.x,p.h/2,p.z);m.castShadow=true;m.receiveShadow=true;addWorld(m)}const h=map.size/2,mat=new THREE.MeshStandardMaterial({color:0x313f50,roughness:0.72});const bx1=new THREE.Mesh(new THREE.BoxGeometry(map.size,3.2,1.2),mat);bx1.position.set(0,1.6,-h);bx1.castShadow=true;addWorld(bx1);const bx2=bx1.clone();bx2.position.z=h;addWorld(bx2);const bz1=new THREE.Mesh(new THREE.BoxGeometry(1.2,3.2,map.size),mat);bz1.position.set(-h,1.6,0);bz1.castShadow=true;addWorld(bz1);const bz2=bz1.clone();bz2.position.x=h;addWorld(bz2)}
function groundY(x,z){if(!world)return 0;let y=0;for(const p of world.pits||[])if(inRect(x,z,p,0))y=Math.min(y,p.y);for(const r of world.ramps||[]){if(!inRect(x,z,r,0))continue;const min=r.axis==="x"?r.x-r.w/2:r.z-r.d/2,span=r.axis==="x"?r.w:r.d,v=r.axis==="x"?x:z;let t=(v-min)/span;if(r.inv)t=1-t;t=clamp(0,1,t);y=r.from+(r.to-r.from)*t}for(const pl of world.platforms||[])if(inRect(x,z,pl,0))y=Math.max(y,pl.y);return y}
function skinById(id){return SKINS.find(s=>s.id===id)||SKINS[0]}const rndSkin=()=>SKINS[rint(0,SKINS.length-1)].id;
function entityColors(team){if(team==="ally")return{b:0x4f8cd9,p:0x24364f,h:0x293447};if(team==="enemy")return{b:0xd35a5a,p:0x412626,h:0x433126};return{b:0x55be66,p:0x244d2e,h:0x1f3a25}}
function buildGun(id,color,compact=false){const g=new THREE.Group(),darkHex=(new THREE.Color(color)).multiplyScalar(0.62).getHex(),m1=new THREE.MeshStandardMaterial({color,roughness:0.34,metalness:0.5}),m2=new THREE.MeshStandardMaterial({color:0x1a1f27,roughness:0.62,metalness:0.34}),m3=new THREE.MeshStandardMaterial({color:darkHex,roughness:0.45,metalness:0.36}),s=compact?0.72:1;let bl=0.9,rad=0.06,bar=0.72,stock=0.26,pump=false;if(id==="smg"){bl=0.72;rad=0.055;bar=0.42;stock=0.2}else if(id==="shotgun"){bl=0.84;rad=0.065;bar=0.8;stock=0.3;pump=true}else if(id==="pistol"){bl=0.48;rad=0.05;bar=0.24;stock=0.12}const body=new THREE.Mesh(new THREE.CylinderGeometry(rad*s,rad*1.06*s,bl*s,14),m1);body.rotation.z=Math.PI/2;const barrel=new THREE.Mesh(new THREE.CylinderGeometry(rad*0.42*s,rad*0.5*s,bar*s,12),m2);barrel.rotation.z=Math.PI/2;barrel.position.x=(bl*0.5+bar*0.45)*s;const muzzleCap=new THREE.Mesh(new THREE.SphereGeometry(rad*0.55*s,10,8),m2);muzzleCap.position.x=(bl*0.5+bar*0.9)*s;const stockTube=new THREE.Mesh(new THREE.CylinderGeometry(rad*0.34*s,rad*0.4*s,stock*s,10),m2);stockTube.rotation.z=Math.PI/2;stockTube.position.x=-(bl*0.5+stock*0.45)*s;const grip=new THREE.Mesh(new THREE.CylinderGeometry(rad*0.48*s,rad*0.36*s,0.25*s,10),m3);grip.position.set((-bl*0.12)*s,-0.18*s,0);const rail=new THREE.Mesh(new THREE.CylinderGeometry(rad*0.28*s,rad*0.26*s,(bl*0.7)*s,10),m3);rail.rotation.z=Math.PI/2;rail.position.set(0,rad*0.55*s,0);g.add(body,barrel,muzzleCap,stockTube,grip,rail);if(pump){const pm=new THREE.Mesh(new THREE.CylinderGeometry(rad*0.8*s,rad*0.85*s,0.2*s,12),m1);pm.rotation.z=Math.PI/2;pm.position.set((bl*0.32)*s,-0.05*s,0);g.add(pm)}if(id==="pistol"){stockTube.scale.set(0.7,1,1);rail.scale.set(0.65,1,1)}return{group:g,mats:[m1,m3]}}
function createModel(team,weapon,skinId="default"){const c=entityColors(team),g=new THREE.Group(),tor=new THREE.MeshStandardMaterial({color:c.b,roughness:0.62,metalness:0.18}),pan=new THREE.MeshStandardMaterial({color:c.p,roughness:0.72}),skin=new THREE.MeshStandardMaterial({color:0xe3bea6,roughness:0.72}),hair=new THREE.MeshStandardMaterial({color:c.h,roughness:0.78});const body=new THREE.Mesh(new THREE.BoxGeometry(0.74,0.9,0.34),tor);body.position.y=1.15;body.castShadow=true;const head=new THREE.Mesh(new THREE.BoxGeometry(0.46,0.46,0.46),skin);head.position.y=1.82;head.castShadow=true;const noseSize=rand(0.07,0.11),nose=new THREE.Mesh(new THREE.BoxGeometry(noseSize,noseSize*0.85,noseSize),skin);nose.position.set(0,1.78,0.25);const hs=rint(0,2);if(hs===0){const h=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.12,0.5),hair);h.position.set(0,2.06,0);g.add(h)}else if(hs===1){const h=new THREE.Mesh(new THREE.BoxGeometry(0.44,0.2,0.2),hair);h.position.set(0,2,-0.08);g.add(h)}else{const h=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.24,0.22),hair);h.position.set(0,2.02,0);g.add(h)}const l1=new THREE.Mesh(new THREE.BoxGeometry(0.2,0.7,0.2),pan);l1.position.set(-0.14,0.35,0);l1.castShadow=true;l1.name="legL";const l2=l1.clone();l2.position.x=0.14;l2.name="legR";const a1=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.09,0.54,8),tor);a1.position.set(-0.42,1.2,0);a1.rotation.z=0.12;a1.castShadow=true;a1.name="armL";const a2=a1.clone();a2.position.x=0.42;a2.rotation.z=-0.12;a2.name="armR";g.add(body,head,nose,l1,l2,a1,a2);let gm=[];if(weapon!=="knife"&&weapon!=="claws"){const pack=buildGun(weapon,skinById(skinId).color,true);pack.group.rotation.z=Math.PI/16;pack.group.rotation.y=-Math.PI/2;pack.group.position.set(0.37,1.14,0.02);g.add(pack.group);gm=pack.mats}g.userData.bobOff=rand(0,Math.PI*2);return{group:g,gunMats:gm}}
function resolveCollision(pos,r){if(!world)return;const h=world.size/2;pos.x=clamp(-h+r+0.4,h-r-0.4,pos.x);pos.z=clamp(-h+r+0.4,h-r-0.4,pos.z);for(const b of world.blockers){const minX=b.x-b.w/2-r,maxX=b.x+b.w/2+r,minZ=b.z-b.d/2-r,maxZ=b.z+b.d/2+r;if(pos.x>minX&&pos.x<maxX&&pos.z>minZ&&pos.z<maxZ){const dx1=Math.abs(pos.x-minX),dx2=Math.abs(maxX-pos.x),dz1=Math.abs(pos.z-minZ),dz2=Math.abs(maxZ-pos.z),m=Math.min(dx1,dx2,dz1,dz2);if(m===dx1)pos.x=minX;else if(m===dx2)pos.x=maxX;else if(m===dz1)pos.z=minZ;else pos.z=maxZ}}}
function safeSpawn(x,z){if(!world)return{x:0,z:0};const raw=toCell(world.grid,x,z),sw=nearWalk(world.grid,raw.gx,raw.gz);if(sw)return toWorld(world.grid,sw.gx,sw.gz);for(let i=0;i<180;i++){const gx=rint(0,world.grid.cells-1),gz=rint(0,world.grid.cells-1);if(walk(world.grid,gx,gz))return toWorld(world.grid,gx,gz)}return{x:0,z:0}}
function spawnPos(team,idx,same=false){if(!world)return{x:0,z:0};if(same){const s=world.spawns.shared;return safeSpawn(s.x+rand(-2.4,2.4),s.z+rand(-2.4,2.4))}const b=team==="ally"?world.spawns.ally:world.spawns.enemy,r=Math.floor(idx/3),c=idx%3;return safeSpawn(b.x+(c-1)*2.2,b.z+(r-1)*2.2)}
function spawnBot(team,idx,weapon,same=false){const p=spawnPos(team==="zombie"?"enemy":team,idx,same),skinId=rndSkin(),model=createModel(team,weapon,skinId),gy=groundY(p.x,p.z);model.group.position.set(p.x,gy,p.z);scene.add(model.group);const b={id:++botId,name:"BOT-"+String(botId).padStart(2,"0"),team,weapon,skinId,pos:new THREE.Vector3(p.x,0,p.z),r:0.42,speed:rand(3.05,3.35),hp:team==="zombie"?120:100,maxHp:team==="zombie"?120:100,alive:true,kills:0,deaths:0,mesh:model.group,gunMats:model.gunMats,respawn:0,skill:{...AI[ui.difficulty.value]},step:0,ai:{target:null,targetTimer:rand(0.1,0.3),path:[],pi:0,repath:rand(0.1,0.4),shoot:rand(0.2,0.5),vis:0,burst:0,sd:ch(0.5)?1:-1,st:rand(0.45,1.2),cover:null,coverT:rand(0.8,1.5),roam:rand(1.2,2.1)}};bots.push(b);return b}
function lockAudio(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!audioCtx)audioCtx=new C();if(audioCtx.state==="suspended")audioCtx.resume();}catch{}}
function gain(pos,max=46){const d=Math.hypot(pos.x-player.pos.x,pos.z-player.pos.z);return clamp(0,1,1-d/max)}
function pan(pos){const dx=pos.x-player.pos.x,dz=pos.z-player.pos.z,fX=-Math.sin(player.yaw),fZ=-Math.cos(player.yaw),rX=fZ,rZ=-fX;return clamp(-1,1,(dx*rX+dz*rZ)/10)}
function tone(pos,f,v,dur,t="square"){if(v<=0)return;try{if(!audioCtx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;audioCtx=new C()}if(audioCtx.state==="suspended")return;const o=audioCtx.createOscillator(),g=audioCtx.createGain(),p=audioCtx.createStereoPanner();o.type=t;o.frequency.value=f;const vv=v*gain(pos);g.gain.value=vv;p.pan.value=pan(pos);o.connect(g);g.connect(p);p.connect(audioCtx.destination);const n=audioCtx.currentTime;g.gain.setValueAtTime(vv,n);g.gain.exponentialRampToValueAtTime(0.0001,n+dur);o.start(n);o.stop(n+dur);}catch{}}
function muzzle(o,d,col=0xffcf76){const m=new THREE.Mesh(new THREE.SphereGeometry(0.075,8,8),new THREE.MeshBasicMaterial({color:col}));m.position.copy(o).addScaledVector(d,0.35);scene.add(m);fx.muzzle.push({mesh:m,life:0.06})}
function impact(p){const c=new THREE.Mesh(new THREE.CircleGeometry(0.1,10),new THREE.MeshBasicMaterial({color:0xbcc8d6,side:THREE.DoubleSide}));c.position.copy(p);c.lookAt(camera.position);scene.add(c);fx.impacts.push({mesh:c,life:0.65});const s=new THREE.Mesh(new THREE.SphereGeometry(0.038,6,6),new THREE.MeshBasicMaterial({color:0xffeead}));s.position.copy(p);scene.add(s);fx.impacts.push({mesh:s,life:0.14})}
function tracer(a,b,col=0xffefc0){const d=new THREE.Vector3().subVectors(b,a),len=d.length();if(len<=0.01)return;const t=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,len,6),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0.82}));t.position.copy(a).addScaledVector(d,0.5);t.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());scene.add(t);fx.muzzle.push({mesh:t,life:0.045})}
function updateFx(dt){for(const l of [fx.muzzle,fx.impacts])for(let i=l.length-1;i>=0;i--){l[i].life-=dt;if(l[i].life<=0){scene.remove(l[i].mesh);if(l[i].mesh.geometry)l[i].mesh.geometry.dispose();if(l[i].mesh.material)l[i].mesh.material.dispose();l.splice(i,1)}}}
function lineBlocked(x1,z1,x2,z2){if(!world)return false;const dist=Math.hypot(x2-x1,z2-z1),steps=Math.max(2,Math.ceil(dist/0.45));for(let i=1;i<steps;i++){const t=i/steps,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;if(blockedAt(x,z,0.1))return true}return false}
function raySphere(o,d,c,r){const ox=o.x-c.x,oy=o.y-c.y,oz=o.z-c.z,b=ox*d.x+oy*d.y+oz*d.z,cc=ox*ox+oy*oy+oz*oz-r*r,h=b*b-cc;if(h<0)return null;const sq=Math.sqrt(h);let t=-b-sq;if(t<0)t=-b+sq;return t<0?null:t}
function spread(v,a){if(a<=0)return v.clone();const d=v.clone();d.x+=(Math.random()-0.5)*a;d.y+=(Math.random()-0.5)*a*0.72;d.z+=(Math.random()-0.5)*a;return d.normalize()}
function isEnemy(a,b){if(a===b)return false;if(game.mode==="zombie"&&game.state!=="zombie_prep")return(a==="zombie"&&b!=="zombie")||(b==="zombie"&&a!=="zombie");return(a==="ally"&&b==="enemy")||(a==="enemy"&&b==="ally")}
function curWeaponId(){if(player.team==="zombie")return"claws";if(player.slot===1)return player.primary;if(player.slot===2)return"pistol";return"knife"}
function curWeapon(){return WEAPONS[curWeaponId()]||WEAPONS.rifle}
function buildFPWeapon(){if(fpWeapon){camera.remove(fpWeapon);disposeNode(fpWeapon)}const w=curWeapon();fpMats=[];if(w.id==="knife"||w.id==="claws"){const g=new THREE.Group(),col=w.id==="claws"?0x87e784:skinById(inv.equipped).color,handle=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.035,0.24,10),new THREE.MeshStandardMaterial({color:0x2a2f39,roughness:0.55,metalness:0.3}));handle.rotation.z=Math.PI/2;const blade=w.id==="claws"?new THREE.Mesh(new THREE.ConeGeometry(0.03,0.28,10),new THREE.MeshStandardMaterial({color:col,roughness:0.36,metalness:0.58})):new THREE.Mesh(new THREE.CylinderGeometry(0.016,0.026,0.34,10),new THREE.MeshStandardMaterial({color:col,roughness:0.34,metalness:0.62}));blade.rotation.z=Math.PI/2;blade.position.x=0.24;g.add(handle,blade);if(w.id==="claws"){const claw2=blade.clone();claw2.position.set(0.22,0.04,0.03);claw2.scale.set(0.8,0.8,0.8);g.add(claw2)}fpWeapon=g}else{const pack=buildGun(w.id,skinById(inv.equipped).color,false);fpWeapon=pack.group;fpMats=pack.mats}fpWeapon.position.set(0.24,-0.2,-0.54);fpWeapon.rotation.set(0.02,-0.2,0);camera.add(fpWeapon)}
function applySkin(){const c=skinById(inv.equipped).color;for(const m of fpMats)m.color.setHex(c)}
function center(e){if(e===player)return{x:player.pos.x,y:player.y-0.44,z:player.pos.z,r:0.62};const gy=groundY(e.pos.x,e.pos.z);return{x:e.pos.x,y:1.15+gy,z:e.pos.z,r:0.62}}
function eTeam(e){return e===player?player.team:e.team}function eAlive(e){return e===player?player.alive:e.alive}
function enemies(sh){const t=eTeam(sh),out=[];if(player!==sh&&player.alive&&isEnemy(t,player.team))out.push(player);for(const b of bots)if(b!==sh&&b.alive&&isEnemy(t,b.team))out.push(b);return out}
function award(att){if(!att)return;if(att===player){player.kills++;if(player.team==="ally"||player.team==="enemy")game.teamScore[player.team]++}else{att.kills++;if(att.team==="ally"||att.team==="enemy")game.teamScore[att.team]++}game.dirtyScore=true;checkWin()}
function killPlayer(att){if(!player.alive)return;player.alive=false;player.hp=0;player.deaths++;player.respawn=game.mode==="zombie"?(player.team==="zombie"?4:0):2.2;award(att);showStatus("Ты погиб",1.2);game.dirtyScore=true;checkWin()}
function killBot(b,att){if(!b.alive)return;b.alive=false;b.hp=0;b.deaths++;b.mesh.visible=false;b.respawn=game.mode==="zombie"?(b.team==="zombie"?4:0):2.2;releaseCover(b);award(att);game.dirtyScore=true;checkWin()}
function infectPlayer(att=null){if(player.team==="zombie")return;player.team="zombie";player.maxHp=120;player.hp=120;player.speed=8.8;player.slot=3;buildFPWeapon();if(att)award(att);showStatus("Ты заражен",2.2);game.dirtyScore=true;checkWin()}
function infectBot(b,att=null){if(b.team==="zombie")return;b.team="zombie";b.maxHp=120;b.hp=120;b.speed=rand(3.25,3.45);b.weapon="claws";b.alive=true;b.respawn=0;b.mesh.visible=true;b.ai.path=[];b.ai.pi=0;b.ai.target=null;b.ai.vis=0;if(att)award(att);scene.remove(b.mesh);disposeNode(b.mesh);const m=createModel(b.team,b.weapon,b.skinId),gy=groundY(b.pos.x,b.pos.z);b.mesh=m.group;b.gunMats=m.gunMats;b.mesh.position.set(b.pos.x,gy,b.pos.z);scene.add(b.mesh);game.dirtyScore=true;checkWin()}
function damage(v,amt,att){if(v===player){if(!player.alive)return;player.hp-=amt;if(player.hp<=0)killPlayer(att);return}if(!v.alive)return;v.hp-=amt;if(v.hp<=0)killBot(v,att)}
function melee(sh,w,target=null){const sx=sh===player?player.pos.x:sh.pos.x,sz=sh===player?player.pos.z:sh.pos.z;let best=null,bd=w.range;for(const e of (target?[target]:enemies(sh))){if(!eAlive(e))continue;const ex=e===player?player.pos.x:e.pos.x,ez=e===player?player.pos.z:e.pos.z,d=Math.hypot(ex-sx,ez-sz);if(d>bd||lineBlocked(sx,sz,ex,ez))continue;best=e;bd=d}if(!best)return false;if(w.id==="claws"&&game.mode==="zombie"&&game.state==="zombie_live"){if(best===player&&player.team!=="zombie")infectPlayer(sh===player?null:sh);else if(best!==player&&best.team!=="zombie")infectBot(best,sh===player?null:sh);return true}damage(best,w.damage,sh===player?player:sh);return true}
function shootRay(sh,w,o,f,extra=0){let hit=false;for(let p=0;p<w.pellets;p++){const d=spread(f,w.spread+extra);let best=null,bt=w.range;for(const e of enemies(sh)){const c=center(e),t=raySphere(o,d,c,c.r);if(t==null||t>bt)continue;const hx=o.x+d.x*t,hz=o.z+d.z*t;if(lineBlocked(o.x,o.z,hx,hz))continue;best=e;bt=t}const start=o.clone().addScaledVector(d,0.3),end=o.clone().addScaledVector(d,bt);tracer(start,end,sh===player?0xfff4cc:0xffd3a1);if(best){hit=true;damage(best,w.damage,sh===player?player:sh);impact(end)}}return hit}
function shootPlayer(){if(!game.started||game.paused||!player.alive||game.buyPhase||game.mode==="zombie"&&game.state==="zombie_prep"||document.pointerLockElement!==canvas)return;const w=curWeapon();if(player.shootCd>0)return;player.shootCd=w.fireRate;player.recoil+=w.recoil;const o=new THREE.Vector3(player.pos.x,player.y-0.1,player.pos.z),f=new THREE.Vector3(-Math.sin(player.yaw)*Math.cos(player.pitch),Math.sin(player.pitch),-Math.cos(player.yaw)*Math.cos(player.pitch)).normalize();muzzle(o,f);player.shots++;if(w.id==="knife"||w.id==="claws"){if(melee(player,w))player.hits++;tone(player.pos,w.id==="claws"?170:250,0.04,0.06,"triangle");return}if(shootRay(player,w,o,f,0))player.hits++;tone(player.pos,w.id==="rifle"?620:w.id==="smg"?740:w.id==="shotgun"?430:700,0.04,0.045,"square")}
function shootBot(b,t){if(!b.alive)return;const w=WEAPONS[b.weapon]||WEAPONS.rifle,gy=groundY(b.pos.x,b.pos.z),o=new THREE.Vector3(b.pos.x,1.5+gy,b.pos.z),c=center(t),dir=new THREE.Vector3(c.x-o.x,c.y-o.y,c.z-o.z),dist=dir.length();if(dist<=0.001)return;dir.normalize();muzzle(o,dir,b.team==="zombie"?0x97ff92:0xffcc7a);if(w.id==="claws"){melee(b,w,t);tone(b.pos,160,0.035,0.055,"triangle");return}const hit=shootRay(b,w,o,dir,b.skill.aimError*(0.7+dist/20));tone(b.pos,w.id==="rifle"?600:w.id==="smg"?760:w.id==="shotgun"?430:700,0.022,0.038,"square");if(!hit){const miss=o.clone().addScaledVector(dir,Math.min(w.range,8+dist));if(!blockedAt(miss.x,miss.z,0.2))impact(miss)}}
function releaseCover(b){if(!b.ai.cover)return;game.reservedCover.delete(b.ai.cover);b.ai.cover=null}
function setPath(b,x,z){if(!world)return;const fr=toCell(world.grid,b.pos.x,b.pos.z),tr=toCell(world.grid,x,z),f=nearWalk(world.grid,fr.gx,fr.gz),t=nearWalk(world.grid,tr.gx,tr.gz);if(!f||!t){b.ai.path=[];b.ai.pi=0;return}const cells=aStar(world.grid,f,t);if(cells.length<2){b.ai.path=[];b.ai.pi=0;return}b.ai.path=cells.slice(1).map(c=>toWorld(world.grid,c.gx,c.gz));b.ai.pi=0}
function followPath(b){const p=b.ai.path;if(!p||!p.length)return{x:0,z:0};while(b.ai.pi<p.length){const pt=p[b.ai.pi],dx=pt.x-b.pos.x,dz=pt.z-b.pos.z,d=Math.hypot(dx,dz);if(d<0.25){b.ai.pi++;continue}return{x:dx/d,z:dz/d}}return{x:0,z:0}}
function chooseCover(b,tp){let best=null,bs=1e9;for(const p of world.cover){const key=Math.round(p.x*10)+"|"+Math.round(p.z*10);if(game.reservedCover.has(key)&&key!==b.ai.cover)continue;if(blockedAt(p.x,p.z,0.4))continue;if(!lineBlocked(tp.x,tp.z,p.x,p.z))continue;const d1=Math.hypot(b.pos.x-p.x,b.pos.z-p.z),d2=Math.hypot(tp.x-p.x,tp.z-p.z);if(d1>24||d2<2)continue;const s=d1+rand(0,3);if(s<bs){bs=s;best={x:p.x,z:p.z,key}}}return best}
function tPos(e){return e===player?{x:player.pos.x,z:player.pos.z}:{x:e.pos.x,z:e.pos.z}}
function validT(b,t){return !!t&&eAlive(t)&&isEnemy(b.team,eTeam(t))}
function chooseTarget(b){let best=null,bs=1e9;for(const c of enemies(b)){const p=tPos(c),d=Math.hypot(p.x-b.pos.x,p.z-b.pos.z),v=!lineBlocked(b.pos.x,b.pos.z,p.x,p.z),s=d-(v?5:0)+rand(0,2.4);if(s<bs){bs=s;best=c}}return best}
function moveBot(b,mx,mz,dt){const l=Math.hypot(mx,mz);if(l<=0.0001){const gy=groundY(b.pos.x,b.pos.z),idle=Math.sin(performance.now*0.003+(b.mesh.userData.bobOff||0))*0.025;b.mesh.position.set(b.pos.x,gy+idle,b.pos.z);const ll=b.mesh.getObjectByName("legL"),lr=b.mesh.getObjectByName("legR"),al=b.mesh.getObjectByName("armL"),ar=b.mesh.getObjectByName("armR");if(ll&&lr){ll.rotation.x*=0.85;lr.rotation.x*=0.85}if(al&&ar){al.rotation.x*=0.85;ar.rotation.x*=0.85}return false}mx/=l;mz/=l;b.pos.x+=mx*b.speed*dt;b.pos.z+=mz*b.speed*dt;resolveCollision(b.pos,b.r);const gy=groundY(b.pos.x,b.pos.z),stride=Math.sin((b.step*18)+(b.id*0.7))*0.7;const ll=b.mesh.getObjectByName("legL"),lr=b.mesh.getObjectByName("legR"),al=b.mesh.getObjectByName("armL"),ar=b.mesh.getObjectByName("armR");if(ll&&lr){ll.rotation.x=stride;lr.rotation.x=-stride}if(al&&ar){al.rotation.x=-stride*0.6;ar.rotation.x=stride*0.6}b.mesh.position.set(b.pos.x,gy,b.pos.z);b.step+=dt;if(b.step>=0.48){b.step=0;tone(b.pos,180,0.012,0.02,"triangle")}return true}
function updateBot(b,dt){if(!b.alive||b.respawn>0)return;const a=b.ai;a.targetTimer-=dt;a.repath-=dt;a.shoot-=dt;a.st-=dt;a.coverT-=dt;a.roam-=dt;if(game.mode==="zombie"&&game.state==="zombie_prep"){if(a.repath<=0||a.pi>=a.path.length){const s=world.secrets[rint(0,world.secrets.length-1)];setPath(b,s.x+rand(-1.2,1.2),s.z+rand(-1.2,1.2));a.repath=rand(0.7,1.3)}const mv=followPath(b);moveBot(b,mv.x,mv.z,dt);return}if(a.targetTimer<=0||!validT(b,a.target)){a.target=chooseTarget(b);a.targetTimer=rand(0.12,0.28)}if(!a.target){if(a.roam<=0){const r=world.cover[rint(0,world.cover.length-1)];setPath(b,r.x+rand(-1.2,1.2),r.z+rand(-1.2,1.2));a.roam=rand(1.4,2.4)}const mv=followPath(b);moveBot(b,mv.x,mv.z,dt);return}const tp=tPos(a.target),dx=tp.x-b.pos.x,dz=tp.z-b.pos.z,dist=Math.hypot(dx,dz),vis=!lineBlocked(b.pos.x,b.pos.z,tp.x,tp.z);a.vis=vis?a.vis+dt:Math.max(0,a.vis-dt*2.2);const w=WEAPONS[b.weapon]||WEAPONS.rifle,need=w.id==="claws"?1.5:w.id==="shotgun"?9.2:15.5;let mx=0,mz=0;if(w.id==="claws"){if(a.repath<=0){setPath(b,tp.x,tp.z);a.repath=rand(0.2,0.45)}const mv=followPath(b);mx+=mv.x;mz+=mv.z}else if(vis&&dist<=need+2){const inv=dist>0.001?1/dist:0,tx=dx*inv,tz=dz*inv;if(a.st<=0){a.sd*=-1;a.st=rand(0.4,1.1)/clamp(0.5,1.5,b.skill.strafe)}mx+=tx*-0.2;mz+=tz*-0.2;mx+=(-tz)*a.sd*b.skill.strafe;mz+=tx*a.sd*b.skill.strafe}else{if(a.repath<=0){let px=tp.x,pz=tp.z;if(!vis&&a.coverT<=0&&ch(b.skill.cover)){const c=chooseCover(b,tp);if(c){releaseCover(b);b.ai.cover=c.key;game.reservedCover.add(c.key);px=c.x;pz=c.z;a.coverT=rand(1.2,2.4)}}setPath(b,px,pz);a.repath=rand(0.45,0.95)}const mv=followPath(b);mx+=mv.x;mz+=mv.z}const moving=moveBot(b,mx,mz,dt),look=a.target===player?player.pos:a.target.pos;if(look)b.mesh.rotation.y=Math.atan2(look.x-b.pos.x,look.z-b.pos.z);else if(moving)b.mesh.rotation.y=Math.atan2(mx,mz);if(vis&&a.vis>=b.skill.reaction&&a.shoot<=0){if(w.auto){if(a.burst<=0)a.burst=rint(2,Math.round(5+b.skill.burst*4));shootBot(b,a.target);a.burst--;a.shoot=w.fireRate*rand(0.85,1.2);if(a.burst<=0)a.shoot+=rand(0.12,0.28)*(1.25-b.skill.burst)}else{shootBot(b,a.target);a.shoot=w.fireRate*rand(0.92,1.28)}}if(!vis)a.burst=0}
function switchSlot(s){if(!game.started)return;if(player.team==="zombie"&&s!==3)return;player.slot=s;buildFPWeapon()}
function resetPlayer(){player.team="ally";player.maxHp=100;player.hp=100;player.alive=true;player.kills=0;player.deaths=0;player.shots=0;player.hits=0;player.moved=0;player.step=0;player.slot=1;player.shootCd=0;player.recoil=0;player.speed=7.7;player.vy=0;player.onGround=true;player.respawn=0;const p=spawnPos("ally",0,game.mode==="zombie"),gy=groundY(p.x,p.z);player.pos.set(p.x,0,p.z);player.prev.copy(player.pos);player.y=player.eye+gy;camera.position.set(player.pos.x,player.y,player.pos.z);camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;buildFPWeapon()}
function respawnPlayer(){if(game.mode!=="zombie"||player.team!=="zombie"){player.team="ally";player.maxHp=100;player.speed=7.7;if(player.slot===3)player.slot=1}else{player.maxHp=120;player.speed=8.8;player.slot=3}const p=spawnPos(player.team==="enemy"?"enemy":"ally",0,game.mode==="zombie"&&game.state==="zombie_prep"),gy=groundY(p.x,p.z);player.pos.set(p.x,0,p.z);player.prev.copy(player.pos);player.hp=player.maxHp;player.alive=true;player.respawn=0;player.vy=0;player.onGround=true;player.y=player.eye+gy;buildFPWeapon();showStatus("Респавн",1)}
function respawnBot(b){if(game.mode==="zombie"&&b.team!=="zombie")return;const p=spawnPos(b.team==="enemy"?"enemy":"ally",b.id%6,game.mode==="zombie"&&game.state==="zombie_prep"),gy=groundY(p.x,p.z);b.pos.set(p.x,0,p.z);b.hp=b.maxHp;b.alive=true;b.respawn=0;b.mesh.visible=true;b.ai.target=null;b.ai.path=[];b.ai.pi=0;b.ai.repath=rand(0.1,0.32);b.ai.shoot=rand(0.2,0.54);b.ai.vis=0;b.ai.burst=0;releaseCover(b);b.mesh.position.set(p.x,gy,p.z)}
function setupMode(){game.teamScore.ally=0;game.teamScore.enemy=0;bots=[];botId=0;if(game.mode==="duel"){game.scoreLimit=7;game.timeLeft=300;spawnBot("enemy",0,"rifle",false)}else if(game.mode==="team"){game.scoreLimit=30;game.timeLeft=420;for(let i=0;i<4;i++)spawnBot("ally",i+1,i%2===0?"rifle":"smg",false);for(let i=0;i<5;i++)spawnBot("enemy",i+1,i===0?"shotgun":i%2===0?"rifle":"smg",false)}else{game.scoreLimit=0;game.timeLeft=20;for(let i=0;i<11;i++)spawnBot("ally",i+1,i%3===0?"shotgun":i%2===0?"rifle":"smg",true)}game.dirtyScore=true}
function showBuy(){ui.buy.classList.remove("hidden");ui.buyTime.textContent=String(Math.ceil(game.buyTime));ui.buyPicked.textContent="Выбрано: "+(WEAPONS[player.primary]?.name||"AKR-12");for(const b of ui.buyItems)b.classList.toggle("active",b.dataset.buy===player.primary);if(document.pointerLockElement===canvas)document.exitPointerLock()}
function hideBuy(){ui.buy.classList.add("hidden")}
function closeBuy(){if(!game.buyPhase)return;game.buyPhase=false;hideBuy();showStatus("Бой начался",1.8);lockPointer()}
function startZombie(){game.state="zombie_live";game.timeLeft=120;const pool=[player,...bots.filter(b=>b.alive)],f=pool[rint(0,pool.length-1)];let s=pool[rint(0,pool.length-1)];if(s===f)s=pool[(pool.indexOf(f)+1)%pool.length];if(f===player)infectPlayer();else infectBot(f);if(s===player)infectPlayer();else infectBot(s);showStatus("Зомби выбраны. Выживай",2.8)}
const humans=()=>{let c=0;if(player.alive&&player.team!=="zombie")c++;for(const b of bots)if(b.alive&&b.team!=="zombie")c++;return c};
function checkWin(){if(!game.started)return;if(game.mode==="zombie"){if(game.state==="zombie_live"){if(humans()<=0){finish("Зомби заразили всех");return}if(game.timeLeft<=0)finish("Люди выжили до конца таймера")}return}if(game.teamScore.ally>=game.scoreLimit){finish("CT победили "+game.teamScore.ally+" : "+game.teamScore.enemy);return}if(game.teamScore.enemy>=game.scoreLimit){finish("T победили "+game.teamScore.enemy+" : "+game.teamScore.ally);return}if(game.timeLeft<=0){if(game.teamScore.ally>game.teamScore.enemy)finish("Время. Победа CT");else if(game.teamScore.enemy>game.teamScore.ally)finish("Время. Победа T");else finish("Ничья по времени")}}
function finish(text){if(!game.started)return;game.started=false;game.paused=false;game.buyPhase=false;game.state="round_end";hideBuy();ui.pause.classList.add("hidden");ui.scoreboard.classList.add("hidden");ui.hud.classList.add("hidden");ui.deathText.textContent=text+" | Счет "+game.teamScore.ally+" : "+game.teamScore.enemy+" | Твои фраги: "+player.kills;ui.death.classList.remove("hidden");if(document.pointerLockElement===canvas)document.exitPointerLock()}
function startMatch(){lockAudio();game.mode=ui.mode.value;selectedMap=MAPS.find(m=>m.id===ui.map.value)||MAPS[0];buildMap(selectedMap);resetPlayer();setupMode();game.started=true;game.paused=false;game.status="";game.statusTimer=0;if(game.mode==="zombie"){game.state="zombie_prep";game.buyPhase=false;hideBuy();showStatus("20 секунд на разбег",2.2);lockPointer()}else{game.state="buy";game.buyPhase=true;game.buyTime=15;showBuy();showStatus("Закупка",1.6)}ui.menu.classList.add("hidden");ui.death.classList.add("hidden");ui.pause.classList.add("hidden");ui.hud.classList.remove("hidden");ui.scoreboard.classList.add("hidden");keys.clear();mouse.fire=false;mouse.just=false;updateHud(0);renderScore()}
function backMenu(){game.started=false;game.paused=false;game.buyPhase=false;game.state="menu";game.status="";game.statusTimer=0;keys.clear();mouse.fire=false;mouse.just=false;clearWorld();world=null;ui.hud.classList.add("hidden");ui.scoreboard.classList.add("hidden");ui.pause.classList.add("hidden");ui.buy.classList.add("hidden");ui.death.classList.add("hidden");ui.menu.classList.remove("hidden");if(document.pointerLockElement===canvas)document.exitPointerLock()}
function lockPointer(){if(!game.started||game.paused||game.buyPhase||!ui.pause.classList.contains("hidden")||!ui.death.classList.contains("hidden"))return;if(document.pointerLockElement!==canvas)canvas.requestPointerLock()}
function pauseGame(){if(!game.started||game.paused)return;game.paused=true;ui.pause.classList.remove("hidden");if(document.pointerLockElement===canvas)document.exitPointerLock()}
function resumeGame(){if(!game.started||!ui.buy.classList.contains("hidden"))return;game.paused=false;ui.pause.classList.add("hidden");lockPointer()}
function updatePlayer(dt){if(!player.alive||game.buyPhase)return;const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=fz,rz=-fx;let mx=0,mz=0;if(keys.has("KeyW")){mx+=fx;mz+=fz}if(keys.has("KeyS")){mx-=fx;mz-=fz}if(keys.has("KeyD")){mx+=rx;mz+=rz}if(keys.has("KeyA")){mx-=rx;mz-=rz}const l=Math.hypot(mx,mz);if(l>0){mx/=l;mz/=l}const sp=(player.team==="zombie"?8.8:player.speed)*(keys.has("ShiftLeft")?1.22:1);player.prev.copy(player.pos);player.pos.x+=mx*sp*dt;player.pos.z+=mz*sp*dt;resolveCollision(player.pos,player.r);const gy=groundY(player.pos.x,player.pos.z);if(l>0){player.moved+=dt;player.step+=dt;const it=player.team==="zombie"?0.28:0.36;if(player.step>=it){player.step=0;tone(player.pos,player.team==="zombie"?140:180,0.02,0.02,"triangle")}}if(player.onGround&&keys.has("Space")){player.vy=4.6;player.onGround=false}player.vy-=12*dt;player.y+=player.vy*dt;if(player.y<=player.eye+gy){player.y=player.eye+gy;player.vy=0;player.onGround=true}if(player.shootCd>0)player.shootCd-=dt;if(mouse.fire){const w=curWeapon();if(w.auto||mouse.just)shootPlayer()}mouse.just=false;const bob=l>0?Math.sin(player.moved*12)*0.03:Math.sin(performance.now*0.002)*0.006,rp=player.recoil*0.42,ry=player.recoil*0.1;camera.position.set(player.pos.x,player.y+bob,player.pos.z);camera.rotation.y=player.yaw+ry;camera.rotation.x=player.pitch+rp;player.recoil=Math.max(0,player.recoil-dt*0.25);if(fpWeapon){fpWeapon.position.x=0.28+(l>0?Math.sin(player.moved*8)*0.008:Math.sin(performance.now*0.002)*0.003);fpWeapon.position.y=-0.22+(l>0?Math.abs(Math.sin(player.moved*8))*0.008:0)+player.recoil*0.12;fpWeapon.rotation.x=0.04+player.recoil*0.25}}
function updateResp(dt){if(!player.alive&&player.respawn>0){player.respawn-=dt;if(player.respawn<=0)respawnPlayer()}for(const b of bots)if(!b.alive&&b.respawn>0){b.respawn-=dt;if(b.respawn<=0)respawnBot(b)}}
function updateTimer(dt){if(!game.started)return;if(game.buyPhase){game.buyTime-=dt;ui.buyTime.textContent=String(Math.max(0,Math.ceil(game.buyTime)));if(game.buyTime<=0)closeBuy();return}game.timeLeft-=dt;if(game.mode==="zombie"){if(game.state==="zombie_prep"&&game.timeLeft<=0){startZombie();return}if(game.state==="zombie_live")checkWin()}else checkWin()}
function updateSecrets(){if(!world||!player.alive)return;for(const s of world.secrets){if(s.found)continue;if(inRect(player.pos.x,player.pos.z,s,0)){s.found=true;showStatus("Найдена "+s.name,2);break}}}
function stateText(){if(game.statusTimer>0&&game.status)return game.status;if(!game.started)return"-";if(game.buyPhase)return"Закупка";if(game.mode==="zombie")return game.state==="zombie_prep"?"Prep":"Infection";return"Live"}
function updateHud(dt){if(game.statusTimer>0){game.statusTimer-=dt;if(game.statusTimer<=0)game.status=""}ui.hp.textContent=String(Math.max(0,Math.ceil(player.hp)));ui.kills.textContent=String(player.kills);ui.deaths.textContent=String(player.deaths);ui.modeLabel.textContent=modeName(game.mode);ui.weaponLabel.textContent=curWeapon().name;ui.teamScore.textContent=game.teamScore.ally+" : "+game.teamScore.enemy;ui.time.textContent=fmt(game.timeLeft);ui.state.textContent=stateText();ui.acc.textContent=(player.shots>0?Math.round(player.hits/player.shots*100):0)+"%"}
function teamLabel(t){return t==="ally"?"CT":t==="enemy"?"T":"Zombie"}
function renderScore(){const rows=['<div class="score-row header"><div>TEAM</div><div>PLAYER</div><div>K</div><div>D</div><div>HP</div><div>WPN</div></div>'];const arr=[{team:player.team,name:"YOU",k:player.kills,d:player.deaths,hp:Math.max(0,Math.ceil(player.hp)),w:curWeapon().name}];for(const b of bots)arr.push({team:b.team,name:b.name,k:b.kills,d:b.deaths,hp:b.alive?Math.max(0,Math.ceil(b.hp)):0,w:WEAPONS[b.weapon]?.name||b.weapon});arr.sort((a,b)=>b.k-a.k||a.d-b.d||a.name.localeCompare(b.name));for(const e of arr){const c=e.team==="ally"?"team-ally":e.team==="enemy"?"team-enemy":"team-zombie";rows.push('<div class="score-row"><div class="'+c+'">'+teamLabel(e.team)+'</div><div>'+e.name+'</div><div>'+e.k+'</div><div>'+e.d+'</div><div>'+e.hp+'</div><div>'+e.w+'</div></div>')}ui.scoreContent.innerHTML=rows.join("");game.dirtyScore=false}
function tick(dt){if(!game.started||game.paused)return;updateTimer(dt);if(!game.started)return;updateResp(dt);updatePlayer(dt);for(const b of bots)updateBot(b,dt);updateSecrets();updateHud(dt);if(!ui.scoreboard.classList.contains("hidden")||game.dirtyScore)renderScore()}
function chooseReward(){const pool=SKINS.filter(s=>s.weight>0),sum=pool.reduce((a,s)=>a+s.weight,0);let r=Math.random()*sum;for(const s of pool){r-=s.weight;if(r<=0)return s}return pool[pool.length-1]}
function refreshCases(){ui.cases.textContent=String(inv.cases)}
function refreshSkins(){const ids=Object.keys(inv.owned).sort((a,b)=>skinById(a).weight-skinById(b).weight);ui.skinSelect.innerHTML="";for(const id of ids){const s=skinById(id),o=document.createElement("option");o.value=id;o.textContent=s.icon+" "+s.name+" ["+s.rarity+"] x"+inv.owned[id];if(id===inv.equipped)o.selected=true;ui.skinSelect.appendChild(o)}}
function openCase(){if(game.caseRolling)return;if(inv.cases<=0){ui.caseLog.textContent="Кейсы закончились.";return}inv.cases--;refreshCases();game.caseRolling=true;let t=0;const inter=setInterval(()=>{t++;const tmp=SKINS[rint(1,SKINS.length-1)];ui.caseLog.textContent="Крутится: "+tmp.icon+" "+tmp.name+" ("+tmp.rarity+")";if(t>=14){clearInterval(inter);const r=chooseReward();inv.owned[r.id]=(inv.owned[r.id]||0)+1;ui.caseLog.textContent="Выпало: "+r.icon+" "+r.name+" ("+r.rarity+")";refreshSkins();game.caseRolling=false}},80)}
function setBuy(id){if(!WEAPONS[id]||WEAPONS[id].slot!==1)return;player.primary=id;ui.buyPicked.textContent="Выбрано: "+WEAPONS[id].name;for(const b of ui.buyItems)b.classList.toggle("active",b.dataset.buy===id);if(player.slot===1&&game.started)buildFPWeapon()}
function fillMaps(){ui.map.innerHTML="";for(const m of MAPS){const o=document.createElement("option");o.value=m.id;o.textContent=m.name;ui.map.appendChild(o)}ui.map.value=MAPS[0].id}
function install(){window.addEventListener("resize",()=>{renderer.setSize(window.innerWidth,window.innerHeight);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix()});document.addEventListener("pointerlockchange",()=>{if(!game.started||document.pointerLockElement===canvas||game.buyPhase||!ui.death.classList.contains("hidden"))return;pauseGame()});document.addEventListener("keydown",e=>{if(e.code==="Tab"){e.preventDefault();if(game.started){ui.scoreboard.classList.remove("hidden");renderScore()}return}keys.add(e.code);if(!game.started)return;if(e.code==="Digit1")switchSlot(1);if(e.code==="Digit2")switchSlot(2);if(e.code==="Digit3")switchSlot(3);if(e.code==="KeyB"&&game.buyPhase)showBuy();if(e.code==="Escape"){if(!ui.buy.classList.contains("hidden"))return;if(ui.pause.classList.contains("hidden"))pauseGame();else resumeGame()}});document.addEventListener("keyup",e=>{keys.delete(e.code);if(e.code==="Tab")ui.scoreboard.classList.add("hidden")});document.addEventListener("mousemove",e=>{if(document.pointerLockElement!==canvas)return;player.yaw-=e.movementX*Number(ui.sens.value);player.pitch-=e.movementY*Number(ui.sens.value);player.pitch=clamp(-1.25,1.25,player.pitch)});canvas.addEventListener("mousedown",e=>{lockAudio();if(e.button!==0)return;mouse.fire=true;mouse.just=true;if(game.started&&!game.paused&&!game.buyPhase)lockPointer()});canvas.addEventListener("mouseup",e=>{if(e.button===0)mouse.fire=false});canvas.addEventListener("click",()=>{lockAudio();if(game.started&&!game.paused&&!game.buyPhase)lockPointer()});ui.start.addEventListener("click",startMatch);ui.openCase.addEventListener("click",openCase);ui.skinSelect.addEventListener("change",()=>{inv.equipped=ui.skinSelect.value;applySkin()});ui.resume.addEventListener("click",resumeGame);ui.back.addEventListener("click",backMenu);ui.buyClose.addEventListener("click",closeBuy);for(const b of ui.buyItems)b.addEventListener("click",()=>setBuy(b.dataset.buy));ui.retry.addEventListener("click",startMatch);ui.menuBtn.addEventListener("click",backMenu)}
function init(){fillMaps();refreshCases();refreshSkins();setBuy(player.primary);ui.mode.value="duel";ui.difficulty.value="normal";ui.modeLabel.textContent=modeName(ui.mode.value);ui.time.textContent="00:00";ui.state.textContent="-";install()}
function animate(){requestAnimationFrame(animate);const dt=Math.min(0.05,clock.getDelta());tick(dt);updateFx(dt);renderer.render(scene,camera)}
init();animate();


/* === V11 Unified Update === */
const V11_UI_TEXT_RU={
  modeDescTitle:"Режим:",
  buy:"Закупка",
  live:"Бой",
  prep:"Подготовка",
  infection:"Инфекция",
  noRespawn:"Без возрождений",
  waiting:"Ожидание",
  contractDone:"Контракт выполнен: +1 кейс",
  found:"Найдена",
  zombieStart:"Зомби выбраны. Выживай",
  roundStart:"Раунд начался"
};

const MODE_CONFIG={
  duel:{id:"duel",nameRu:"Duel 1v1",descriptionRu:"Классический дуэльный режим. Один бот против тебя.",timeLimit:300,scoreLimit:7},
  team:{id:"team",nameRu:"Team 5v5",descriptionRu:"Командный бой до лимита фрагов.",timeLimit:420,scoreLimit:30},
  elim:{id:"elim",nameRu:"No Respawn 5v5",descriptionRu:"Умер - ждешь конец раунда. Победа по вайпу.",timeLimit:210,scoreLimit:1},
  zombie:{id:"zombie",nameRu:"Zombie Infection",descriptionRu:"Люди разбегаются, зомби заражают касанием. У зомби 500 HP.",timeLimit:20,scoreLimit:0},
  blitz:{id:"blitz",nameRu:"Blitz 3v3",descriptionRu:"Быстрые короткие раунды, агрессивный темп.",timeLimit:240,scoreLimit:18},
  arena:{id:"arena",nameRu:"Arena 4v4",descriptionRu:"Средний темп, баланс между пушем и удержанием.",timeLimit:300,scoreLimit:22},
  survival:{id:"survival",nameRu:"Survival Hold",descriptionRu:"Выдержи волны против численного преимущества.",timeLimit:360,scoreLimit:999}
};

const BOT_ARCHETYPES=["entry","lurker","anchor","support","wildcard"];
const BOT_SKILL_PROFILES={
  weak:{reactionMul:1.35,aimMul:1.4,strafeMul:0.86,coverMul:0.82,turnRate:1.6,clutchChance:0.16},
  medium:{reactionMul:1.0,aimMul:1.0,strafeMul:1.0,coverMul:1.0,turnRate:2.2,clutchChance:0.1},
  strong:{reactionMul:0.78,aimMul:0.74,strafeMul:1.18,coverMul:1.2,turnRate:2.7,clutchChance:0.06}
};

const EVENT_POOL=[
  {id:"cash_big",name:"Денежный дроп",apply:()=>{player.money=Math.min(16000,(player.money||0)+600);showStatus("Дроп: +600$",1.3)}},
  {id:"medkit",name:"Медпак",apply:()=>{if(player.alive){player.hp=Math.min(player.maxHp,player.hp+35);showStatus("Медпак: +35 HP",1.3)}}},
  {id:"boost",name:"Боевой буст",apply:()=>{player.perkTimer=Math.min(12,(player.perkTimer||0)+4);showStatus("Буст скорости: +4с",1.3)}},
  {id:"case",name:"Кейс",apply:()=>{inv.cases=(inv.cases||0)+1;refreshCases();showStatus("Бонус: +1 кейс",1.3)}}
];

const V11_ZOMBIE_HP=500;
const V11_ZOMBIE_GRACE=10;
const V11_ZOMBIE_INFECT_CD=1.8;

const v11UI={
  modeDesc:document.getElementById("mode-desc"),
  money:document.getElementById("money")
};

if(!WEAPONS.m4)WEAPONS.m4={id:"m4",name:"M4A1",slot:1,damage:31,fireRate:0.095,spread:0.007,range:45,auto:true,recoil:0.007,pellets:1};
if(!WEAPONS.sniper)WEAPONS.sniper={id:"sniper",name:"AWP",slot:1,damage:92,fireRate:1.22,spread:0.0014,range:86,auto:false,recoil:0.016,pellets:1};
if(!WEAPONS.lmg)WEAPONS.lmg={id:"lmg",name:"M249",slot:1,damage:28,fireRate:0.082,spread:0.012,range:50,auto:true,recoil:0.008,pellets:1};

if(!MAPS.find(m=>m.id==="outpost"))MAPS.push({id:"outpost",name:"Outpost Zero",size:78,spawns:{ally:{x:-30,z:22},enemy:{x:30,z:-22},shared:{x:-29,z:21}},zones:[{name:"CT",color:0x3c77c5,x:-30,z:22,w:12,d:10},{name:"T",color:0xc34f4f,x:30,z:-22,w:12,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:14,d:12},{name:"A",color:0xcd6751,x:22,z:14,w:10,d:8},{name:"B",color:0x4f83c7,x:-22,z:-14,w:10,d:8}],walls:[{x:0,z:0,w:2,d:34},{x:-16,z:10,w:16,d:2},{x:16,z:-10,w:16,d:2},{x:0,z:20,w:16,d:2},{x:0,z:-20,w:16,d:2}],props:[{x:-12,z:5,w:2,d:2,h:1.2,color:0x74879f},{x:12,z:-5,w:2,d:2,h:1.2,color:0x74879f},{x:0,z:12,w:3,d:2,h:1.3,color:0x6f7f95}],secrets:[{name:"Нычка One",x:24,z:20,w:2.5,d:2.5,found:false},{name:"Нычка Two",x:0,z:0,w:2.3,d:2.3,found:false},{name:"Нычка Three",x:-24,z:-20,w:2.5,d:2.5,found:false}]});
if(!MAPS.find(m=>m.id==="factory2"))MAPS.push({id:"factory2",name:"Factory Ring",size:84,spawns:{ally:{x:-33,z:10},enemy:{x:33,z:-10},shared:{x:-32,z:9}},zones:[{name:"CT",color:0x3c77c5,x:-33,z:10,w:12,d:10},{name:"T",color:0xc34f4f,x:33,z:-10,w:12,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:18,d:12},{name:"A",color:0xcd6751,x:24,z:22,w:10,d:8},{name:"B",color:0x4f83c7,x:-24,z:-22,w:10,d:8}],walls:[{x:-10,z:0,w:2,d:40},{x:10,z:0,w:2,d:40},{x:0,z:0,w:24,d:2},{x:0,z:26,w:22,d:2},{x:0,z:-26,w:22,d:2}],props:[{x:-14,z:-10,w:2,d:3,h:1.2,color:0x6f8094},{x:14,z:10,w:2,d:3,h:1.2,color:0x6f8094},{x:0,z:15,w:3,d:2,h:1.3,color:0x7b8ca1}],secrets:[{name:"Нычка Roof",x:26,z:24,w:2.5,d:2.5,found:false},{name:"Нычка Core",x:0,z:0,w:2.3,d:2.3,found:false},{name:"Нычка Pipe",x:-26,z:-24,w:2.5,d:2.5,found:false}]});
if(!MAPS.find(m=>m.id==="ruins2"))MAPS.push({id:"ruins2",name:"Ruins Canyon",size:86,spawns:{ally:{x:-34,z:24},enemy:{x:34,z:-24},shared:{x:-33,z:23}},zones:[{name:"CT",color:0x3c77c5,x:-34,z:24,w:12,d:10},{name:"T",color:0xc34f4f,x:34,z:-24,w:12,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:18,d:14},{name:"A",color:0xcd6751,x:26,z:16,w:10,d:8},{name:"B",color:0x4f83c7,x:-26,z:-16,w:10,d:8}],walls:[{x:0,z:0,w:2,d:38},{x:-18,z:12,w:18,d:2},{x:18,z:-12,w:18,d:2},{x:0,z:22,w:20,d:2},{x:0,z:-22,w:20,d:2}],props:[{x:-12,z:6,w:2,d:2,h:1.2,color:0x7b8a9f},{x:12,z:-6,w:2,d:2,h:1.2,color:0x7b8a9f},{x:0,z:14,w:3,d:2,h:1.3,color:0x71839b}],secrets:[{name:"Нычка Arch",x:28,z:20,w:2.5,d:2.5,found:false},{name:"Нычка Pit",x:0,z:0,w:2.3,d:2.3,found:false},{name:"Нычка Cliff",x:-28,z:-20,w:2.5,d:2.5,found:false}]});

renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.14;
if(THREE.SRGBColorSpace)renderer.outputColorSpace=THREE.SRGBColorSpace;

function v11SyncModes(){
  const prev=ui.mode.value;
  ui.mode.innerHTML="";
  for(const m of Object.values(MODE_CONFIG)){const o=document.createElement("option");o.value=m.id;o.textContent=m.nameRu;ui.mode.appendChild(o)}
  ui.mode.value=MODE_CONFIG[prev]?prev:"duel";
}
function v11ModeDesc(mode){const m=MODE_CONFIG[mode]||MODE_CONFIG.duel;return m.descriptionRu}
function v11UpdateModeDesc(){if(v11UI.modeDesc)v11UI.modeDesc.textContent=v11ModeDesc(ui.mode.value)}
v11SyncModes();
fillMaps();
v11UpdateModeDesc();
ui.mode.addEventListener("change",v11UpdateModeDesc);

function v11ModeName(m){return (MODE_CONFIG[m]||MODE_CONFIG.duel).nameRu}
function v11AngleDiff(a,b){let d=a-b;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;return d}
function v11Clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function v11Pick(arr){return arr[rint(0,arr.length-1)]}

function v11AssignBotProfile(b){
  const diff=ui.difficulty.value;
  const tier=diff==="easy"?(Math.random()<0.7?"weak":"medium"):diff==="hard"?(Math.random()<0.5?"strong":"medium"):(Math.random()<0.2?"weak":Math.random()<0.25?"strong":"medium");
  const arch=v11Pick(BOT_ARCHETYPES);
  const p=BOT_SKILL_PROFILES[tier];
  b.v11={tier,arch,turnRate:p.turnRate,clutch:0,lastEvent:0};
  b.skill.reaction*=p.reactionMul;
  b.skill.aimError*=p.aimMul;
  b.skill.strafe*=p.strafeMul;
  b.skill.cover=v11Clamp(b.skill.cover*p.coverMul,0.05,0.95);
  if(arch==="entry")b.speed*=1.06;
  if(arch==="anchor")b.speed*=0.94;
  if(arch==="lurker")b.skill.cover=v11Clamp(b.skill.cover+0.15,0.05,0.98);
  if(arch==="wildcard")b.skill.strafe*=1.1;
}

const _spawnBotV11=spawnBot;
spawnBot=function(team,idx,weapon,same=false){const b=_spawnBotV11(team,idx,weapon,same);v11AssignBotProfile(b);return b};
const _respawnBotV11=respawnBot;
respawnBot=function(b){_respawnBotV11(b);if(b&&b.alive)v11AssignBotProfile(b)};

const _resetPlayerV11=resetPlayer;
resetPlayer=function(){_resetPlayerV11();player.money=3200;player.streak=0;player.perkTimer=0;player.contract=0;player.contractTarget=8};

const _infectPlayerV11=infectPlayer;
infectPlayer=function(att=null){_infectPlayerV11(att);player.maxHp=V11_ZOMBIE_HP;player.hp=V11_ZOMBIE_HP;player.speed=7.2};
const _infectBotV11=infectBot;
infectBot=function(b,att=null){_infectBotV11(b,att);if(!b)return;b.maxHp=V11_ZOMBIE_HP;b.hp=V11_ZOMBIE_HP;b.speed=Math.max(3.2,b.speed*1.1)};

const _respawnPlayerV11=respawnPlayer;
respawnPlayer=function(){_respawnPlayerV11();if(player.team==="zombie"){player.maxHp=V11_ZOMBIE_HP;player.hp=V11_ZOMBIE_HP}}

const _startZombieV11=startZombie;
startZombie=function(){_startZombieV11();game.zGrace=V11_ZOMBIE_GRACE;showStatus(V11_UI_TEXT_RU.zombieStart+" | Защита людей: "+Math.ceil(game.zGrace)+"с",2.8)};

const _setupModeV11=setupMode;
setupMode=function(){
  if(game.mode==="elim"){game.teamScore.ally=0;game.teamScore.enemy=0;bots=[];botId=0;game.scoreLimit=1;game.timeLeft=210;for(let i=0;i<4;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<5;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);game.dirtyScore=true;return}
  if(game.mode==="blitz"){game.teamScore.ally=0;game.teamScore.enemy=0;bots=[];botId=0;game.scoreLimit=18;game.timeLeft=240;for(let i=0;i<2;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<3;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);game.dirtyScore=true;return}
  if(game.mode==="arena"){game.teamScore.ally=0;game.teamScore.enemy=0;bots=[];botId=0;game.scoreLimit=22;game.timeLeft=300;for(let i=0;i<3;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<4;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);game.dirtyScore=true;return}
  if(game.mode==="survival"){game.teamScore.ally=0;game.teamScore.enemy=0;bots=[];botId=0;game.scoreLimit=0;game.timeLeft=360;for(let i=0;i<2;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<9;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);game.dirtyScore=true;return}
  _setupModeV11();
};

const _updateRespV11=updateResp;
updateResp=function(dt){if(game.mode==="elim"||game.mode==="survival")return;_updateRespV11(dt)};

function v11AliveCount(team){let n=0;if(player.alive&&player.team===team)n++;for(const b of bots)if(b.alive&&b.team===team)n++;return n}

const _checkWinV11=checkWin;
checkWin=function(){
  if(!game.started)return;
  if(game.mode==="survival"){if(!player.alive){finish("Поражение: ты погиб");return}if(game.timeLeft<=0){finish("Победа: удержание завершено");return}return}
  if(game.mode==="elim"){const a=v11AliveCount("ally"),e=v11AliveCount("enemy");if(a<=0||e<=0||game.timeLeft<=0){if(a>e)finish("Победа CT | Без возрождений");else if(e>a)finish("Победа T | Без возрождений");else finish("Ничья | Без возрождений")}return}
  _checkWinV11();
};

const _updateTimerV11=updateTimer;
updateTimer=function(dt){_updateTimerV11(dt);if(game.mode==="zombie"&&game.state==="zombie_live"&&game.zGrace>0){game.zGrace=Math.max(0,game.zGrace-dt);if(game.zGrace>0&&Math.floor(game.zGrace)!==Math.floor(game.zGrace+dt))showStatus("Защита людей: "+Math.ceil(game.zGrace)+"с",0.4)}};

const _awardV11=award;
award=function(att){const prev=player.kills;_awardV11(att);if(att===player&&player.kills>prev){player.money=Math.min(16000,(player.money||0)+300);player.streak=(player.streak||0)+1;player.contract=(player.contract||0)+1;if(player.kills%3===0){player.money=Math.min(16000,player.money+350);showStatus("Серия! +350$",1)}if(player.contract>=player.contractTarget){player.contract=0;inv.cases++;refreshCases();showStatus(V11_UI_TEXT_RU.contractDone,1.6)}}};

const _finishV11=finish;
finish=function(text){if(game.started){const z=game.mode==="zombie";const win=(z?((player.team!=="zombie"&&humans()>0)||(player.team==="zombie"&&humans()<=0)):(game.teamScore.ally===game.teamScore.enemy?true:(player.team==="ally"?game.teamScore.ally>=game.teamScore.enemy:game.teamScore.enemy>=game.teamScore.ally)));player.money=Math.min(16000,(player.money||0)+(win?1200:700));} _finishV11(text)};

const _meleeV11=melee;
melee=function(sh,w,target=null){
  if(w.id!=="claws"||game.mode!=="zombie"||game.state!=="zombie_live")return _meleeV11(sh,w,target);
  const now=performance.now()/1000;
  if(game.zGrace>0)return false;
  if(!sh.v11InfNext)sh.v11InfNext=0;
  if(now<sh.v11InfNext)return false;
  const sx=sh===player?player.pos.x:sh.pos.x,sz=sh===player?player.pos.z:sh.pos.z;
  let best=null,bd=w.range;
  for(const e of (target?[target]:enemies(sh))){if(!eAlive(e))continue;const ex=e===player?player.pos.x:e.pos.x,ez=e===player?player.pos.z:e.pos.z,d=Math.hypot(ex-sx,ez-sz);if(d>bd||lineBlocked(sx,sz,ex,ez))continue;best=e;bd=d}
  if(!best)return false;
  sh.v11InfNext=now+V11_ZOMBIE_INFECT_CD;
  if(best===player&&player.team!=="zombie")infectPlayer(sh===player?null:sh);else if(best!==player&&best.team!=="zombie")infectBot(best,sh===player?null:sh);
  return true;
};

const _chooseTargetV11=chooseTarget;
chooseTarget=function(b){
  let best=null,bs=1e9;
  for(const c of enemies(b)){
    if(!eAlive(c))continue;
    const p=tPos(c),d=Math.hypot(p.x-b.pos.x,p.z-b.pos.z);
    const vis=!lineBlocked(b.pos.x,b.pos.z,p.x,p.z);
    let s=d+(vis?-3:2)+rand(0,1.4);
    const hp=c===player?player.hp:c.hp;
    if(hp<40)s-=2.2;
    if(c===player)s-=1.1;
    if(!vis&&d>28)continue;
    if(s<bs){bs=s;best=c}
  }
  return best||_chooseTargetV11(b);
};

const _moveBotV11=moveBot;
moveBot=function(b,mx,mz,dt){
  const l=Math.hypot(mx,mz);
  b.lastMx=mx;b.lastMz=mz;
  if(l<=0.0001){const gy=groundY(b.pos.x,b.pos.z),idle=Math.sin(performance.now()*0.003+(b.mesh.userData.bobOff||0))*0.025;b.mesh.position.set(b.pos.x,gy+idle,b.pos.z);const ll=b.mesh.getObjectByName("legL"),lr=b.mesh.getObjectByName("legR"),al=b.mesh.getObjectByName("armL"),ar=b.mesh.getObjectByName("armR");if(ll&&lr){ll.rotation.x*=0.85;lr.rotation.x*=0.85}if(al&&ar){al.rotation.x*=0.85;ar.rotation.x*=0.85}return false}
  return _moveBotV11(b,mx,mz,dt);
};

const _shootBotV11=shootBot;
shootBot=function(b,t){
  if(!b.alive)return;
  const w=WEAPONS[b.weapon]||WEAPONS.rifle;
  if(w.id==="claws"){_shootBotV11(b,t);return}
  const gy=groundY(b.pos.x,b.pos.z),o=new THREE.Vector3(b.pos.x,1.5+gy,b.pos.z),c=center(t),dir=new THREE.Vector3(c.x-o.x,c.y-o.y,c.z-o.z),dist=dir.length();
  if(dist<=0.001)return;
  dir.normalize();
  muzzle(o,dir,b.team==="zombie"?0x97ff92:0xffcc7a);
  const movePenalty=Math.min(0.03,Math.hypot(b.lastMx||0,b.lastMz||0)*0.03);
  const stress=(b.hp<(b.maxHp||100)*0.45)?0.018:0;
  const clutch=(b.v11&&b.v11.clutch>0)?-0.012:0;
  const extra=Math.max(0.008,(b.skill.aimError||0.18)*(0.82+dist/22)+movePenalty+stress+rand(0,0.013)+clutch);
  const hit=shootRay(b,w,o,dir,extra);
  tone(b.pos,w.id==="rifle"?600:w.id==="smg"?760:w.id==="shotgun"?430:700,0.02,0.034,"square");
  if(!hit){const miss=o.clone().addScaledVector(dir,Math.min(w.range,8+dist));if(!blockedAt(miss.x,miss.z,0.2))impact(miss)}
};

const _updateBotV11=updateBot;
updateBot=function(b,dt){
  if(!b.alive||b.respawn>0)return;
  if(b.v11&&b.v11.tier==="weak"&&b.v11.clutch<=0&&Math.random()<0.00065)b.v11.clutch=10;
  if(b.v11&&b.v11.clutch>0)b.v11.clutch=Math.max(0,b.v11.clutch-dt);
  const wasYaw=b.mesh.rotation.y;
  _updateBotV11(b,dt);
  if(!b.alive||b.respawn>0)return;
  if(b.ai&&b.ai.target){
    const tp=tPos(b.ai.target);
    const targetYaw=Math.atan2(tp.x-b.pos.x,tp.z-b.pos.z);
    const turn=(b.v11?b.v11.turnRate:2.2)*dt;
    const dYaw=v11AngleDiff(targetYaw,b.mesh.rotation.y);
    b.mesh.rotation.y+=v11Clamp(dYaw,-turn,turn);
  }else{
    b.mesh.rotation.y=wasYaw;
  }
  if(b.v11&&b.v11.arch==="lurker"&&b.ai&&b.ai.target&&Math.random()<0.01){
    b.ai.repath=Math.max(b.ai.repath,0.55);
  }
};

const _updatePlayerV11=updatePlayer;
updatePlayer=function(dt){
  if(!player.alive||game.buyPhase)return;
  const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=-fz,rz=fx;
  let mx=0,mz=0;
  if(keys.has("KeyW")){mx+=fx;mz+=fz}
  if(keys.has("KeyS")){mx-=fx;mz-=fz}
  if(keys.has("KeyD")){mx+=rx;mz+=rz}
  if(keys.has("KeyA")){mx-=rx;mz-=rz}
  const l=Math.hypot(mx,mz);
  if(l>0){mx/=l;mz/=l}
  const sp=(player.team==="zombie"?7.2:player.speed)*(keys.has("ShiftLeft")?1.18:1);
  player.prev.copy(player.pos);
  player.pos.x+=mx*sp*dt;player.pos.z+=mz*sp*dt;
  resolveCollision(player.pos,player.r);
  const gy=groundY(player.pos.x,player.pos.z);
  if(l>0){player.moved+=dt;player.step+=dt;const it=player.team==="zombie"?0.3:0.36;if(player.step>=it){player.step=0;tone(player.pos,player.team==="zombie"?140:180,0.02,0.02,"triangle")}}
  if(player.onGround&&keys.has("Space")){player.vy=4.6;player.onGround=false}
  player.vy-=12*dt;player.y+=player.vy*dt;
  if(player.y<=player.eye+gy){player.y=player.eye+gy;player.vy=0;player.onGround=true}
  if(player.shootCd>0)player.shootCd-=dt;
  if(mouse.fire){const w=curWeapon();if(w.auto||mouse.just)shootPlayer()}
  mouse.just=false;
  const bob=l>0?Math.sin(player.moved*12)*0.03:Math.sin(performance.now()*0.002)*0.006,rp=player.recoil*0.42,ry=player.recoil*0.1;
  camera.position.set(player.pos.x,player.y+bob,player.pos.z);camera.rotation.y=player.yaw+ry;camera.rotation.x=player.pitch+rp;
  player.recoil=Math.max(0,player.recoil-dt*0.25);
  if(fpWeapon){fpWeapon.position.x=0.28+(l>0?Math.sin(player.moved*8)*0.008:Math.sin(performance.now()*0.002)*0.003);fpWeapon.position.y=-0.22+(l>0?Math.abs(Math.sin(player.moved*8))*0.008:0)+player.recoil*0.12;fpWeapon.rotation.x=0.04+player.recoil*0.25}
};

const _buildMapV11=buildMap;
buildMap=function(map){
  _buildMapV11(map);
  scene.background=new THREE.Color(0x09121b);
  scene.fog=new THREE.Fog(0x09121b,18,136);
  d.intensity=1.45;
  const decorM1=new THREE.MeshStandardMaterial({color:0x3a4658,roughness:0.8});
  const decorM2=new THREE.MeshStandardMaterial({color:0x5d4f43,roughness:0.86});
  for(let i=0;i<16;i++){
    const x=rand(-map.size*0.42,map.size*0.42),z=rand(-map.size*0.42,map.size*0.42);
    if(blockedAt(x,z,0.9))continue;
    const h=rand(0.8,2.2),w=rand(0.8,1.8),d2=rand(0.8,1.8);
    const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d2),ch(0.5)?decorM1:decorM2),gy=groundY(x,z);
    b.position.set(x,gy+h/2,z);b.castShadow=true;b.receiveShadow=true;addWorld(b);
  }
  for(let i=0;i<3;i++){
    const x=rand(-map.size*0.28,map.size*0.28),z=rand(-map.size*0.28,map.size*0.28);if(blockedAt(x,z,0.8))continue;
    const gy=groundY(x,z);
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.1,2.8,10),new THREE.MeshStandardMaterial({color:0x39465a,roughness:0.55,metalness:0.35}));
    pole.position.set(x,gy+1.4,z);addWorld(pole);
    const lamp=new THREE.PointLight(0xffcd85,0.65,17,2);lamp.position.set(x,gy+2.7,z);addWorld(lamp);
  }
};

const _updateHudV11=updateHud;
updateHud=function(dt){
  _updateHudV11(dt);
  if(ui.modeLabel)ui.modeLabel.textContent=v11ModeName(game.mode);
  if(v11UI.money)v11UI.money.textContent=String(Math.max(0,Math.floor(player.money||0)));
  if(v11UI.modeDesc&&!game.started)v11UI.modeDesc.textContent=v11ModeDesc(ui.mode.value);
  if(ui.state&&game.mode==="zombie"&&game.state==="zombie_live"&&game.zGrace>0)ui.state.textContent="Подготовка людей: "+Math.ceil(game.zGrace)+"с";
};

const _tickV11=tick;
tick=function(dt){
  if(!Number.isFinite(game.eventTimer))game.eventTimer=44;
  _tickV11(dt);
  if(!game.started||game.paused)return;
  game.eventTimer-=dt;
  if(game.eventTimer<=0){game.eventTimer=rand(34,52);v11Pick(EVENT_POOL).apply()}
};

if(ui.start){ui.start.addEventListener("click",()=>{v11UpdateModeDesc()},true)}
if(ui.retry){ui.retry.addEventListener("click",()=>{v11UpdateModeDesc()},true)}
showStatus=function(t,s=2){game.status=String(t||"");game.statusTimer=s;ui.state.textContent=game.status};

/* === V11.1 Stabilization & Gameplay Expansion === */
(function(){
  const UI_TEXT_RU={
    ct:"Синие",
    tt:"Красные",
    zombie:"Зомби",
    you:"ТЫ",
    buyOnlySpawn:"Закупка доступна только на спавне",
    buyOpen:"Быстрая закупка открыта",
    buy:"Закупка",
    live:"Бой",
    prep:"Подготовка",
    infection:"Инфекция",
    respawn:"Респавн",
    dead:"Ты погиб",
    infected:"Ты заражен",
    contractDone:"Контракт выполнен: +1 кейс",
    modeStarted:"Матч начался"
  };

  Object.assign(V11_UI_TEXT_RU,UI_TEXT_RU);

  Object.assign(MODE_CONFIG.duel,{nameRu:"Дуэль 1x1",descriptionRu:"Короткие раунды 1 на 1. Победа за счет точности и тайминга.",timeLimit:300,scoreLimit:7,teamSetup:"1x1",economyRules:"Стандартная награда за фраг и раунд",specialRules:"Быстрые респавны, чистая перестрелка"});
  Object.assign(MODE_CONFIG.team,{nameRu:"Командный 5x5",descriptionRu:"Классический командный режим с экономикой и контролем карты.",timeLimit:420,scoreLimit:30,teamSetup:"5x5",economyRules:"Награда за убийства, серия и итог раунда",specialRules:"Закупка на старте и по B на спавне"});
  Object.assign(MODE_CONFIG.elim,{nameRu:"Без возрождений 5x5",descriptionRu:"Умер - наблюдаешь. Раунд решают позиционка и размены.",timeLimit:210,scoreLimit:1,teamSetup:"5x5",economyRules:"Повышенный бонус за выживание и победу",specialRules:"Респавн отключен до конца раунда"});
  Object.assign(MODE_CONFIG.zombie,{nameRu:"Зомби-инфекция",descriptionRu:"Люди занимают позиции, зомби давят координированно. У зомби 500 HP.",timeLimit:20,scoreLimit:0,teamSetup:"Люди против зараженных",economyRules:"Бонусы за выживание и инфекции",specialRules:"Грейс-период людей, ограничение темпа заражений"});
  Object.assign(MODE_CONFIG.blitz,{nameRu:"Blitz 3x3",descriptionRu:"Компактный агрессивный режим с очень быстрым темпом.",timeLimit:240,scoreLimit:18,teamSetup:"3x3",economyRules:"Укороченные циклы выплат",specialRules:"Минимум пауз между стычками"});
  Object.assign(MODE_CONFIG.arena,{nameRu:"Arena 4x4",descriptionRu:"Сбалансированный формат с частыми ретейками и флангами.",timeLimit:300,scoreLimit:22,teamSetup:"4x4",economyRules:"Стандарт + бонус за серию",specialRules:"Фокус на контроль мида"});
  Object.assign(MODE_CONFIG.survival,{nameRu:"Survival Hold",descriptionRu:"Удержание против численного перевеса врага до конца таймера.",timeLimit:360,scoreLimit:999,teamSetup:"3 против волны",economyRules:"Награды за удержание и серии",specialRules:"Без возрождения, победа по таймеру"});

  const mapNameRu={
    dust:"Пыльный двор",
    mirage:"Плаза Мираж",
    inferno:"Переулки Инферно",
    outpost:"Форпост",
    factory2:"Заводское кольцо",
    ruins2:"Каньон руин"
  };
  for(const m of MAPS){if(mapNameRu[m.id])m.name=mapNameRu[m.id];}

  const skinNameRu={default:"Базовый",desert:"Пустыня",neon:"Неон",venom:"Яд",obsidian:"Обсидиан"};
  for(const s of SKINS){if(skinNameRu[s.id])s.name=skinNameRu[s.id];}

  const diffDesc={
    easy:"Легкий AI: больше ошибок, медленные решения, но бывают удачные раунды.",
    normal:"Средний AI: сбалансированный стиль, ротации, удержание позиций.",
    hard:"Сложный AI: лучше позиционка и тайминги, но без аимбота."
  };

  const modeDescEl=document.getElementById("mode-desc");
  const diffDescEl=document.getElementById("difficulty-desc");
  const hpBigEl=document.getElementById("hp-big");

  function modeNameRu(id){const m=MODE_CONFIG[id]||MODE_CONFIG.duel;return m.nameRu||id;}
  function modeDescRu(id){const m=MODE_CONFIG[id]||MODE_CONFIG.duel;return m.descriptionRu+" | Команды: "+(m.teamSetup||"-")+" | "+(m.specialRules||"");}

  function syncModeSelectRu(){
    const prev=ui.mode.value;
    ui.mode.innerHTML="";
    for(const m of Object.values(MODE_CONFIG)){
      const o=document.createElement("option");
      o.value=m.id;
      o.textContent=m.nameRu;
      ui.mode.appendChild(o);
    }
    ui.mode.value=MODE_CONFIG[prev]?prev:"duel";
  }

  function updateMenuDescriptors(){
    if(modeDescEl)modeDescEl.textContent=modeDescRu(ui.mode.value);
    if(diffDescEl)diffDescEl.textContent=diffDesc[ui.difficulty.value]||diffDesc.normal;
    if(!game.started&&ui.modeLabel)ui.modeLabel.textContent=modeNameRu(ui.mode.value);
  }

  syncModeSelectRu();
  fillMaps();
  refreshSkins();
  updateMenuDescriptors();
  ui.mode.addEventListener("change",updateMenuDescriptors);
  ui.difficulty.addEventListener("change",updateMenuDescriptors);

  function teamRu(t){return t==="ally"?UI_TEXT_RU.ct:t==="enemy"?UI_TEXT_RU.tt:UI_TEXT_RU.zombie;}
  function actorName(a){if(!a)return"Среда";if(a===player)return UI_TEXT_RU.you;return a.name||"BOT";}

  const feedWrap=document.createElement("div");
  feedWrap.id="kill-feed";
  ui.hud.appendChild(feedWrap);
  const feedQueue=[];

  function pushFeed(msg,type="k"){
    const row=document.createElement("div");
    row.className="feed-item "+type;
    row.textContent=msg;
    feedWrap.prepend(row);
    feedQueue.unshift({row,t:performance.now()});
    while(feedQueue.length>6){const old=feedQueue.pop();if(old&&old.row&&old.row.parentNode)old.row.parentNode.removeChild(old.row);}
  }

  const _v11TickClean=tick;
  tick=function(dt){
    _v11TickClean(dt);
    const now=performance.now();
    for(let i=feedQueue.length-1;i>=0;i--){if(now-feedQueue[i].t>4300){const dead=feedQueue.splice(i,1)[0];if(dead.row&&dead.row.parentNode)dead.row.parentNode.removeChild(dead.row);}}
  };

  const _v11KillPlayer=killPlayer;
  killPlayer=function(att){
    const wasAlive=player.alive;
    _v11KillPlayer(att);
    if(wasAlive){pushFeed(actorName(att)+" устранил тебя", "d");}
  };

  const _v11KillBot=killBot;
  killBot=function(b,att){
    const victim=b?b.name:"BOT";
    const alive=b?b.alive:false;
    _v11KillBot(b,att);
    if(alive){pushFeed(actorName(att)+" -> "+victim, "k");}
  };

  const _v11InfectPlayer2=infectPlayer;
  infectPlayer=function(att=null){
    const was=player.team;
    _v11InfectPlayer2(att);
    player.maxHp=500;
    player.hp=500;
    player.speed=6.9;
    if(was!=="zombie")pushFeed(actorName(att)+" заразил тебя", "z");
  };

  const _v11InfectBot2=infectBot;
  infectBot=function(b,att=null){
    const was=b?b.team:null;
    _v11InfectBot2(b,att);
    if(!b)return;
    b.maxHp=500;
    b.hp=500;
    b.speed=Math.max(2.85,Math.min(3.25,b.speed));
    if(was&&was!=="zombie")pushFeed(actorName(att)+" заразил "+b.name, "z");
  };

  const _v11RespawnPlayer2=respawnPlayer;
  respawnPlayer=function(){
    _v11RespawnPlayer2();
    if(player.team==="zombie"){
      player.maxHp=500;
      player.hp=500;
      player.speed=6.9;
    }else{
      player.speed=6.15;
    }
  };

  const _v11ResetPlayer2=resetPlayer;
  resetPlayer=function(){
    _v11ResetPlayer2();
    player.speed=6.15;
    player.money=Math.max(3200,player.money||0);
    player.contract=0;
    player.contractTarget=game.mode==="duel"?4:game.mode==="team"?8:6;
    player.perkTimer=0;
  };

  const _v11SpawnBot2=spawnBot;
  spawnBot=function(team,idx,weapon,same=false){
    const b=_v11SpawnBot2(team,idx,weapon,same);
    if(!b)return b;
    b.speed*=0.9;
    b.speed=Math.max(2.6,Math.min(3.2,b.speed));
    return b;
  };

  const _v11RespawnBot2=respawnBot;
  respawnBot=function(b){
    _v11RespawnBot2(b);
    if(!b)return;
    if(b.team==="zombie"){
      b.maxHp=500;
      b.hp=500;
      b.speed=Math.max(2.85,Math.min(3.25,b.speed));
    }else{
      b.speed=Math.max(2.5,Math.min(3.1,b.speed));
    }
  };

  const _v11StartZombie2=startZombie;
  startZombie=function(){
    _v11StartZombie2();
    game.zGrace=10;
    game.zInfWindow={t:performance.now()/1000,c:0};
  };

  const _v11SetupMode2=setupMode;
  setupMode=function(){
    game.teamScore.ally=0;
    game.teamScore.enemy=0;
    bots=[];
    botId=0;
    const cfg=MODE_CONFIG[game.mode]||MODE_CONFIG.duel;
    game.scoreLimit=cfg.scoreLimit||0;
    game.timeLeft=cfg.timeLimit||300;

    if(game.mode==="duel"){
      spawnBot("enemy",0,"rifle",false);
    }else if(game.mode==="team"){
      for(let i=0;i<4;i++)spawnBot("ally",i+1,i%2===0?"rifle":"smg",false);
      for(let i=0;i<5;i++)spawnBot("enemy",i+1,i===0?"shotgun":i%2===0?"rifle":"smg",false);
    }else if(game.mode==="elim"){
      for(let i=0;i<4;i++)spawnBot("ally",i+1,pickBotWeapon(),false);
      for(let i=0;i<5;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);
    }else if(game.mode==="blitz"){
      for(let i=0;i<2;i++)spawnBot("ally",i+1,pickBotWeapon(),false);
      for(let i=0;i<3;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);
    }else if(game.mode==="arena"){
      for(let i=0;i<3;i++)spawnBot("ally",i+1,pickBotWeapon(),false);
      for(let i=0;i<4;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);
    }else if(game.mode==="survival"){
      for(let i=0;i<2;i++)spawnBot("ally",i+1,pickBotWeapon(),false);
      for(let i=0;i<9;i++)spawnBot("enemy",i+1,pickBotWeapon(),false);
    }else if(game.mode==="zombie"){
      game.timeLeft=20;
      for(let i=0;i<11;i++)spawnBot("ally",i+1,i%3===0?"shotgun":i%2===0?"rifle":"smg",true);
    }else{
      _v11SetupMode2();
      return;
    }
    game.dirtyScore=true;
  };

  function nearAllySpawn(radius=11){
    if(!selectedMap||!selectedMap.spawns)return true;
    const sp=selectedMap.spawns.ally||selectedMap.spawns.shared;
    if(!sp)return true;
    return Math.hypot(player.pos.x-sp.x,player.pos.z-sp.z)<=radius;
  }

  const _v11ShowBuy2=showBuy;
  showBuy=function(){
    if(game.started&&!game.buyPhase&&!nearAllySpawn(11)){showStatus(UI_TEXT_RU.buyOnlySpawn,1.2);return;}
    _v11ShowBuy2();
  };

  document.addEventListener("keydown",(e)=>{
    if(e.code!=="KeyB")return;
    if(!game.started||game.paused||game.mode==="zombie"||game.buyPhase||!player.alive)return;
    if(!nearAllySpawn(11)){showStatus(UI_TEXT_RU.buyOnlySpawn,1.2);return;}
    game.buyPhase=true;
    game.buyTime=12;
    showBuy();
    showStatus(UI_TEXT_RU.buyOpen,1.2);
  },true);

  const _v11Melee2=melee;
  melee=function(sh,w,target=null){
    if(!(w.id==="claws"&&game.mode==="zombie"&&game.state==="zombie_live"))return _v11Melee2(sh,w,target);
    if(game.zGrace>0)return false;

    const now=performance.now()/1000;
    if(!game.zInfWindow||now-game.zInfWindow.t>2){game.zInfWindow={t:now,c:0};}
    if(game.zInfWindow.c>=2)return false;

    if(!sh.v11InfNext)sh.v11InfNext=0;
    if(now<sh.v11InfNext)return false;

    const sx=sh===player?player.pos.x:sh.pos.x;
    const sz=sh===player?player.pos.z:sh.pos.z;
    let best=null;
    let bd=w.range;
    for(const e of (target?[target]:enemies(sh))){
      if(!eAlive(e))continue;
      const ex=e===player?player.pos.x:e.pos.x;
      const ez=e===player?player.pos.z:e.pos.z;
      const d=Math.hypot(ex-sx,ez-sz);
      if(d>bd||lineBlocked(sx,sz,ex,ez))continue;
      best=e;
      bd=d;
    }
    if(!best)return false;

    sh.v11InfNext=now+V11_ZOMBIE_INFECT_CD;
    game.zInfWindow.c++;

    if(best===player&&player.team!=="zombie")infectPlayer(sh===player?null:sh);
    else if(best!==player&&best.team!=="zombie")infectBot(best,sh===player?null:sh);
    return true;
  };

  const _v11ChooseTarget2=chooseTarget;
  chooseTarget=function(b){
    let best=null;
    let bs=1e9;
    for(const c of enemies(b)){
      if(!eAlive(c))continue;
      const p=tPos(c);
      const d=Math.hypot(p.x-b.pos.x,p.z-b.pos.z);
      const vis=!lineBlocked(b.pos.x,b.pos.z,p.x,p.z);
      if(!vis&&d>24)continue;

      const toX=p.x-b.pos.x,toZ=p.z-b.pos.z;
      const len=Math.hypot(toX,toZ)||1;
      const tx=toX/len,tz=toZ/len;
      const fx=Math.sin((b.mesh.rotation.y||0)-Math.PI),fz=Math.cos((b.mesh.rotation.y||0)-Math.PI);
      const fov=fx*tx+fz*tz;
      if(fov<-0.2&&d>6)continue;

      let s=d+(vis?-3:2)+rand(0,1.7);
      const hp=c===player?player.hp:c.hp;
      if(hp<40)s-=1.9;
      if(c===player)s-=0.9;
      if(s<bs){bs=s;best=c;}
    }
    return best||_v11ChooseTarget2(b);
  };

  const _v11ShootBot2=shootBot;
  shootBot=function(b,t){
    if(!b.alive)return;
    const w=WEAPONS[b.weapon]||WEAPONS.rifle;
    if(w.id==="claws")return _v11ShootBot2(b,t);

    const gy=groundY(b.pos.x,b.pos.z);
    const o=new THREE.Vector3(b.pos.x,1.5+gy,b.pos.z);
    const c=center(t);
    const aimDir=new THREE.Vector3(c.x-o.x,c.y-o.y,c.z-o.z);
    const dist=aimDir.length();
    if(dist<=0.001)return;
    aimDir.normalize();

    const fx=Math.sin((b.mesh.rotation.y||0)-Math.PI);
    const fz=Math.cos((b.mesh.rotation.y||0)-Math.PI);
    const fwd=new THREE.Vector3(fx,0,fz).normalize();

    const tier=b.v11?b.v11.tier:"medium";
    const blend=tier==="strong"?0.78:tier==="weak"?0.5:0.65;
    const dir=fwd.multiplyScalar(1-blend).add(aimDir.clone().multiplyScalar(blend));

    const movePenalty=Math.min(0.03,Math.hypot(b.lastMx||0,b.lastMz||0)*0.03);
    const stress=b.hp<(b.maxHp||100)*0.45?0.018:0;
    const baseSpread=(b.skill.aimError||0.17)*(0.8+dist/24);
    const extra=Math.max(0.014,baseSpread+movePenalty+stress+rand(0.006,0.02));

    dir.x+=rand(-extra,extra);
    dir.y+=rand(-extra*0.45,extra*0.45);
    dir.z+=rand(-extra,extra);
    dir.normalize();

    muzzle(o,dir,b.team==="zombie"?0x97ff92:0xffcc7a);
    const hit=shootRay(b,w,o,dir,extra*0.8);
    tone(b.pos,w.id==="rifle"?590:w.id==="smg"?760:w.id==="shotgun"?430:700,0.02,0.034,"square");
    if(!hit){
      const miss=o.clone().addScaledVector(dir,Math.min(w.range,8+dist));
      if(!blockedAt(miss.x,miss.z,0.2))impact(miss);
    }
  };

  const _v11UpdateBot2=updateBot;
  updateBot=function(b,dt){
    _v11UpdateBot2(b,dt);
    if(!b.alive||b.respawn>0)return;

    if(b.ai&&b.ai.target){
      const tp=tPos(b.ai.target);
      const targetYaw=Math.atan2(tp.x-b.pos.x,tp.z-b.pos.z)+Math.PI;
      const turn=(b.v11?b.v11.turnRate:2.0)*dt;
      const dYaw=v11AngleDiff(targetYaw,b.mesh.rotation.y);
      b.mesh.rotation.y+=v11Clamp(dYaw,-turn,turn);

      const abs=Math.abs(dYaw);
      if(abs>0.42)b.ai.shoot=Math.max(b.ai.shoot||0,0.16+abs*0.1);
    }
  };

  updatePlayer=function(dt){
    if(!player.alive||game.buyPhase)return;
    const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=-fz,rz=fx;
    let mx=0,mz=0;
    if(keys.has("KeyW")){mx+=fx;mz+=fz;}
    if(keys.has("KeyS")){mx-=fx;mz-=fz;}
    if(keys.has("KeyD")){mx+=rx;mz+=rz;}
    if(keys.has("KeyA")){mx-=rx;mz-=rz;}
    const l=Math.hypot(mx,mz);
    if(l>0){mx/=l;mz/=l;}

    const crouch=keys.has("ShiftLeft")||keys.has("ShiftRight");
    const base=player.team==="zombie"?6.9:(player.speed||6.15);
    const sp=base*(crouch?0.64:1);

    player.prev.copy(player.pos);
    player.pos.x+=mx*sp*dt;
    player.pos.z+=mz*sp*dt;
    resolveCollision(player.pos,player.r);

    const gy=groundY(player.pos.x,player.pos.z);
    if(l>0){
      player.moved+=dt;
      player.step+=dt;
      const it=player.team==="zombie"?0.34:0.4;
      if(player.step>=it){player.step=0;tone(player.pos,player.team==="zombie"?140:180,0.02,0.02,"triangle");}
    }

    if(player.onGround&&keys.has("Space")&&!crouch){player.vy=4.4;player.onGround=false;}
    player.vy-=11.5*dt;
    player.y+=player.vy*dt;
    if(player.y<=player.eye+gy){player.y=player.eye+gy;player.vy=0;player.onGround=true;}

    if(player.shootCd>0)player.shootCd-=dt;
    if(mouse.fire){const w=curWeapon();if(w.auto||mouse.just)shootPlayer();}
    mouse.just=false;

    const bob=l>0?Math.sin(player.moved*11.5)*0.026:Math.sin(performance.now()*0.002)*0.005;
    const crouchDrop=crouch?0.34:0;
    const rp=player.recoil*0.42,ry=player.recoil*0.1;
    camera.position.set(player.pos.x,player.y+bob-crouchDrop,player.pos.z);
    camera.rotation.y=player.yaw+ry;
    camera.rotation.x=player.pitch+rp;

    player.recoil=Math.max(0,player.recoil-dt*0.25);
    if(fpWeapon){
      fpWeapon.position.x=0.28+(l>0?Math.sin(player.moved*8)*0.008:Math.sin(performance.now()*0.002)*0.003);
      fpWeapon.position.y=-0.22+(l>0?Math.abs(Math.sin(player.moved*8))*0.008:0)+player.recoil*0.12+(crouch?0.07:0);
      fpWeapon.rotation.x=0.04+player.recoil*0.25;
    }
  };

  stateText=function(){
    if(game.statusTimer>0&&game.status)return game.status;
    if(!game.started)return"-";
    if(game.buyPhase)return UI_TEXT_RU.buy;
    if(game.mode==="zombie")return game.state==="zombie_prep"?UI_TEXT_RU.prep:UI_TEXT_RU.infection;
    return UI_TEXT_RU.live;
  };

  teamLabel=function(t){return teamRu(t);};

  renderScore=function(){
    const rows=['<div class="score-row header"><div>КОМАНДА</div><div>ИГРОК</div><div>K</div><div>D</div><div>HP</div><div>ОРУЖИЕ</div></div>'];
    const arr=[{team:player.team,name:UI_TEXT_RU.you,k:player.kills,d:player.deaths,hp:Math.max(0,Math.ceil(player.hp)),w:curWeapon().name}];
    for(const b of bots)arr.push({team:b.team,name:b.name,k:b.kills,d:b.deaths,hp:b.alive?Math.max(0,Math.ceil(b.hp)):0,w:WEAPONS[b.weapon]?.name||b.weapon});
    arr.sort((a,b)=>b.k-a.k||a.d-b.d||a.name.localeCompare(b.name));
    for(const e of arr){
      const c=e.team==="ally"?"team-ally":e.team==="enemy"?"team-enemy":"team-zombie";
      rows.push('<div class="score-row"><div class="'+c+'">'+teamRu(e.team)+'</div><div>'+e.name+'</div><div>'+e.k+'</div><div>'+e.d+'</div><div>'+e.hp+'</div><div>'+e.w+'</div></div>');
    }
    ui.scoreContent.innerHTML=rows.join("");
    game.dirtyScore=false;
  };

  const _v11UpdateHud2=updateHud;
  updateHud=function(dt){
    _v11UpdateHud2(dt);
    if(ui.modeLabel)ui.modeLabel.textContent=modeNameRu(game.mode);
    if(v11UI.money)v11UI.money.textContent=String(Math.max(0,Math.floor(player.money||0)));
    if(ui.state&&game.mode==="zombie"&&game.state==="zombie_live"&&game.zGrace>0)ui.state.textContent="Защита людей: "+Math.ceil(game.zGrace)+"с";
    if(modeDescEl&&!game.started)modeDescEl.textContent=modeDescRu(ui.mode.value);
    if(diffDescEl&&!game.started)diffDescEl.textContent=diffDesc[ui.difficulty.value]||diffDesc.normal;
    if(hpBigEl){
      hpBigEl.textContent="ЗДОРОВЬЕ "+Math.max(0,Math.ceil(player.hp));
      hpBigEl.classList.toggle("hidden",!game.started||!player.alive);
    }
  };

  const _v11Award2=award;
  award=function(att){
    const prevKills=player.kills;
    _v11Award2(att);
    if(att===player&&player.kills>prevKills){
      player.money=Math.min(16000,(player.money||0)+300);
      player.streak=(player.streak||0)+1;
      player.contract=(player.contract||0)+1;
      if(player.streak>=3&&player.streak%3===0){player.money=Math.min(16000,player.money+350);showStatus("Серия: +350$",1.1);}
      if(player.contract>=player.contractTarget){player.contract=0;inv.cases=(inv.cases||0)+1;refreshCases();showStatus(UI_TEXT_RU.contractDone,1.4);}
    }
  };

  const _v11StartMatch2=startMatch;
  startMatch=function(){
    _v11StartMatch2();
    game.eventTimer=rand(24,36);
    game.zInfWindow={t:performance.now()/1000,c:0};
    feedWrap.innerHTML="";
    feedQueue.length=0;
    pushFeed(UI_TEXT_RU.modeStarted+": "+modeNameRu(game.mode),"k");
  };

  const _v11BackMenu2=backMenu;
  backMenu=function(){
    _v11BackMenu2();
    if(hpBigEl)hpBigEl.classList.add("hidden");
    feedWrap.innerHTML="";
    feedQueue.length=0;
    updateMenuDescriptors();
  };

  showStatus=function(t,s=2){game.status=String(t||"");game.statusTimer=s;ui.state.textContent=game.status;};

  ui.menu.classList.remove("hidden");
  ui.hud.classList.add("hidden");
  ui.death.classList.add("hidden");
  ui.pause.classList.add("hidden");
  ui.scoreboard.classList.add("hidden");
  updateMenuDescriptors();
})();


/* === V11.1 HUD Mode Description Patch === */
(function(){
  const hudDesc=document.getElementById("mode-desc-hud");
  if(!hudDesc)return;
  const _u=updateHud;
  updateHud=function(dt){
    _u(dt);
    const m=MODE_CONFIG[game.mode]||MODE_CONFIG[ui.mode.value]||MODE_CONFIG.duel;
    if(!game.started){
      hudDesc.textContent=(m.specialRules||m.descriptionRu||"-");
      return;
    }
    const txt=(m.descriptionRu||"").trim();
    hudDesc.textContent=txt.length>96?txt.slice(0,96)+"...":txt;
  };
})();

/* === V11.1 RU Skin Localization === */
(function(){
  const rarityRu={Base:"База",Common:"Обычный",Rare:"Редкий",Epic:"Эпический",Legendary:"Легендарный"};
  for(const s of SKINS){if(rarityRu[s.rarity])s.rarity=rarityRu[s.rarity];}
  refreshSkins();
})();
