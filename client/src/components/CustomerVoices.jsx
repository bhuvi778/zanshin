import {consistentCampaign} from '../campaignMedia';
import {Link} from 'react-router-dom';
import {mediaURL} from '../platform';
import './CustomerVoices.css';

export default function CustomerVoices({creators=[],reviews=[],onFilm}){
 return <section className="hv-stories zv-testimonials" aria-labelledby="hc-voices-title">
  <header className="za-heading zv-heading"><div><span className="za-eyebrow">Stories from our circle</span><h2 id="hc-voices-title">Fragrance, in real life.</h2></div><p>Small rituals.<br/>Personal perspectives.</p></header>
  <div className="hv-creator-heading"><h3>Everyday moments, shared intentions</h3><span>01 — The stories</span></div>
  <div className="hv-films zv-creator-grid">{creators.map(consistentCampaign).map((c,i)=>{
   const Tag=c.video?'button':Link;
   return <Tag key={c.id||c.title} className="hv-story-card zv-story" {...(c.video?{onClick:()=>onFilm({title:c.title,photo:mediaURL(c.image),film:mediaURL(c.video),to:c.productSlug})}:{to:'/collection/'+c.productSlug})}>
    <div className="hv-film-image"><img src={mediaURL(c.image)} alt={c.title} loading="lazy"/>{c.video&&<span className="hv-play" aria-hidden="true">▶</span>}<span className="zv-story-index" aria-hidden="true">0{i+1}</span></div>
    <div className="hv-film-copy"><span className="za-eyebrow">{c.label||'Campaign moment'}</span><h3>{c.title}</h3><p>{c.body}</p><span className="hv-watch">{c.video?'Watch the film':'Explore the fragrance'} <span aria-hidden="true">↗</span></span></div>
   </Tag>;
  })}</div>
  <div className="hv-customers zv-customer-panel">
   <header className="zv-customer-heading"><span className="za-eyebrow">02 — Customer moments</span><span className="zv-brush-mark" aria-hidden="true">“</span><h3>The little things<br/><em>that stay with you.</em></h3><p>A feeling, a ritual, a memory.<br/>A little of your everyday.</p><Link className="zv-share" to="/account">Share your moment <span aria-hidden="true">↗</span></Link></header>
   {reviews.length?<div className="hv-quotes zv-review-list" aria-label="Customer testimonials">{reviews.map(r=><figure className="zv-review" key={r.id}>
    <div className="zv-rating" aria-label={`${r.rating} out of 5 stars`}><span aria-hidden="true">{'★'.repeat(Math.max(0,Math.min(5,Math.round(r.rating))))}</span><span>{r.rating}/5</span></div>
    <h4>{r.title}</h4><blockquote>{r.body}</blockquote>
    {r.media&&(r.mediaType==='video'?<video controls preload="metadata" src={mediaURL(r.media)}/>:<img src={mediaURL(r.media)} alt={r.title} loading="lazy"/>)}
    <figcaption><span className="zv-avatar" aria-hidden="true">{r.name?.trim().slice(0,1)||'Z'}</span><span>{r.name}<small>{r.productSlug}</small></span></figcaption>
   </figure>)}</div>:<div className="zv-first-story"><span className="zv-story-seal" lang="ja" aria-hidden="true">残心</span><span className="za-eyebrow">Your experience, in your words</span><h4>Your moment<br/>belongs here.</h4><p>Already part of your ritual?<br/>Tell us what stayed with you.</p><Link className="zv-share" to="/account">Write your story <span aria-hidden="true">↗</span></Link></div>}
  </div>
  <div className="zv-closing-line"><span>Begin with the moment.</span><span>A feeling to carry with you.</span></div>
 </section>;
}
