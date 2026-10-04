(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EnglishCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const normalize=s=>String(s).trim().toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:，。！？；：]/g,'').replace(/\s+/g,' ');
 const checkAnswer=(value,answers)=>answers.some(answer=>normalize(value)===normalize(answer));
 function wordStatus(word,progress){
  const states=word.senses.map(s=>progress[s.id]);
  if(states.some(s=>s==='unknown'||s==='uncertain'))return 'weak';
  if(states.every(s=>s==='known'))return 'known';
  if(states.some(Boolean))return 'partial';
  return 'new';
 }
 function pickSenses(words,progress,{mode='all',count=20,random=Math.random}={}){
  let pool=words.flatMap(word=>word.senses.map(sense=>({word,sense})));
  if(mode==='weak')pool=pool.filter(x=>['unknown','uncertain'].includes(progress[x.sense.id]));
  if(mode==='new')pool=pool.filter(x=>!progress[x.sense.id]);
  if(mode==='common')pool=pool.filter(x=>x.word.focus);
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,Math.max(0,count));
 }
 return {normalize,checkAnswer,wordStatus,pickSenses};
});
