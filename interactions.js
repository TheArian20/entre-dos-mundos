const hero=document.querySelector('.hero');
if(hero&&matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',event=>{const x=(event.clientX/innerWidth-.5)*8;const y=(event.clientY/innerHeight-.5)*5;hero.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`});hero.addEventListener('pointerleave',()=>hero.style.backgroundPosition='center')}
