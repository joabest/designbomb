import React, {createContext, useContext, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const RouterContext=createContext({pathname:'/'});
function BrowserRouter({children}){const [pathname,setPathname]=useState(location.pathname);useEffect(()=>{const update=()=>setPathname(location.pathname);addEventListener('popstate',update);return()=>removeEventListener('popstate',update)},[]);const navigate=to=>{if(to===location.pathname)return;history.pushState({},'',to);setPathname(to)};return <RouterContext.Provider value={{pathname,navigate}}>{children}</RouterContext.Provider>}
function useLocation(){return useContext(RouterContext)}
function Link({to,children,className='',...props}){const {navigate}=useContext(RouterContext);return <a href={to} className={className} onClick={e=>{if(!e.defaultPrevented&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey){e.preventDefault();navigate(to)}}} {...props}>{children}</a>}
function NavLink({to,children,className='',end=false,...props}){const {pathname}=useLocation();const active=end?pathname===to:pathname.startsWith(to);return <Link to={to} className={`${className} ${active?'active':''}`.trim()} {...props}>{children}</Link>}
function Route(){return null}
function Routes({children}){const {pathname}=useLocation();const routes=React.Children.toArray(children);const match=routes.find(r=>r.props.path===pathname)||routes.find(r=>r.props.path==='*');return match?.props.element||null}

const nav = [
  ['/', 'Home'], ['/programma', 'Programma'], ['/ticket', 'Ticket'],
  ['/workshop', 'Workshop'], ['/mercatino', 'Mercatino'], ['/cameretta', 'Cameretta'],
];

const events = [
  {day:'18', date:'Venerdì 18 ottobre', time:'18:00', title:'Opening Design Bomb', type:'TALK', place:'Arena Bomb', color:'pink'},
  {day:'18', date:'Venerdì 18 ottobre', time:'19:30', title:'Design is a serious game', type:'TALK', place:'Arena Bomb', color:'yellow'},
  {day:'18', date:'Venerdì 18 ottobre', time:'21:30', title:'Bomb Party!', type:'MUSIC', place:'Cameretta', color:'blue'},
  {day:'19', date:'Sabato 19 ottobre', time:'10:00', title:'Fiorisci. Creative coding con p5', type:'WORKSHOP', place:'Laboratorio', color:'green', slug:'/fiorisci.-creative-coding-con-p5'},
  {day:'19', date:'Sabato 19 ottobre', time:'14:30', title:'Type, shape and everything in between', type:'TALK', place:'Arena Bomb', color:'orange'},
  {day:'19', date:'Sabato 19 ottobre', time:'17:00', title:'Nuove forme di comunicazione', type:'TALK', place:'Arena Bomb', color:'pink'},
  {day:'19', date:'Sabato 19 ottobre', time:'22:00', title:'Cameretta Sounds', type:'MUSIC', place:'Cameretta', color:'blue'},
  {day:'20', date:'Domenica 20 ottobre', time:'10:30', title:'Colazione creativa', type:'MEET UP', place:'Mercatino', color:'yellow'},
  {day:'20', date:'Domenica 20 ottobre', time:'15:00', title:'Fare spazio alle idee', type:'TALK', place:'Arena Bomb', color:'green'},
];

function Logo(){return <Link className="logo" to="/" aria-label="Design Bomb home"><span>DESIGN</span><span>BOMB<span className="logo-dot">●</span></span></Link>}

function Header(){
  const [open,setOpen]=useState(false); const {pathname}=useLocation();
  useEffect(()=>setOpen(false),[pathname]);
  return <header className="header"><Logo/><button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open}>MENU <i>{open?'×':'+'}</i></button><nav className={open?'open':''}>{nav.map(([url,label])=><NavLink key={url} to={url} end={url==='/' }>{label}</NavLink>)}<Link className="nav-ticket" to="/ticket">Biglietti ↗</Link></nav></header>
}

function Ticker(){return <div className="ticker" aria-hidden="true"><div>{Array(8).fill('DESIGN BOMB • 18—20 OTTOBRE • CREATIVITÀ ESPLOSIVA • ').join('')}</div></div>}

function Burst({small=false}){return <span className={small?'burst small':'burst'} aria-hidden="true">✹</span>}

function Footer(){return <footer><div className="footer-top"><Logo/><p>Un festival che fa esplodere<br/>la creatività.</p><div className="social"><a href="https://instagram.com" target="_blank">Instagram ↗</a><a href="mailto:ciao@designbomb.it">Email ↗</a></div></div><div className="footer-bottom"><span>© DESIGN BOMB 2024</span><Link to="/spedizioni-e-resi">SPEDIZIONI E RESI</Link><span>MADE WITH ♥ IN ITALY</span></div></footer>}

function Layout({children}){
 const {pathname}=useLocation(); useEffect(()=>{window.scrollTo(0,0)},[pathname]);
 return <><Header/><main>{children}</main><Footer/></>
}

function Hero(){return <section className="hero"><div className="hero-date">18—20<br/>OTTOBRE<br/>2024</div><div className="hero-city">Bologna<br/>DumBO</div><h1><span>DESIGN</span><span className="bomb">B<span className="bomb-o"><Burst/>O</span>MB</span></h1><p className="hero-copy">IL FESTIVAL CHE<br/>FA ESPLODERE<br/>LA CREATIVITÀ.</p><a className="circle-link" href="#scopri">SCOPRI<br/>DI PIÙ ↓</a></section>}

function Home(){return <>
 <Hero/><Ticker/>
 <section id="scopri" className="intro"><div className="eyebrow">[ COS'È DESIGN BOMB? ]</div><h2>Tre giorni di <em>idee</em>, incontri e contaminazioni per chi vive di creatività.</h2><div className="intro-grid"><p>DESIGN BOMB è talk, workshop, musica, mercato e molto altro. Un'esplosione di energia creativa aperta a tuttə.</p><Link className="pill" to="/programma">Scopri il programma <span>↗</span></Link></div></section>
 <section className="manifesto"><div className="rotating">CREATIVITY<br/><Burst/></div><h2>NON È SOLO<br/>UN FESTIVAL.</h2><p>È uno spazio libero in cui incontrarsi, sperimentare e immaginare insieme nuovi modi di fare design.</p></section>
 <Featured/>
 <section className="home-cards"><Link to="/workshop" className="home-card workshop-card"><span>01</span><h3>WORK<br/>SHOP</h3><p>Metti le mani sulle idee →</p></Link><Link to="/mercatino" className="home-card market-card"><span>02</span><h3>MERCA<br/>TINO</h3><p>Oggetti belli, fatti bene →</p></Link><Link to="/cameretta" className="home-card room-card"><span>03</span><h3>CAME<br/>RETTA</h3><p>Suoni, visioni, notte →</p></Link></section>
 <Newsletter/>
 </>}

function Featured(){return <section className="featured"><div className="section-head"><span>[ IN EVIDENZA ]</span><h2>COSA SUCCEDE?</h2></div><div className="event-row">{events.slice(0,3).map((e,i)=><article className={`event-card ${e.color}`} key={e.title}><div className="event-image"><span className="face">{['◉‿◉','✦ᴗ✦','◍﹏◍'][i]}</span><span className="tag">{e.type}</span></div><div className="event-info"><b>{e.date}</b><h3>{e.title}</h3><p>{e.time} — {e.place}</p></div></article>)}</div><Link className="pill dark" to="/programma">Tutto il programma <span>↗</span></Link></section>}

function PageHero({kicker,title,children,color='yellow'}){return <section className={`page-hero ${color}`}><div className="eyebrow">[ {kicker} ]</div><h1>{title}</h1>{children}<Burst small/></section>}

function Programma(){const [filter,setFilter]=useState('TUTTO'); const filtered=filter==='TUTTO'?events:events.filter(e=>e.type===filter); return <><PageHero kicker="18—20 OTTOBRE" title="PROGRAMMA" color="yellow"><p>Talk, workshop, musica e incontri.<br/>Scegli cosa far esplodere.</p></PageHero><section className="schedule"><div className="filters">{['TUTTO','TALK','WORKSHOP','MUSIC','MEET UP'].map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div><div className="schedule-list">{filtered.map((e,i)=><Link to={e.slug||'/ticket'} className="schedule-item" key={e.title}><span className="num">{String(i+1).padStart(2,'0')}</span><span className="when">{e.date}<b>{e.time}</b></span><h2>{e.title}</h2><span className="type">{e.type}<i>↗</i></span></Link>)}</div></section></>}

function Ticket(){return <><PageHero kicker="VIENI A TROVARCI" title="TICKET" color="pink"><p>Prendi il tuo posto.<br/>La bomba sta per esplodere.</p></PageHero><section className="tickets"><TicketCard name="DAY PASS" price="15" text="Un giorno intero di festival"/><TicketCard name="FULL PASS" price="35" text="Tre giorni, zero limiti" featured/><TicketCard name="WORKSHOP" price="25" text="Ingresso a un workshop"/></section><InfoBand/></>}
function TicketCard({name,price,text,featured}) {return <article className={featured?'ticket-card featured-ticket':'ticket-card'}>{featured&&<span className="best">IL PIÙ SCELTO</span>}<span className="ticket-code">DB—24</span><h2>{name}</h2><p>{text}</p><div className="price"><sup>€</sup>{price}<small>,00</small></div><button>ACQUISTA ORA ↗</button><div className="cut">••••••••••••••••</div></article>}

function Workshop(){return <><PageHero kicker="IMPARA FACENDO" title={<>WORK<br/>SHOP</>} color="green"><p>Spazi di sperimentazione guidati da<br/>designer, artisti e maker.</p></PageHero><section className="editorial"><div className="big-number">W.</div><div><div className="eyebrow">[ SPORCATI LE MANI ]</div><h2>Le idee più belle nascono quando smettiamo di stare a guardare.</h2><p>I workshop sono a numero limitato e richiedono la prenotazione. Tutto il materiale è incluso.</p></div></section><WorkshopGrid/></>}
function WorkshopGrid(){return <section className="workshop-grid">{events.filter(e=>e.type==='WORKSHOP').concat([{title:'Poster power!',date:'Sabato 19 ottobre',time:'15:00',color:'pink'},{title:'Type in motion',date:'Domenica 20 ottobre',time:'11:00',color:'blue'},{title:'Carta, forbici, caos',date:'Domenica 20 ottobre',time:'15:30',color:'orange'}]).map((w,i)=><Link to={w.slug||'/ticket'} key={w.title} className={`workshop-item ${w.color}`}><span>0{i+1}</span><div className="abstract-shape">{['✿','◒','✦','⌁'][i]}</div><h3>{w.title}</h3><p>{w.date} · {w.time}</p><b>SCOPRI ↗</b></Link>)}</section>}

function Mercatino(){return <><PageHero kicker="DESIGN DA PORTARE VIA" title="MERCATINO" color="orange"><p>Illustrazione, editoria, moda e autoproduzioni.<br/>Direttamente da chi le crea.</p></PageHero><section className="market-intro"><div className="sticker">100%<br/>INDIPENDENTE</div><h2>Piccole produzioni,<br/><em>grandi idee.</em></h2><p>Una selezione di progetti indipendenti, pezzi unici e cose che ancora non sapevi di volere. Ingresso libero.</p></section><section className="marquee-big"><div>PRINT ✦ OBJECTS ✦ BOOKS ✦ TYPE ✦ </div></section><section className="makers"><div><span>40+</span><p>MAKER<br/>SELEZIONATI</p></div><div><span>3</span><p>GIORNI<br/>DI MERCATO</p></div><div><span>∞</span><p>COSE BELLE<br/>DA SCOPRIRE</p></div></section></>}

function Cameretta(){return <><PageHero kicker="DENTRO SUONA FORTE" title="CAMERETTA" color="blue"><p>La stanza più rumorosa del festival.<br/>Live, dj set e visual fino a tardi.</p></PageHero><section className="room"><div className="record"><div>DB</div></div><div className="room-copy"><div className="eyebrow">[ VOLUME ALTO ]</div><h2>Quando finiscono i talk, inizia la notte.</h2><p>Una line-up di suoni nuovi, selezioni imprevedibili e visual live. Entra, balla, resta quanto vuoi.</p><Link className="pill" to="/programma">Vedi la line-up ↗</Link></div></section><Ticker/></>}

function Shipping(){return <><PageHero kicker="SHOP INFO" title={<>SPEDIZIONI<br/>E RESI</>} color="cream"/><section className="legal"><h2>Spedizioni</h2><p>Prepariamo ogni ordine con cura. Gli ordini vengono elaborati in 2–3 giorni lavorativi e consegnati in Italia tramite corriere tracciato.</p><h2>Costi e tempi</h2><p>La spedizione standard costa €6. Per ordini superiori a €70 la spedizione è gratuita. Riceverai una mail con il codice di tracciamento appena il pacco partirà.</p><h2>Resi</h2><p>Puoi richiedere un reso entro 14 giorni dalla consegna. Il prodotto deve essere integro e nella confezione originale. Scrivici a <a href="mailto:shop@designbomb.it">shop@designbomb.it</a>.</p><h2>Hai bisogno di aiuto?</h2><p>Contattaci: rispondiamo dal lunedì al venerdì.</p></section></>}

function WorkshopDetail(){return <><section className="detail-hero"><Link to="/workshop">← TUTTI I WORKSHOP</Link><div className="detail-art"><span>✿</span></div><div><span className="tag">WORKSHOP</span><h1>Fiorisci.</h1><h2>Creative coding con p5</h2><p>Un laboratorio per scoprire il codice come strumento creativo e disegnare forme che crescono, cambiano, fioriscono.</p></div></section><section className="detail-info"><div><b>QUANDO</b><p>Sabato 19 ottobre<br/>10:00 — 13:00</p></div><div><b>DOVE</b><p>Laboratorio 1<br/>DumBO, Bologna</p></div><div><b>COSA SERVE</b><p>Porta il tuo laptop.<br/>Al resto pensiamo noi.</p></div><Link className="pill dark" to="/ticket">Prenota il workshop ↗</Link></section></>}

function InfoBand(){return <section className="info-band"><h2>CI VEDIAMO<br/>A BOLOGNA.</h2><div><b>DUMBO</b><p>Via Camillo Casarini 19<br/>40131 Bologna</p></div><div><b>ORARI</b><p>Ven 18 — 18:00 / 00:00<br/>Sab 19 — 10:00 / 01:00<br/>Dom 20 — 10:00 / 20:00</p></div></section>}
function Newsletter(){return <section className="newsletter"><Burst/><div><span>[ NIENTE SPAM, SOLO BOMBE ]</span><h2>RESTA NEL GIRO.</h2></div><form onSubmit={e=>e.preventDefault()}><input aria-label="La tua email" type="email" placeholder="LA TUA EMAIL" required/><button aria-label="Iscriviti">↗</button></form></section>}
function NotFound(){return <section className="notfound"><Burst/><h1>BOOM!</h1><p>Questa pagina è esplosa.</p><Link className="pill" to="/">Torna alla home</Link></section>}

function App(){return <BrowserRouter><Layout><Routes><Route path="/" element={<Home/>}/><Route path="/programma" element={<Programma/>}/><Route path="/ticket" element={<Ticket/>}/><Route path="/workshop" element={<Workshop/>}/><Route path="/mercatino" element={<Mercatino/>}/><Route path="/cameretta" element={<Cameretta/>}/><Route path="/spedizioni-e-resi" element={<Shipping/>}/><Route path="/fiorisci.-creative-coding-con-p5" element={<WorkshopDetail/>}/><Route path="*" element={<NotFound/>}/></Routes></Layout></BrowserRouter>}

createRoot(document.getElementById('root')).render(<App/>);
