import {useEffect,useRef,useState} from 'react';
import {asset} from '../data';
import {socialDestination} from '../siteLinks';
function InstagramIcon(){return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>}
function CircleNotice({onClose}){
 const ref=useRef(null);
 useEffect(()=>{const previous=document.activeElement;ref.current.showModal();return()=>previous?.focus()},[]);
 return <dialog ref={ref} className="circle-notice" aria-labelledby="circle-notice-title" onClose={onClose} onClick={e=>{if(e.target===e.currentTarget)ref.current.close()}}><button className="circle-notice-close" aria-label="Close" onClick={()=>ref.current.close()}>×</button><span lang="ja">残心</span><h2 id="circle-notice-title">Our next chapter<br/><em>is coming soon.</em></h2><p>Our social circle opens soon.<br/>Come back for the next moment.</p><button className="circle-enter" onClick={()=>ref.current.close()}>Stay in the moment</button></dialog>
}
export default function CircleInvitation(){
 const [notice,setNotice]=useState(false),destination=socialDestination();
 const contents=<><InstagramIcon/><span>ENTER THE CIRCLE</span><span aria-hidden="true">→</span></>;
 return <section className="client-circle hd-circle" aria-labelledby="circle-invitation-title"><img src={asset('client-approved/join-circle-hd.webp')} alt="Cherry blossoms, an Ensō circle and reflections in a Japanese garden" loading="lazy" width="2048" height="768"/><div className="circle-invitation-copy"><h2 id="circle-invitation-title"><span>Join the</span>Zanshin Circle</h2><span className="circle-gold-rule" aria-hidden="true"/></div>{destination?<a className="circle-enter" href={destination} target="_blank" rel="noopener noreferrer" aria-label="Enter the Circle (opens in a new tab)">{contents}</a>:<button className="circle-enter" onClick={()=>setNotice(true)}>{contents}</button>}{notice&&<CircleNotice onClose={()=>setNotice(false)}/>}</section>
}
