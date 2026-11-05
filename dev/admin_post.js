// ===== ADMIN: fake finals override =====
try{ Object.assign(RESULTS, JSON.parse(localStorage.getItem("cover-admin-results")||"{}")); }catch(e){}

try{ Object.assign(PARLAY_RES, JSON.parse(localStorage.getItem("cover-admin-parlay")||"{}")); }catch(e){}
