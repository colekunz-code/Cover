// ===== ADMIN PANEL =====
(function(){
  const LS={get(k){try{return localStorage.getItem(k);}catch(e){return null;}},set(k,v){try{localStorage.setItem(k,v);}catch(e){}},del(k){try{localStorage.removeItem(k);}catch(e){}}};
  const reload=()=>{ try{ location.reload(); }catch(e){} };
  const start=new Date(Q_START+"T12:00:00"); const nDays=Math.max(14,Math.ceil(QUESTIONS.length/5));
  const slateDays={}; SLATE.forEach(g=>{ const k=keyOf(new Date(g[1])); slateDays[k]=(slateDays[k]||0)+1; });
  const days=[]; for(let i=0;i<nDays;i++){ const d=new Date(start.getTime()); d.setDate(d.getDate()+i); days.push(d); }
  Object.keys(slateDays).forEach(k=>{ if(!days.some(d=>keyOf(d)===k)) days.push(new Date(k+"T12:00:00")); });
  days.sort((a,b)=>a-b);
  const hours=[[7,"7 AM (every game open)"],[10,"10 AM"],[13,"1 PM (early games locked)"],[18,"6 PM (only night game open)"],[23,"11 PM (all locked)"]];
  const curH=new Date().getHours(); const curHour=hours.reduce((b,h)=>Math.abs(h[0]-curH)<Math.abs(b[0]-curH)?h:b)[0];
  const css=document.createElement("style"); css.textContent=`
  .adm{position:relative;z-index:50;margin:0 0 14px;background:#141414;color:#F4F4F0;border:2px dashed #E8B931;border-radius:14px;padding:12px;display:grid;gap:10px;font:14px/1.4 system-ui,sans-serif}
  .adm b.t{font:900 13px ui-monospace,monospace;letter-spacing:.12em;color:#E8B931}
  .adm .r{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .adm select,.adm input{font:inherit;padding:7px 8px;border-radius:8px;border:1px solid #555;background:#222;color:#F4F4F0;min-width:0}
  .adm input{width:52px;text-align:center}
  .adm button{font:700 13px system-ui,sans-serif;padding:8px 12px;border-radius:8px;border:0;background:#E8B931;color:#141414;cursor:pointer}
  .adm button.g{background:#333;color:#F4F4F0}
  .adm .gm{display:grid;grid-template-columns:1fr auto auto auto;gap:6px;align-items:center;font:600 13px ui-monospace,monospace}
  .adm details{display:grid;gap:8px} .adm summary{cursor:pointer;font-weight:700}
  .adm small{color:#B5B5AE}`;
  document.head.appendChild(css);
  const box=document.createElement("div"); box.className="adm";
  const opt=days.map(d=>{ const k=keyOf(d); const dn=Math.round((new Date(k+"T12:00:00")-start)/864e5); return '<option value="'+k+'"'+(k===TODAY?" selected":"")+'>'+esc(fmtDay(d))+(dn>=0?" · Day "+(dn+1):"")+(slateDays[k]?" · "+slateDays[k]+" games":"")+'</option>'; }).join("");
  const sim=JSON.parse(LS.get("cover-admin-results")||"{}");
  const simGames=SLATE.filter(g=>keyOf(new Date(g[1]))<=TODAY).map(g=>({id:g[0],away:g[2],home:g[3],start:new Date(g[1])})).filter(g=>!RESULTS[g.id]||sim[g.id]).slice(-16);
  const gms=simGames.map(g=>{ const f=sim[g.id]||["",""]; return '<div class="gm"><span>'+esc(g.start.toLocaleDateString(undefined,{weekday:"short"}))+' '+esc(g.away)+' @ '+esc(g.home)+'</span><input id="sa-'+g.id+'" inputmode="numeric" value="'+f[0]+'" aria-label="'+esc(g.away)+' final"><input id="sh-'+g.id+'" inputmode="numeric" value="'+f[1]+'" aria-label="'+esc(g.home)+' final"><span>'+(sim[g.id]?"fake":"")+'</span></div>'; }).join("");
  const _old=games.map(g=>{ const f=sim[g.id]||RESULTS[g.id]||["",""]; return '<div class="gm"><span>'+esc(g.away)+' @ '+esc(g.home)+'</span><input id="sa-'+g.id+'" inputmode="numeric" value="'+f[0]+'" aria-label="'+esc(g.away)+' final"><input id="sh-'+g.id+'" inputmode="numeric" value="'+f[1]+'" aria-label="'+esc(g.home)+' final"><span>'+(sim[g.id]?"fake":RESULTS[g.id]?"real":"")+'</span></div>'; }).join("");
  box.innerHTML='<div class="r" style="justify-content:space-between"><b class="t">ADMIN · TEST MODE</b><small>'+(ADMIN_OFF?"Pretending it's "+esc(fmtDay(now))+" "+esc(fmtTime(now)):"Real time")+'</small></div>'+
    '<div class="r"><select id="admDay">'+opt+'</select><select id="admHr">'+hours.map(h=>'<option value="'+h[0]+'"'+(h[0]===curHour?" selected":"")+'>'+h[1]+'</option>').join("")+'</select><button id="admGo">Go</button><button class="g" id="admReal">Real time</button></div>'+
    '<div class="r"><button class="g" id="admReset">Replay this day</button><button class="g" id="admWipe">Wipe all my test data</button></div>'+
    (simGames.length?'<details'+(LIVE?'':' open')+'><summary>Fake final scores ('+simGames.length+' games so far this week)</summary><small>Enter scores, save, and check the Home recap and the Slate tab. Only affects this admin copy.</small>'+gms+'<div class="r"><button id="admFin">Save finals</button><button class="g" id="admFinClr">Clear fake finals</button></div></details>':'<small>No games have kicked off yet as of this date. Jump to Thu Nov 5 or later.</small>');
  document.body.insertBefore(box,document.body.firstChild);
  $("admGo").onclick=()=>{ const k=$("admDay").value, h=+$("admHr").value; const [y,m,d]=k.split("-").map(Number); const target=new Date(y,m-1,d,h,0,0); LS.set("cover-admin-off",String(target.getTime()-(Date.now()-ADMIN_OFF))); reload(); };
  $("admReal").onclick=()=>{ LS.del("cover-admin-off"); reload(); };
  $("admReset").onclick=()=>{ LS.del("cover-run-"+TODAY); LS.del("cover-run2-"+TODAY); const m=JSON.parse(LS.get("cover-me")||"null"); if(m){ if(m.days) delete m.days[TODAY]; games.forEach(g=>{ if(m.picks) delete m.picks[g.id]; if(m.lines) delete m.lines[g.id]; if(m.wagers) delete m.wagers[g.id]; }); if(m.submitted) delete m.submitted[TODAY]; LS.set("cover-me",JSON.stringify(m)); } reload(); };
  $("admWipe").onclick=()=>{ ["cover-me","cover-admin-results","cover-admin-parlay"].forEach(LS.del); try{ Object.keys(localStorage).filter(k=>k.startsWith("cover-run")).forEach(k=>localStorage.removeItem(k)); }catch(e){} reload(); };
  const plGames=simGames.filter(g=>PARLAY[g.id]);
  if(plGames.length){ const d=document.createElement("details"); d.innerHTML='<summary>Fake parlay player stats ('+plGames.length+')</summary><small>Builds player stats from YOUR parlay picks so you can see a hit or a miss. Save fake finals for the game first so the game legs grade too.</small>'+
      plGames.map(g=>'<div class="r"><span style="font:600 13px ui-monospace,monospace">'+esc(g.away)+' @ '+esc(g.home)+'</span><button data-ph="'+g.id+'">All prop legs hit</button><button class="g" data-pm="'+g.id+'">One prop leg misses</button><button class="g" data-pc="'+g.id+'">Clear</button></div>').join("");
    box.appendChild(d);
    const mk=(gid,miss)=>{ const keys=((JSON.parse(LS.get("cover-me")||"{}").parlays||{})[gid])||[]; const st={}; let flipped=false;
      keys.forEach(k=>{ const [m,i,s]=k.split(":"); if(!["pass","rush","rec","td"].includes(m)) return; const row=PARLAY[gid][m][+i]; const nm=row[0]; st[nm]=st[nm]||{pass:0,rush:0,rec:0,td:false};
        let hit=true; if(miss&&!flipped){ hit=false; flipped=true; }
        if(m==="td") st[nm].td=hit; else { const want=(s==="o")===hit; st[nm][m]=want?Math.round(row[2]+12):Math.max(0,Math.floor(row[2]-8)); } });
      const all=JSON.parse(LS.get("cover-admin-parlay")||"{}"); all[gid]={stats:st,out:[]}; LS.set("cover-admin-parlay",JSON.stringify(all)); reload(); };
    box.querySelectorAll("[data-ph]").forEach(b=>b.onclick=()=>mk(b.dataset.ph,false));
    box.querySelectorAll("[data-pm]").forEach(b=>b.onclick=()=>mk(b.dataset.pm,true));
    box.querySelectorAll("[data-pc]").forEach(b=>b.onclick=()=>{ const all=JSON.parse(LS.get("cover-admin-parlay")||"{}"); delete all[b.dataset.pc]; LS.set("cover-admin-parlay",JSON.stringify(all)); reload(); });
  }
  if($("admFin")){
    $("admFin").onclick=()=>{ const s=JSON.parse(LS.get("cover-admin-results")||"{}"); simGames.forEach(g=>{ const a=$("sa-"+g.id).value.trim(), h=$("sh-"+g.id).value.trim(); if(a!==""&&h!=="") s[g.id]=[+a,+h]; else delete s[g.id]; }); LS.set("cover-admin-results",JSON.stringify(s)); reload(); };
    $("admFinClr").onclick=()=>{ const s=JSON.parse(LS.get("cover-admin-results")||"{}"); simGames.forEach(g=>delete s[g.id]); LS.set("cover-admin-results",JSON.stringify(s)); reload(); };
  }
})();
