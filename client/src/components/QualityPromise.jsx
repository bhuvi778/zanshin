import PromiseIcon from './PromiseIcon';
import './QualityPromise.css';

const facts=[
 {title:'Moment-led',subtitle:'Begin with how you want to feel.',icon:2,copy:'Clarity, energy, connection or confidence. Four expressions for the moment you are stepping into.'},
 {title:'51 ml',subtitle:'Five senses. One lasting impression.',icon:1,senses:true},
 {title:'Extrait de Parfum',subtitle:'At least 25% fragrance concentration.',icon:0,copy:'A considered concentration, made to become a personal finishing touch to your everyday ritual.'},
 {title:'Environmental Friendly',subtitle:'With care for what surrounds us.',icon:5,copy:'A thoughtful approach to the world around us, with care guiding our presentation and the choices we make.'}
];

export default function QualityPromise(){return <section className="quality-approach" aria-labelledby="hc-quality-title">
 <header><span className="za-eyebrow">The details matter</span><h2 id="hc-quality-title">Our approach.<br/><em>Intention, in every detail.</em></h2><p>Four considered details. A little more meaning in your everyday ritual.</p></header>
 <div className="quality-four">{facts.map((fact,i)=><article className="quality-card" key={fact.title}>
  <div className="quality-card-top"><span className="quality-icon"><PromiseIcon index={fact.icon}/></span><h3>{fact.title}</h3><span className="quality-index" aria-hidden="true">0{i+1}</span></div>
  <p className="quality-subtitle">{fact.subtitle}</p>
  {fact.senses?<details className="quality-senses-disclosure"><summary>Why 51 ml? <span>Five senses + one mind</span></summary><div className="quality-senses-content"><p className="quality-rokkon">Inspired by Rokkon <span lang="ja">(六根)</span></p><div className="quality-senses"><div><strong>5</strong><b>The outward senses</b><span>Sight, hearing, smell, taste and touch</span></div><span className="quality-plus" aria-hidden="true">+</span><div><strong>1</strong><b>The mind</b><span>The meaning, memories and emotions we carry</span></div></div><p className="quality-sense-note">Five senses experience a moment.<br/>The mind makes it meaningful.</p></div></details>:<p className="quality-card-copy">{fact.copy}</p>}
 </article>)}</div>
 <aside className="quality-disclaimer" aria-labelledby="quality-disclaimer-title"><h3 id="quality-disclaimer-title">The finer details</h3><ul><li>Cruelty Free</li><li>No Synthetic Dyes</li><li>No Parabens or Preservatives</li></ul><details><summary>Formula &amp; presentation disclaimer</summary><p>Japanese-inspired fragrance. Vegan formulas. Sustainability is an ongoing consideration; specific material and packaging details will be shared as they are confirmed. Phthalate-free status is still being confirmed.</p></details></aside>
 </section>}
