import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset} from '../data';

const films=[
  {slug:'focused',name:'Focused',number:'01',accent:'#5d91aa',film:'/films/focused-campaign.mp4',poster:'/films/focused-poster.png',heroFilm:'/films/focused-emotion-video.mp4',heroPoster:'/films/focused-original-poster.png',kicker:'Clarity / Discipline / Deep work',hero:'When the noise leaves,<br/><em>you remain.</em>',heroCopy:'A quiet return to the one thing that deserves your full attention.',before:'Too many voices. Too many open loops.',after:'One clear intention.',beforeShort:'Scattered attention',intention:'Clear intention',title:'Attention is a form of presence.',story:'The world does not have to become quiet before you begin. Focused marks the shift from carrying every demand to choosing the one thing that matters now.',moment:'For the morning you need to come back to yourself.'},
  {slug:'energised',name:'Energised',number:'02',accent:'#536fc1',film:'/films/energised-campaign.mp4',poster:'/films/energised-poster.png',heroFilm:'/films/energised-emotion-video.mp4',heroPoster:'/films/energised-original-poster.png',kicker:'Energy / Momentum / Vitality',hero:'When stillness becomes<br/><em>forward.</em>',heroCopy:'The instant your body remembers that the day can still move with you.',before:'The day feels heavier than it has begun.',after:'The first real breath changes its direction.',beforeShort:'A heavy start',intention:'Forward energy',title:'Energy begins before speed.',story:'Energised is the feeling of saying yes to movement: the first step outside, the air against your face, the moment your energy stops waiting for permission.',moment:'For the morning that needs a beginning, not a push.'},
  {slug:'connected',name:'Connected',number:'03',accent:'#6d815b',film:'/films/connected-campaign.mp4',poster:'/films/connected-poster.png',heroFilm:'/films/connected-original-motion.mp4',heroPoster:'/films/connected-original-poster.png',kicker:'Harmony / Relationships / Belonging',hero:'When the day ends,<br/><em>presence begins.</em>',heroCopy:'Leave the weight of work at the door. Arrive for the person in front of you.',before:'He carries the whole day into the evening.',after:'A familiar face makes the moment lighter.',beforeShort:'Carrying the day',intention:'Fully present',title:'Connection begins with arrival.',story:'A difficult day can follow you everywhere. Connected is the small ritual between leaving work and meeting someone who matters—the breath, the reset, the choice to be fully there.',moment:'For the evening when being present means more than having the right words.'},
  {slug:'magnetized',name:'Magnetized',number:'04',accent:'#a6485d',film:'/films/magnetized-campaign.mp4',poster:'/films/magnetized-poster.png',heroFilm:'/films/magnetized-original-motion.mp4',heroPoster:'/films/magnetized-original-poster.png',kicker:'Confidence / Presence / Attraction',hero:'When you stop asking<br/><em>to be seen.</em>',heroCopy:'Presence becomes magnetic when it no longer needs to perform.',before:'One last moment of hesitation.',after:'Then her own presence becomes enough.',beforeShort:'Quiet hesitation',intention:'Own your presence',title:'Confidence can be quiet.',story:'Magnetized begins when you stop measuring yourself through the room and move through it as entirely your own. Quiet certainty becomes a presence people can feel.',moment:'For the night when you want to feel unmistakably yourself.'}
];

function EmotionFilm({film,className=''}){
  const videoRef=useRef(null);
  useEffect(()=>{
    const video=videoRef.current;
    if(!video)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){video.pause();return;}
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting)video.play().catch(()=>{});else video.pause();
    },{threshold:.28});
    observer.observe(video);
    return()=>observer.disconnect();
  },[]);
  return <video ref={videoRef} className={className} muted loop playsInline preload="metadata" poster={film.poster} aria-label={`${film.name} emotional short film`}><source src={film.film} type="video/mp4"/></video>;
}

export default function Home(){
  const [slide,setSlide]=useState(0);
  const [paused,setPaused]=useState(false);
  const heroVideo=useRef(null);
  const active=films[slide];

  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setPaused(preference.matches);
    update();
    preference.addEventListener('change',update);
    return()=>preference.removeEventListener('change',update);
  },[]);

  useEffect(()=>{
    const video=heroVideo.current;
    if(!video)return;
    if(paused)video.pause();else video.play().catch(()=>{});
  },[paused,slide]);

  return <div className="brand-home">
    <section className="brand-hero full-cover-hero" style={{'--identity':active.accent}} aria-label="Four Zanshin emotional identities">
      <div className="hero-editorial-copy">
        <span className="hero-eyebrow">Zanshin / {active.name}</span>
        <h1 dangerouslySetInnerHTML={{__html:active.hero}}/>
        <p>{active.heroCopy}</p>
        <Link className="hero-discover" to="/find-your-moment">Find your moment <span>↗</span></Link>
        <div className="hero-identity-note"><span>{active.number} / {active.name}</span><p>{active.heroCopy}</p></div>
      </div>
      <div className="hero-cinema">
        <video key={active.slug} ref={heroVideo} className="brand-hero-film" autoPlay={!paused} muted playsInline preload="metadata" poster={active.heroPoster} onEnded={()=>{if(!paused)setSlide(value=>(value+1)%films.length);}} aria-label={active.name+' — a Zanshin moment'}><source src={active.heroFilm} type="video/mp4"/></video>
        <div className="hero-cinema-caption"><span>THE ZANSHIN MOMENTS</span><span>{active.number} — 04</span></div>
      </div>
      <div className="brand-hero-nav">
        <div className="brand-hero-tabs">{films.map((film,index)=><button key={film.slug} className={slide===index?'active':''} aria-pressed={slide===index} onClick={()=>setSlide(index)} style={{'--tab-accent':film.accent}}><span>0{index+1}</span>{film.name}</button>)}</div>
        <button className="brand-motion" onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused?'Play films':'Pause films'}</button>
      </div>
    </section>

    <section className="brand-manifesto">
      <div className="brand-manifesto-mark">残心</div>
      <div className="brand-manifesto-copy">
        <span className="brand-kicker">Begin with the moment</span>
        <h2>Fragrance is not the story.<br/><em>You are.</em></h2>
        <p>Zanshin begins before the bottle—with the weight you are carrying, the person you are becoming, and the feeling you want to take into what comes next.</p>
      </div>
      <div className="brand-manifesto-note"><span>Our belief</span><p>Scent can become a private cue: pause, breathe, choose how you enter the moment.</p></div>
    </section>

    <section className="brand-film-intro" id="brand-films">
      <span className="brand-kicker">Four short films / four inner shifts</span>
      <h2>Four emotional identities.<br/><em>Four ways to return to yourself.</em></h2>
      <p>Each Zanshin identity begins with a real human tension and follows the quiet shift that changes what happens next.</p>
    </section>

    <div className="brand-film-series">
      {films.map((film,index)=><section className={`film-chapter ${index%2?'film-reverse':''}`} id={film.slug} key={film.slug} style={{'--identity':film.accent}}>
        <div className="film-media"><EmotionFilm film={film}/><div className="film-grain"/><span className="film-duration">Zanshin film / 00:10</span><span className="film-play-mark" aria-hidden="true">▶</span></div>
        <div className="film-copy">
          <span className="brand-kicker">{film.number} / {film.kicker}</span>
          <h2>{film.title}</h2>
          <div className="film-shift"><div><small>Before</small><strong>{film.before}</strong></div><span>→</span><div><small>The shift</small><strong>{film.after}</strong></div></div>
          <p>{film.story}</p>
          <blockquote>{film.moment}</blockquote>
          <Link className="brand-text-link" to={`/collection/${film.slug}`}>Discover the {film.name} identity ↗</Link>
        </div>
      </section>)}
    </div>

    <section className="brand-memory">
      <div className="brand-memory-heading"><span className="brand-kicker">Why scent can stay</span><h2>Some moments pass.<br/><em>Some become part of us.</em></h2></div>
      <div className="brand-memory-grid">
        <article><span>01</span><h3>Emotional</h3><p>Scent is closely tied to emotion. Zanshin stories begin with a feeling, because that is often where memory begins.</p></article>
        <article><span>02</span><h3>Vivid</h3><p>A familiar scent can bring back the texture of a place, a person or an evening with unusual clarity.</p></article>
        <article><span>03</span><h3>Personal</h3><p>The same fragrance can hold a different meaning for every person. The moment completes it.</p></article>
      </div>
    </section>

    <section className="brand-invitation">
      <div className="brand-invitation-film"><EmotionFilm film={films[2]}/></div>
      <div className="brand-invitation-copy"><span className="brand-kicker">Your story starts here</span><h2>What do you need<br/><em>from this moment?</em></h2><p>Begin with the way you want to feel when you arrive. Your purpose, mood and occasion lead the experience.</p><Link className="brand-primary light" to="/find-your-moment">Begin the experience <span>↗</span></Link></div>
    </section>

    <section className="identity-index">
      <div className="identity-index-head"><span className="brand-kicker">The Zanshin identities</span><h2>Choose the feeling.<br/><em>Meet the fragrance after.</em></h2><Link className="brand-text-link" to="/collection">Explore all four identities ↗</Link></div>
      <div className="identity-grid">{films.map((film,index)=><Link to={`/collection/${film.slug}`} className="identity-card" key={film.slug} style={{'--identity':film.accent}}><EmotionFilm film={film} className="identity-card-film"/><div><span>0{index+1}</span><h3>{film.name}</h3><p>{film.kicker}</p></div></Link>)}</div>
    </section>

    <section className="brand-closing">
      <img src={asset('zanshin-logo-full.png')} alt="Zanshin — Begin with the Moment"/>
      <p>A presence that does not end when the moment does.</p>
      <Link className="brand-text-link" to="/our-story">Read the Zanshin philosophy ↗</Link>
    </section>
  </div>;
}
