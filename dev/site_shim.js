// ===== Cover website config =====
// supabaseUrl / supabaseKey: Supabase > Project Settings > API (the publishable/anon key is meant to be public).
// turnstileKey: Cloudflare Turnstile SITE key (public). Leave "" to skip captcha.
// goatcounter: your GoatCounter code (the "xyz" in xyz.goatcounter.com). Leave "" to skip analytics.
window.COVER_CONFIG = { supabaseUrl: "%%SB_URL%%", supabaseKey: "%%SB_KEY%%", turnstileKey: "%%TS_KEY%%", goatcounter: "%%GC_CODE%%", siteUrl: "%%SITE_URL%%" };
(function(){
  const cfg=window.COVER_CONFIG;
  for(const k in cfg) if(String(cfg[k]).indexOf("%%")===0) cfg[k]="";
  // ---- analytics (GoatCounter: no cookies, no personal data) ----
  const q=[]; const send=n=>window.goatcounter.count({path:"event/"+n,title:n,event:true});
  window.coverTrack=function(name){ try{ if(window.goatcounter&&window.goatcounter.count) send(name); else if(cfg.goatcounter) q.push(name); }catch(e){} };
  if(cfg.goatcounter){ const s=document.createElement("script"); s.async=true; s.src="https://gc.zgo.at/count.js"; s.setAttribute("data-goatcounter","https://"+cfg.goatcounter+".goatcounter.com/count");
    s.onload=()=>{ try{ while(q.length) send(q.shift()); }catch(e){} }; document.head.appendChild(s); }
  // ---- leaderboard backend (Supabase) ----
  if(!cfg.supabaseUrl||!window.supabase) return;
  const sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseKey);
  const captcha=()=>new Promise(res=>{
    if(!cfg.turnstileKey) return res(undefined);
    const go=()=>{ try{ const el=document.createElement("div"); el.style.cssText="position:fixed;bottom:12px;right:12px;z-index:99"; document.body.appendChild(el);
      window.turnstile.render(el,{sitekey:cfg.turnstileKey,appearance:"interaction-only",callback:t=>{ res(t); setTimeout(()=>el.remove(),500); },"error-callback":()=>res(undefined),"timeout-callback":()=>res(undefined)}); }catch(e){ res(undefined); } };
    if(window.turnstile) return go();
    const s=document.createElement("script"); s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async=true; s.onload=go; s.onerror=()=>res(undefined); document.head.appendChild(s);
    setTimeout(()=>res(undefined),20000);
  });
  let uidP=null;
  const getUid=()=>uidP||(uidP=(async()=>{
    let {data:{session}}=await sb.auth.getSession();
    if(!session){ const token=await captcha(); const r=await sb.auth.signInAnonymously(token?{options:{captchaToken:token}}:undefined); if(r.error) throw r.error; session=r.data.session; }
    return session.user.id; })());
  const doc=id=>({
    async get(){ const {data,error}=await sb.from("slips").select("data").eq("id",id).maybeSingle(); if(error) throw error; return {exists:!!data,data:()=>data&&data.data}; },
    async set(obj){ const {error}=await sb.from("slips").upsert({id,handle:String(obj.handle||"").slice(0,24),data:obj,updated:new Date().toISOString()}); if(error) throw error; }
  });
  const coll={doc,limit(n){ return {onSnapshot(cb,err){
    const load=async()=>{ const {data,error}=await sb.from("slips").select("id,data").order("updated",{ascending:false}).limit(n);
      if(error){ if(err) err(error); return; } cb({docs:data.map(r=>({id:r.id,exists:true,data:()=>r.data}))}); };
    load(); const iv=setInterval(load,20000); return ()=>clearInterval(iv); }}; }};
  window.claude={use:async name=>name==="db"?{collection:()=>coll}:name==="user"?{id:getUid}:null};
})();
