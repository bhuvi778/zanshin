import {createContext,useContext,useEffect,useState} from 'react';
import {request} from '../platform';
const Auth=createContext({user:null,loading:false});
const Content=createContext({content:null,reviews:[],loading:false});
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 async function refresh(){try{setUser(await request('/api/auth/me'));setError('')}catch(e){setUser(null);if(e.status!==401)setError(e.message)}finally{setLoading(false)}}
 useEffect(()=>{refresh()},[]);
 async function authenticate(mode,body){const u=await request('/api/auth/'+mode,{method:'POST',body});setUser(u);setError('');return u}
 async function logout(){await request('/api/auth/logout',{method:'POST'});setUser(null)}
 return <Auth.Provider value={{user,setUser,loading,error,authenticate,logout,refresh}}>{children}</Auth.Provider>
}
export const useAuth=()=>useContext(Auth);
export function ContentProvider({children}){
 const [content,setContent]=useState(null),[reviews,setReviews]=useState([]),[loading,setLoading]=useState(true);
 useEffect(()=>{let active=true;const refresh=()=>{request('/api/content').then(x=>{if(active)setContent(x)}).catch(()=>{}).finally(()=>{if(active)setLoading(false)});request('/api/reviews').then(x=>{if(active)setReviews(x)}).catch(()=>{})};refresh();window.addEventListener('focus',refresh);return()=>{active=false;window.removeEventListener('focus',refresh)}},[]);
 return <Content.Provider value={{content,reviews,loading}}>{children}</Content.Provider>
}
export const useContent=()=>useContext(Content);
