if(typeof THREE==="undefined"){alert("Three.js не загрузился");throw new Error("Three.js missing");}
const ui={menu:document.getElementById("menu"),mode:document.getElementById("mode"),map:document.getElementById("map"),difficulty:document.getElementById("difficulty"),sens:document.getElementById("sens"),skinSelect:document.getElementById("skin-select"),openCase:document.getElementById("open-case"),cases:document.getElementById("cases"),caseLog:document.getElementById("case-log"),start:document.getElementById("start"),hud:document.getElementById("hud"),hp:document.getElementById("hp"),kills:document.getElementById("kills"),deaths:document.getElementById("deaths"),modeLabel:document.getElementById("mode-label"),time:document.getElementById("time"),state:document.getElementById("state"),acc:document.getElementById("acc"),weaponLabel:document.getElementById("weapon-label"),teamScore:document.getElementById("team-score"),scoreboard:document.getElementById("scoreboard"),scoreContent:document.getElementById("score-content"),pause:document.getElementById("pause"),resume:document.getElementById("resume"),back:document.getElementById("back"),buy:document.getElementById("buy"),buyTime:document.getElementById("buy-time"),buyPicked:document.getElementById("buy-picked"),buyClose:document.getElementById("buy-close"),buyItems:Array.from(document.querySelectorAll(".buy-item")),death:document.getElementById("death"),deathText:document.getElementById("death-text"),retry:document.getElementById("retry"),menuBtn:document.getElementById("menu-btn")};
const canvas=document.getElementById("game");
const MAPS=[{id:"dust",name:"Dust Yard",size:66,spawns:{ally:{x:-25,z:24},enemy:{x:25,z:-24},shared:{x:-23,z:23}},zones:[{name:"CT",color:0x3c77c5,x:-25,z:24,w:12,d:10},{name:"T",color:0xc34f4f,x:25,z:-24,w:12,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:12,d:10},{name:"A",color:0xcd6751,x:21,z:14,w:9,d:9},{name:"B",color:0x4f83c7,x:-21,z:-14,w:9,d:9}],walls:[{x:0,z:0,w:2,d:24},{x:-14,z:8,w:14,d:2},{x:14,z:-8,w:14,d:2},{x:-24,z:2,w:2,d:14},{x:24,z:-2,w:2,d:14},{x:0,z:16,w:10,d:2},{x:0,z:-16,w:10,d:2}],props:[{x:-8,z:-3,w:2,d:2,h:1.2,color:0x6d7c90},{x:8,z:3,w:2,d:2,h:1.2,color:0x6d7c90},{x:-18,z:14,w:3,d:2,h:1.2,color:0x74839a},{x:18,z:-14,w:3,d:2,h:1.2,color:0x74839a}],secrets:[{name:"Нычка A",x:24,z:15,w:2.6,d:2.6,found:false},{name:"Нычка Mid",x:-3,z:0,w:2.4,d:2.4,found:false},{name:"Нычка B",x:-24,z:-15,w:2.6,d:2.6,found:false}]},{id:"mirage",name:"Mirage Plaza",size:68,spawns:{ally:{x:-26,z:0},enemy:{x:26,z:0},shared:{x:-26,z:0}},zones:[{name:"CT",color:0x3c77c5,x:-26,z:0,w:11,d:10},{name:"T",color:0xc34f4f,x:26,z:0,w:11,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:12,d:12},{name:"A",color:0xcd6751,x:20,z:-18,w:9,d:9},{name:"B",color:0x4f83c7,x:-20,z:18,w:9,d:9}],walls:[{x:-10,z:0,w:2,d:30},{x:10,z:0,w:2,d:30},{x:0,z:0,w:20,d:2},{x:0,z:18,w:24,d:2},{x:0,z:-18,w:24,d:2},{x:-24,z:-8,w:2,d:12},{x:24,z:8,w:2,d:12}],props:[{x:-16,z:-14,w:2,d:3,h:1.2,color:0x718098},{x:16,z:14,w:2,d:3,h:1.2,color:0x718098},{x:0,z:10,w:3,d:2,h:1.2,color:0x5f7086},{x:0,z:-10,w:3,d:2,h:1.2,color:0x5f7086}],secrets:[{name:"Нычка Palace",x:22,z:-22,w:2.6,d:2.6,found:false},{name:"Нычка Window",x:-1,z:14,w:2.2,d:2.2,found:false},{name:"Нычка Apps",x:-22,z:22,w:2.6,d:2.6,found:false}]},{id:"inferno",name:"Inferno Lane",size:64,spawns:{ally:{x:-24,z:18},enemy:{x:24,z:-18},shared:{x:-23,z:17}},zones:[{name:"CT",color:0x3c77c5,x:-24,z:18,w:11,d:10},{name:"T",color:0xc34f4f,x:24,z:-18,w:11,d:10},{name:"Mid",color:0xc7b25c,x:0,z:0,w:10,d:10},{name:"A",color:0xcd6751,x:18,z:14,w:9,d:9},{name:"B",color:0x4f83c7,x:-18,z:-14,w:9,d:9}],walls:[{x:-8,z:8,w:2,d:24},{x:8,z:-8,w:2,d:24},{x:0,z:0,w:14,d:2},{x:-20,z:0,w:2,d:16},{x:20,z:0,w:2,d:16},{x:-2,z:22,w:12,d:2},{x:2,z:-22,w:12,d:2}],props:[{x:-12,z:-4,w:2,d:2,h:1.2,color:0x6e7d93},{x:12,z:4,w:2,d:2,h:1.2,color:0x6e7d93},{x:0,z:14,w:2,d:2,h:1.3,color:0x5f7086},{x:0,z:-14,w:2,d:2,h:1.3,color:0x5f7086}],secrets:[{name:"Нычка Balcony",x:20,z:20,w:2.6,d:2.6,found:false},{name:"Нычка Arch",x:0,z:0,w:2.2,d:2.2,found:false},{name:"Нычка Banana",x:-20,z:-20,w:2.6,d:2.6,found:false}]}];
const SKINS=[{id:"default",name:"Default Gray",icon:"G",rarity:"Base",weight:0,color:0x74859a},{id:"desert",name:"Desert",icon:"D",rarity:"Common",weight:50,color:0xcc9b5f},{id:"neon",name:"Neon",icon:"N",rarity:"Rare",weight:28,color:0x2fd8ff},{id:"venom",name:"Venom",icon:"V",rarity:"Epic",weight:15,color:0x45d66f},{id:"obsidian",name:"Obsidian",icon:"O",rarity:"Legendary",weight:7,color:0xe56b37}];
const WEAPONS={rifle:{id:"rifle",name:"AKR-12",slot:1,damage:33,fireRate:0.1,spread:0.008,range:42,auto:true,recoil:0.008,pellets:1},smg:{id:"smg",name:"Vector",slot:1,damage:21,fireRate:0.072,spread:0.014,range:30,auto:true,recoil:0.006,pellets:1},shotgun:{id:"shotgun",name:"M590",slot:1,damage:11,fireRate:0.72,spread:0.045,range:16,auto:false,recoil:0.016,pellets:6},pistol:{id:"pistol",name:"P350",slot:2,damage:25,fireRate:0.24,spread:0.007,range:32,auto:false,recoil:0.005,pellets:1},knife:{id:"knife",name:"Knife",slot:3,damage:58,fireRate:0.58,spread:0,range:1.95,auto:false,recoil:0.003,pellets:1},claws:{id:"claws",name:"Claws",slot:3,damage:0,fireRate:0.58,spread:0,range:1.95,auto:true,recoil:0,pellets:1}};
if(!WEAPONS.m4)WEAPONS.m4={id:"m4",name:"M4A1",slot:1,damage:31,fireRate:0.095,spread:0.007,range:45,auto:true,recoil:0.007,pellets:1};if(!WEAPONS.sniper)WEAPONS.sniper={id:"sniper",name:"AWP",slot:1,damage:92,fireRate:1.22,spread:0.0014,range:86,auto:false,recoil:0.016,pellets:1};if(!WEAPONS.lmg)WEAPONS.lmg={id:"lmg",name:"M249",slot:1,damage:28,fireRate:0.082,spread:0.012,range:50,auto:true,recoil:0.008,pellets:1};const AI={easy:{reaction:0.62,aimError:0.28,burst:0.28,strafe:0.6,cover:0.2},normal:{reaction:0.36,aimError:0.16,burst:0.52,strafe:1,cover:0.48},hard:{reaction:0.22,aimError:0.09,burst:0.84,strafe:1.35,cover:0.74}};
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
const modeName=(m)=>m==="duel"?"Дуэль 1x1":m==="team"?"Командный 5x5":m==="elim"?"Без возрождений 5x5":m==="blitz"?"Blitz 3x3":m==="arena"?"Arena 4x4":m==="survival"?"Survival Hold":"Зомби-инфекция";const fmt=(s)=>{s=Math.max(0,Math.ceil(s));const m=Math.floor(s/60),r=s%60;return String(m).padStart(2,"0")+":"+String(r).padStart(2,"0")};
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
function createModel(team,weapon,skinId="default"){
  const c=entityColors(team);
  const g=new THREE.Group();
  const tor=new THREE.MeshStandardMaterial({color:c.b,roughness:0.62,metalness:0.18});
  const pan=new THREE.MeshStandardMaterial({color:c.p,roughness:0.72});
  const skin=new THREE.MeshStandardMaterial({color:0xe3bea6,roughness:0.72});
  const hair=new THREE.MeshStandardMaterial({color:c.h,roughness:0.78});
  const eyeM=new THREE.MeshStandardMaterial({color:0x121820,roughness:0.2,metalness:0.05});

  const body=new THREE.Mesh(new THREE.BoxGeometry(0.74,0.9,0.34),tor);
  body.position.y=1.15;
  body.castShadow=true;

  const head=new THREE.Mesh(new THREE.BoxGeometry(0.46,0.46,0.46),skin);
  head.position.y=1.82;
  head.castShadow=true;

  const noseSize=rand(0.07,0.11);
  const nose=new THREE.Mesh(new THREE.BoxGeometry(noseSize,noseSize*0.85,noseSize),skin);
  nose.position.set(0,1.78,0.25);

  const eyeL=new THREE.Mesh(new THREE.SphereGeometry(0.028,10,8),eyeM);
  eyeL.position.set(-0.085,1.84,0.24);
  const eyeR=eyeL.clone();
  eyeR.position.x=0.085;

  const hs=rint(0,2);
  if(hs===0){
    const h=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.12,0.5),hair);
    h.position.set(0,2.06,0);
    g.add(h);
  }else if(hs===1){
    const h=new THREE.Mesh(new THREE.BoxGeometry(0.44,0.2,0.2),hair);
    h.position.set(0,2,-0.08);
    g.add(h);
  }else{
    const h=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.24,0.22),hair);
    h.position.set(0,2.02,0);
    g.add(h);
  }

  const l1=new THREE.Mesh(new THREE.BoxGeometry(0.2,0.7,0.2),pan);
  l1.position.set(-0.14,0.35,0);
  l1.castShadow=true;
  l1.name="legL";

  const l2=l1.clone();
  l2.position.x=0.14;
  l2.name="legR";

  const a1=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.09,0.54,8),tor);
  a1.position.set(-0.42,1.2,0);
  a1.rotation.z=0.12;
  a1.castShadow=true;
  a1.name="armL";

  const a2=a1.clone();
  a2.position.x=0.42;
  a2.rotation.z=-0.12;
  a2.name="armR";

  g.add(body,head,nose,eyeL,eyeR,l1,l2,a1,a2);

  let gm=[];
  if(weapon!=="knife"&&weapon!=="claws"){
    const pack=buildGun(weapon,skinById(skinId).color,true);
    pack.group.rotation.z=Math.PI/16;
    pack.group.rotation.y=-Math.PI/2;
    pack.group.position.set(0.37,1.14,0.02);
    g.add(pack.group);
    gm=pack.mats;
  }

  g.userData.bobOff=rand(0,Math.PI*2);
  return{group:g,gunMats:gm};
}
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
function infectPlayer(att=null){if(player.team==="zombie")return;player.team="zombie";player.maxHp=500;player.hp=500;player.speed=7.1;player.slot=3;buildFPWeapon();if(att)award(att);showStatus("Ты заражен",2.2);game.dirtyScore=true;checkWin()}
function infectBot(b,att=null){if(b.team==="zombie")return;b.team="zombie";b.maxHp=500;b.hp=500;b.speed=rand(3.0,3.25);b.weapon="claws";b.alive=true;b.respawn=0;b.mesh.visible=true;b.ai.path=[];b.ai.pi=0;b.ai.target=null;b.ai.vis=0;if(att)award(att);scene.remove(b.mesh);disposeNode(b.mesh);const m=createModel(b.team,b.weapon,b.skinId),gy=groundY(b.pos.x,b.pos.z);b.mesh=m.group;b.gunMats=m.gunMats;b.mesh.position.set(b.pos.x,gy,b.pos.z);scene.add(b.mesh);game.dirtyScore=true;checkWin()}
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
function moveBot(b,mx,mz,dt){const l=Math.hypot(mx,mz);if(l<=0.0001){const gy=groundY(b.pos.x,b.pos.z),idle=Math.sin(performance.now()*0.003+(b.mesh.userData.bobOff||0))*0.025;b.mesh.position.set(b.pos.x,gy+idle,b.pos.z);const ll=b.mesh.getObjectByName("legL"),lr=b.mesh.getObjectByName("legR"),al=b.mesh.getObjectByName("armL"),ar=b.mesh.getObjectByName("armR");if(ll&&lr){ll.rotation.x*=0.85;lr.rotation.x*=0.85}if(al&&ar){al.rotation.x*=0.85;ar.rotation.x*=0.85}return false}mx/=l;mz/=l;b.pos.x+=mx*b.speed*dt;b.pos.z+=mz*b.speed*dt;resolveCollision(b.pos,b.r);const gy=groundY(b.pos.x,b.pos.z),stride=Math.sin((b.step*18)+(b.id*0.7))*0.7;const ll=b.mesh.getObjectByName("legL"),lr=b.mesh.getObjectByName("legR"),al=b.mesh.getObjectByName("armL"),ar=b.mesh.getObjectByName("armR");if(ll&&lr){ll.rotation.x=stride;lr.rotation.x=-stride}if(al&&ar){al.rotation.x=-stride*0.6;ar.rotation.x=stride*0.6}b.mesh.position.set(b.pos.x,gy,b.pos.z);b.step+=dt;if(b.step>=0.48){b.step=0;tone(b.pos,180,0.012,0.02,"triangle")}return true}
function updateBot(b,dt){if(!b.alive||b.respawn>0)return;const a=b.ai;a.targetTimer-=dt;a.repath-=dt;a.shoot-=dt;a.st-=dt;a.coverT-=dt;a.roam-=dt;if(game.mode==="zombie"&&game.state==="zombie_prep"){if(a.repath<=0||a.pi>=a.path.length){const s=world.secrets[rint(0,world.secrets.length-1)];setPath(b,s.x+rand(-1.2,1.2),s.z+rand(-1.2,1.2));a.repath=rand(0.7,1.3)}const mv=followPath(b);moveBot(b,mv.x,mv.z,dt);return}if(a.targetTimer<=0||!validT(b,a.target)){a.target=chooseTarget(b);a.targetTimer=rand(0.12,0.28)}if(!a.target){if(a.roam<=0){const r=world.cover[rint(0,world.cover.length-1)];setPath(b,r.x+rand(-1.2,1.2),r.z+rand(-1.2,1.2));a.roam=rand(1.4,2.4)}const mv=followPath(b);moveBot(b,mv.x,mv.z,dt);return}const tp=tPos(a.target),dx=tp.x-b.pos.x,dz=tp.z-b.pos.z,dist=Math.hypot(dx,dz),vis=!lineBlocked(b.pos.x,b.pos.z,tp.x,tp.z);a.vis=vis?a.vis+dt:Math.max(0,a.vis-dt*2.2);const w=WEAPONS[b.weapon]||WEAPONS.rifle,need=w.id==="claws"?1.5:w.id==="shotgun"?9.2:15.5;let mx=0,mz=0;if(w.id==="claws"){if(a.repath<=0){setPath(b,tp.x,tp.z);a.repath=rand(0.2,0.45)}const mv=followPath(b);mx+=mv.x;mz+=mv.z}else if(vis&&dist<=need+2){const inv=dist>0.001?1/dist:0,tx=dx*inv,tz=dz*inv;if(a.st<=0){a.sd*=-1;a.st=rand(0.4,1.1)/clamp(0.5,1.5,b.skill.strafe)}mx+=tx*-0.2;mz+=tz*-0.2;mx+=(-tz)*a.sd*b.skill.strafe;mz+=tx*a.sd*b.skill.strafe}else{if(a.repath<=0){let px=tp.x,pz=tp.z;if(!vis&&a.coverT<=0&&ch(b.skill.cover)){const c=chooseCover(b,tp);if(c){releaseCover(b);b.ai.cover=c.key;game.reservedCover.add(c.key);px=c.x;pz=c.z;a.coverT=rand(1.2,2.4)}}setPath(b,px,pz);a.repath=rand(0.45,0.95)}const mv=followPath(b);mx+=mv.x;mz+=mv.z}const moving=moveBot(b,mx,mz,dt),look=a.target===player?player.pos:a.target.pos;if(look)b.mesh.rotation.y=Math.atan2(look.x-b.pos.x,look.z-b.pos.z);else if(moving)b.mesh.rotation.y=Math.atan2(mx,mz);if(vis&&a.vis>=b.skill.reaction&&a.shoot<=0){if(w.auto){if(a.burst<=0)a.burst=rint(2,Math.round(5+b.skill.burst*4));shootBot(b,a.target);a.burst--;a.shoot=w.fireRate*rand(0.85,1.2);if(a.burst<=0)a.shoot+=rand(0.12,0.28)*(1.25-b.skill.burst)}else{shootBot(b,a.target);a.shoot=w.fireRate*rand(0.92,1.28)}}if(!vis)a.burst=0}
function switchSlot(s){if(!game.started)return;if(player.team==="zombie"&&s!==3)return;player.slot=s;buildFPWeapon()}
function resetPlayer(){player.team="ally";player.maxHp=100;player.hp=100;player.alive=true;player.kills=0;player.deaths=0;player.shots=0;player.hits=0;player.moved=0;player.step=0;player.slot=1;player.shootCd=0;player.recoil=0;player.speed=7.7;player.vy=0;player.onGround=true;player.respawn=0;const p=spawnPos("ally",0,game.mode==="zombie"),gy=groundY(p.x,p.z);player.pos.set(p.x,0,p.z);player.prev.copy(player.pos);player.y=player.eye+gy;camera.position.set(player.pos.x,player.y,player.pos.z);camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;buildFPWeapon()}
function respawnPlayer(){if(game.mode!=="zombie"||player.team!=="zombie"){player.team="ally";player.maxHp=100;player.speed=6.15;if(player.slot===3)player.slot=1}else{player.maxHp=500;player.speed=7.1;player.slot=3}const p=spawnPos(player.team==="enemy"?"enemy":"ally",0,game.mode==="zombie"&&game.state==="zombie_prep"),gy=groundY(p.x,p.z);player.pos.set(p.x,0,p.z);player.prev.copy(player.pos);player.hp=player.maxHp;player.alive=true;player.respawn=0;player.vy=0;player.onGround=true;player.y=player.eye+gy;buildFPWeapon();showStatus("Респавн",1)}
function respawnBot(b){if(game.mode==="zombie"&&b.team!=="zombie")return;const p=spawnPos(b.team==="enemy"?"enemy":"ally",b.id%6,game.mode==="zombie"&&game.state==="zombie_prep"),gy=groundY(p.x,p.z);b.pos.set(p.x,0,p.z);b.hp=b.maxHp;b.alive=true;b.respawn=0;b.mesh.visible=true;b.ai.target=null;b.ai.path=[];b.ai.pi=0;b.ai.repath=rand(0.1,0.32);b.ai.shoot=rand(0.2,0.54);b.ai.vis=0;b.ai.burst=0;releaseCover(b);b.mesh.position.set(p.x,gy,p.z)}
function setupMode(){game.teamScore.ally=0;game.teamScore.enemy=0;bots=[];botId=0;if(game.mode==="duel"){game.scoreLimit=7;game.timeLeft=300;spawnBot("enemy",0,"rifle",false)}else if(game.mode==="team"){game.scoreLimit=30;game.timeLeft=420;for(let i=0;i<4;i++)spawnBot("ally",i+1,i%2===0?"rifle":"smg",false);for(let i=0;i<5;i++)spawnBot("enemy",i+1,i===0?"shotgun":i%2===0?"rifle":"smg",false)}else if(game.mode==="elim"){game.scoreLimit=1;game.timeLeft=210;for(let i=0;i<4;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<5;i++)spawnBot("enemy",i+1,pickBotWeapon(),false)}else if(game.mode==="blitz"){game.scoreLimit=18;game.timeLeft=240;for(let i=0;i<2;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<3;i++)spawnBot("enemy",i+1,pickBotWeapon(),false)}else if(game.mode==="arena"){game.scoreLimit=22;game.timeLeft=300;for(let i=0;i<3;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<4;i++)spawnBot("enemy",i+1,pickBotWeapon(),false)}else if(game.mode==="survival"){game.scoreLimit=0;game.timeLeft=360;for(let i=0;i<2;i++)spawnBot("ally",i+1,pickBotWeapon(),false);for(let i=0;i<9;i++)spawnBot("enemy",i+1,pickBotWeapon(),false)}else{game.scoreLimit=0;game.timeLeft=20;for(let i=0;i<11;i++)spawnBot("ally",i+1,i%3===0?"shotgun":i%2===0?"rifle":"smg",true)}game.dirtyScore=true}
function showBuy(){if(!game.buyPhase)return;ui.buy.classList.remove("hidden");ui.buyTime.textContent=String(Math.ceil(game.buyTime));ui.buyPicked.textContent="Выбрано: "+(WEAPONS[player.primary]?.name||"AKR-12");for(const b of ui.buyItems)b.classList.toggle("active",b.dataset.buy===player.primary);if(document.pointerLockElement===canvas)document.exitPointerLock()}
function hideBuy(){ui.buy.classList.add("hidden")}
function closeBuy(){if(!game.buyPhase)return;game.buyPhase=false;hideBuy();showStatus("Бой начался",1.8);lockPointer()}
function startZombie(){game.state="zombie_live";game.timeLeft=120;const pool=[player,...bots.filter(b=>b.alive)],f=pool[rint(0,pool.length-1)];let s=pool[rint(0,pool.length-1)];if(s===f)s=pool[(pool.indexOf(f)+1)%pool.length];if(f===player)infectPlayer();else infectBot(f);if(s===player)infectPlayer();else infectBot(s);showStatus("Зомби выбраны. Выживай",2.8)}
const humans=()=>{let c=0;if(player.alive&&player.team!=="zombie")c++;for(const b of bots)if(b.alive&&b.team!=="zombie")c++;return c};
function checkWin(){if(!game.started)return;if(game.mode==="zombie"){if(game.state==="zombie_live"){if(humans()<=0){finish("Зомби заразили всех");return}if(game.timeLeft<=0)finish("Люди выжили до конца таймера")}return}if(game.mode==="survival"){if(!player.alive){finish("Поражение: ты погиб");return}if(game.timeLeft<=0){finish("Победа: удержание выполнено");return}return}if(game.mode==="elim"){let a=0,e=0;if(player.alive&&player.team==="ally")a++;if(player.alive&&player.team==="enemy")e++;for(const b of bots){if(!b.alive)continue;if(b.team==="ally")a++;else if(b.team==="enemy")e++;}if(a<=0||e<=0||game.timeLeft<=0){if(a>e)finish("Победа синих | Без возрождений");else if(e>a)finish("Победа красных | Без возрождений");else finish("Ничья | Без возрождений")}return}if(game.teamScore.ally>=game.scoreLimit){finish("CT победили "+game.teamScore.ally+" : "+game.teamScore.enemy);return}if(game.teamScore.enemy>=game.scoreLimit){finish("T победили "+game.teamScore.enemy+" : "+game.teamScore.ally);return}if(game.timeLeft<=0){if(game.teamScore.ally>game.teamScore.enemy)finish("Время. Победа CT");else if(game.teamScore.enemy>game.teamScore.ally)finish("Время. Победа T");else finish("Ничья по времени")}}
function finish(text){if(!game.started)return;game.started=false;game.paused=false;game.buyPhase=false;game.state="round_end";hideBuy();ui.pause.classList.add("hidden");ui.scoreboard.classList.add("hidden");ui.hud.classList.add("hidden");ui.deathText.textContent=text+" | Счет "+game.teamScore.ally+" : "+game.teamScore.enemy+" | Твои фраги: "+player.kills;ui.death.classList.remove("hidden");if(document.pointerLockElement===canvas)document.exitPointerLock()}
function startMatch(){lockAudio();game.mode=ui.mode.value;selectedMap=MAPS.find(m=>m.id===ui.map.value)||MAPS[0];buildMap(selectedMap);resetPlayer();setupMode();game.started=true;game.paused=false;game.status="";game.statusTimer=0;if(game.mode==="zombie"){game.state="zombie_prep";game.buyPhase=false;hideBuy();showStatus("20 секунд на разбег",2.2);lockPointer()}else{game.state="buy";game.buyPhase=true;game.buyTime=15;showBuy();showStatus("Закупка",1.6)}ui.menu.classList.add("hidden");ui.death.classList.add("hidden");ui.pause.classList.add("hidden");ui.hud.classList.remove("hidden");ui.scoreboard.classList.add("hidden");keys.clear();mouse.fire=false;mouse.just=false;updateHud(0);renderScore()}
function backMenu(){game.started=false;game.paused=false;game.buyPhase=false;game.state="menu";game.status="";game.statusTimer=0;keys.clear();mouse.fire=false;mouse.just=false;clearWorld();world=null;ui.hud.classList.add("hidden");ui.scoreboard.classList.add("hidden");ui.pause.classList.add("hidden");ui.buy.classList.add("hidden");ui.death.classList.add("hidden");ui.menu.classList.remove("hidden");if(document.pointerLockElement===canvas)document.exitPointerLock()}
function lockPointer(){if(!game.started||game.paused||game.buyPhase||!ui.pause.classList.contains("hidden")||!ui.death.classList.contains("hidden"))return;if(document.pointerLockElement!==canvas)canvas.requestPointerLock()}
function pauseGame(){if(!game.started||game.paused)return;game.paused=true;ui.pause.classList.remove("hidden");if(document.pointerLockElement===canvas)document.exitPointerLock()}
function resumeGame(){if(!game.started||!ui.buy.classList.contains("hidden"))return;game.paused=false;ui.pause.classList.add("hidden");lockPointer()}
function updatePlayer(dt){if(!player.alive||game.buyPhase)return;const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=-fz,rz=fx;let mx=0,mz=0;if(keys.has("KeyW")){mx+=fx;mz+=fz}if(keys.has("KeyS")){mx-=fx;mz-=fz}if(keys.has("KeyD")){mx+=rx;mz+=rz}if(keys.has("KeyA")){mx-=rx;mz-=rz}const l=Math.hypot(mx,mz);if(l>0){mx/=l;mz/=l}const crouch=keys.has("ShiftLeft")||keys.has("ShiftRight");const base=player.team==="zombie"?7.1:6.15;const sp=base*(crouch?0.64:1);player.prev.copy(player.pos);player.pos.x+=mx*sp*dt;player.pos.z+=mz*sp*dt;resolveCollision(player.pos,player.r);const gy=groundY(player.pos.x,player.pos.z);if(l>0){player.moved+=dt;player.step+=dt;const it=player.team==="zombie"?0.32:0.4;if(player.step>=it){player.step=0;tone(player.pos,player.team==="zombie"?140:180,0.02,0.02,"triangle")}}if(player.onGround&&keys.has("Space")&&!crouch){player.vy=4.6;player.onGround=false}player.vy-=12*dt;player.y+=player.vy*dt;if(player.y<=player.eye+gy){player.y=player.eye+gy;player.vy=0;player.onGround=true}if(player.shootCd>0)player.shootCd-=dt;if(mouse.fire){const w=curWeapon();if(w.auto||mouse.just)shootPlayer()}mouse.just=false;const bob=l>0?Math.sin(player.moved*12)*0.03:Math.sin(performance.now()*0.002)*0.006,rp=player.recoil*0.42,ry=player.recoil*0.1,cDrop=crouch?0.34:0;camera.position.set(player.pos.x,player.y+bob-cDrop,player.pos.z);camera.rotation.y=player.yaw+ry;camera.rotation.x=player.pitch+rp;player.recoil=Math.max(0,player.recoil-dt*0.25);if(fpWeapon){fpWeapon.position.x=0.28+(l>0?Math.sin(player.moved*8)*0.008:Math.sin(performance.now()*0.002)*0.003);fpWeapon.position.y=-0.22+(l>0?Math.abs(Math.sin(player.moved*8))*0.008:0)+player.recoil*0.12+(crouch?0.07:0);fpWeapon.rotation.x=0.04+player.recoil*0.25}}
function updateResp(dt){if(game.mode==="elim"||game.mode==="survival")return;if(!player.alive&&player.respawn>0){player.respawn-=dt;if(player.respawn<=0)respawnPlayer()}for(const b of bots)if(!b.alive&&b.respawn>0){b.respawn-=dt;if(b.respawn<=0)respawnBot(b)}}
function updateTimer(dt){if(!game.started)return;if(game.buyPhase){game.buyTime-=dt;ui.buyTime.textContent=String(Math.max(0,Math.ceil(game.buyTime)));if(game.buyTime<=0)closeBuy();return}game.timeLeft-=dt;if(game.mode==="zombie"){if(game.state==="zombie_prep"&&game.timeLeft<=0){startZombie();return}if(game.state==="zombie_live")checkWin()}else checkWin()}
function updateSecrets(){if(!world||!player.alive)return;for(const s of world.secrets){if(s.found)continue;if(inRect(player.pos.x,player.pos.z,s,0)){s.found=true;showStatus("Найдена "+s.name,2);break}}}
function stateText(){if(game.statusTimer>0&&game.status)return game.status;if(!game.started)return"-";if(game.buyPhase)return"Закупка";if(game.mode==="zombie")return game.state==="zombie_prep"?"Подготовка":"Инфекция";return"Бой"}
function updateHud(dt){if(game.statusTimer>0){game.statusTimer-=dt;if(game.statusTimer<=0)game.status=""}ui.hp.textContent=String(Math.max(0,Math.ceil(player.hp)));ui.kills.textContent=String(player.kills);ui.deaths.textContent=String(player.deaths);ui.modeLabel.textContent=modeName(game.mode);ui.weaponLabel.textContent=curWeapon().name;ui.teamScore.textContent=game.teamScore.ally+" : "+game.teamScore.enemy;ui.time.textContent=fmt(game.timeLeft);ui.state.textContent=stateText();ui.acc.textContent=(player.shots>0?Math.round(player.hits/player.shots*100):0)+"%";const money=document.getElementById("money");if(money){if(!Number.isFinite(player.money))player.money=3200;money.textContent=String(Math.max(0,Math.floor(player.money)));}const hpBig=document.getElementById("hp-big");if(hpBig){hpBig.textContent="ЗДОРОВЬЕ "+Math.max(0,Math.ceil(player.hp));hpBig.classList.toggle("hidden",!game.started||!player.alive);}const mHud=document.getElementById("mode-desc-hud");if(mHud){mHud.textContent=(game.mode==="zombie"?"Инфекция с грейс-периодом":game.mode==="elim"?"Без возрождений до конца раунда":"Стабильный матч");}}
function teamLabel(t){return t==="ally"?"Синие":t==="enemy"?"Красные":"Зомби"}
function renderScore(){const rows=['<div class="score-row header"><div>КОМАНДА</div><div>ИГРОК</div><div>K</div><div>D</div><div>HP</div><div>ОРУЖИЕ</div></div>'];const arr=[{team:player.team,name:"ТЫ",k:player.kills,d:player.deaths,hp:Math.max(0,Math.ceil(player.hp)),w:curWeapon().name}];for(const b of bots)arr.push({team:b.team,name:b.name,k:b.kills,d:b.deaths,hp:b.alive?Math.max(0,Math.ceil(b.hp)):0,w:WEAPONS[b.weapon]?.name||b.weapon});arr.sort((a,b)=>b.k-a.k||a.d-b.d||a.name.localeCompare(b.name));for(const e of arr){const c=e.team==="ally"?"team-ally":e.team==="enemy"?"team-enemy":"team-zombie";rows.push('<div class="score-row"><div class="'+c+'">'+teamLabel(e.team)+'</div><div>'+e.name+'</div><div>'+e.k+'</div><div>'+e.d+'</div><div>'+e.hp+'</div><div>'+e.w+'</div></div>')}ui.scoreContent.innerHTML=rows.join("");game.dirtyScore=false}
function tick(dt){if(!game.started||game.paused)return;updateTimer(dt);if(!game.started)return;updateResp(dt);updatePlayer(dt);for(const b of bots)updateBot(b,dt);updateSecrets();if(!Number.isFinite(game.eventTimer))game.eventTimer=35;game.eventTimer-=dt;if(game.eventTimer<=0){game.eventTimer=rand(28,44);const roll=rint(0,3);if(roll===0&&player.alive){player.hp=Math.min(player.maxHp,player.hp+20);showStatus("Ивент: медпак +20",1.2)}else if(roll===1){player.money=Math.min(16000,(player.money||0)+500);showStatus("Ивент: денежный дроп +500$",1.2)}else if(roll===2){inv.cases++;refreshCases();showStatus("Ивент: бонус-кейс",1.2)}else{player.recoil=Math.max(0,player.recoil-0.08);showStatus("Ивент: стабилизация отдачи",1.2)}}updateHud(dt);if(!ui.scoreboard.classList.contains("hidden")||game.dirtyScore)renderScore()}
function chooseReward(){const pool=SKINS.filter(s=>s.weight>0),sum=pool.reduce((a,s)=>a+s.weight,0);let r=Math.random()*sum;for(const s of pool){r-=s.weight;if(r<=0)return s}return pool[pool.length-1]}
function refreshCases(){ui.cases.textContent=String(inv.cases)}
function refreshSkins(){const ids=Object.keys(inv.owned).sort((a,b)=>skinById(a).weight-skinById(b).weight);ui.skinSelect.innerHTML="";for(const id of ids){const s=skinById(id),o=document.createElement("option");o.value=id;o.textContent=s.icon+" "+s.name+" ["+s.rarity+"] x"+inv.owned[id];if(id===inv.equipped)o.selected=true;ui.skinSelect.appendChild(o)}}
function openCase(){if(game.caseRolling)return;if(inv.cases<=0){ui.caseLog.textContent="Кейсы закончились.";return}inv.cases--;refreshCases();game.caseRolling=true;let t=0;const inter=setInterval(()=>{t++;const tmp=SKINS[rint(1,SKINS.length-1)];ui.caseLog.textContent="Крутится: "+tmp.icon+" "+tmp.name+" ("+tmp.rarity+")";if(t>=14){clearInterval(inter);const r=chooseReward();inv.owned[r.id]=(inv.owned[r.id]||0)+1;ui.caseLog.textContent="Выпало: "+r.icon+" "+r.name+" ("+r.rarity+")";refreshSkins();game.caseRolling=false}},80)}
function setBuy(id){if(!WEAPONS[id]||WEAPONS[id].slot!==1)return;player.primary=id;ui.buyPicked.textContent="Выбрано: "+WEAPONS[id].name;for(const b of ui.buyItems)b.classList.toggle("active",b.dataset.buy===id);if(player.slot===1&&game.started)buildFPWeapon()}
function fillMaps(){ui.map.innerHTML="";for(const m of MAPS){const o=document.createElement("option");o.value=m.id;o.textContent=m.name;ui.map.appendChild(o)}ui.map.value=MAPS[0].id}
function install(){window.addEventListener("resize",()=>{renderer.setSize(window.innerWidth,window.innerHeight);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix()});document.addEventListener("pointerlockchange",()=>{if(!game.started||document.pointerLockElement===canvas||game.buyPhase||!ui.death.classList.contains("hidden"))return;pauseGame()});document.addEventListener("keydown",e=>{if(e.code==="Tab"){e.preventDefault();if(game.started){ui.scoreboard.classList.remove("hidden");renderScore()}return}keys.add(e.code);if(!game.started)return;if(e.code==="Digit1")switchSlot(1);if(e.code==="Digit2")switchSlot(2);if(e.code==="Digit3")switchSlot(3);if(e.code==="KeyB"&&game.buyPhase)showBuy();if(e.code==="Escape"){if(!ui.buy.classList.contains("hidden"))return;if(ui.pause.classList.contains("hidden"))pauseGame();else resumeGame()}});document.addEventListener("keyup",e=>{keys.delete(e.code);if(e.code==="Tab")ui.scoreboard.classList.add("hidden")});document.addEventListener("mousemove",e=>{if(document.pointerLockElement!==canvas)return;player.yaw-=e.movementX*Number(ui.sens.value);player.pitch-=e.movementY*Number(ui.sens.value);player.pitch=clamp(-1.25,1.25,player.pitch)});canvas.addEventListener("mousedown",e=>{lockAudio();if(e.button!==0)return;mouse.fire=true;mouse.just=true;if(game.started&&!game.paused&&!game.buyPhase)lockPointer()});canvas.addEventListener("mouseup",e=>{if(e.button===0)mouse.fire=false});canvas.addEventListener("click",()=>{lockAudio();if(game.started&&!game.paused&&!game.buyPhase)lockPointer()});ui.start.addEventListener("click",startMatch);ui.openCase.addEventListener("click",openCase);ui.skinSelect.addEventListener("change",()=>{inv.equipped=ui.skinSelect.value;applySkin()});ui.resume.addEventListener("click",resumeGame);ui.back.addEventListener("click",backMenu);ui.buyClose.addEventListener("click",closeBuy);for(const b of ui.buyItems)b.addEventListener("click",()=>setBuy(b.dataset.buy));ui.retry.addEventListener("click",startMatch);ui.menuBtn.addEventListener("click",backMenu)}
function init(){fillMaps();refreshCases();refreshSkins();setBuy(player.primary);ui.mode.innerHTML='<option value="duel">Дуэль 1x1</option><option value="team">Командный 5x5</option><option value="elim">Без возрождений 5x5</option><option value="zombie">Зомби-инфекция</option><option value="blitz">Blitz 3x3</option><option value="arena">Arena 4x4</option><option value="survival">Survival Hold</option>';ui.mode.value="duel";ui.difficulty.value="normal";ui.modeLabel.textContent=modeName(ui.mode.value);ui.time.textContent="00:00";ui.state.textContent="-";const md=document.getElementById("mode-desc");const dd=document.getElementById("difficulty-desc");const desc=()=>{if(md)md.textContent=(ui.mode.value==="duel"?"Короткие дуэли 1x1":ui.mode.value==="team"?"Классический командный бой":ui.mode.value==="elim"?"Умер - ждешь конца раунда":ui.mode.value==="zombie"?"Люди против зараженных, у зомби 500 HP":ui.mode.value==="blitz"?"Быстрый режим 3x3":ui.mode.value==="arena"?"Сбалансированный режим 4x4":"Удержание против волны");if(dd)dd.textContent=(ui.difficulty.value==="easy"?"Легкие боты: больше ошибок":ui.difficulty.value==="hard"?"Сложные боты: лучше позиционка без аима":"Средние боты: баланс");};ui.mode.addEventListener("change",desc);ui.difficulty.addEventListener("change",desc);desc();install()}
function animate(){requestAnimationFrame(animate);const dt=Math.min(0.05,clock.getDelta());tick(dt);updateFx(dt);renderer.render(scene,camera)}
init();animate();



/* === V13 Audio + Visual Quality Pack === */
(function(){
    const soundInput=document.getElementById('sound-pack');
  const soundLog=document.getElementById('sound-log');
  const soundTestBtn=document.getElementById('test-sounds');
  const roomInput=document.getElementById('room-id');
  const connectBtn=document.getElementById('play-together');
  const soundRoleInputs={
    shot:document.getElementById('snd-shot'),
    enemy_shot:document.getElementById('snd-enemy-shot'),
    step:document.getElementById('snd-step'),
    hit:document.getElementById('snd-hit'),
    death:document.getElementById('snd-death'),
    claw:document.getElementById('snd-claw'),
    ui:document.getElementById('snd-ui')
  };

  const snd={ctx:null,buffers:{},urls:[],enabled:true};

  function sLog(t){
    if(soundLog)soundLog.textContent='Звуки: '+t;
    console.log('[SOUND]',t);
  }

  function ensureCtx(){
    if(!snd.ctx){
      const AC=window.AudioContext||window.webkitAudioContext;
      if(AC)snd.ctx=new AC();
    }
    if(snd.ctx&&snd.ctx.state==='suspended')snd.ctx.resume();
    return snd.ctx;
  }

  function toneFallback(name){
    const ctx=ensureCtx();
    if(!ctx)return;
    const freq=name==='shot'?780:name==='enemy_shot'?620:name==='step'?160:name==='hit'?320:name==='death'?120:name==='claw'?210:name==='ui'?540:440;
    const dur=name==='step'?0.04:0.08;
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type=name==='step'?'triangle':'square';
    osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(name==='step'?0.02:0.05,ctx.currentTime+0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime+dur+0.01);
  }

  function normalizeBuffer(ctx,buf,maxSec=6){
    const maxFrames=Math.max(1,Math.floor(buf.sampleRate*maxSec));
    const frames=Math.min(buf.length,maxFrames);
    const out=ctx.createBuffer(buf.numberOfChannels,frames,buf.sampleRate);
    let peak=0;
    for(let ch=0;ch<buf.numberOfChannels;ch++){
      const src=buf.getChannelData(ch);
      for(let i=0;i<frames;i++){
        const v=Math.abs(src[i]);
        if(v>peak)peak=v;
      }
    }
    const gain=peak>0?Math.min(3.5,0.88/peak):1;
    for(let ch=0;ch<buf.numberOfChannels;ch++){
      const src=buf.getChannelData(ch);
      const dst=out.getChannelData(ch);
      for(let i=0;i<frames;i++)dst[i]=Math.max(-1,Math.min(1,src[i]*gain));
    }
    return out;
  }

  async function loadRoleFile(role,file){
    if(!file)return;
    const ctx=ensureCtx();
    if(!ctx){sLog('браузер блокирует audio context');return;}
    try{
      const arr=await file.arrayBuffer();
      const raw=await ctx.decodeAudioData(arr.slice(0));
      snd.buffers[role]=normalizeBuffer(ctx,raw,6);
      sLog('загружен '+role+' ('+file.name+')');
    }catch(e){
      console.warn('sound decode failed',role,file.name,e);
      sLog('ошибка загрузки '+role);
    }
  }

  function bindRoleInput(role,input){
    if(!input)return;
    input.addEventListener('change',()=>{
      const f=(input.files&&input.files[0])||null;
      if(!f)return;
      loadRoleFile(role,f);
    });
  }

  for(const [role,input] of Object.entries(soundRoleInputs))bindRoleInput(role,input);

  if(soundInput){
    soundInput.addEventListener('change',()=>{
      sLog('используй загрузку по ролям ниже');
    });
  }


  if(soundTestBtn){
    soundTestBtn.addEventListener('click',()=>{
      playS('ui',0.3,1);
      setTimeout(()=>playS('shot',0.35,1),90);
      setTimeout(()=>playS('enemy_shot',0.32,0.95),180);
      setTimeout(()=>playS('hit',0.35,1.02),270);
      setTimeout(()=>playS('step',0.2,1),360);
      setTimeout(()=>playS('death',0.4,1),460);
    });
  }

  const _shootPlayerV13=shootPlayer;
  shootPlayer=function(){
    const before=player.shots;
    _shootPlayerV13();
    if(player.shots>before)playS('shot',0.33,0.98+Math.random()*0.05);
  };

  const _shootBotV13=shootBot;
  shootBot=function(b,t){
    const w=WEAPONS[b.weapon]||WEAPONS.rifle;
    _shootBotV13(b,t);
    if(!b||!b.alive)return;
    if(w.id==='claws')playS('claw',0.25,0.95+Math.random()*0.08);
    else playS('enemy_shot',0.2,0.95+Math.random()*0.06);
  };

  const _killPlayerV13=killPlayer;
  killPlayer=function(att){
    _killPlayerV13(att);
    playS('death',0.38,0.94+Math.random()*0.06);
  };

  const _killBotV13=killBot;
  killBot=function(b,att){
    const wasAlive=b&&b.alive;
    _killBotV13(b,att);
    if(wasAlive)playS('hit',0.26,0.98+Math.random()*0.05);
  };

  const _openCaseV13=openCase;
  openCase=function(){
    _openCaseV13();
    playS('ui',0.28,1.03);
  };

  const _closeBuyV13=closeBuy;
  closeBuy=function(){
    const was=game.buyPhase;
    _closeBuyV13();
    if(was)playS('ui',0.25,0.92);
  };

  const _toneV13=tone;
  tone=function(pos,freq,dur,gain,type){
    _toneV13(pos,freq,dur,gain,type);
    if(type==='triangle'&&freq<=200&&Math.random()<0.5)playS('step',0.06,0.95+Math.random()*0.1);
  };

  try{
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.2;
    if(THREE.SRGBColorSpace)renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    d.intensity=1.5;
  }catch(_e){}

  const _buildMapV13=buildMap;
  buildMap=function(map){
    _buildMapV13(map);

    scene.background=new THREE.Color(0x08131d);
    scene.fog=new THREE.Fog(0x08131d,18,140);

    const decoA=new THREE.MeshStandardMaterial({color:0x3a4658,roughness:0.78,metalness:0.1});
    const decoB=new THREE.MeshStandardMaterial({color:0x56504a,roughness:0.82,metalness:0.08});
    const decoC=new THREE.MeshStandardMaterial({color:0x355646,roughness:0.9,metalness:0.02});

    for(let i=0;i<22;i++){
      const x=rand(-map.size*0.42,map.size*0.42);
      const z=rand(-map.size*0.42,map.size*0.42);
      if(blockedAt(x,z,0.8))continue;
      const gy=groundY(x,z);
      const h=rand(0.7,2.1),w=rand(0.7,1.8),d2=rand(0.7,1.8);
      const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d2),i%5===0?decoC:(i%2===0?decoA:decoB));
      m.position.set(x,gy+h/2,z);
      m.castShadow=true;
      m.receiveShadow=true;
      addWorld(m);
    }

    for(let i=0;i<3;i++){
      const x=rand(-map.size*0.3,map.size*0.3);
      const z=rand(-map.size*0.3,map.size*0.3);
      if(blockedAt(x,z,0.7))continue;
      const gy=groundY(x,z);
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.1,2.8,10),new THREE.MeshStandardMaterial({color:0x3f4c60,roughness:0.6,metalness:0.2}));
      pole.position.set(x,gy+1.4,z);
      addWorld(pole);
      const p=new THREE.PointLight(0xffcc86,0.72,18,2);
      p.position.set(x,gy+2.75,z);
      addWorld(p);
    }
  };

  sLog('базовые (можно загрузить свои файлы)');
})();

/* === V14 Render WebSocket Multiplayer === */
(function(){
  const wsInput=document.getElementById('ws-url');
  const roomInput=document.getElementById('room-id');
  const connectBtn=document.getElementById('play-together');
  const coopLog=document.getElementById('coop-log');
  const lobbyStatus=document.getElementById('lobby-status');
  const launchMode=document.getElementById('launch-mode');
  const mpTeam=document.getElementById('mp-team');
  const mpBots=document.getElementById('mp-bots');
  const mpReady=document.getElementById('mp-ready');
  const mpOnlyEls=Array.from(document.querySelectorAll('.mp-only'));

  const authUser=document.getElementById('auth-user');
  const authLoginBtn=document.getElementById('auth-login');
  const authStatus=document.getElementById('auth-status');

  if(!roomInput||!connectBtn||!coopLog||!authUser||!authLoginBtn||!authStatus)return;

  const SERVER_WS_URL='wss://gamefeatq.onrender.com';
  const STORAGE_ROOM='bs_room_id';
  const STORAGE_USER='bs_auth_user';
  const STORAGE_LAUNCH='bs_launch_mode';

  const gameNet={
    id:'u_'+Math.random().toString(36).slice(2,10),
    socket:null,
    pending:[],
    inRoom:false,
    enabled:false,
    room:'',
    sendRate:0.1,
    sendTimer:0,
    botSendRate:0.1,
    botSendTimer:0,
    peerCount:1,
    isHost:false,
    roomState:null,
    selectedTeam:'',
    botMode:'without_bots',
    autoStartRequested:false,
    joinAfterAuth:false,
    auth:{ok:false,username:''},
    multiplayer:false,
    remotes:new Map(),
    remoteBots:new Map()
  };

  const netTeamToLocal=(t)=>t==='t'?'enemy':'ally';
  const localTeamToNet=(t)=>t==='enemy'?'t':'ct';
  const isEnemyTeam=(a,b)=>Boolean(a&&b&&a!==b);

  function socketOpen(){
    return gameNet.socket&&gameNet.socket.readyState===WebSocket.OPEN;
  }

  function nlog(text,isErr=false){
    coopLog.textContent=(isErr?'Ошибка сети: ':'Сеть: ')+text;
    coopLog.style.color=isErr?'#ff9a9a':'#c1d4ea';
    if(isErr)console.warn('[NET]',text);else console.log('[NET]',text);
  }

  function alog(text,isErr=false){
    authStatus.textContent=(isErr?'Авторизация: ошибка - ':'Авторизация: ')+text;
    authStatus.style.color=isErr?'#ff9a9a':'#c1d4ea';
  }

  function formatAuthError(code){
    const key=String(code||'');
    if(key==='invalid_username')return 'ник минимум 3 символа';
    if(key==='auth_required'||key==='login_required')return 'сначала войди по нику';
    if(!key)return 'ошибка входа';
    return key;
  }

  function setConnectText(){
    connectBtn.textContent=gameNet.inRoom?'Выйти из комнаты':'Присоединиться';
  }

  function setStartAccess(){
    const can=gameNet.auth.ok;
    if(ui.start)ui.start.disabled=!can;
    if(ui.retry)ui.retry.disabled=!can;
  }

  function makeRoom(){
    return 'bs_'+Math.random().toString(36).slice(2,7);
  }

  function currentNetTeam(){
    if(gameNet.selectedTeam==='ct'||gameNet.selectedTeam==='t')return gameNet.selectedTeam;
    return localTeamToNet(player.team);
  }

  function preferredUsername(){
    const direct=String(authUser.value||'').trim().slice(0,24);
    if(direct)return direct;
    const current=String(gameNet.auth.username||'').trim().slice(0,24);
    if(current)return current;
    try{
      const saved=String(localStorage.getItem(STORAGE_USER)||'').trim().slice(0,24);
      if(saved)return saved;
    }catch(_e){}
    return '';
  }

  function sendAuthIfPossible(showErrors=false){
    const username=preferredUsername();
    if(username.length<3){
      if(showErrors)alog('ник минимум 3 символа',true);
      return false;
    }
    authUser.value=username;
    sendRaw({type:'auth',username});
    return true;
  }

  function updateMpVisibility(){
    const isMp=launchMode&&launchMode.value==='multiplayer';
    for(const el of mpOnlyEls)el.hidden=!isMp;
    if(!isMp&&gameNet.inRoom)leaveRoom('режим: локально');
  }

  function updateLobbyStatus(){
    if(!lobbyStatus)return;
    if(!gameNet.inRoom||!gameNet.roomState){
      lobbyStatus.textContent='Лобби: не подключено.';
      if(mpReady)mpReady.textContent='Я готов';
      return;
    }
    const rs=gameNet.roomState;
    const players=Array.isArray(rs.players)?rs.players:[];
    const list=players.map(p=>{
      const side=p.team==='ct'?'CT':p.team==='t'?'T':'-';
      const host=p.isHost?'HOST ':'';
      const ready=p.ready?'ready':'not ready';
      return host+p.nick+' ['+side+'] '+ready;
    }).join(' | ');
    lobbyStatus.textContent='Лобби '+gameNet.room+' | боты: '+(rs.botMode==='with_bots'?'вкл':'выкл')+' | '+list;

    const me=players.find(p=>p.id===gameNet.id)||null;
    if(me&&me.team&&mpTeam&&mpTeam.value!==me.team){
      mpTeam.value=me.team;
      gameNet.selectedTeam=me.team;
    }

    if(mpReady){
      mpReady.textContent=me&&me.ready?'Не готов':'Я готов';
      mpReady.disabled=!gameNet.inRoom;
    }

    if(mpBots){
      mpBots.value=rs.botMode==='with_bots'?'with_bots':'without_bots';
      mpBots.disabled=!gameNet.isHost;
    }
  }

  function clearRemote(id){
    const r=gameNet.remotes.get(id);
    if(!r)return;
    if(r.mesh){scene.remove(r.mesh);disposeNode(r.mesh);} 
    gameNet.remotes.delete(id);
  }

  function clearRemoteBot(id){
    const b=gameNet.remoteBots.get(id);
    if(!b)return;
    if(b.mesh){scene.remove(b.mesh);disposeNode(b.mesh);} 
    gameNet.remoteBots.delete(id);
  }

  function clearAllRemotes(){
    for(const id of gameNet.remotes.keys())clearRemote(id);
    for(const id of gameNet.remoteBots.keys())clearRemoteBot(id);
    gameNet.peerCount=1;
  }

  function ensureRemote(id,p={}){
    let r=gameNet.remotes.get(id);
    const px=Number.isFinite(p.x)?p.x:0;
    const py=Number.isFinite(p.y)?p.y:groundY(px,Number.isFinite(p.z)?p.z:0);
    const pz=Number.isFinite(p.z)?p.z:0;
    const team=(p.team==='ct'||p.team==='t')?p.team:(r?r.team:'ct');
    const weapon=WEAPONS[p.weapon]?p.weapon:(r?r.weapon:'rifle');
    const skin=skinById(p.skin||(r?r.skin:'default')).id;

    if(!r&&!Number.isFinite(p.x)&&!Number.isFinite(p.z))return null;
    if(!r){
      const model=createModel(netTeamToLocal(team),weapon,skin);
      model.group.position.set(px,py,pz);
      scene.add(model.group);
      r={
        id,
        team,
        weapon,
        skin,
        nick:String(p.nick||'PLAYER'),
        inGame:p.inGame!==false,
        alive:p.alive!==false,
        mesh:model.group,
        target:{x:px,y:py,z:pz,yaw:Number.isFinite(p.yaw)?p.yaw:0},
        last:performance.now()
      };
      gameNet.remotes.set(id,r);
    }

    if((team&&team!==r.team)||(weapon&&weapon!==r.weapon)||skin!==r.skin){
      const pos=r.mesh.position.clone();
      scene.remove(r.mesh);
      disposeNode(r.mesh);
      const model=createModel(netTeamToLocal(team),weapon,skin);
      r.mesh=model.group;
      r.mesh.position.copy(pos);
      scene.add(r.mesh);
      r.team=team;
      r.weapon=weapon;
      r.skin=skin;
    }

    r.nick=String(p.nick||r.nick||'PLAYER');
    r.inGame=p.inGame!==undefined?Boolean(p.inGame):r.inGame;
    r.alive=p.alive!==undefined?Boolean(p.alive):r.alive;
    r.team=team||r.team;
    r.target.x=Number.isFinite(p.x)?p.x:r.target.x;
    r.target.y=Number.isFinite(p.y)?p.y:r.target.y;
    r.target.z=Number.isFinite(p.z)?p.z:r.target.z;
    r.target.yaw=Number.isFinite(p.yaw)?p.yaw:r.target.yaw;
    r.last=performance.now();
    r.mesh.visible=r.inGame&&r.alive;
    return r;
  }

  function ensureRemoteBot(p={}){
    const id=String(p.id||'');
    if(!id)return null;
    let b=gameNet.remoteBots.get(id);
    const team=(p.team==='ct'||p.team==='t')?p.team:'ct';
    const weapon=WEAPONS[p.weapon]?p.weapon:'rifle';
    const skin=skinById(p.skin||'default').id;
    const x=Number.isFinite(p.x)?p.x:0;
    const y=Number.isFinite(p.y)?p.y:groundY(x,Number.isFinite(p.z)?p.z:0);
    const z=Number.isFinite(p.z)?p.z:0;

    if(!b){
      const model=createModel(netTeamToLocal(team),weapon,skin);
      model.group.position.set(x,y,z);
      scene.add(model.group);
      b={
        id,
        team,
        weapon,
        skin,
        alive:p.alive!==false,
        hp:Number.isFinite(p.hp)?p.hp:100,
        mesh:model.group,
        target:{x,y,z,yaw:Number.isFinite(p.yaw)?p.yaw:0},
        last:performance.now()
      };
      gameNet.remoteBots.set(id,b);
    }

    if(team!==b.team||weapon!==b.weapon||skin!==b.skin){
      const pos=b.mesh.position.clone();
      scene.remove(b.mesh);
      disposeNode(b.mesh);
      const model=createModel(netTeamToLocal(team),weapon,skin);
      b.mesh=model.group;
      b.mesh.position.copy(pos);
      scene.add(b.mesh);
      b.team=team;
      b.weapon=weapon;
      b.skin=skin;
    }

    b.alive=p.alive!==undefined?Boolean(p.alive):b.alive;
    b.hp=Number.isFinite(p.hp)?p.hp:b.hp;
    b.target.x=Number.isFinite(p.x)?p.x:b.target.x;
    b.target.y=Number.isFinite(p.y)?p.y:b.target.y;
    b.target.z=Number.isFinite(p.z)?p.z:b.target.z;
    b.target.yaw=Number.isFinite(p.yaw)?p.yaw:b.target.yaw;
    b.last=performance.now();
    b.mesh.visible=b.alive;
    return b;
  }

  function sendRaw(payload){
    if(!payload||typeof payload!=='object')return;
    if(socketOpen()){
      try{gameNet.socket.send(JSON.stringify(payload));}catch(_e){}
      return;
    }
    gameNet.pending.push(payload);
    ensureSocket();
  }

  function sendPacket(packet){
    if(!gameNet.inRoom)return;
    if(!packet||typeof packet!=='object')return;
    const type=String(packet.type||'').trim();
    if(!type)return;
    sendRaw({type,room:gameNet.room,id:gameNet.id,payload:packet});
  }

  function ensureSocket(){
    if(gameNet.socket&&(gameNet.socket.readyState===WebSocket.OPEN||gameNet.socket.readyState===WebSocket.CONNECTING))return;
    let ws;
    try{ws=new WebSocket(SERVER_WS_URL);}catch(e){nlog('не удалось открыть сокет',true);return;}
    gameNet.socket=ws;

    ws.onopen=()=>{
      if(gameNet.socket!==ws)return;
      sendAuthIfPossible(false);
      const queue=gameNet.pending.splice(0);
      for(const msg of queue){
        try{ws.send(JSON.stringify(msg));}catch(_e){}
      }
      if(gameNet.auth.ok&&gameNet.auth.username)alog('выполнен вход: '+gameNet.auth.username);
      else alog('введи ник и нажми Войти');
    };

    ws.onmessage=(ev)=>{
      if(gameNet.socket!==ws)return;
      let msg;
      try{msg=JSON.parse(ev.data);}catch(_e){return;}
      handleServerMessage(msg);
    };

    ws.onerror=()=>{
      if(gameNet.socket!==ws)return;
      nlog('ошибка соединения',true);
    };

    ws.onclose=()=>{
      console.log('Отключено');
      if(gameNet.socket!==ws)return;
      gameNet.socket=null;
      gameNet.pending=[];
      gameNet.inRoom=false;
      gameNet.enabled=false;
      gameNet.multiplayer=false;
      gameNet.roomState=null;
      gameNet.isHost=false;
      gameNet.auth.ok=false;
      gameNet.auth.username=preferredUsername();
      clearAllRemotes();
      setConnectText();
      setStartAccess();
      updateLobbyStatus();
      alog('соединение закрыто',true);
      nlog('соединение закрыто',true);
    };
  }

  function sendStateNow(){
    sendPacket({
      type:'state',
      x:player.pos.x||0,
      y:(player.y-player.eye)||0,
      z:player.pos.z||0,
      yaw:player.yaw||0,
      onGround:!!player.onGround,
      team:currentNetTeam(),
      inGame:game.started,
      nick:gameNet.auth.username||'player',
      weapon:curWeaponId(),
      skin:inv.equipped,
      hp:player.hp,
      alive:player.alive
    });
  }

  function makeRoomIfNeeded(){
    let room=(roomInput.value||'').trim();
    if(!room)room=makeRoom();
    roomInput.value=room;
    gameNet.room=room;
    try{localStorage.setItem(STORAGE_ROOM,room);}catch(_e){}
  }

  function joinRoom(){
    if(!gameNet.auth.ok){
      gameNet.joinAfterAuth=true;
      ensureSocket();
      sendAuthIfPossible(true);
      return;
    }
    makeRoomIfNeeded();
    ensureSocket();
    gameNet.inRoom=true;
    gameNet.enabled=true;
    setConnectText();
    nlog('подключение к комнате '+gameNet.room+' ...');
    sendRaw({type:'join',room:gameNet.room,id:gameNet.id,team:gameNet.selectedTeam||undefined});
  }

  function leaveRoom(reason='вышел из комнаты'){
    if(gameNet.inRoom)sendRaw({type:'leave'});
    if(gameNet.multiplayer&&game.started)backMenu();
    gameNet.inRoom=false;
    gameNet.enabled=false;
    gameNet.multiplayer=false;
    gameNet.roomState=null;
    gameNet.isHost=false;
    gameNet.peerCount=1;
    gameNet.autoStartRequested=false;
    clearAllRemotes();
    setConnectText();
    updateLobbyStatus();
    nlog(reason);
  }

  function requestMatchStart(){
    if(!gameNet.auth.ok){
      ensureSocket();
      sendAuthIfPossible(true);
      return;
    }
    if(!gameNet.selectedTeam){
      nlog('выбери сторону CT/T',true);
      return;
    }
    if(!gameNet.inRoom){
      joinRoom();
      return;
    }
    sendRaw({type:'team_select',team:gameNet.selectedTeam});
    if(gameNet.isHost)sendRaw({type:'room_config',botMode:mpBots&&mpBots.value==='with_bots'?'with_bots':'without_bots'});
    sendRaw({type:'ready',ready:true});
    sendRaw({type:'request_start'});
  }

  function beginMultiplayerMatch(config){
    gameNet.multiplayer=true;
    gameNet.enabled=true;
    gameNet.botMode=config&&config.botMode==='with_bots'?'with_bots':'without_bots';
    gameNet.isHost=Boolean(config&&config.hostId===gameNet.id);
    if(config&& (config.myTeam==='ct'||config.myTeam==='t')){
      gameNet.selectedTeam=config.myTeam;
      if(mpTeam)mpTeam.value=gameNet.selectedTeam;
    }
    if(ui.mode)ui.mode.value='team';
    startMatch();
    sendStateNow();
    nlog('матч запущен: '+(gameNet.selectedTeam==='ct'?'CT':'T'));
  }

  function handleBotState(payload){
    if(!payload||payload.type!=='bot_state'||!Array.isArray(payload.bots))return;
    const now=performance.now();
    for(const b of payload.bots){
      const r=ensureRemoteBot(b);
      if(r)r.last=now;
    }
  }

  function onRelay(from,payload){
    if(!from||from===gameNet.id||!payload||typeof payload!=='object')return;

    if(payload.type==='bot_state'){
      if(!gameNet.isHost)handleBotState(payload);
      return;
    }

    if(payload.type==='bot_event'&&gameNet.isHost&&payload.event==='hit'){
      const botId=String(payload.botId||'');
      const b=bots.find(x=>String(x.id)===botId);
      if(b&&b.alive){
        damage(b,Math.max(1,Number(payload.amount)||25),null);
      }
      return;
    }

    const r=ensureRemote(from,payload);
    if(r)r.last=performance.now();
    gameNet.peerCount=Math.max(2,gameNet.remotes.size+1);

    if(payload.type==='shoot'){
      const o=new THREE.Vector3(payload.ox||0,payload.oy||1.5,payload.oz||0);
      const dvec=new THREE.Vector3(payload.dx||0,payload.dy||0,payload.dz||-1).normalize();
      tracer(o,o.clone().addScaledVector(dvec,20),0xffcc7a);
      tone({x:o.x,z:o.z},620,0.02,0.03,'square');
      return;
    }

    if(payload.type==='damage'&&String(payload.targetId||'')===gameNet.id&&player.alive){
      damage(player,Math.max(1,Number(payload.amount)||25),null);
      return;
    }
  }

  function handleServerMessage(msg){
    if(!msg||typeof msg!=='object')return;

    if(msg.type==='auth_ok'){
      const username=String(msg.username||'').trim();
      gameNet.auth.ok=Boolean(username);
      gameNet.auth.username=username;
      if(gameNet.auth.ok){
        authUser.value=username;
        alog('выполнен вход: '+username);
        try{localStorage.setItem(STORAGE_USER,username);}catch(_e){}
      }
      setStartAccess();
      if(gameNet.joinAfterAuth){
        gameNet.joinAfterAuth=false;
        if(!gameNet.inRoom)joinRoom();
      }
      if(gameNet.autoStartRequested){
        setTimeout(()=>requestMatchStart(),10);
      }
      return;
    }

    if(msg.type==='auth_error'){
      gameNet.auth.ok=false;
      gameNet.auth.username=preferredUsername();
      alog(formatAuthError(msg.message),true);
      setStartAccess();
      return;
    }

    if(msg.type==='joined'){
      gameNet.inRoom=true;
      gameNet.enabled=true;
      gameNet.room=msg.room||gameNet.room;
      if(msg.id)gameNet.id=msg.id;
      gameNet.peerCount=Math.max(1,Number(msg.peerCount)||1);
      gameNet.isHost=Boolean(msg.hostId&&msg.hostId===gameNet.id);
      if(msg.botMode==='with_bots'||msg.botMode==='without_bots')gameNet.botMode=msg.botMode;
      setConnectText();
      nlog('в комнате '+gameNet.room+', ID '+gameNet.id);
      sendStateNow();
      if(gameNet.autoStartRequested){
        setTimeout(()=>requestMatchStart(),10);
      }
      return;
    }

    if(msg.type==='room_state'){
      gameNet.roomState=msg;
      gameNet.peerCount=Math.max(1,Number(msg.peerCount)||1);
      gameNet.isHost=Boolean(msg.hostId&&msg.hostId===gameNet.id);
      if(msg.botMode==='with_bots'||msg.botMode==='without_bots')gameNet.botMode=msg.botMode;
      updateLobbyStatus();
      if(gameNet.autoStartRequested&&gameNet.inRoom){
        setTimeout(()=>requestMatchStart(),10);
      }
      return;
    }

    if(msg.type==='team_state'){
      updateLobbyStatus();
      return;
    }

    if(msg.type==='start_match'){
      gameNet.autoStartRequested=false;
      beginMultiplayerMatch(msg.config||{});
      return;
    }

    if(msg.type==='peer_join'){
      gameNet.peerCount=Math.max(2,Number(msg.peerCount)||2);
      if(msg.hostId)gameNet.isHost=msg.hostId===gameNet.id;
      nlog('игрок подключился ('+gameNet.peerCount+')');
      return;
    }

    if(msg.type==='peer_leave'){
      if(msg.id)clearRemote(msg.id);
      gameNet.peerCount=Math.max(1,Number(msg.peerCount)||Math.max(1,gameNet.remotes.size+1));
      if(msg.hostId)gameNet.isHost=msg.hostId===gameNet.id;
      nlog('игрок вышел ('+gameNet.peerCount+')');
      updateLobbyStatus();
      return;
    }

    if(msg.type==='relay'){
      onRelay(msg.from,msg.payload||{});
      return;
    }

    if(msg.type==='error'){
      nlog(msg.message||'ошибка сервера',true);
    }
  }

  function tryAuth(){
    ensureSocket();
    sendAuthIfPossible(true);
  }

  authLoginBtn.addEventListener('click',tryAuth);
  authUser.addEventListener('keydown',(e)=>{if(e.key==='Enter')tryAuth();});

  connectBtn.addEventListener('click',()=>{
    if(!gameNet.auth.ok){
      gameNet.joinAfterAuth=true;
      ensureSocket();
      if(sendAuthIfPossible(true))nlog('выполняется вход по нику...');
      return;
    }
    if(gameNet.inRoom)leaveRoom('выход из комнаты');
    else joinRoom();
  });

  if(roomInput){
    roomInput.addEventListener('keydown',(e)=>{
      if(e.key==='Enter'){
        e.preventDefault();
        connectBtn.click();
      }
    });
  }

  if(launchMode){
    launchMode.addEventListener('change',()=>{
      updateMpVisibility();
      try{localStorage.setItem(STORAGE_LAUNCH,launchMode.value);}catch(_e){}
    });
  }

  if(mpTeam){
    mpTeam.addEventListener('change',()=>{
      gameNet.selectedTeam=mpTeam.value;
      if(gameNet.inRoom&&gameNet.selectedTeam)sendRaw({type:'team_select',team:gameNet.selectedTeam});
      if(gameNet.inRoom)sendRaw({type:'ready',ready:false});
    });
  }

  if(mpBots){
    mpBots.addEventListener('change',()=>{
      if(gameNet.inRoom&&gameNet.isHost){
        sendRaw({type:'room_config',botMode:mpBots.value==='with_bots'?'with_bots':'without_bots'});
      }
    });
  }

  if(mpReady){
    mpReady.addEventListener('click',()=>{
      if(!gameNet.inRoom)return;
      const players=gameNet.roomState&&Array.isArray(gameNet.roomState.players)?gameNet.roomState.players:[];
      const me=players.find(p=>p.id===gameNet.id);
      const next=!(me&&me.ready);
      sendRaw({type:'ready',ready:next});
    });
  }

  const _setupModeNet=setupMode;
  setupMode=function(){
    if(!gameNet.multiplayer)return _setupModeNet();
    game.teamScore.ally=0;
    game.teamScore.enemy=0;
    bots=[];
    botId=0;
    game.scoreLimit=30;
    game.timeLeft=420;
    if(gameNet.botMode==='with_bots'&&gameNet.isHost){
      for(let i=0;i<3;i++)spawnBot('ally',i+1,pickBotWeapon(),false);
      for(let i=0;i<3;i++)spawnBot('enemy',i+1,pickBotWeapon(),false);
    }
    game.dirtyScore=true;
  };

  const _resetPlayerNet=resetPlayer;
  resetPlayer=function(){
    _resetPlayerNet();
    if(!gameNet.multiplayer)return;
    player.team=gameNet.selectedTeam==='t'?'enemy':'ally';
    player.maxHp=100;
    player.hp=100;
    const p=spawnPos(player.team,0,false);
    const gy=groundY(p.x,p.z);
    player.pos.set(p.x,0,p.z);
    player.prev.copy(player.pos);
    player.y=player.eye+gy;
    camera.position.set(player.pos.x,player.y,player.pos.z);
    buildFPWeapon();
  };

  const _respawnPlayerNet=respawnPlayer;
  respawnPlayer=function(){
    _respawnPlayerNet();
    if(!gameNet.multiplayer)return;
    player.team=gameNet.selectedTeam==='t'?'enemy':'ally';
    player.maxHp=100;
    player.hp=100;
    player.speed=6.15;
    if(player.slot===3)player.slot=1;
    const p=spawnPos(player.team==='enemy'?'enemy':'ally',0,false);
    const gy=groundY(p.x,p.z);
    player.pos.set(p.x,0,p.z);
    player.prev.copy(player.pos);
    player.y=player.eye+gy;
    player.vy=0;
    player.onGround=true;
    buildFPWeapon();
  };

  const _updateBotNet=updateBot;
  updateBot=function(b,dt){
    if(gameNet.multiplayer&&!gameNet.isHost)return;
    _updateBotNet(b,dt);
  };

  const _backMenuNet=backMenu;
  backMenu=function(){
    _backMenuNet();
    if(gameNet.inRoom)sendStateNow();
  };

  if(ui.start){
    ui.start.addEventListener('click',(e)=>{
      if(!gameNet.auth.ok){
        e.preventDefault();
        e.stopImmediatePropagation();
        alog('вход обязателен',true);
        return;
      }

      const isMp=launchMode&&launchMode.value==='multiplayer';
      if(!isMp){
        gameNet.multiplayer=false;
        return;
      }

      e.preventDefault();
      e.stopImmediatePropagation();
      gameNet.autoStartRequested=true;
      requestMatchStart();
    },true);
  }

  if(ui.retry){
    ui.retry.addEventListener('click',(e)=>{
      if(!gameNet.auth.ok){
        e.preventDefault();
        e.stopImmediatePropagation();
        alog('вход обязателен',true);
      }
    },true);
  }

  function canHit(origin,dir,target,radius,maxDist){
    const t=raySphere(origin,dir,target,radius);
    if(t===null||t>maxDist)return false;
    const hx=origin.x+dir.x*t;
    const hz=origin.z+dir.z*t;
    if(lineBlocked(origin.x,origin.z,hx,hz))return false;
    return true;
  }

  const _shootPlayerNet=shootPlayer;
  shootPlayer=function(){
    const before=player.shots;
    _shootPlayerNet();
    if(!gameNet.inRoom||player.shots<=before)return;

    const dir=new THREE.Vector3(
      -Math.sin(player.yaw)*Math.cos(player.pitch),
      Math.sin(player.pitch),
      -Math.cos(player.yaw)*Math.cos(player.pitch)
    ).normalize();
    const origin=new THREE.Vector3(player.pos.x,player.y-0.08,player.pos.z);

    sendPacket({type:'shoot',ox:origin.x,oy:origin.y,oz:origin.z,dx:dir.x,dy:dir.y,dz:dir.z,weapon:curWeaponId(),skin:inv.equipped,team:currentNetTeam()});

    const maxDist=Math.max(12,Math.min(90,curWeapon().range||42));
    const amount=Math.max(1,Number(curWeapon().damage)||30);

    for(const [id,r] of gameNet.remotes){
      if(!r||!r.mesh||!r.mesh.visible||!r.inGame||!r.alive)continue;
      if(!isEnemyTeam(currentNetTeam(),r.team))continue;
      const c=new THREE.Vector3(r.mesh.position.x,r.mesh.position.y+1.1,r.mesh.position.z);
      if(canHit(origin,dir,c,0.52,maxDist)){
        sendPacket({type:'damage',targetId:id,amount,fromTeam:currentNetTeam()});
        break;
      }
    }

    if(!gameNet.isHost&&gameNet.botMode==='with_bots'){
      for(const [id,b] of gameNet.remoteBots){
        if(!b||!b.mesh||!b.mesh.visible||!b.alive)continue;
        if(!isEnemyTeam(currentNetTeam(),b.team))continue;
        const c=new THREE.Vector3(b.mesh.position.x,b.mesh.position.y+1.1,b.mesh.position.z);
        if(canHit(origin,dir,c,0.52,maxDist)){
          sendPacket({type:'bot_event',event:'hit',botId:id,amount});
          break;
        }
      }
    }
  };

  const _shootBotNet=shootBot;
  shootBot=function(b,t){
    _shootBotNet(b,t);
    if(!gameNet.multiplayer||!gameNet.isHost||!b||!b.alive)return;
    const w=WEAPONS[b.weapon]||WEAPONS.rifle;
    if(w.id==='claws')return;
    const gy=groundY(b.pos.x,b.pos.z);
    const origin=new THREE.Vector3(b.pos.x,1.5+gy,b.pos.z);
    for(const r of gameNet.remotes.values()){
      if(!r||!r.inGame||!r.alive)continue;
      if(!isEnemyTeam(localTeamToNet(b.team),r.team))continue;
      const target=new THREE.Vector3(r.target.x,r.target.y+1.1,r.target.z);
      const dir=new THREE.Vector3(target.x-origin.x,target.y-origin.y,target.z-origin.z);
      const dist=dir.length();
      if(dist<=0.001||dist>w.range)continue;
      dir.normalize();
      if(lineBlocked(origin.x,origin.z,target.x,target.z))continue;
      sendPacket({type:'damage',targetId:r.id,amount:w.damage||25,fromTeam:localTeamToNet(b.team)});
      break;
    }
  };

  const _tickNet=tick;
  tick=function(dt){
    _tickNet(dt);

    if(gameNet.inRoom&&socketOpen()){
      gameNet.sendTimer-=dt;
      if(gameNet.sendTimer<=0){
        gameNet.sendTimer=gameNet.sendRate;
        sendStateNow();
      }

      if(gameNet.multiplayer&&gameNet.isHost&&gameNet.botMode==='with_bots'){
        gameNet.botSendTimer-=dt;
        if(gameNet.botSendTimer<=0){
          gameNet.botSendTimer=gameNet.botSendRate;
          sendPacket({
            type:'bot_state',
            bots:bots.map(b=>({
              id:String(b.id),
              x:b.pos.x,
              y:groundY(b.pos.x,b.pos.z),
              z:b.pos.z,
              yaw:b.mesh&&b.mesh.rotation?b.mesh.rotation.y:0,
              team:localTeamToNet(b.team),
              weapon:b.weapon,
              skin:b.skinId,
              alive:b.alive,
              hp:b.hp
            }))
          });
        }
      }
    }

    const now=performance.now();
    for(const [id,r] of gameNet.remotes){
      if(now-r.last>30000){
        clearRemote(id);
        continue;
      }
      if(!r.mesh)continue;
      if(!r.inGame||!r.alive){
        r.mesh.visible=false;
        continue;
      }
      r.mesh.visible=true;
      r.mesh.position.x+=(r.target.x-r.mesh.position.x)*Math.min(1,dt*8.5);
      r.mesh.position.y+=(r.target.y-r.mesh.position.y)*Math.min(1,dt*8.5);
      r.mesh.position.z+=(r.target.z-r.mesh.position.z)*Math.min(1,dt*8.5);
      const targetYaw=(r.target.yaw||0)+Math.PI;
      r.mesh.rotation.y+=(targetYaw-r.mesh.rotation.y)*Math.min(1,dt*10);
    }

    for(const [id,b] of gameNet.remoteBots){
      if(now-b.last>30000){
        clearRemoteBot(id);
        continue;
      }
      if(!b.mesh)continue;
      if(!b.alive){
        b.mesh.visible=false;
        continue;
      }
      b.mesh.visible=true;
      b.mesh.position.x+=(b.target.x-b.mesh.position.x)*Math.min(1,dt*8.5);
      b.mesh.position.y+=(b.target.y-b.mesh.position.y)*Math.min(1,dt*8.5);
      b.mesh.position.z+=(b.target.z-b.mesh.position.z)*Math.min(1,dt*8.5);
      b.mesh.rotation.y+=(b.target.yaw-b.mesh.rotation.y)*Math.min(1,dt*10);
    }
  };

  try{
    const savedRoom=localStorage.getItem(STORAGE_ROOM);
    const savedUser=localStorage.getItem(STORAGE_USER);
    const savedLaunch=localStorage.getItem(STORAGE_LAUNCH);
    if(savedRoom)roomInput.value=savedRoom;
    if(savedUser)authUser.value=savedUser;
    if(savedLaunch&&launchMode)launchMode.value=savedLaunch;
  }catch(_e){}

  if(wsInput){
    wsInput.value=SERVER_WS_URL;
    wsInput.readOnly=true;
    wsInput.title=SERVER_WS_URL;
  }

  updateMpVisibility();
  setConnectText();
  setStartAccess();
  updateLobbyStatus();
  alog('введи ник и нажми Войти');
  nlog('не подключено');

  window.addEventListener('beforeunload',()=>{
    try{
      if(socketOpen()&&gameNet.inRoom){
        gameNet.socket.send(JSON.stringify({type:'leave'}));
      }
    }catch(_e){}
  });
})();

