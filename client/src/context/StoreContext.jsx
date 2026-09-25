import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {api} from '../api';
import {fallbackProducts} from '../data';
import {cleanCart,cleanProducts} from '../safeData';
const StoreContext=createContext(null);
const read=(key,otherwise)=>{try{return JSON.parse(localStorage.getItem(key))??otherwise}catch{return otherwise}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
export function StoreProvider({children}){
 const [products,setProducts]=useState(fallbackProducts),[apiOnline,setApiOnline]=useState(false),[cart,setCart]=useState(()=>cleanCart(read('zanshin-cart',{}))),[favourites,setFavourites]=useState(()=>{const v=read('zanshin-favourites',[]);return Array.isArray(v)?[...new Set(v.filter(x=>fallbackProducts.some(p=>p.slug===x)))]:[]});
 useEffect(()=>{let active=true;api.products().then(rows=>{const safe=cleanProducts(rows);if(active){setProducts(safe);setApiOnline(true)}}).catch(()=>{if(active)setApiOnline(false)});return()=>{active=false}},[]);
 useEffect(()=>write('zanshin-cart',cart),[cart]);useEffect(()=>write('zanshin-favourites',favourites),[favourites]);
 const add=(slug,quantity=1)=>setCart(c=>cleanCart({...c,[slug]:(c[slug]||0)+Number(quantity)}));
 const setQuantity=(slug,q)=>setCart(c=>cleanCart({...c,[slug]:q})),clear=()=>setCart({});
 const toggleFavourite=slug=>{if(!fallbackProducts.some(p=>p.slug===slug))return;setFavourites(s=>s.includes(slug)?s.filter(x=>x!==slug):[...s,slug])};
 const count=Object.values(cart).reduce((a,b)=>a+b,0),items=products.filter(p=>cart[p.slug]).map(p=>({...p,quantity:cart[p.slug]})),subtotal=items.reduce((s,p)=>s+p.price*p.quantity,0);
 const value=useMemo(()=>({products,apiOnline,cart,items,count,subtotal,add,setQuantity,clear,favourites,toggleFavourite}),[products,apiOnline,cart,favourites]);return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore=()=>useContext(StoreContext);
