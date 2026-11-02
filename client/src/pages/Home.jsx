import {clientCopy} from '../clientCopy';
import CircleInvitation from '../components/CircleInvitation';
import HeroBrandFilm from '../components/HeroBrandFilm';
import {fragranceDirection} from '../brandDirection';
import BrandPromise from '../components/BrandPromise';
import {useStore} from '../context/StoreContext';
import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset} from '../data';
import LabelPack from '../components/LabelPack';
import '../enso-home.css';
import {MomentInvitation,QualityPromise,BuildYourBag,Testimonials} from '../components/HomeChapters';
import {PairDestinations} from '../components/PairDestinations';
function FilmDialog({film,onClose}){const dialog=useRef(null),video=useRef(null),[failed,setFailed]=useState(false);useEffect(()=>{const previous=document.activeElement;dialog.current.showModal();return()=>previous?.focus()},[]);return <dialog ref={dialog} className="zh-film-dialog" onClose={onClose} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}} aria-labelledby="film-title"><button className="zh-close" aria-label="Close film" onClick={()=>dialog.current.close()}>&times;</button><h2 id="film-title">{film.title}</h2>{failed?<p>Film unavailable. You can still <Link to={`/collection/${film.to}`} onClick={onClose}>explore this fragrance</Link>.</p>:<video ref={video} controls playsInline preload="metadata" poster={film.photo} onError={()=>setFailed(true)}><source src={film.film}/></video>}<p>Campaign film / <Link to={`/collection/${film.to}`} onClick={onClose}>Explore the fragrance &rarr;</Link></p></dialog>}
export default function Home(){const {products}=useStore();const [film,setFilm]=useState(null);
return <div className="zanshin-home"><div className="zh-opening"><HeroBrandFilm/><aside className="zh-arch zh-sculpture zh-composed"><img className="sculpture-composed-art" src={asset('client-approved/hero-tea-wooden-hd.webp')} alt="Zanshin fragrance beside tea and cherry blossoms in a sunlit Japanese room" fetchPriority="high"/><div className="sculpture-heading"><h2>{clientCopy.heroTitle}<br/><em>{clientCopy.heroEmphasis}</em></h2></div><div className="sculpture-invitation"><p>{clientCopy.heroSupport}</p><Link className="zh-pill" to="/collection">{clientCopy.heroCTA} &rarr;</Link></div></aside></div><div className="za-home">
<section className="enso-duality" aria-labelledby="duality-title"><img className="duality-art" src={asset('client-approved/enso-center-hd.webp')} alt="Japanese mountains, a tranquil lake and cherry blossoms within a hand-painted Enso circle" loading="lazy"/><span className="sr-only" id="duality-title">From Ensō to Zanshin</span><div className="duality-content"><article className="duality-enso"><span className="duality-japanese" lang="ja">円相</span><h2>ENSŌ</h2><h3>THE MOMENT, COMPLETE.</h3><p>{clientCopy.ensoMeaning}</p><p className="duality-source">{clientCopy.ensoAttribution}<br/>{clientCopy.ensoSymbolizes}<br/>{clientCopy.ensoSymbols}</p><em>{clientCopy.ensoExpression}</em></article><article className="duality-zanshin"><span className="duality-japanese" lang="ja">残心</span><h2>ZANSHIN</h2><h3>WHAT REMAINS.</h3><p>{clientCopy.zanshinMeaning}</p><Link className="duality-link" to="/our-story">{clientCopy.philosophyCTA} <span aria-hidden="true">→</span></Link></article></div></section>
<MomentInvitation/>
<BuildYourBag/>
<section className="za-discovery" aria-labelledby="za-discovery-title">
 <header className="za-heading"><h2 id="za-discovery-title">Find your kind of presence.</h2><Link className="za-link" to="/collection">Explore Zanshin <span aria-hidden="true">&#8599;</span></Link></header>
 <div className="za-fragrances">{products.map((p,i)=><article key={p.slug} data-fragrance={p.slug} className="za-fragrance" style={{'--identity':p.color,'--band':['#456883','#233654','#505b37','#6b2d39'][i]}}><Link to={`/collection/${p.slug}`} aria-label={`Explore ${p.name}: ${p.mood}`}><div className="za-fragrance-image"><img className="za-lifestyle" src={asset(fragranceDirection[p.slug].discoveryImage||`enso-home/${fragranceDirection[p.slug].discoveryScene}.webp`)} alt={fragranceDirection[p.slug].discoveryAlt} loading="lazy"/><div className="za-product"><LabelPack product={p} bottleOnly/></div></div><div className="za-fragrance-caption"><div><h3>{p.name}</h3><p>{fragranceDirection[p.slug].moment}</p></div><span className="za-arrow" aria-hidden="true">&rarr;</span></div></Link></article>)}</div>
</section>
<QualityPromise/><PairDestinations/>
<CircleInvitation/>
<Testimonials onFilm={setFilm}/><BrandPromise/>
</div>{film&&<FilmDialog film={film} onClose={()=>setFilm(null)}/>}</div>}
