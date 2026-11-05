// ===== ADMIN: simulated clock + simulated finals (this copy only) =====
const ADMIN_OFF=(()=>{ try{ return +localStorage.getItem("cover-admin-off")||0; }catch(e){ return 0; } })();
if(ADMIN_OFF){ const R=Date; class D extends R{ constructor(...a){ if(a.length===0) super(R.now()+ADMIN_OFF); else super(...a); } static now(){ return R.now()+ADMIN_OFF; } } window.Date=D; }
