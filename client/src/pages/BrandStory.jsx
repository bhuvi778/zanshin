import {useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {asset} from '../data';
import './BrandStoryEditorial.css';

// Client-supplied story content; the storefront owns the shared navigation and footer.
export default function BrandStory(){
 const page=useRef(null);
 useEffect(()=>{
  const items=page.current.querySelectorAll('.fade');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(el=>el.classList.add('visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  items.forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 return <div className="story-editorial" ref={page}>
  <section className="hero" id="story-top" aria-label="Zanshin introduction">
    <div className="hero-copy">
      <div className="jp-line">残心 &nbsp; / &nbsp; ZANSHIN</div>
      <div className="eyebrow">A philosophy of feeling</div>
      <h1>Some moments<br/>pass.<br/><em>Their feeling stays.</em></h1>
      <p className="lead">A scent can bring us back to how a moment felt — the calm before a new beginning, the warmth of a familiar embrace, or the joy of being fully there.</p>
      <a className="tagline" href="#story-origin">Begin with the Moment</a>
      <div className="hero-foot"><span>Presence</span><span className="dot"></span><span>Intention</span><span className="dot"></span><span>Feeling</span></div>
    </div>
    <div className="hero-stage" aria-label="Zanshin fragrance and packaging">
      <img className="hero-enso" src={asset('enso-home/enso-story-direction-v3.webp')} alt="" aria-hidden="true"/>
      <img className="hero-bottle" src={asset('story-v2/magnetized-bottle-v2.webp')} alt="Zanshin Magnetized Extrait de Parfum, 51 ml, with a warm wooden spherical cap"/>
      <img className="hero-package" src={asset('story-v2/magnetized-carton.png')} alt="Zanshin Certified Rizz fragrance packaging inspired by Fushimi Inari, Kyoto"/>
      <div className="hero-stamp"><span className="kanji">残心</span><span>THE FEELING REMAINS</span></div>
    </div>
    <div className="scroll-cue">Scroll to discover</div>
  </section>

  <section className="full-bleed" aria-label="A Kyoto street at a quiet moment">
    <img src={asset('story-v2/kyoto-street.jpg')} alt="Historic wooden street in Kyoto, Japan" loading="lazy"/>
    <div className="bleed-copy fade">
      <div className="eyebrow">Where our thinking took shape</div>
      <h2>The little things<br/>are never little.</h2>
      <p>Sometimes, it is a quiet ritual, a thoughtful detail, or a moment of stillness that makes an experience stay with us.</p>
    </div>
  </section>

  <section className="section origin fade" id="story-origin">
    <div className="origin-image-wrap">
      <img src={asset('story-v2/shoji-room.jpg')} alt="Sunlight passing through a traditional Japanese room with shoji screens" loading="lazy"/>
      <div className="image-index">A moment of stillness &nbsp; / &nbsp; Japan</div>
    </div>
    <div className="origin-copy">
      <div className="section-kicker"><span className="number">01 /</span> Our beginnings</div>
      <h2>A different<br/>way of seeing.</h2>
      <div className="copy">
        <p>Our team's experiences in Japanese companies and travels across Japan taught us to notice the beauty in simplicity, thoughtful rituals, and being fully present.</p>
        <p>We began to see how a small detail could change the way an ordinary moment feels. We wanted to bring that thought into fragrance.</p>
      </div>
      <div className="signature">That feeling stayed with us.</div>
    </div>
  </section>

  <section className="enso-section fade" id="story-enso" aria-label="Enso philosophy">
    <div className="enso-art" aria-hidden="true">

      <img className="story-enso-landscape" src={asset('enso-home/enso-story-direction-v3.webp')} alt=""/>
      <div className="seal">円相</div>
    </div>
    <div className="enso-copy">
      <div className="section-kicker"><span className="number">02 /</span> The philosophy</div>
      <div className="enso-title-line"><span className="jp">円相</span><span className="en">Enso</span></div>
      <h2>A circle.<br/>A reminder.</h2>
      <div className="copy">
        <p>In Zen, an <em>Enso</em> is a circle drawn in one brushstroke. Its open, imperfect form can speak to wholeness and the beauty of the present moment.</p>
        <p>It reminds us that a moment doesn't need to be perfect to feel complete. Sometimes, being fully there is enough.</p>
      </div>
      <div className="enso-aside">円相 / ENSO &nbsp; — &nbsp; A symbol that inspires our way of seeing, not a rule for how to live.</div>
    </div>
  </section>

  <section className="zanshin-section fade" aria-label="The meaning of Zanshin">
    <div className="zanshin-copy">
      <div className="section-kicker">03 / The meaning behind our name</div>
      <div className="zanshin-jp">残心</div>
      <h2>The feeling<br/>that remains.</h2>
      <div className="copy">
        <p>In Japanese martial traditions, <em>Zanshin</em> describes the awareness that continues after an action is complete.</p>
        <p>We find a beautiful connection in fragrance: a moment may pass, yet its feeling can linger. That is the thought we carry in our name.</p>
      </div>
      <div className="zanshin-caption">ZANSHIN &nbsp; / &nbsp; LINGERING AWARENESS</div>
    </div>
    <div className="zanshin-visual">
      <img className="room" src={asset('story-v2/zen-garden.jpg')} alt="A quiet Zen garden in Kyoto, Japan" loading="lazy"/>
      <img className="logo-light" src={asset('story-v2/logo-light.png')} alt="Zanshin logo in ivory and antique gold"/>
    </div>
  </section>

  <section className="fragrance-section fade" id="story-fragrance" aria-label="Why Zanshin creates fragrance">
    <div className="fragrance-copy">
      <div className="section-kicker"><span className="number">04 /</span> Why fragrance</div>
      <h2>A small detail.<br/>A fuller moment.</h2>
      <div className="copy">
        <p>Fragrance doesn't create a moment for you. It becomes part of it — adding confidence before you begin, warmth when you draw close, or a memory you can return to.</p>
        <p>Like the final note in a melody, a scent doesn't need to take over. It can simply bring the experience together.</p>
      </div>
      <a className="tagline" href="#story-closing">Begin with the Moment</a>
    </div>
    <div className="packaging-spread" aria-label="Zanshin fragrance packaging inspired by places and feelings in Japan">
      <img className="package-card" src={asset('story-v2/magnetized-carton.png')} alt="Certified Rizz — Magnetized, inspired by Fushimi Inari, Kyoto" loading="lazy"/>
      <img className="package-card" src={asset('story-v2/focused-carton.png')} alt="Keep Your Head in the Game — Focused, inspired by Ryoan-ji, Kyoto" loading="lazy"/>
      <div className="package-note">A place. A feeling. A fragrance.</div>
    </div>
  </section>

  <section className="closing fade" id="story-closing">
    <div className="closing-content">
      <div className="jp-line">残心 &nbsp; / &nbsp; ZANSHIN</div>
      <h2>Be there for it.<br/><em>Feel all of it.</em></h2>
      <div className="copy">For the moments you live, and the feelings that stay.</div>
      <img className="logo-img" src={asset('story-v2/logo-dark.png')} alt="Zanshin — Begin with the Moment logo" loading="lazy"/>
      <Link className="tagline" to="/collection">Explore Zanshin <span aria-hidden="true">→</span></Link>
    </div>
  </section>
</div>;
}
