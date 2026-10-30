import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset,fallbackProducts} from '../data';
import {fragranceDirection} from '../brandDirection';
import './BrandStoryEditorial.css';

const philosophy=[
 {name:'Ensō',jp:'円相',caption:'The moment, complete.',title:'Nothing to perfect. Everything to feel.',copy:'A single brushstroke. An open circle. In Zen, Ensō embraces the beauty of a moment as it is: imperfect, present and complete.',second:'Its stroke holds movement; the space within it holds stillness. Together, they remind us that being fully there can be enough.',note:'Our foundation: presence, before perfection.',art:'enso-home/enso-story-direction-v3.webp',alt:'An open dark teal Ensō brushstroke above a Japanese mountain lake'},
 {name:'Zanshin',jp:'残心',caption:'What remains.',title:'The moment passes. Its feeling stays.',copy:'In Japanese martial traditions, Zanshin describes the awareness that continues after an action is complete. Zan: what remains. Shin: the heart, the mind.',second:'We see a connection in fragrance. The conversation ends, the evening becomes a memory, yet something of how it felt stays with you.',note:'Our expression: capture the moment. Carry it with you.',art:'enso-home/landscape-connected.webp',alt:'A misty Japanese landscape with pine trees and a quiet river'}
];

export default function BrandStory(){
 const page=useRef(null),tabs=useRef([]);
 const [chapter,setChapter]=useState(0);
 const current=philosophy[chapter];
 useEffect(()=>{
  const items=page.current.querySelectorAll('[data-story-reveal]');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(el=>el.classList.add('is-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  items.forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 function moveTab(event){
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  const next=event.key==='Home'?0:event.key==='End'?1:1-chapter;
  setChapter(next);tabs.current[next]?.focus();
 }
 return <div className="zs-story" ref={page}>
  <section className="zs-opening" id="story-top" aria-labelledby="zs-story-title">
   <img className="zs-opening-art" src={asset('enso-home/story-promise-sunrise.webp')} alt="Mount Fuji at sunrise, seen through a Japanese veranda with cherry blossoms" fetchPriority="high"/>
   <div className="zs-opening-copy">
    <span className="zs-kicker">Our story / Begin with the moment</span>
    <h1 id="zs-story-title">The moment<br/>is yours.<br/><em>The feeling stays.</em></h1>
    <p>Before a fragrance, there is a feeling.<br/>A little clarity. A spark of possibility.<br/>A moment that feels like you.</p>
    <Link className="zs-link" to="#story-origin">Where it all began <span aria-hidden="true">↘</span></Link>
   </div>
   <span className="zs-opening-seal" lang="ja" aria-label="Zanshin">残心</span>
   <div className="zs-opening-foot"><span>A Japanese inspiration. A personal expression.</span><span>01 — 04 / A story of presence</span></div>
  </section>

  <nav className="zs-chapters" aria-label="Explore our story">
   {[['origin','01','The beginning'],['enlightenment','02','A different question'],['enso','03','Ensō to Zanshin'],['fragrance','04','Your expression']].map(([id,n,label])=><Link key={id} to={'#story-'+id}><span>{n}</span>{label}<b aria-hidden="true">↓</b></Link>)}
  </nav>

  <section className="zs-origin zs-wrap" id="story-origin" aria-labelledby="zs-origin-title">
   <header className="zs-origin-heading" data-story-reveal>
    <span className="zs-kicker">01 / The beginning</span>
    <h2 id="zs-origin-title">We went looking.<br/><em>We learned to notice.</em></h2>
   </header>
   <div className="zs-origin-layout">
    <figure className="zs-origin-main" data-story-reveal><img src={asset('story-v2/kyoto-street.jpg')} alt="A quiet historic street lined with traditional wooden buildings in Kyoto" loading="lazy"/><figcaption>Japan / Beauty in the everyday</figcaption></figure>
    <div className="zs-origin-notes" data-story-reveal>
     <p className="zs-intro">Our answer took us to the Land of the Rising Sun.</p>
     <p>Our team's experiences in Japanese companies and travels across Japan drew us to a way of living rooted in presence, simplicity and the beauty of imperfection.</p>
     <p>A quiet ritual. A considered detail. Space to pause. We began to notice how these small things could change the feeling of an ordinary day.</p>
     <figure><img src={asset('story-v2/shoji-room.jpg')} alt="Soft daylight falling through shoji screens in a Japanese room" loading="lazy"/><figcaption>The little things are never little.</figcaption></figure>
    </div>
   </div>
  </section>

  <section className="zs-question" id="story-enlightenment" aria-labelledby="zs-question-title">
   <div className="zs-wrap" data-story-reveal>
    <div className="zs-question-top"><span className="zs-kicker">02 / A different question</span><span className="zs-question-jp" aria-hidden="true">心</span></div>
    <h2 id="zs-question-title">So we changed where<br/><em>fragrance begins.</em></h2>
    <div className="zs-question-compare"><p><span>The familiar question</span>“What does it smell like?”</p><p><span>Our starting point</span>“How do you want to feel?”</p></div>
    <p className="zs-question-note">Before an important meeting, you might want clarity. After a long week, you might want to reconnect. We start there — with the person, the intention and the moment. A more human, intuitive and personal way to choose fragrance.</p>
   </div>
  </section>

  <section className="zs-philosophy zs-wrap" id="story-enso" aria-labelledby="zs-philosophy-title">
   <header className="zs-section-heading" data-story-reveal><div><span className="zs-kicker">03 / The philosophy behind the feeling</span><h2 id="zs-philosophy-title">From a single stroke<br/><em>to something that stays.</em></h2></div><p>Two ideas from Japan.<br/>One way of seeing the moment.</p></header>
   <div className="zs-philosophy-frame" data-story-reveal>
    <div className={`zs-philosophy-art ${chapter===0?'is-enso':''}`}><img key={current.art} src={asset(current.art)} alt={current.alt} loading="lazy"/><span className="zs-art-caption">{current.jp} / {current.name.toUpperCase()}</span></div>
    <div className="zs-philosophy-reading">
     <div className="zs-tabs" role="tablist" aria-label="Read the philosophy" onKeyDown={moveTab}>{philosophy.map((item,i)=><button key={item.name} ref={el=>tabs.current[i]=el} id={'zs-tab-'+i} type="button" role="tab" aria-selected={chapter===i} aria-controls={'zs-panel-'+i} tabIndex={chapter===i?0:-1} onClick={()=>setChapter(i)}><span lang="ja">{item.jp}</span>{item.name}<span aria-hidden="true">↗</span></button>)}</div>
     {philosophy.map((item,i)=><div className="zs-reading-panel" key={item.name} id={'zs-panel-'+i} role="tabpanel" aria-labelledby={'zs-tab-'+i} hidden={chapter!==i} tabIndex={0}>
      <span className="zs-kicker">{item.caption}</span><h3>{item.title}</h3><p>{item.copy}</p><p>{item.second}</p><div className="zs-reading-note">{item.note}</div>
     </div>)}
    </div>
   </div>
  </section>

  <section className="zs-expressions" id="story-fragrance" aria-labelledby="zs-expressions-title">
   <div className="zs-wrap">
    <header className="zs-section-heading" data-story-reveal><div><span className="zs-kicker">04 / Made personal</span><h2 id="zs-expressions-title">One philosophy.<br/><em>Four ways to feel it.</em></h2></div><p>Fragrance becomes part of the moment.<br/>Choose the intention you want to carry.</p></header>
    <div className="zs-expression-grid">{fallbackProducts.map(p=><Link data-story-reveal className="zs-expression" key={p.slug} to={'/collection/'+p.slug} style={{'--expression-color':p.color}}><div className="zs-expression-image"><img src={asset('enso-home/landscape-'+p.slug+'.webp')} alt={fragranceDirection[p.slug].setting} loading="lazy"/><span>{fragranceDirection[p.slug].shift}</span></div><div className="zs-expression-label"><h3>{p.name}</h3><span aria-hidden="true">↗</span></div><p>{p.mood}</p></Link>)}</div>
   </div>
  </section>

  <section className="zs-closing zs-wrap" id="story-closing" aria-labelledby="zs-closing-title">
   <div className="zs-closing-copy" data-story-reveal><span className="zs-kicker">Our promise to the moment</span><h2 id="zs-closing-title">Be here.<br/>Be yourself.<br/><em>Begin with the moment.</em></h2><p>A fragrance doesn't need to take over.<br/>Just become a little part of what makes it yours.</p><Link className="zs-button" to="/collection">Explore Zanshin <span aria-hidden="true">→</span></Link></div>
   <div className="zs-closing-visual" data-story-reveal><img className="zs-closing-garden" src={asset('enso-home/landscape-magnetized.webp')} alt="Warm sunset over a Japanese mountain lake" loading="lazy"/><img className="zs-closing-bottle" src={asset('story-v2/magnetized-bottle-v2.webp')} alt="Zanshin Magnetized, Extrait de Parfum, 51 ml" loading="lazy"/><span>残心 / A feeling to carry with you.</span></div>
  </section>
 </div>;
}
