import {useState} from 'react';
import {mediaURL} from '../platform';
import './ReviewMarquee.css';

function ReviewCard({review:r,repeat=false}){
 return <figure className={`review-card${repeat?' is-repeat':''}`} aria-hidden={repeat||undefined} inert={repeat||undefined}>
  <span className="review-quote-mark" aria-hidden="true">“</span>
  <div className="review-stars" aria-label={`${r.rating} out of 5 stars`}><span aria-hidden="true">{'★'.repeat(Math.max(0,Math.min(5,Math.round(r.rating))))}</span><small>{r.rating}/5</small></div>
  <h3>{r.title}</h3><blockquote>{r.body}</blockquote>
  {r.media&&(r.mediaType==='video'?<video controls={!repeat} preload="metadata" src={mediaURL(r.media)}/>:<img src={mediaURL(r.media)} alt={r.title} loading="lazy"/>)}
  <figcaption><span className="review-avatar" aria-hidden="true">{r.name?.trim().slice(0,1)||'Z'}</span><span>{r.name}<small>{r.productSlug}</small></span></figcaption>
 </figure>;
}

export default function ReviewMarquee({reviews=[]}){
 const [paused,setPaused]=useState(false);
 if(!reviews.length)return null;
 const entries=reviews.length?Array.from({length:Math.max(4,reviews.length)},(_,i)=>reviews[i%reviews.length]):[];
 return <section className="hv-stories zv-testimonials review-marquee" aria-labelledby="hc-voices-title" data-paused={paused}>
  <header className="review-heading"><h2 id="hc-voices-title">Customer reviews</h2><div className="review-actions"><button type="button" onClick={()=>setPaused(v=>!v)} aria-pressed={paused} aria-label={paused?'Resume scrolling':'Pause scrolling'}><span aria-hidden="true">{paused?'▶':'Ⅱ'}</span>{paused?'Play':'Pause'}</button></div></header>
  <div className="review-window" tabIndex={0} aria-label="Customer reviews, scrolling from right to left"><div className="review-track zv-review-list" style={{animationDuration:`${Math.max(28,entries.length*9)}s`}}>{[0,1].map(copy=><div className={`review-group${copy?' review-group-copy':''}`} key={copy} aria-hidden={copy?true:undefined} inert={copy?true:undefined}>{entries.map((r,i)=><ReviewCard key={`${r.id}-${i}`} review={r} repeat={copy===1||i>=reviews.length}/>)}</div>)}</div></div>
 </section>;
}
