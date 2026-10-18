import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset} from '../data';
import {useStore} from '../context/StoreContext';
import LabelPack from './LabelPack';
import BookmarkArtwork from './BookmarkArtwork';
import {fragranceDirection} from '../brandDirection';
const names=['Your Moment','Fragrance','Ensō Shift'];
function MomentCard({p}) {
  const direction=fragranceDirection[p.slug];
  const [stage,setStage]=useState(0);
  const [turning,setTurning]=useState(false);
  const timers=useRef([]);
  const stop=()=>{timers.current.forEach(clearTimeout);timers.current=[];setTurning(false)};
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  const later=(fn,delay)=>timers.current.push(setTimeout(fn,delay));
  const turn=(next)=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){setStage(next);return}
    setTurning(true);
    later(()=>setStage(next),360);
    later(()=>setTurning(false),720);
  };
  const play=()=>{
    stop();setStage(0);
    [1,2,0].forEach((next,i)=>later(()=>turn(next),(i+1)*800));
  };
  const choose=(next)=>{stop();turn(next)};
  return <article className="moment-triptych" style={{'--moment-tone':p.color}}
    onPointerEnter={e=>{if(e.pointerType==='mouse')play()}} onPointerLeave={stop}>
    <div className={`moment-card-sheet${turning?' is-turning':''}`}>
      <button className={`moment-face moment-stage-${stage}`} onClick={()=>choose((stage+1)%3)} aria-label={`${p.name}: ${names[stage]}. Show next view`}>
        <div className="moment-face-inner">
          <div className="moment-your-moment" hidden={stage!==0}><img src={asset(`enso-home/${direction.photo}.webp`)} alt={`${p.name}: ${direction.moment} in a Japanese setting`}/><span className="moment-image-caption">YOUR MOMENT</span></div>
          <div className="moment-bottle-face" hidden={stage!==1}><span>BEGIN WITH THE MOMENT</span><LabelPack product={p} bottleOnly/><h3>{p.name}</h3><p>{p.descriptor}</p></div>
          <div className="moment-enso-shift" hidden={stage!==2}><BookmarkArtwork product={p} direction={direction}/><span>{direction.place}</span></div>
        </div>
        <span className="moment-flip-hint">Explore the moment ↻</span>
      </button>
      <div className="moment-view-controls" role="group" aria-label={`${p.name} views`}>{names.map((n,i)=><button key={n} aria-pressed={stage===i} onClick={()=>choose(i)}>{n}</button>)}</div>
      <div className="moment-card-footer"><span className="moment-view-eyebrow">{p.name} / {names[stage]}</span><h3>{stage===0?direction.moment:stage===2?direction.shift:p.name}</h3>{stage===2&&<p className="moment-shift-note">{direction.setting}</p>}<Link to={`/collection/${p.slug}`}>Explore {p.name} ↗</Link></div>
    </div>
  </article>
}
export default function MomentTriptych(){const {products}=useStore();return <section className="hc-moments" aria-labelledby="hc-moments-title"><header className="za-heading"><div><span className="za-eyebrow">Find your moment</span><h2 id="hc-moments-title">What are you stepping into?</h2><p>Your moment. Your fragrance. Your Ensō shift.</p></div><Link className="zh-pill" to="/find-your-moment">Take the quiz ↗</Link></header><div className="moment-triptych-grid">{products.map(p=><MomentCard key={p.slug} p={p}/>)}</div></section>}
