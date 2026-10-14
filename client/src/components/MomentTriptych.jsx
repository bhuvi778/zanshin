import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset} from '../data';
import {useStore} from '../context/StoreContext';
import LabelPack from './LabelPack';
const names=['Landscape','Fragrance','Your moment'];
function MomentCard({p}) {
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
    stop();
    [1,2,0].forEach((next,i)=>later(()=>turn(next),(i+1)*1500));
  };
  const choose=(next)=>{stop();turn(next)};
  return <article className="moment-triptych" style={{'--moment-tone':p.color}}
    onPointerEnter={e=>{if(e.pointerType==='mouse')play()}} onPointerLeave={stop}>
    <div className={`moment-card-sheet${turning?' is-turning':''}`}>
      <button className="moment-face" onClick={()=>choose((stage+1)%3)} aria-label={`${p.name}: ${names[stage]}. Show next view`}>
        <div className="moment-face-inner">{stage===1?<div className="moment-bottle-face"><span>BEGIN WITH THE MOMENT</span><LabelPack product={p} bottleOnly/><h3>{p.name}</h3><p>{p.descriptor}</p></div>:<><img src={asset(`enso-home/${stage===0?'landscape':'character'}-${p.slug}.webp`)} alt={stage===0?`${p.name} Japanese landscape`:`${p.name} expressed through a personal moment in Japan`}/><span className="moment-image-caption">{stage===0?'A landscape of feeling':p.mood}</span></>}</div>
        <span className="moment-flip-hint">Explore the moment ↻</span>
      </button>
      <div className="moment-view-controls" role="group" aria-label={`${p.name} views`}>{names.map((n,i)=><button key={n} aria-pressed={stage===i} onClick={()=>choose(i)}>{n}</button>)}</div>
      <div className="moment-card-footer"><h3>{p.name}</h3><Link to={`/collection/${p.slug}`}>Explore {p.name} ↗</Link></div>
    </div>
  </article>
}
export default function MomentTriptych(){const {products}=useStore();return <section className="hc-moments" aria-labelledby="hc-moments-title"><header className="za-heading"><div><span className="za-eyebrow">Find your moment</span><h2 id="hc-moments-title">What are you stepping into?</h2><p>A landscape. An intention. A moment that feels like you.</p></div><Link className="zh-pill" to="/find-your-moment">Take the quiz ↗</Link></header><div className="moment-triptych-grid">{products.map(p=><MomentCard key={p.slug} p={p}/>)}</div></section>}
