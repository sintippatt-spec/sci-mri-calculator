// Model digitised from Fig. 4 nomogram (Hossain et al., Spinal Cord 2026;64:563-570)
var SCIModel=(function(){
  var M={B_MSCC:1.988,B_IHL:3.361,IEL_LE48:33.2,SLOPE:0.12591,INT:-14.5593};
  function clamp(v,lo,hi){return Math.min(hi,Math.max(lo,v));}
  function score(mscc,iel,ihl){
    var w=[];
    if(mscc<20||mscc>60)w.push('MSCC outside nomogram range (20–60%); value clamped.');
    if(ihl<10||ihl>40)w.push('IHL outside nomogram range (10–40 mm); value clamped.');
    var pM=(60-clamp(mscc,20,60))*M.B_MSCC, pE=iel<=48?M.IEL_LE48:0, pH=(40-clamp(ihl,10,40))*M.B_IHL;
    var t=pM+pE+pH, lp=M.INT+M.SLOPE*t, p=1/(1+Math.exp(-lp));
    return {pM:pM,pE:pE,pH:pH,total:t,prob:p,warnings:w};
  }
  return {score:score,M:M};
})();
if(typeof module!=='undefined')module.exports=SCIModel;
