const {chromium,devices}=require('playwright');
const rows={a:{id:"a",data:{handle:"Dyson",days:{"2026-11-03":[1,2,3,4,5].map(w=>({b:100,w}))},picks:{},lines:{},wagers:{},submitted:{}}},b:{id:"b",data:{handle:"BallKnower22",days:{"2026-11-03":[1,2,3,4,5].map(w=>({b:w%2?100:0,w}))},picks:{},lines:{},wagers:{},submitted:{}}}};
const mock=`window.__rows=${JSON.stringify(rows)};window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:"me"}}}})},from:()=>{const q={_f:null,select(){return q},eq(c,v){q._f=v;return q},order(){return q},maybeSingle:async()=>({data:null}),limit:async()=>({data:Object.values(window.__rows)}),upsert:async(r)=>{window.__rows[r.id]={id:r.id,data:r.data};return{}}};return q;}})};`;
(async()=>{const b=await chromium.launch();
for(const [name,opt] of [["desk",{viewport:{width:1440,height:900}}],["phone",{...devices['iPhone 13']}]]){
 const ctx=await b.newContext(opt);const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
 await p.route('**/supabase.js',r=>r.fulfill({body:mock,contentType:'text/javascript'}));
 await p.addInitScript(()=>{try{localStorage.setItem("cover-me",JSON.stringify({handle:"colekunz",days:{"2026-11-03":[{b:100,w:5},{b:0,w:4},{b:100,w:1},{b:80,w:3},{b:100,w:2}],"2026-11-04":[{b:100,w:5},{b:100,w:4},{b:0,w:1},{b:0,w:3},{b:100,w:2}]},picks:{},lines:{},wagers:{},submitted:{}}))}catch(e){}});
 await p.clock.install({time:new Date('2026-11-05T17:00:00-06:00')});
 await p.goto('file://'+process.cwd()+'/site/index.html');await p.waitForTimeout(900);
 await p.screenshot({path:name+'_home.png'});
 await p.click('#hGo');await p.click('#go');await p.waitForTimeout(500);
 await p.screenshot({path:name+'_cat.png'});
 const ws=await p.$$('.wager:not([disabled])');await ws[ws.length-1].click();await p.waitForTimeout(300);
 await p.screenshot({path:name+'_q.png'});
 console.log(name,'width',await p.evaluate(()=>document.documentElement.scrollWidth+'/'+innerWidth),'errors',e);
 await ctx.close();}
await b.close();})();
