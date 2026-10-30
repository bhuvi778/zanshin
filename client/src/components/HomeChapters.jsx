import {campaignMoments} from '../campaignMedia';
import {useContent} from '../context/PlatformContext';
import {mediaURL} from '../platform';
import LiveTestimonials from './LiveTestimonials';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {asset,fallbackProducts} from '../data';
import {useStore} from '../context/StoreContext';
import LabelPack from './LabelPack';
import './HomeChapters.css';

export function EnsoEffect(){const [pulse,setPulse]=useState(0);return <div className="hc-enso"><span className="za-eyebrow">Why Zanshin</span><button className="hc-enso-touch" onClick={()=>setPulse(n=>n+1)} aria-label="Replay the Enso effect"><span key={pulse} className="hc-rings" aria-hidden="true"/><img src={asset('enso-home/enso-focused.webp')} alt="An open ink Enso circle above gentle water ripples"/></button><h3>The Enso effect.</h3><p>A pause to return to yourself.<br/>An intention to carry into your day.</p><span className="hc-caption">Touch the circle. Begin again.</span><Link className="za-link" to="/our-story">Discover our philosophy &#8599;</Link></div>}
const moods=[['focused','A quieter kind of clarity.','Clarity for the task in front of you.','enso-home/enso-focused.webp'],['connected','A moment, shared.','Make time for your people.','enso-home/enso-connected.webp'],['magnetized','A presence that stays.','Show up as your most confident self.','enso-home/enso-magnetized.webp'],['energised','Follow a new current.','A little momentum for your next move.','enso-home/enso-energised.webp']];
export {default as MomentInvitation} from './MomentTriptych';
export {default as QualityPromise} from './QualityPromise';
export {default as BuildYourBag} from './GiftPairBuilder';
// Campaign scenes are distinct from customer-submitted reviews.
export function Testimonials({onFilm}) {
 const {content,reviews}=useContent();
 return <LiveTestimonials creators={content?.creators??campaignMoments.slice(0,2)} reviews={reviews} onFilm={onFilm}/>;
}
