import {Link} from 'react-router-dom';
import {asset} from '../data';
import '../editorial-pages.css';
export const Photo=({name,alt,...props})=><img src={asset(`home-approved/${name}.webp`)} alt={alt} {...props}/>;
export function EditorialIntro({eyebrow,title,description,image='ritual',alt='A personal fragrance ritual'}){return <header className="ep-intro ep-width"><div><span className="ep-kicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><Photo name={image} alt={alt}/></header>}
export function MomentInvitation(){return <aside className="ep-invitation ep-width"><div><span className="ep-kicker">Begin with the moment</span><h2>A fragrance that feels like you.</h2><p>Start with where you are going, and how you want to arrive.</p></div><Link className="ep-button" to="/find-your-moment">Find your moment &rarr;</Link></aside>}
export {Story,Community,Journal} from './ApprovedBrandPages';
