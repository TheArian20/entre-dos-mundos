(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const progress = () => { try { return JSON.parse(localStorage.getItem('entreDosMundosReadingProgress')) || {}; } catch { return {}; } };
  const read = () => { try { return JSON.parse(localStorage.getItem('entreDosMundosRead')) || []; } catch { return []; } };
  const reached = () => Math.max(1, (progress().chapter ?? 0) + 1, ...read().map(index => index + 1));

  const timeline = [
    [1,'Una partida inesperada','Méndez y Michelle se conocen dentro del videojuego.'],
    [10,'Del otro lado de la pantalla','La conexión comienza a convertirse en algo real.'],
    [20,'Nuestro verdadero hogar','Los tres descubren una forma nueva de sentirse familia.'],
    [30,'El precio del apellido','La familia de Méndez intenta decidir por él.'],
    [40,'Una puerta al pasado','El regreso de Elena transforma todo lo que Méndez creía saber.'],
    [49,'La desaparición de Gigi','La amenaza deja de ser únicamente económica.'],
    [58,'Fuego en el negocio','El peligro alcanza el mundo construido por Michelle.'],
    [61,'La confianza como arma','La aparente transformación de Dylan comienza a mostrar grietas.'],
    [65,'Una llave desde dentro','Alguien utiliza la confianza de Gigi para acercarse a los archivos.']
  ];
  const clues = [
    [1,'Mich_27','Nombre de Michelle dentro del videojuego.'],
    [15,'El regreso de Dylan','Su aparición vuelve a conectar a Michelle con un pasado que quería dejar atrás.'],
    [29,'Elena','La madre de Méndez regresa con una versión distinta de la historia familiar.'],
    [42,'La fortuna robada','Documentos ocultos revelan que el imperio no se construyó limpiamente.'],
    [49,'La desaparición','Gigi se convierte en el centro de una amenaza calculada.'],
    [56,'El dispositivo','Los archivos conectan las decisiones del abuelo con otros miembros de la familia.'],
    [61,'El segundo teléfono','Una comunicación secreta demuestra que alguien trabaja desde dentro.'],
    [65,'La llave copiada','El acceso al estudio revela hasta dónde llega la manipulación.']
  ];
  const evolved = {
    dylan:{at:61,role:'EL INFILTRADO',description:'Su regreso no nació del arrepentimiento. Se ganó la confianza de Michelle, Gigi y Méndez para obtener información y cobrar por cada traición.',quote:'«Mi lealtad nunca estuvo incluida.»'},
    padre:{at:63,role:'LA VOZ EN LAS SOMBRAS',description:'Una presencia vinculada al pasado de Méndez dirige movimientos desde lejos. Su identidad y sus alianzas todavía no están demostradas ante la familia.',quote:'«Todavía.»'},
    gigi:{at:65,role:'LA CONFIANZA HERIDA',description:'Gigi sigue siendo luminosa, pero empieza a descubrir que los adultos pueden utilizar incluso el cariño como una herramienta.',quote:'«Yo sí te conozco.»'}
  };

  function renderSpoilerSafe(){
    const level=reached();
    $$('.timeline-item').forEach(item=>{const unlocked=level>=Number(item.dataset.chapter);item.classList.toggle('locked',!unlocked);item.querySelector('p').textContent=unlocked?item.dataset.summary:'Continúa leyendo para desbloquear este momento.'});
    $$('.clue-card').forEach(item=>{const unlocked=level>=Number(item.dataset.chapter);item.classList.toggle('locked',!unlocked);item.querySelector('p').textContent=unlocked?item.dataset.summary:'Pista bloqueada para evitar spoilers.'});
    const note=$('#spoiler-progress');if(note)note.textContent=`Contenido visible según tu progreso: capítulo ${String(level).padStart(2,'0')}`;
  }
  const timelineEl=$('#timeline-list');if(timelineEl)timelineEl.innerHTML=timeline.map(([chapter,title,summary])=>`<article class="timeline-item" data-chapter="${chapter}" data-summary="${summary}"><span>${String(chapter).padStart(2,'0')}</span><div><h3>${title}</h3><p></p></div></article>`).join('');
  const clueEl=$('#clue-grid');if(clueEl)clueEl.innerHTML=clues.map(([chapter,title,summary])=>`<article class="clue-card" data-chapter="${chapter}" data-summary="${summary}"><small>CAPÍTULO ${String(chapter).padStart(2,'0')}</small><h3>${title}</h3><p></p></article>`).join('');
  renderSpoilerSafe();
  $('#clear-progress')?.addEventListener('click',()=>setTimeout(renderSpoilerSafe));
  $('#chapter-select')?.addEventListener('change',()=>setTimeout(renderSpoilerSafe));

  $$('[data-character]').forEach(button=>button.addEventListener('click',()=>{const update=evolved[button.dataset.character];if(!update||reached()<update.at)return;requestAnimationFrame(()=>{const role=$('#modal-role'),description=$('#modal-description'),quote=$('#modal-quote');if(role)role.textContent=update.role;if(description)description.textContent=update.description;if(quote)quote.textContent=update.quote})}));

  const focus=$('#focus-mode');if(focus)focus.addEventListener('click',()=>{const active=document.body.classList.toggle('focus-reading');focus.textContent=active?'Salir del modo lectura':'Modo sin distracciones';focus.setAttribute('aria-pressed',String(active))});
  const exitFocus=$('#focus-exit');if(exitFocus)exitFocus.addEventListener('click',()=>document.body.classList.remove('focus-reading'));

  const share=$('#share-chapter');if(share)share.addEventListener('click',async()=>{const number=Number($('#chapter-select').value)+1,url=`${location.origin}${location.pathname}?capitulo=${number}#leer`,title=`Entre dos mundos · Capítulo ${number}`;try{if(navigator.share)await navigator.share({title,url});else{await navigator.clipboard.writeText(url);share.textContent='Enlace copiado ✓';setTimeout(()=>share.textContent='Compartir capítulo',1800)}}catch{}});
  const requested=Math.max(1,Math.min(100,Number(new URLSearchParams(location.search).get('capitulo'))||0));if(requested&&$('#chapter-select'))setTimeout(()=>{$('#chapter-select').value=String(requested-1);$('#chapter-select').dispatchEvent(new Event('change'));history.replaceState(null,'',`?capitulo=${requested}#leer`)},80);

  const volume=$('#ambient-volume');if(volume)volume.addEventListener('input',event=>{if(window.masterGain&&window.audioContext)window.masterGain.gain.setTargetAtTime(Number(event.target.value),window.audioContext.currentTime,.15);localStorage.setItem('entreDosMundosVolume',event.target.value)});if(volume)volume.value=localStorage.getItem('entreDosMundosVolume')||'.025';
  const scene=$('#ambient-scene'),soundscapes={romance:[110,164.81,220],tension:[82.41,123.47,174.61],game:[130.81,196,261.63]};if(scene)scene.addEventListener('change',event=>{localStorage.setItem('entreDosMundosSoundscape',event.target.value);const frequencies=soundscapes[event.target.value];window.ambientOscillators?.forEach((oscillator,index)=>oscillator.frequency.setTargetAtTime(frequencies[index],window.audioContext.currentTime,.5))});if(scene)scene.value=localStorage.getItem('entreDosMundosSoundscape')||'romance';

  const family=$('#family-reveal');if(family){$('#relaciones')?.appendChild(family);family.addEventListener('click',()=>{const map=$('.relationship-map');map.classList.toggle('expanded-tree');family.textContent=map.classList.contains('expanded-tree')?'Ocultar conexiones':'Explorar conexiones'})}

  const comments=$('#comments-container');if(comments){const script=document.createElement('script');script.src='https://utteranc.es/client.js';script.async=true;script.crossOrigin='anonymous';script.setAttribute('repo','TheArian20/entre-dos-mundos');script.setAttribute('issue-term','pathname');script.setAttribute('label','comentarios');script.setAttribute('theme','github-light');comments.appendChild(script);const fallback=document.createElement('p');fallback.className='comment-fallback';fallback.innerHTML='<a href="https://github.com/TheArian20/entre-dos-mundos/issues" target="_blank" rel="noreferrer">Abrir conversaciones en GitHub ↗</a>';comments.appendChild(fallback)}
  addEventListener('storage',renderSpoilerSafe);
})();
