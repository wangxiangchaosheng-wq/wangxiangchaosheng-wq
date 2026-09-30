(()=>{
const root=document.getElementById('garden-nacre-cats');
const slots=[...root.querySelectorAll('.ar-slot')];
const labels={visual:'视觉实验',interaction:'交互体验',learning:'学习手记'};
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const dialog=document.getElementById('coming-soon');
let opener=null;
function select(key){root.classList.toggle('has-selection',!!key);slots.forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.key===key)));}
slots.forEach(el=>{
 const foil=document.createElement('span');foil.className='ar-foil';foil.setAttribute('aria-hidden','true');
 for(let i=0;i<5;i++){const star=document.createElement('span');star.className='ar-foil-mark ar-foil-star';foil.append(star);}
 const orbit=document.createElement('span');orbit.className='ar-foil-mark ar-foil-orbit';foil.append(orbit);el.querySelector('.ar-face').append(foil);
 el.addEventListener('pointermove',event=>{
  if(reduce.matches||event.pointerType==='touch')return;
  const box=el.getBoundingClientRect();
  const x=Math.max(0,Math.min(1,(event.clientX-box.left)/box.width));
  const y=Math.max(0,Math.min(1,(event.clientY-box.top)/box.height));
  el.style.setProperty('--rx',((.5-y)*15)+'deg');el.style.setProperty('--ry',((x-.5)*21)+'deg');
  el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');el.style.setProperty('--foil-angle',(105+x*50-y*15)+'deg');
 });
 const reset=()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');};
 el.addEventListener('pointerleave',reset);el.addEventListener('pointercancel',reset);
 el.addEventListener('click',()=>{opener=el;select(el.dataset.key);document.getElementById('dialog-title').textContent=labels[el.dataset.key];dialog.showModal();});
});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{select(null);opener?.focus({preventScroll:true});});
const key=new URLSearchParams(location.search).get('focus');if(Object.hasOwn(labels,key)){select(key);}
})();