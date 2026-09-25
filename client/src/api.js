import {readResponse} from './safeData';
const API_BASE=(import.meta.env.VITE_API_URL||'').replace(/\/$/,'');
const endpoint=path=>`${API_BASE}${path}`;
const json=async(url,options)=>readResponse(await fetch(endpoint(url),options));
export const api={
 products:()=>json('/api/products'),
 categories:()=>json('/api/recommendations/categories'),
 recommendation:(category,moment)=>json(`/api/recommendations?category=${encodeURIComponent(category)}&moment=${encodeURIComponent(moment)}`),
 contact:payload=>json('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
 createOrder:payload=>json('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
 track:(orderNumber,email)=>json(`/api/orders/${encodeURIComponent(orderNumber)}?email=${encodeURIComponent(email)}`)
};
