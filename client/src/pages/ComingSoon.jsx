import {Link} from 'react-router-dom';
import {asset} from '../data';
import './ComingSoon.css';

export default function ComingSoon({community=false,journal=false}){
 return <section className={`launch-page${community?' launch-community':''}`} aria-labelledby="launch-title">
  <div className="launch-copy"><span className="launch-kicker">{journal?'Journal & Blogs':community?'The Zanshin community':'Explore Zanshin'}</span><span className="launch-badge"><i aria-hidden="true"/>Coming soon</span><h1 id="launch-title">{journal?<>A little inspiration.<br/><em>A new chapter.</em></>:community?<>A circle of stories.<br/><em>A new chapter.</em></>:<>A new expression.<br/><em>Worth the wait.</em></>}</h1><p>{journal?'New stories, quiet rituals and Japanese-inspired perspectives. Our journal is taking shape.':community?'A space for shared moments, familiar faces and new connections. Our community is taking shape.':'Our collection is getting ready for its first moment. A more personal way to experience fragrance is on its way.'}</p><div className="launch-actions"><Link to="/our-story">Discover our story <span aria-hidden="true">↗</span></Link><Link to="/">Back to Zanshin <span aria-hidden="true">←</span></Link></div><span className="launch-signature">BEGIN WITH THE MOMENT</span></div>
  <div className="launch-art"><img src={asset(`client-approved/${community?'join-circle-hd':'enso-center-hd'}.webp`)} alt={community?'An Ensō circle among cherry blossoms and soft reflections':'An Ensō circle, Japanese mountains and a warm sunrise'} fetchPriority="high"/><span lang="ja" aria-label="Zanshin">残心</span></div>
  <div className="launch-announcement" role="status"><span>COMING <em>SOON</em></span><p>{journal?'Stories worth waiting for.':community?'A space to connect. Opening soon.':'Your next moment is on its way.'}</p></div>
 </section>;
}
