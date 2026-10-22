import {useEffect,useRef,useState} from 'react';

export const brandFilms={
 brand:{src:'/films/zanshin-brand-v1.mp4',mobile:'/films/zanshin-brand-portrait-v1.mp4',poster:'/films/zanshin-brand-v1-poster.jpg',title:'Zanshin — Begin with the moment',description:'Four expressions of you: Focused, Energised, Connected and Magnetized. Begin with how you want to feel.'},
 enso:{src:'/films/enso-effect-v1.mp4',mobile:'/films/enso-effect-portrait-v1.mp4',poster:'/films/enso-effect-v1-poster.jpg',title:'The Ensō effect — Zanshin philosophy',description:'The moment, complete. Stillness can hold movement. If Ensō is the moment, Zanshin is what remains. Carry the moment with you.'}
};

export default function BrandFilm({kind='enso',active=true,reduced=false,onEnded}){
 const film=brandFilms[kind],video=useRef(null);
 const [failed,setFailed]=useState(false),[blocked,setBlocked]=useState(false);
 const [portrait,setPortrait]=useState(()=>typeof window!=='undefined'&&matchMedia('(max-width: 600px)').matches);
 const source=portrait?film.mobile:film.src;
 useEffect(()=>{const mq=matchMedia('(max-width: 600px)'),update=()=>setPortrait(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{
  const el=video.current;if(!el)return;
  let current=true;
  if(!active){el.pause();return}
  el.currentTime=0;
  if(reduced||matchMedia('(prefers-reduced-motion: reduce)').matches){el.pause();return}
  el.play().then(()=>{if(current)setBlocked(false)}).catch(()=>{if(current)setBlocked(true)});
  return()=>{current=false;el.pause()};
 },[active,reduced,source,failed]);
 return <div className="brand-film-player">
  {failed?<><img src={film.poster} alt={film.description}/><button className="brand-film-retry" onClick={()=>setFailed(false)}>Play film again ↻</button></>:<video key={source} ref={video} src={source} muted playsInline controls preload={active?'auto':'metadata'} poster={film.poster} aria-label={film.title} aria-description={film.description} tabIndex={active?0:-1} onEnded={()=>{if(active)onEnded?.()}} onError={()=>setFailed(true)}>
   {film.description}
  </video>}
  {blocked&&!failed&&<span className="brand-film-hint" role="status">Press play to watch the film</span>}
 </div>
}
