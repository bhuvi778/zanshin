import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {api} from '../api';
import {fallbackProducts} from '../data';
const StoreContext=createContext(null);
export function StoreProvider({children}){const [products,setProducts]=useState(fallbackProducts),[apiOnline,setApiOnline]=useState(false),[cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('zanshin-cart')||'{}')}catch{return{}}});
 useEffect(()=>{api.products().then(rows=>{const ordered=fallbackProducts.map(p=>rows.find(x=>x.slug===p.slug)||p);setProducts(ordered);setApiOnline(true)}).catch(()=>setApiOnline(false))},[]);
 useEffect(()=>{localStorage.setItem('zanshin-cart',JSON.stringify(cart))},[cart]);
 const add=(slug,quantity=1)=>setCart(c=>({...c,[slug]:Math.min(20,(c[slug]||0)+quantity)})),setQuantity=(slug,q)=>setCart(c=>{const next={...c};if(q<=0)delete next[slug];else next[slug]=Math.min(20,q);return next}),clear=()=>setCart({});
 const count=Object.values(cart).reduce((a,b)=>a+b,0),items=products.filter(p=>cart[p.slug]).map(p=>({...p,quantity:cart[p.slug]})),subtotal=items.reduce((s,x)=>s+x.price*x.quantity,0);
 const value=useMemo(()=>({products,apiOnline,cart,items,count,subtotal,add,setQuantity,clear}),[products,apiOnline,cart,items,count,subtotal]);return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>}
export const useStore=()=>useContext(StoreContext);
