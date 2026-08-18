const observed=document.querySelectorAll('.story,.characters,.reader,.cards article');
observed.forEach(el=>el.classList.add('reveal'));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
observed.forEach(el=>observer.observe(el));
const hero=document.querySelector('.hero');
if(matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',event=>{const x=(event.clientX/innerWidth-.5)*8;const y=(event.clientY/innerHeight-.5)*5;hero.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`});hero.addEventListener('pointerleave',()=>hero.style.backgroundPosition='center')}
