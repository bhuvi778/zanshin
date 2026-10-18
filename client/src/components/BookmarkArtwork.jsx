import {asset} from '../data';
export default function BookmarkArtwork({product,direction}){
  function fallback(event){const image=event.currentTarget;if(image.dataset.fallbackApplied)return;image.dataset.fallbackApplied='true';image.src=asset(`enso-home/landscape-${product.slug}.webp`)}
  return <div className="moment-enso-art-frame"><img className="moment-bookmark-art" src={asset(`enso-home/${direction.shiftArt}`)} alt={`${product.name} Ensō Shift: ${direction.shift}. ${direction.place} Japanese illustration`} loading="eager" decoding="sync" onError={fallback}/></div>
}
