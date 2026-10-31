import {asset} from '../data';
import './LabelPack.css';
// Keep the supplied brand artwork, with approved presentation copy as sharp UI text.
function PresentationLabel({product:p,className='',priority}){
 const approved=p.label===`${p.slug}-label.png`;
 if(!approved)return <img className={className} src={asset(p.label)} alt={`${p.name} — ${p.descriptor}`} loading={priority?'eager':'lazy'}/>;
 return <div className={`approved-label ${className}`} role="img" aria-label={`${p.name}. ${p.descriptor} Extrait de Parfum. 51 ml / 1.7 fl oz.`}>
  <img src={asset(p.label)} alt="" loading={priority?'eager':'lazy'}/>
  <span className="approved-label-cover" aria-hidden="true"/>
  <span className="approved-label-format" aria-hidden="true">EXTRAIT DE PARFUM</span>
  <span className="approved-label-size" aria-hidden="true">51ml ℮ 1.7 FL.OZ.</span>
 </div>
}
export default function LabelPack({product:p,bottleOnly=false,priority=false}){
 if(!p)return null;
 const approvedBottle=['focused','energised','connected','magnetized'].includes(p.slug);
 if(p.image&&!approvedBottle)return <div className="label-pack"><img style={{width:'100%',height:'100%',objectFit:'contain',position:'absolute',inset:0}} src={asset(p.image)} alt={`${p.name} fragrance presentation`} loading={priority?'eager':'lazy'}/></div>;
 return <div className={`label-pack client-label-pack ${bottleOnly?'bottle-only':''}`} style={{'--pack-color':p.color}}>
  {!bottleOnly&&<div className="label-pack-carton"><PresentationLabel product={p} priority={priority}/></div>}
  <div className="label-pack-bottle"><img className="label-pack-glass" src={asset(`client-approved/bottle-${p.slug}-hd.webp`)} alt={`${p.name}. ${p.descriptor}. 51 ml Extrait de Parfum`} loading={priority?'eager':'lazy'}/></div>
 </div>
}
