import ProductPack from '../components/ProductPack';
import {fallbackProducts} from '../data';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset} from '../data';

const moments=[
 {slug:'focused',name:'Focused',tone:'#718a93',word:'Clarity',title:'A little quieter.\nA little more you.',copy:'Make space for the thought, the craft, the moment that deserves your attention.',story:'A quiet morning. An open notebook. One thing worth giving your attention to. Meet a fragrance identity made for the moments you choose to be fully here.',occasion:'Slow mornings · Deep work · Your own company',alt:'A man writing thoughtfully in a sunlit studio',position:'70% center'},
 {slug:'energised',name:'Energised',tone:'#6b8590',word:'Possibility',title:'A fresh breath.\nA new beginning.',copy:'For open windows, unhurried first steps and the possibility of a new day.',story:'Step outside the familiar. Feel the air, take the longer route and welcome whatever comes next. Energised is an invitation to meet your day with a fresh sense of possibility.',occasion:'First light · New places · Days in motion',alt:'A woman enjoying the breeze on a bright coastal terrace',position:'70% center'},
 {slug:'connected',name:'Connected',tone:'#7c896e',word:'Belonging',title:'Less of the day.\nMore of this moment.',copy:'Set the day down. Make room for a familiar face, an easy laugh, a little closeness.',story:'The laptop closes. The conversation begins. A small fragrance ritual marks the space between a busy day and time with someone who matters. Arrive as yourself. Stay for the moment.',occasion:'Easy evenings · Shared tables · People you love',alt:'A couple sharing an affectionate moment across a terrace table',position:'72% center'},
 {slug:'magnetized',name:'Magnetized',tone:'#a27d7d',word:'Self-assurance',title:'Quiet confidence.\nAn unmistakable you.',copy:'For the moments you arrive comfortably, completely, as yourself.',story:'An invitation, a favourite dress, a moment to yourself before you leave. Magnetized celebrates a presence that feels natural: expressive, assured and entirely your own.',occasion:'Gallery afternoons · Dinner dates · Your next entrance',alt:'A confident woman in dusty rose silk in a daylight gallery',position:'70% center'}
];
const photo=slug=>`/assets/editorial/${slug}.webp`;
const Arrow=()=> <span aria-hidden="true">↗</span>;

export default function Home(){
 const [slide,setSlide]=useState(0),[paused,setPaused]=useState(false),[hovered,setHovered]=useState(false);
 const active=moments[slide];
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'); const update=()=>setPaused(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{if(paused||hovered)return;const timer=setInterval(()=>{if(!document.hidden)setSlide(s=>(s+1)%moments.length);},7000);return()=>clearInterval(timer);},[paused,hovered,slide]);
 return <div className="quiet-home">
  <section className="quiet-hero" aria-label="Zanshin moments" aria-roledescription="carousel" onFocusCapture={()=>setHovered(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHovered(false);}} style={{'--moment-tone':active.tone}}>
   <div className="quiet-hero-images">{moments.map((m,i)=><img key={m.slug} src={photo(m.slug)} alt={i===slide?m.alt:''} aria-hidden={i!==slide} className={i===slide?'is-current':''} fetchPriority={i===0?'high':'auto'} loading={i===0?'eager':'lazy'} style={{objectPosition:m.position}}/>)}</div>
   <div className="quiet-hero-shade"/>
   <div className="quiet-hero-copy">
    <span className="quiet-eyebrow">Zanshin · Begin with the moment</span>
    <p className="quiet-identity">0{slide+1} / {active.name}</p>
    <h1>{active.title.split('\n')[0]}<br/><em>{active.title.split('\n')[1]}</em></h1>
    <p className="quiet-lead">{active.copy}</p>
    <Link className="quiet-button" to={`/collection/${active.slug}`}>Discover {active.name}<Arrow/></Link>
   </div>
   <div className="quiet-hero-controls">
    <div className="quiet-tabs" aria-label="Choose a fragrance moment">{moments.map((m,i)=><button key={m.slug} onClick={()=>setSlide(i)} aria-pressed={slide===i} aria-label={`Show ${m.name} slide`} className={slide===i?'selected':''}><span className="slider-dot"/></button>)}</div>
    <button className="quiet-pause" onClick={()=>setPaused(p=>!p)} aria-label={paused?'Resume slideshow':'Pause slideshow'}>{paused?'Play':'Pause'} <span aria-hidden="true">{paused?'▷':'Ⅱ'}</span></button>
   </div>
  </section>
  <section className="quiet-philosophy quiet-section">
   <span className="quiet-eyebrow">The Zanshin philosophy</span>
   <h2>A scent for the way you feel.<br/><em>A presence that stays with you.</em></h2>
   <p>Fragrance is a personal ritual. A pause before the day. A way to arrive. Zanshin begins with how you want to feel, and the moments you want to make your own.</p>
   <Link className="quiet-link" to="/our-story">Our story <Arrow/></Link>
  </section>
  <section className="signature-collection quiet-section"><div className="quiet-section-heading"><div><span className="quiet-eyebrow">The signature collection</span><h2>Four expressions.<br/><em>One unmistakable presence.</em></h2></div><Link className="quiet-link" to="/collection">Explore the collection <Arrow/></Link></div><div className="signature-grid">{fallbackProducts.map((p,i)=><Link className="signature-card" to={`/collection/${p.slug}`} key={p.slug} style={{'--sku':p.color}}><ProductPack product={p} index={i}/><div><h3>{p.name}</h3><p>{p.descriptor}</p><span>Discover the fragrance &rarr;</span></div></Link>)}</div><p className="pack-note">Bottle and carton presentation concepts using the supplied fragrance labels. Final packaging may vary.</p></section>
  <section className="quiet-discover quiet-section">
   <div className="quiet-section-heading"><div><span className="quiet-eyebrow">Begin with a feeling</span><h2>What feels like <em>you, today?</em></h2></div><Link className="quiet-link" to="/find-your-moment">Find your moment <Arrow/></Link></div>
   <div className="quiet-mood-grid">{moments.map((m,i)=><Link className="quiet-mood" to={`/collection/${m.slug}`} key={m.slug}><div className="quiet-mood-photo"><img src={photo(m.slug)} alt={m.alt} loading="lazy" style={{objectPosition:m.position}}/><span>0{i+1} / {m.word}</span></div><div className="quiet-mood-label"><h3>{m.name}</h3><Arrow/></div></Link>)}</div>
  </section>
  <section className="quiet-finder quiet-section"><div><span className="quiet-eyebrow">A fragrance, on your terms</span><h2>Your mood.<br/>Your moment.<br/><em>Your Zanshin.</em></h2></div><div><p>Start with who you want to be and where the day is taking you. A few thoughtful questions will help you meet your fragrance.</p><Link className="quiet-button" to="/find-your-moment">Find my fragrance <Arrow/></Link><span className="quiet-finder-note">A small pause. A personal discovery.</span></div></section>
  <div className="quiet-chapters">{moments.map((m,i)=><section className={`quiet-chapter ${i%2?'reverse':''}`} key={m.slug} style={{'--moment-tone':m.tone}}><div className="quiet-chapter-image"><img src={photo(m.slug)} alt={m.alt} loading="lazy" style={{objectPosition:m.position}}/></div><div className="quiet-chapter-copy"><span className="quiet-eyebrow">0{i+1} / {m.word}</span><h2>{m.name}</h2><p className="quiet-chapter-intro">{m.copy}</p><p>{m.story}</p><span className="quiet-occasions">{m.occasion}</span><Link className="quiet-link" to={`/collection/${m.slug}`}>Explore {m.name}<Arrow/></Link></div></section>)}</div>
  <section className="quiet-gifting quiet-section"><div className="quiet-gift-art"><img src={asset('connected-carton-full.webp')} alt="Full Zanshin Connected presentation carton" loading="lazy"/></div><div><span className="quiet-eyebrow">Something personal</span><h2>A little discovery.<br/><em>A thoughtful gesture.</em></h2><p>Meet the collection at your own pace, or find a fragrance for someone whose moments you know by heart.</p><Link className="quiet-link" to="/discovery-gifting">Discovery & gifting <Arrow/></Link></div></section>
  <section className="quiet-community quiet-section"><div className="quiet-section-heading"><div><span className="quiet-eyebrow">The moments we share</span><h2>A world of <em>personal rituals.</em></h2></div><Link className="quiet-link" to="/community">Meet the community <Arrow/></Link></div><div className="quiet-community-grid"><Link to="/journal"><span>01 / The journal</span><h3>A moment to read.</h3><p>Explore fragrance, intention and the art of making a ritual your own.</p><Arrow/></Link><Link to="/how-to-buy"><span>02 / Your guide</span><h3>A little guidance.</h3><p>Get to know the collection and find your way to a fragrance that feels personal.</p><Arrow/></Link><Link to="/contact"><span>03 / A conversation</span><h3>We’re here for you.</h3><p>Questions about your fragrance or your order? Begin a conversation with us.</p><Arrow/></Link></div></section>
  <section className="quiet-closing"><img src={asset('zanshin-logo-full.png')} alt="Zanshin — Begin with the moment" loading="lazy"/><p>Be here. Be yourself.</p><Link className="quiet-link" to="/collection">Explore Zanshin <Arrow/></Link></section>
 </div>;
}
