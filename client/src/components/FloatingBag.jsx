import {Link, useLocation} from 'react-router-dom';
import {useStore} from '../context/StoreContext';
import './FloatingBag.css';

export default function FloatingBag() {
  const {count} = useStore();
  const {pathname} = useLocation();
  return <>
    <span className="bag-announcement" role="status" aria-atomic="true">{count ? `Your bag contains ${count} ${count === 1 ? 'item' : 'items'}.` : ''}</span>
    {count > 0 && pathname !== '/bag' && !pathname.startsWith('/login') && <Link
      className="floating-bag" to="/bag" aria-label={`Open your bag, ${count} ${count === 1 ? 'item' : 'items'}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>
      <span>Your bag</span><strong>{count}</strong>
    </Link>}
  </>;
}
