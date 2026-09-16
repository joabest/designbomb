import React, {useEffect, useMemo, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const routeFiles = {
  '/': 'index.html',
  '/programma': 'programma.html',
  '/ticket': 'ticket.html',
  '/workshop': 'workshop.html',
  '/mercatino': 'mercatino.html',
  '/cameretta': 'cameretta.html',
  '/spedizioni-e-resi': 'spedizioni-e-resi.html',
  '/fiorisci.-creative-coding-con-p5': 'fiorisci.-creative-coding-con-p5.html',
};

function normalizePath(pathname){
  const p = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  return routeFiles[p] || routeFiles[p.toLowerCase()] || 'index.html';
}

function MirrorPage(){
  const frame = useRef(null);
  const file = useMemo(() => normalizePath(location.pathname), []);
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;
    const onLoad = () => {
      try {
        const doc = iframe.contentDocument;
        doc.addEventListener('click', (e) => {
          const a = e.target.closest?.('a');
          if (!a) return;
          const href = a.getAttribute('href');
          if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/i.test(href)) return;
          const clean = href.split('#')[0].replace(/^\.\//,'').replace(/\.html$/,'');
          const target = clean === 'index' || clean === '' ? '/' : '/' + clean;
          if (routeFiles[target]) {
            e.preventDefault();
            location.href = target + (href.includes('#') ? '#' + href.split('#')[1] : '');
          }
        }, true);
      } catch {}
    };
    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, []);
  return <iframe ref={frame} title="Design Bomb" className="site-frame" src={`/mirror/www.designbomb.it/${file}${location.hash || ''}`} />;
}

createRoot(document.getElementById('root')).render(<MirrorPage/>);
