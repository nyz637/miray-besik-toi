import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { event } from './config/event';
import './styles.css';

function Ornament({className = ''}) {
  return <svg className={`ornament ${className}`} viewBox="0 0 200 40" fill="none" aria-hidden="true"><path d="M0 20h45c25 0 22-24 8-16-11 6 5 25 22 16L100 5l25 15c17 9 33-10 22-16-14-8-17 16 8 16h45M50 30h25l25-15 25 15h25M90 20l10 13 10-13" stroke="currentColor" strokeWidth="1.3"/><circle cx="100" cy="5" r="3" fill="currentColor"/></svg>;
}

function Flowers({className = ''}) {
  return <svg className={`flowers ${className}`} viewBox="0 0 340 440" fill="none" aria-hidden="true"><defs><radialGradient id="petal"><stop stopColor="#fffefa"/><stop offset=".66" stopColor="#f6eee6"/><stop offset="1" stopColor="#ddc9b8"/></radialGradient><linearGradient id="leaf"><stop stopColor="#9c9e7d"/><stop offset="1" stopColor="#d8d5ba"/></linearGradient></defs><g stroke="#b7ac87" strokeWidth="2"><path d="M60 440Q240 270 190 50M65 420Q60 250 290 165M85 400Q240 340 310 275"/></g>{[[175,100,-30],[245,190,35],[120,260,-50],[260,310,50],[75,350,-35]].map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx="16" ry="47" fill="url(#leaf)" transform={`rotate(${r} ${x} ${y})`}/>)}{[[155,105,1],[235,220,.83],[106,302,1.05],[285,330,.65]].map(([x,y,s],i)=><g key={i} transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({length:9},(_,j)=><ellipse key={j} cy="-22" rx="20" ry="35" fill="url(#petal)" stroke="#e4d7c9" strokeWidth=".6" transform={`rotate(${j*40})`}/>)}{Array.from({length:6},(_,j)=><ellipse key={j} cy="-10" rx="12" ry="22" fill="url(#petal)" transform={`rotate(${j*60+20})`}/>)}<circle r="7" fill="#d9ba7e"/></g>)}</svg>;
}

function Cradle({mini = false}) {
  return <svg className={`cradle ${mini?'mini':''}`} viewBox="0 0 400 270" role="img" aria-label="Дәстүрлі қазақ бесігі"><defs><linearGradient id="wood" x2="1" y2="1"><stop stopColor="#e9d4a5"/><stop offset=".45" stopColor="#b98b4c"/><stop offset="1" stopColor="#76522f"/></linearGradient><linearGradient id="blanket" x2="0" y2="1"><stop stopColor="#fffaf2"/><stop offset="1" stopColor="#ddbbb0"/></linearGradient></defs><ellipse cx="200" cy="243" rx="145" ry="12" fill="#7e5731" opacity=".12"/><g fill="none" stroke="url(#wood)" strokeLinecap="round"><path d="M64 228Q200 271 336 228M90 220V77Q90 54 111 54H289Q310 54 310 77V220" strokeWidth="12"/><path d="M104 210V95M296 210V95M91 182H310M120 91Q200 32 280 91" strokeWidth="7"/></g><path d="M109 135Q200 112 291 135L282 192Q200 212 118 192Z" fill="url(#blanket)" stroke="#cda97b" strokeWidth="2"/><path d="M154 129v69M245 129v69" stroke="#c8a46b" strokeWidth="5"/><path d="M170 154l30-19 30 19-30 23Z" fill="none" stroke="#bb9157"/><path d="M187 155l13-9 13 9-13 9Z" fill="#d6b980"/><path d="M110 111Q200 67 290 111" fill="none" stroke="#f7e6c6" strokeWidth="3"/><g fill="#f6e4c4">{[120,150,180,210,240,270].map((x,i)=><circle key={x} cx={x} cy={95-Math.sin(i/5*Math.PI)*13} r="3"/>)}</g></svg>;
}

function Chest({opening}) {
  return <div className={`chest-stage ${opening?'opening':''}`} aria-hidden="true"><div className="rays"/><div className="rising-card"><Ornament/><span>Мирайдың</span><strong>бесік тойы</strong><Ornament/></div><div className="little-cradle"><Cradle mini/></div><div className="chest"><div className="chest-interior"/><div className="chest-lid"><div className="lid-top"><Ornament/><span>Мирай</span><Ornament/></div><div className="lid-edge"/></div><div className="chest-side"/><div className="chest-front"><div className="chest-border"><Ornament/><div className="lock">✧</div><Ornament/></div></div><div className="foot left"/><div className="foot right"/></div><div className="chest-shadow"/>{Array.from({length:14},(_,i)=><i key={i} className="spark" style={{'--i':i,'--x':`${18+i*5}%`}}/>)}</div>;
}

function Intro({onOpen, startMusic}) {
  const [opening,setOpening]=useState(false);
  useEffect(()=>{if(!opening)return;const timer=setTimeout(onOpen,window.matchMedia('(prefers-reduced-motion: reduce)').matches?350:7200);return()=>clearTimeout(timer)},[opening,onOpen]);
  return <div className={`intro ${opening?'is-opening':''}`}><Flowers className="intro-flowers left-flowers"/><Flowers className="intro-flowers right-flowers"/><div className="intro-top"><span className="eyebrow">АҚ ТІЛЕКПЕН ШАҚЫРАМЫЗ</span><Ornament/></div><Chest opening={opening}/><div className="intro-bottom"><p>Кішкентай жүрек. Үлкен қуаныш.</p><button className="gold-button" disabled={opening} onClick={()=>{startMusic();setOpening(true)}}>{opening?'Ақ тілектерге жол ашылсын…':'Шақыруды ашу'} <span>✧</span></button><span className="intro-note" role="status">{opening?'Мирайдың қуанышына қош келдіңіз!':'Сізге арналған ерекше шақыру'}</span></div><span className="corner-mark">М</span></div>;
}

function Countdown({date}) {
  const [now,setNow]=useState(Date.now());
  useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(t)},[]);
  const remaining=Math.max(0,new Date(date).getTime()-now);
  if(!remaining)return <p className="event-today">Қуанышты күніміз келді!</p>;
  return <div className="countdown" aria-label="Тойға дейін қалған уақыт">{[[Math.floor(remaining/86400000),'күн'],[Math.floor(remaining/3600000)%24,'сағат'],[Math.floor(remaining/60000)%60,'минут'],[Math.floor(remaining/1000)%60,'секунд']].map(([n,label])=><div key={label}><strong>{String(n).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>;
}

function EventDetails() {
  const validDate=event.date && Number.isFinite(new Date(event.date).getTime());
  const mapUrl=event.address?(event.twoGisUrl && /^https:\/\/(?:[\w-]+\.)?2gis\.(?:kz|com|ru)\//.test(event.twoGisUrl)?event.twoGisUrl:`https://2gis.kz/search/${encodeURIComponent(event.address)}`):null;
  return <section className="details reveal" aria-labelledby="details-title"><span className="eyebrow">ҚУАНЫШТЫ КЕЗДЕСУ</span><h2 id="details-title">Ақ дастархан басында</h2><Ornament/>{validDate||event.time||event.address||event.venue?<div className="event-grid">{validDate&&<div><span className="detail-label">Күні</span><p>{new Intl.DateTimeFormat('kk-KZ',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Almaty'}).format(new Date(event.date))}</p></div>}{event.time&&<div><span className="detail-label">Уақыты</span><p>{event.time}</p></div>}{(event.venue||event.address)&&<div><span className="detail-label">Мекенжайы</span><p>{event.venue}</p>{event.address&&<p>{event.address}</p>}</div>}</div>:<p className="muted">Тойдың өтетін күні, уақыты мен мекенжайын<br/>жақын арада хабарлаймыз.</p>}{validDate&&<Countdown date={event.date}/>} {mapUrl&&<a className="outline-button" href={mapUrl} target="_blank" rel="noreferrer">2GIS картасынан ашу ↗</a>}</section>;
}

function Rsvp() {
  const [status,setStatus]=useState('idle');
  const active=typeof event.onRsvp==='function';
  async function submit(e){e.preventDefault();if(!active||status==='sending')return;setStatus('sending');const data=new FormData(e.currentTarget);try{await event.onRsvp(Object.fromEntries(data));setStatus('success')}catch{setStatus('error')}}
  return <section className="rsvp reveal" aria-labelledby="rsvp-title"><span className="eyebrow">СІЗДІ АСЫҒА КҮТЕМІЗ</span><h2 id="rsvp-title">Қатысуыңызды растаңыз</h2><Ornament/><form onSubmit={submit}><label htmlFor="name">Аты-жөніңіз</label><input id="name" name="name" autoComplete="name" placeholder="Аты-жөніңізді жазыңыз" required maxLength={120}/><fieldset><legend>Тойға қатысасыз ба?</legend><label className="radio"><input type="radio" name="attendance" value="yes" required/> Қатысамын</label><label className="radio"><input type="radio" name="attendance" value="no"/> Қатыса алмаймын</label></fieldset><label htmlFor="wish">Тілек <span>(міндетті емес)</span></label><textarea id="wish" name="wish" rows="3" maxLength={2000} placeholder="Мирайға ақ тілегіңіз…"/>{active?<button className="gold-button" disabled={status==='sending'||status==='success'}>{status==='sending'?'Жіберілуде…':'Жауапты жіберу'}</button>:<p className="form-note">Қатысуды растау жақын арада қолжетімді болады.<br/>Жауаптарыңыз әзірге жіберілмейді.</p>}<p role="status">{status==='success'?'Жауабыңыз қабылданды. Рақмет!':status==='error'?'Жауап жіберілмеді. Қайта көріңіз.':''}</p></form></section>;
}

function App(){
  const [opened,setOpened]=useState(false);
  const [playing,setPlaying]=useState(false);
  const [hasMusic,setHasMusic]=useState(false);
  const audio=useRef(null);
  useEffect(()=>{let live=true;fetch(event.musicUrl,{method:'HEAD'}).then(r=>{if(live)setHasMusic(r.ok && /audio|octet-stream/i.test(r.headers.get('content-type')||''))}).catch(()=>{});return()=>{live=false}},[]);
  function startMusic(){if(!hasMusic)return;audio.current?.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}
  useEffect(()=>{if(!opened)return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[opened]);
  useEffect(()=>{document.body.style.overflow=opened?'':'hidden';return()=>{document.body.style.overflow=''}},[opened]);
  return <><audio ref={audio} loop preload="none" onError={()=>{setPlaying(false);setHasMusic(false)}}/>{hasMusic&&<MusicSource audio={audio}/>} {!opened?<Intro onOpen={()=>setOpened(true)} startMusic={startMusic}/>:<><a className="skip-link" href="#invitation">Шақыру мәтініне өту</a><main><header className="hero"><Flowers className="hero-flowers left-flowers"/><Flowers className="hero-flowers right-flowers"/><span className="eyebrow">БІР ӘУЛЕТТІҢ БАҚЫТЫ · БІР СӘБИДІҢ ҚУАНЫШЫ</span><div className="hero-medallion">М</div><Ornament/><h1>Мирайдың<span>бесік тойы</span></h1><p className="hero-subtitle">Ақ бесік. Ақ тілек. Аяулы Мирай.</p><a className="scroll-cue" href="#invitation" aria-label="Шақыруды оқу">↓</a><span className="hero-bottom">ӨМІРГЕ КЕЛГЕН ӘР СӘБИ — БІР ӘЛЕМНІҢ ЖАРЫҒЫ</span></header><section id="invitation" className="invitation reveal"><span className="eyebrow">ЖҮРЕКТЕН ШЫҚҚАН ШАҚЫРУ</span><h2>Қадірлі қонағымыз!</h2><Ornament/><p className="salutation">Құрметті ағайын-туыс,<br/>құда-жекжат, дос-жаран!</p><p>Сіздерді аяулы Мирайымыздың бесік тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!</p><p>Қуанышымызға ортақ болып,<br/>ақ тілектеріңізді арнауға келіңіздер!</p><span className="small-flower">✧</span></section><section className="hosts reveal"><span className="eyebrow">ІЗГІ НИЕТПЕН</span><h2>Той иелері</h2><div className="hosts-names"><div><span className="detail-label">Ата-әжесі</span><h3>Медет <em>–</em> Анаргүл</h3></div><Ornament/><div><span className="detail-label">Әке-анасы</span><h3>Темірбек <em>–</em> Дильназ</h3></div></div></section><section className="cradle-section reveal"><div className="cradle-halo"><Cradle/></div><span className="eyebrow">ӘЛДИ, ӘЛДИ, АҚ БӨПЕМ</span><h2>Ақ бесік — ақ бата</h2><p>Ақ бесікке бөленген Мирайымыздың<br/>қуанышына ортақ болыңыздар!</p><Ornament/></section><EventDetails/><Rsvp/><footer><Ornament/><h2>Тойда жүздескенше!</h2><p>Ізгі тілекпен, Мирайдың отбасы</p><span className="footer-monogram">М</span></footer></main><div className="petals" aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i} style={{'--i':i}}/>)}</div></>}{hasMusic&&<button className="music-button" aria-label={playing?'Музыканы өшіру':'Музыканы қосу'} aria-pressed={playing} onClick={()=>{if(playing){audio.current.pause();setPlaying(false)}else startMusic()}}>{playing?'♫':'♪'}<span className={playing?'sound-wave':''}/></button>}</>;
}
function MusicSource({audio}){useEffect(()=>{if(audio.current)audio.current.src=event.musicUrl},[audio]);return null}

createRoot(document.getElementById('root')).render(<App/>);
