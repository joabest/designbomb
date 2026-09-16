import React from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const speakers=['Adoratorio studio','Pietro Terzini','DUDE','Niccolò Miranda','Francesco Franchi','lettera7','Cecilia Sammarco','Maristella Ferraro','Giuseppe Guidotti','Stefano Cipolla','Davide Cremonesi','Sarah Corti','Lorenza Liguori','Gianni Latino','Muten Factory','Sarah Mazzetti'];
const topics=['editorial','motion','graphic design','branding','interactive','immersive experience','art direction','service','product','UX/UI','art','advertising','3D art','future of work','AI','digital art','packaging','illustration'];
function App(){return <main>
<header><a className="brand" href="/">DESIGN<br/>BOMB!</a><nav><a href="#lineup">PROGRAMMA</a><a href="#lineup">WORKSHOP</a><a href="#where">CAMERETTA</a><a href="#footer">SHOP</a></nav><a className="ticket" href="#footer">TICKET ↗</a></header>
<section className="hero"><div className="orb">Aa</div><h1>Un festival<br/><em>per tutta</em> la community</h1><p>Tre giorni, tantissimi ospiti, centinaia di persone che respirano la stessa aria. Design Bomb Festival è esploso nel cuore della Sicilia e lascerà il segno.</p><div className="bomb">✹</div></section>
<section id="lineup" className="lineup"><div className="sectionTitle">LINEUP <span>2026</span></div><div className="grid">{speakers.map((s,i)=><article key={s}><div className={'portrait p'+(i%6)}><span>{String(i+1).padStart(2,'0')}</span></div><h2>{s}</h2><p>{['Creative Studio / Design','Artist / Visual Culture','Creative Agency','Creative Technologist'][i%4]}</p></article>)}</div></section>
<section className="ticker">{topics.concat(topics).map((t,i)=><span key={i}>{t} ✦ </span>)}</section>
<section id="where" className="where"><h2>A Catania,<br/><i>ma dove?</i></h2><div className="places"><article><b>01</b><h3>Isola</h3><p>Spazi di coworking, formazione e cultura: un ecosistema aperto e iperconnesso nel cuore del Mediterraneo.</p></article><article><b>02</b><h3>Nü Doganae</h3><p>Il palco principale di Design Bomb Festival. Uno spazio polifunzionale dedicato alla cultura e alle arti.</p></article></div></section>
<footer id="footer"><h2>Design Bomb<br/><i>Festival è qui</i></h2><div><p>Iscriviti per conoscere le novità prima di chiunque altro.</p><input placeholder="Inserisci la tua email"/><button>→</button></div><small>CATANIA · SICILIA · 2026</small></footer>
</main>}
createRoot(document.getElementById('root')).render(<App/>);
