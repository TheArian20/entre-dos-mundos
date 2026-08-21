const site=document.querySelector('#site');
const chapterView=document.querySelector('#chapter');
const chapterNumber=document.querySelector('#chapter-number');
const chapterTitle=document.querySelector('#chapter-title');
const readingTime=document.querySelector('#reading-time');
const chapterSelect=document.querySelector('#chapter-select');
const previous=document.querySelector('#previous');
const next=document.querySelector('#next');
const save=document.querySelector('#save');
const progressLabel=document.querySelector('#progress-label');
const progressChapter=document.querySelector('#progress-chapter');
const progressBar=document.querySelector('#progress-bar');
const progressPercent=document.querySelector('#progress-percent');
const progressDate=document.querySelector('#progress-date');
const continueReading=document.querySelector('#continue-reading');
const chapterGrid=document.querySelector('#chapter-grid');
const chapterEmpty=document.querySelector('#chapter-empty');
const chapterSearch=document.querySelector('#chapter-search');
const dock=document.querySelector('#reading-dock');
const dockBar=document.querySelector('#dock-bar');
const dockPercent=document.querySelector('#dock-percent');
const dockChapter=document.querySelector('#dock-chapter');
const progressKey='entreDosMundosReadingProgress';
const settingsKey='entreDosMundosSettings';
let publishedChapters=[];
let activeChapter=0;
let activeFilter='all';

function getJSON(key,fallback=null){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function escapeHTML(value){return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]))}
function isFavorite(index){return localStorage.getItem(`chapter${index+1}`)==='saved'}
function chapterState(index){const progress=getJSON(progressKey);if(!progress)return '';if(index<progress.chapter||(index===progress.chapter&&progress.ratio>=.96))return '✓ Leído';if(index===progress.chapter)return '• En curso';return ''}
function titleMarkup(title){const words=title.split(' ');return words.length>1?`${escapeHTML(words[0])}<br><em>${escapeHTML(words.slice(1).join(' '))}</em>`:`<em>${escapeHTML(title)}</em>`}

function renderChapter(index,scroll=false,ratio=0){
 if(!publishedChapters.length)return;
 activeChapter=Math.max(0,Math.min(index,publishedChapters.length-1));
 const item=publishedChapters[activeChapter];
 chapterNumber.textContent=`CAPÍTULO ${String(activeChapter+1).padStart(2,'0')}`;
 chapterTitle.innerHTML=titleMarkup(item.title);
 readingTime.textContent=`Tiempo de lectura · ${item.minutes} min`;
 chapterView.innerHTML=item.paragraphs.map(p=>`<p>${escapeHTML(p)}</p>`).join('')+`<div class="end">FIN DEL CAPÍTULO ${String(activeChapter+1).padStart(2,'0')}</div>`;
 chapterSelect.value=String(activeChapter);
 previous.disabled=activeChapter===0;
 next.disabled=activeChapter===publishedChapters.length-1;
 next.textContent=activeChapter===publishedChapters.length-1?'Continuará…':'Siguiente →';
 dockChapter.textContent=`Cap. ${String(activeChapter+1).padStart(2,'0')}`;
 refreshFavoriteButton();
 if(scroll){requestAnimationFrame(()=>{const top=chapterView.getBoundingClientRect().top+scrollY-105;const travel=Math.max(0,chapterView.offsetHeight-innerHeight*.45);scrollTo({top:top+travel*ratio,behavior:'smooth'});chapterView.focus({preventScroll:true})})}
}
function refreshFavoriteButton(){save.textContent=isFavorite(activeChapter)?'♥ En favoritos':'♡ Añadir a favoritos'}

function showProgress(progress=getJSON(progressKey)){
 const valid=progress&&Number.isInteger(progress.chapter)&&progress.chapter>=0&&progress.chapter<publishedChapters.length;
 const chapter=valid?progress.chapter:0;
 const ratio=valid?Math.min(1,Math.max(0,Number(progress.ratio)||0)):0;
 const item=publishedChapters[chapter];
 const completed=valid?chapter+(ratio>=.96?1:0):0;
 progressLabel.textContent=valid?`${completed} de ${publishedChapters.length} capítulos completados`:'Aún no has comenzado';
 progressChapter.textContent=`Capítulo ${String(chapter+1).padStart(2,'0')} · ${item?.title||''}`;
 progressBar.style.width=`${Math.round(ratio*100)}%`;
 progressPercent.textContent=`${Math.round(ratio*100)}% del capítulo`;
 progressDate.textContent=valid?`Última lectura: ${new Intl.DateTimeFormat('es',{dateStyle:'medium'}).format(progress.updatedAt||Date.now())}`:'';
 continueReading.textContent=valid?'Continuar leyendo':'Comenzar a leer';
}
function storeProgress(ratio=0){const progress={chapter:activeChapter,ratio:Math.min(1,Math.max(0,ratio)),updatedAt:Date.now()};localStorage.setItem(progressKey,JSON.stringify(progress));showProgress(progress);renderLibrary();dockBar.style.width=`${Math.round(progress.ratio*100)}%`;dockPercent.textContent=`${Math.round(progress.ratio*100)}%`}
function openSavedProgress(){const saved=getJSON(progressKey),chapter=saved?.chapter??0,ratio=saved?.ratio??0;renderChapter(chapter,true,ratio)}

function renderLibrary(){
 const query=chapterSearch.value.trim().toLocaleLowerCase('es');
 const cards=publishedChapters.map((item,index)=>({item,index})).filter(({item,index})=>{
  const number=index+1;
  const range=activeFilter==='all'||(activeFilter==='favorites'&&isFavorite(index))||(activeFilter==='1-20'&&number<=20)||(activeFilter==='21-40'&&number>=21&&number<=40)||(activeFilter==='41-60'&&number>=41&&number<=60);
  return range&&(!query||String(number).includes(query)||item.title.toLocaleLowerCase('es').includes(query));
 });
 chapterGrid.innerHTML=cards.map(({item,index})=>`<button class="chapter-item" data-chapter="${index}"><span class="number">${String(index+1).padStart(2,'0')}</span><span><strong>${escapeHTML(item.title)}</strong><small>${item.minutes} min ${isFavorite(index)?'· Favorito':''}</small></span><span class="state">${chapterState(index)}</span></button>`).join('');
 chapterEmpty.hidden=cards.length>0;
 chapterGrid.querySelectorAll('.chapter-item').forEach(button=>button.addEventListener('click',()=>{renderChapter(Number(button.dataset.chapter),true);storeProgress(0)}));
}

function applySettings(){
 const settings=getJSON(settingsKey,{font:18,spacious:false,wide:false,theme:'light'});
 document.documentElement.style.setProperty('--reader-size',`${Math.max(15,Math.min(24,settings.font))}px`);
 document.querySelector('#leer').classList.toggle('spacious',!!settings.spacious);
 document.querySelector('#leer').classList.toggle('wide',!!settings.wide);
 site.classList.toggle('dark',settings.theme==='dark');site.classList.toggle('sepia',settings.theme==='sepia');
 document.querySelector('#reading-theme').value=settings.theme;
 document.querySelector('#theme').textContent=settings.theme==='dark'?'☀':'☾';
}
function updateSettings(patch){localStorage.setItem(settingsKey,JSON.stringify({...getJSON(settingsKey,{font:18,spacious:false,wide:false,theme:'light'}),...patch}));applySettings()}

function initialize(chapters){
 publishedChapters=chapters.slice(0,60);
 chapterSelect.innerHTML=publishedChapters.map((item,index)=>`<option value="${index}">${String(index+1).padStart(2,'0')} · ${escapeHTML(item.title)}</option>`).join('');
 renderChapter(0);showProgress();renderLibrary();applySettings();
}
function manuscriptChapters(markdown){const markers=[...markdown.matchAll(/^# Capítulo (\d+)\r?$/gm)];return markers.map((marker,index)=>{const block=markdown.slice(marker.index,markers[index+1]?.index??markdown.length).replace(/\r/g,'');const title=(block.match(/^## (.+)$/m)||[])[1]||`Capítulo ${marker[1]}`;const body=block.slice(block.indexOf(`## ${title}`)+title.length+3).replace(/\n---\s*$/,'').trim();const paragraphs=body.split(/\n\s*\n/).map(text=>text.trim()).filter(text=>text&&text!=='---').map(text=>text.replace(/^\*\*(.+)\*\*$/,'$1'));return{title,minutes:Math.max(2,Math.ceil(body.split(/\s+/).length/190)),paragraphs}})}

chapterSelect.addEventListener('change',()=>{renderChapter(Number(chapterSelect.value),true);storeProgress(0)});
previous.addEventListener('click',()=>{if(activeChapter>0){renderChapter(activeChapter-1,true);storeProgress(0)}});
next.addEventListener('click',()=>{if(activeChapter<publishedChapters.length-1){renderChapter(activeChapter+1,true);storeProgress(0)}});
save.addEventListener('click',()=>{const key=`chapter${activeChapter+1}`;localStorage.setItem(key,isFavorite(activeChapter)?'':'saved');refreshFavoriteButton();renderLibrary()});
continueReading.addEventListener('click',openSavedProgress);document.querySelector('#hero-continue').addEventListener('click',openSavedProgress);
document.querySelector('#clear-progress').addEventListener('click',()=>{localStorage.removeItem(progressKey);showProgress(null);renderLibrary()});
chapterSearch.addEventListener('input',renderLibrary);
document.querySelectorAll('.chapter-filters button').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.range;document.querySelectorAll('.chapter-filters button').forEach(item=>item.classList.toggle('active',item===button));renderLibrary()}));
document.querySelector('#font-down').addEventListener('click',()=>updateSettings({font:(getJSON(settingsKey,{font:18}).font||18)-1}));
document.querySelector('#font-up').addEventListener('click',()=>updateSettings({font:(getJSON(settingsKey,{font:18}).font||18)+1}));
document.querySelector('#line-toggle').addEventListener('click',()=>updateSettings({spacious:!getJSON(settingsKey,{}).spacious}));
document.querySelector('#width-toggle').addEventListener('click',()=>updateSettings({wide:!getJSON(settingsKey,{}).wide}));
document.querySelector('#reading-theme').addEventListener('change',event=>updateSettings({theme:event.target.value}));
document.querySelector('#theme').addEventListener('click',()=>updateSettings({theme:site.classList.contains('dark')?'light':'dark'}));
document.querySelector('#dock-index').addEventListener('click',()=>document.querySelector('#capitulos').scrollIntoView({behavior:'smooth'}));
document.querySelector('#dock-next').addEventListener('click',()=>{if(activeChapter<publishedChapters.length-1){renderChapter(activeChapter+1,true);storeProgress(0)}});
let progressTimer;
addEventListener('scroll',()=>{clearTimeout(progressTimer);progressTimer=setTimeout(()=>{const rect=chapterView.getBoundingClientRect();const start=rect.top+scrollY-105;const end=start+Math.max(1,chapterView.offsetHeight-innerHeight*.45);const ratio=(scrollY-start)/(end-start);const inReader=rect.bottom>90&&rect.top<innerHeight*.8;dock.classList.toggle('visible',inReader);if(ratio>=0&&ratio<=1.15)storeProgress(ratio)},130)},{passive:true});

if(Array.isArray(window.CHAPTERS)&&window.CHAPTERS.length)initialize(window.CHAPTERS);else fetch('manuscrito.md').then(response=>response.text()).then(markdown=>initialize(manuscriptChapters(markdown))).catch(()=>{chapterView.innerHTML='<p>No fue posible cargar los capítulos. Intenta actualizar la página.</p>'});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
