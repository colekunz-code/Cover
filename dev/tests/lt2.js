const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
const go=async(day,hr)=>{await p.selectOption('#admDay',day);await p.selectOption('#admHr',hr);await p.click('#admGo');await p.waitForLoadState('load');await p.waitForSelector('.adm');};
await p.goto('file://'+process.cwd()+'/admin_test.html');
await go('2026-11-08','7');await p.click('#tabSlate');
const ids=await p.$$eval('.game input[id^="in-a-"]',x=>x.map(y=>y.id.slice(5)));
// game1: score + both lines ; game2: lines only (BAL? no) ; game3: score only
const g=ids;
await p.fill('#in-a-'+g[0],'27');await p.fill('#in-h-'+g[0],'24');
await p.click('.lchip[data-lg="'+g[0]+'"][data-k="s"][data-v="a"]');await p.click('.lchip[data-lg="'+g[0]+'"][data-k="t"][data-v="o"]');
await p.click('.lchip[data-lg="'+g[1]+'"][data-k="s"][data-v="h"]');await p.click('.lchip[data-lg="'+g[1]+'"][data-k="t"][data-v="u"]');
await p.click('.chip[data-g="'+g[1]+'"][data-w="5"]');await p.click('.lchip[data-lg="'+g[0]+'"][data-k="m"][data-v="a"]');await p.click('.lchip[data-lg="'+g[2]+'"][data-k="m"][data-v="h"]');
await (await p.$$('.game'))[0].screenshot({path:'ml_card.png'});
const s=await p.$('#subBtn');console.log('submit enabled',s&&!(await s.isDisabled()));if(s)await s.click();
await go('2026-11-09','10');await p.click('.adm summary');
await p.fill('#sa-'+g[0],'30');await p.fill('#sh-'+g[0],'24');await p.fill('#sa-'+g[1],'20');await p.fill('#sh-'+g[1],'17');await p.fill('#sa-'+g[2],'17');await p.fill('#sh-'+g[2],'24');await p.click('#admFin');await p.waitForLoadState('load');await p.waitForSelector('.adm');
const r=await p.$('.recap');console.log('recap:',r?(await r.innerText()).replace(/\n/g,' | '):'NONE');if(r)await r.screenshot({path:'ml_recap.png'});
console.log('bks',await p.textContent('#bksNum'),'errors',e);await b.close();})();
