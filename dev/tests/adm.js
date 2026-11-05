const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:900}});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file://'+process.cwd()+'/admin_test.html');
console.log('real:',await p.textContent('.adm small'));
await p.selectOption('#admDay','2026-11-05');await p.selectOption('#admHr','18');await p.click('#admGo');await p.waitForLoadState('load');await p.waitForSelector('.adm');
console.log('sim:',await p.textContent('.adm small'),'| slate tab hidden',await p.$eval('#tabSlate',x=>x.hidden));
// play daily quickly
await p.click('#hGo');await p.click('#go');
for(let i=0;i<5;i++){const ws=await p.$$('.wager:not([disabled])');await ws[0].click();if(await p.$('#nv')){await p.fill('#nv','30');await p.click('#nf button');}else{(await p.$$('.opt'))[0].click();}await p.waitForSelector('#nx');await p.click('#nx');}
console.log('daily done',(await p.textContent('.summary .total')).trim());
await p.click('#tabSlate');await p.fill('input[id^="in-a-"]','24');await p.fill('input[id^="in-h-"]','17');await p.click('.chip[data-w="5"]');
console.log('pick:',(await p.textContent('.pickline')).trim());
const sub=await p.$('#subBtn'); if(sub) await sub.click();
await p.click('.adm summary');await p.fill('.adm input[id^="sa-"]','27');await p.fill('.adm input[id^="sh-"]','20');await p.click('#admFin');await p.waitForLoadState('load');await p.waitForSelector('.adm');
await p.click('#tabSlate');console.log('graded:',(await p.textContent('.game .result')).replace(/\s+/g,' '));
console.log('bks',await p.textContent('#bksNum'));
await p.screenshot({path:'adm_slate.png',fullPage:false});
await p.click('#admReset');await p.waitForLoadState('load');await p.waitForSelector('.adm');console.log('after replay hGo:',await p.textContent('#hGo'));
console.log('errors',e);await b.close();})();
