const {chromium,devices}=require('playwright');
const old5=[{b:100,w:5},{b:0,w:4},{b:100,w:3},{b:100,w:2},{b:0,w:1}];
const mock=`window.__rows={me:{id:"me",data:{handle:"colekunz",days:{"2026-11-04":${JSON.stringify(old5)},"2026-11-05":${JSON.stringify(old5)}},picks:{},lines:{},wagers:{},submitted:{}}}};window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:"me"}}}})},from:()=>{const q={_f:null,select(){return q},eq(c,v){q._f=v;return q},order(){return q},maybeSingle:async()=>({data:window.__rows[q._f]||null}),limit:async()=>({data:Object.values(window.__rows)}),upsert:async(r)=>{window.__rows[r.id]={id:r.id,data:r.data};return{}}};return q;}})};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route('**/supabase.js',r=>r.fulfill({body:mock,contentType:'text/javascript'}));
await p.addInitScript(o=>{ if(!sessionStorage.getItem('seeded')){ sessionStorage.setItem('seeded','1'); localStorage.setItem('cover-me',JSON.stringify({handle:"colekunz",days:{"2026-11-04":o,"2026-11-05":o},picks:{},lines:{},wagers:{},submitted:{}})); localStorage.setItem('cover-run-2026-11-05',JSON.stringify({i:4,phase:"done",w:null,deadline:0,ans:o})); } },old5);
await p.clock.install({time:new Date('2026-11-05T13:30:00-06:00')});
await p.goto('file://'+process.cwd()+'/site/index.html');await p.waitForTimeout(800);
console.log('home button:',await p.textContent('#hGo'),'| bks',await p.textContent('#bksNum'),'| streak',await p.textContent('#cStreak'));
console.log('server after load keys:',await p.evaluate(()=>Object.keys(window.__rows.me.data.days)));
await p.click('#hGo');await p.click('#go');let n=0;
while(await p.$('.wager')){const ws=await p.$$('.wager:not([disabled])');await ws[0].click();if(await p.$('#nv')){await p.fill('#nv','5');await p.click('#nf button');}else{(await p.$$('.opt'))[0].click();}await p.waitForSelector('#nx');await p.click('#nx');n++;}
await p.click('#cvPat');(await p.$$('.opt'))[0].click();await p.waitForSelector('#nx');await p.click('#nx');
console.log('played rounds',n,'| final',(await p.textContent('.summary .total')).trim(),'| server days',await p.evaluate(()=>JSON.stringify(Object.fromEntries(Object.entries(window.__rows.me.data.days).map(([k,v])=>[k,v.length])))),'| streak',await p.textContent('#cStreak'));
await p.reload();await p.waitForTimeout(600);console.log('after reload phase shows done:',!!(await p.$('#hGo'))&&(await p.textContent('#hGo')));
console.log('errors',e);await b.close();})();
