const chapter=["La lluvia golpeaba la ventana del piso cuarenta y dos con la insistencia de alguien que llevaba demasiado tiempo esperando que le abrieran.","Méndez la observó unos segundos desde el escritorio de su oficina. Abajo, la ciudad se deshacía en líneas de luz sobre el pavimento mojado. Habían pasado las once de la noche y todavía vestía la camisa blanca con la que había cerrado el acuerdo más importante del trimestre.","En la pantalla principal seguían abiertos los informes de tres compañías. En la segunda lo esperaban correos marcados como urgentes por su abuelo. Sobre la mesa descansaba una carpeta con la palabra ADQUISICIÓN impresa en letras negras.","Tenía veintiún años y dirigía más negocios de los que podía nombrar sin mirar una lista. Sabía calcular riesgos, detectar una cláusula peligrosa y hacer que una sala llena de inversionistas guardara silencio. Sin embargo, no sabía preparar una cena, viajar sin conductor ni elegir unas vacaciones sin que alguien de su familia aprobara primero el destino.","Para el mundo era un empresario brillante. Para su familia era una máquina que jamás debía detenerse.","Sobre la pantalla de su teléfono había tres llamadas perdidas de su abuela y un mensaje de su tío: Necesitamos las proyecciones antes de las siete. No nos falles.","En su familia nadie le preguntaba si estaba cansado. Mucho menos si era feliz. Su abuelo decía que el apellido era una empresa y que Méndez había nacido para protegerla. Su vida no le pertenecía.","Cerró los informes, abrió el videojuego y se colocó los audífonos. Aquella noche no quería ser el director ejecutivo ni el heredero. Solo quería perder unas cuantas partidas con desconocidos.","El menú iluminó la habitación con un tono azul. Estuvo a punto de silenciar a todos. Entonces oyó una voz distinta.","—Si vamos a perder, por lo menos perdamos con dignidad.","Era una voz de mujer, suave pero segura. —¿Y cómo se pierde con dignidad? —preguntó Méndez. —Sin culpar al equipo y sin abandonar a mitad de la partida.","En la pantalla apareció el nombre Mich_27. —Entonces espero estar a la altura. —Con que no corras directo hacia el enemigo, me conformo.","Michelle marcaba ubicaciones y se burlaba cada vez que Méndez tomaba una decisión absurda. Él encontró refrescante que una desconocida no tuviera interés en impresionarlo.","—A tu izquierda —advirtió ella. Méndez giró demasiado tarde. —Te dije a la izquierda. —Mi otra izquierda. —Ah, claro. Debí especificar cuál de las dos.","Él soltó una carcajada. Hacía días que no se reía así. Michelle consiguió llegar hasta él y reanimarlo. —Me debes una. —Pensé que solo querías perder con dignidad. —Cambié de opinión.","Y ganaron. No de una forma brillante ni heroica. Ganaron por pura terquedad, salvándose mutuamente más veces de las que cualquiera habría admitido.","Jugaron una segunda vez. Después una tercera. En la cuarta dejaron de preocuparse por ganar. Michelle le contó que solo podía conectarse cuando su hija ya estaba dormida.","—Se llama Giselle, pero le decimos Gigi. Tiene ocho años y cree que dormir es una pérdida de tiempo.","Como si hubiera sido invocada, una vocecita sonó a través del micrófono. —Mami, tengo sed. —¿Estás hablando con alguien? —Con un compañero del juego. —¿Es bueno? —No mucho —respondió Michelle. Gigi rio.","Michelle se ausentó unos minutos. Méndez se quedó protegiendo a su personaje. —¿Sigues aquí? —preguntó ella al volver. —Dijiste que volverías. —La gente no siempre espera. —Yo sí.","Al terminar la última partida, ninguno encontró una razón para despedirse. —¿Te conectas mañana? —Depende de si ya aprendiste cuál es tu izquierda. —Podrías enseñarme. —Tal vez entre a esta misma hora.","La conexión se cerró. Apareció una notificación: Mich_27 te ha enviado una solicitud de amistad. Méndez la aceptó.","En otra parte de la ciudad, Michelle acomodó la cobija de Gigi y miró su teléfono. Mendez_01 ha aceptado tu solicitud. Apagó la pantalla, aunque no pudo borrar su sonrisa. Todavía no lo sabía, pero acababa de abrirle la puerta a alguien que cambiaría su vida."];
document.querySelector('#chapter').innerHTML=chapter.map(p=>`<p>${p}</p>`).join('')+'<div class="end">FIN DEL CAPÍTULO 01</div>';
const site=document.querySelector('#site'),theme=document.querySelector('#theme'),save=document.querySelector('#save');theme.onclick=()=>{site.classList.toggle('dark');theme.textContent=site.classList.contains('dark')?'☀':'☾'};if(localStorage.chapter1==='saved')save.textContent='✓ Capítulo guardado';save.onclick=()=>{const on=localStorage.chapter1!=='saved';localStorage.chapter1=on?'saved':'';save.textContent=on?'✓ Capítulo guardado':'♡ Guardar capítulo'};

const publishedChapters=[
 {title:'Una partida inesperada',minutes:8,paragraphs:chapter},
 {title:'La voz detrás del personaje',minutes:7,paragraphs:[
  'Méndez llegó a la oficina a las seis y cuarenta y cinco de la mañana. Su abuelo ya lo esperaba junto a dos abogados y una taza de café que nadie le había visto beber.',
  '—Las proyecciones llegaron doce minutos tarde —dijo. —Llegaron antes de las siete. —Eso no significa que hayan llegado a tiempo.',
  'La reunión duró tres horas. Hablaron de adquisiciones, despidos y ganancias. Para su familia, las vidas cabían en una columna de números. Sin embargo, una parte de Méndez permaneció lejos de aquella sala, pensando en un nombre iluminado en azul: Mich_27.',
  'A las nueve y diecisiete Michelle apareció conectada. Él envió una invitación demasiado rápido. —Veo que practicaste tu izquierda —dijo ella. —Contraté a tres asesores. —Espero que no les pagues mucho.',
  'Michelle le contó que trabajaba con su tío en una pequeña empresa, atendiendo clientes y organizando pedidos. Él le había dado una oportunidad cuando más la necesitaba y comprendía que Gigi era su prioridad.',
  '—¿Y tú qué haces? —Trabajo en una empresa familiar —respondió Méndez, ofreciendo una verdad incompleta. —Eso suena peligroso. Con la familia nunca se sale realmente del trabajo.',
  '—¿Te gusta? —preguntó ella. Nadie se lo había preguntado antes. —Soy bueno. —No te pregunté eso. —Lo sé.',
  'Hablaron de películas que él no había visto, comidas que nunca había probado y lugares por los que jamás había caminado. Michelle rio al descubrir que no sabía usar el transporte público.',
  'Ella confesó que había querido estudiar diseño, pero sus planes cambiaron al nacer Gigi. —¿Te arrepientes? —De ella, jamás. De haber dejado de pensar en mí, algunas veces.',
  'Antes de despedirse intercambiaron sus usuarios de mensajería. El primer texto llegó treinta segundos después: Para comprobar que no me diste un contacto falso. Méndez respondió: Tendrás que escribirme mañana para estar segura.',
  'Por primera vez, Méndez esperó la llegada del día siguiente por una razón que no figuraba en su agenda.'
 ]},
 {title:'Noches sin sueño',minutes:7,paragraphs:[
  'Los mensajes se convirtieron en una costumbre antes de que cualquiera de los dos pudiera evitarlo. Michelle escribía antes de revisar con su tío los pedidos del día; Méndez respondía entre reuniones.',
  'Ella le mostraba dibujos de Gigi, tazas de café y pequeños desastres domésticos. Él enviaba fotografías del cielo desde edificios tan altos que a Michelle le parecían otro mundo.',
  'Una noche, Michelle llamó sin avisar. Gigi tenía fiebre y ella necesitaba mantenerse despierta. —Me quedaré contigo —dijo Méndez. —Tienes que trabajar mañana. —Siempre tengo que trabajar mañana.',
  'Hablaron en voz baja mientras Michelle revisaba la temperatura de su hija. Cuando confesó que criar sola era vivir con miedo a equivocarse, él le dijo: —Gigi suena feliz. Algo debes estar haciendo bien.',
  'A las tres la fiebre bajó. Michelle le pidió que contara algo de sí mismo. Méndez habló de sus padres ausentes y de cómo sus abuelos habían destinado cada hora de su infancia a prepararlo para dirigir empresas.',
  '—¿Nunca jugabas? —Aprendía idiomas, finanzas y protocolo. Me permitían ajedrez. —Eso explica muchas cosas.',
  'Michelle dejó de bromear. —No debieron hacerte creer que solo valías por lo que podías producir.',
  'Méndez sintió que algo se quebraba silenciosamente dentro de él. Había esperado toda su vida escuchar esas palabras sin saberlo.',
  '—Tú tampoco debiste renunciar a todos tus sueños —contestó. Michelle miró a Gigi dormida. —Tal vez todavía quede tiempo para algunos.',
  'La llamada terminó al amanecer. Ninguno dijo que aquellas horas habían cambiado algo entre ellos. No hacía falta.'
 ]},
 {title:'Gigi entra en la partida',minutes:6,paragraphs:[
  'El sábado, Gigi despertó decidida a descubrir quién era el misterioso compañero de juego de su madre. —¿Es tu novio? —Es mi amigo. —Sonríes cuando te escribe.',
  'Aquella tarde entraron juntas al juego. —Hoy tenemos una invitada —anunció Michelle. —Hola —dijo Gigi—. Mi mamá dice que juegas mal. —Tu mamá exagera. A veces juego peor.',
  'Durante la partida, la niña dio órdenes a ambos. Méndez obedeció sin protestar. Cuando perdieron, Gigi aseguró que había sido culpa de los adultos.',
  'Después construyeron una pequeña vivienda virtual. Gigi eligió cada pared y obligó a Méndez a colocar flores frente a una casa torcida.',
  '—Necesitamos tres habitaciones: una para mi mamá, una para mí y una para ti cuando vengas. El silencio cayó de golpe.',
  '—Méndez vive en su propia casa —aclaró Michelle. —Pero puede visitarnos. —Algún día —respondió él suavemente.',
  'Al despedirse, Gigi exigió que prometiera regresar. —Las promesas no se rompen. —Esta no la romperé.',
  'Más tarde Michelle le advirtió que Gigi se encariñaba rápido. Méndez respondió: No pienso desaparecer.',
  'Michelle deseó creerle. Pero ya había escuchado esa promesa de otra persona. Dylan sí había desaparecido cuando más lo necesitaban.'
 ]},
 {title:'El mensaje de Dylan',minutes:6,paragraphs:[
  'El nombre apareció en la pantalla de Michelle el lunes por la mañana. Dylan: Necesitamos hablar. Ella dejó el teléfono sobre la mesa como si quemara.',
  'Dylan entraba y salía de sus vidas cuando le convenía, acompañado de disculpas y promesas. Nunca preguntaba qué necesitaba Gigi. Preguntaba cuándo podía verla, como si ser padre fuera una visita que pudiera agendarse.',
  'El segundo mensaje llegó una hora después: Sé que estás hablando con alguien.',
  'Esa noche Méndez notó que Michelle estaba distraída. Ella terminó confesando que Dylan había escrito. —¿Qué quiere? —Lo de siempre: regresar cuando siente que estoy avanzando.',
  '—¿Te ha amenazado? —Dylan no suele decir las cosas directamente. Prefiere conseguir que dudes de ti misma. Méndez reconoció el método: su familia hacía lo mismo con palabras más elegantes.',
  'Michelle prometió avisarle si llegaba a sentirse en peligro. Cuando terminó la llamada encontró otro mensaje: Ese tipo no es quien dice ser. Pregúntale cuánto dinero tiene.',
  'Escribió una pregunta para Méndez y la borró. Luego dejó el teléfono sobre la cama.',
  'En el piso cuarenta y dos, la abuela de Méndez ordenó que asistiera a una cena familiar. —Esta familia es tu prioridad. Méndez miró el nombre de Michelle. —Tal vez ya no.',
  'En dos lugares distintos, dos amenazas despertaban: Dylan había descubierto a Méndez y la familia de Méndez estaba a punto de descubrir que él comenzaba a tener una vida propia.'
 ]}
];
let activeChapter=0;
const chapterView=document.querySelector('#chapter'),chapterNumber=document.querySelector('#chapter-number'),chapterTitle=document.querySelector('#chapter-title'),readingTime=document.querySelector('#reading-time'),chapterSelect=document.querySelector('#chapter-select'),previous=document.querySelector('#previous'),next=document.querySelector('#next');
function renderChapter(index,scroll=false){activeChapter=index;const item=publishedChapters[index];chapterNumber.textContent=`CAPÍTULO ${String(index+1).padStart(2,'0')}`;chapterTitle.innerHTML=item.title.replace(' ','<br><em>')+'</em>';readingTime.textContent=`Tiempo de lectura · ${item.minutes} min`;chapterView.innerHTML=item.paragraphs.map(p=>`<p>${p}</p>`).join('')+`<div class="end">FIN DEL CAPÍTULO ${String(index+1).padStart(2,'0')}</div>`;chapterSelect.value=String(index);previous.disabled=index===0;next.disabled=index===publishedChapters.length-1;next.textContent=index===publishedChapters.length-1?'Continuará…':'Siguiente →';const key=`chapter${index+1}`;save.textContent=localStorage.getItem(key)==='saved'?'✓ Capítulo guardado':'♡ Guardar capítulo';if(scroll)document.querySelector('#leer').scrollIntoView({behavior:'smooth'})}
chapterSelect.onchange=()=>renderChapter(Number(chapterSelect.value),true);previous.onclick=()=>activeChapter>0&&renderChapter(activeChapter-1,true);next.onclick=()=>activeChapter<publishedChapters.length-1&&renderChapter(activeChapter+1,true);save.onclick=()=>{const key=`chapter${activeChapter+1}`,on=localStorage.getItem(key)!=='saved';localStorage.setItem(key,on?'saved':'');save.textContent=on?'✓ Capítulo guardado':'♡ Guardar capítulo'};renderChapter(0);

function manuscriptChapters(markdown){
 const markers=[...markdown.matchAll(/^# Capítulo (\d+)\r?$/gm)];
 return markers.map((marker,index)=>{
  const block=markdown.slice(marker.index,markers[index+1]?.index??markdown.length).replace(/\r/g,'');
  const title=(block.match(/^## (.+)$/m)||[])[1]||`Capítulo ${marker[1]}`;
  const body=block.slice(block.indexOf(`## ${title}`)+title.length+3).replace(/\n---\s*$/,'').trim();
  const paragraphs=body.split(/\n\s*\n/).map(text=>text.trim()).filter(text=>text&&text!=='---').map(text=>text.replace(/^\*\*(.+)\*\*$/,'$1'));
  const words=body.split(/\s+/).length;
  return {title,minutes:Math.max(2,Math.ceil(words/190)),paragraphs};
 });
}
function applyFullChapters(chapters){
 if(!chapters.length)return;
 publishedChapters.splice(0,publishedChapters.length,...chapters);
 chapterSelect.innerHTML=chapters.map((item,index)=>`<option value="${index}">${String(index+1).padStart(2,'0')} · ${item.title}</option>`).join('');
 renderChapter(0);
}
if(Array.isArray(window.CHAPTERS)&&window.CHAPTERS.length){
 applyFullChapters(window.CHAPTERS.slice(0,20));
}else{
 fetch('manuscrito.md').then(response=>{if(!response.ok)throw new Error('No se pudo cargar el manuscrito');return response.text()}).then(markdown=>applyFullChapters(manuscriptChapters(markdown).slice(0,20))).catch(error=>console.warn(error.message));
}
