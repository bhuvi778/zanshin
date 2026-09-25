import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {MemoryRouter,Routes,Route} from 'react-router-dom';
import {createServer} from 'vite';
import {cleanCart,cleanProducts,readResponse} from '../src/safeData.js';
assert.deepEqual(cleanCart(null),{});assert.deepEqual(cleanCart([]),{});assert.deepEqual(cleanCart({focused:Infinity,connected:2.7,magnetized:99,unknown:2}),{connected:2,magnetized:20});
assert.equal(cleanProducts([{slug:'focused',moments:null,name:42}])[0].moments.length,3);
assert.throws(()=>cleanProducts({}));
await assert.rejects(()=>readResponse(new Response('<html/>',{headers:{'content-type':'text/html'}})),/temporarily unavailable/);
await assert.rejects(()=>readResponse(new Response('{"message":"Unavailable"}',{status:503,headers:{'content-type':'application/json'}})),/Unavailable/);
assert.deepEqual(await readResponse(new Response('[]',{headers:{'content-type':'application/json'}})),[]);
const server=await createServer({root:fileURLToPath(new URL('..',import.meta.url)),configLoader:'native',server:{middlewareMode:true,hmr:false}});
try{
 const {StoreProvider}=await server.ssrLoadModule('/src/context/StoreContext.jsx');
 const cases=[['Home','default','/'],['Collection','default','/collection'],...['focused','energised','connected','magnetized','missing'].map(s=>['Product','default','/collection/'+s]),['Finder','default','/find-your-moment'],['Bag','default','/bag'],...['Story','Community','Journal','HowToBuy','Discovery','Reviews','Returns'].map(x=>['ContentPages',x,({Story:'/our-story',HowToBuy:'/how-to-buy',Discovery:'/discovery-gifting',TrackOrder:'/track-order'}[x]||'/'+x.toLowerCase())]),...['Packaging','Engage','Contact','TrackOrder'].map(x=>['InteractivePages',x,({Story:'/our-story',HowToBuy:'/how-to-buy',Discovery:'/discovery-gifting',TrackOrder:'/track-order'}[x]||'/'+x.toLowerCase())]),...['Search','Favourites','Account'].map(x=>['ShopUtilities',x,({Story:'/our-story',HowToBuy:'/how-to-buy',Discovery:'/discovery-gifting',TrackOrder:'/track-order'}[x]||'/'+x.toLowerCase())])];
 for(const [file,name,url] of cases){const mod=await server.ssrLoadModule('/src/pages/'+file+'.jsx');const Component=mod[name];assert.ok(Component, name);const page=React.createElement(Component);const html=renderToString(React.createElement(StoreProvider,null,React.createElement(MemoryRouter,{initialEntries:[url]},React.createElement(Routes,null,React.createElement(Route,{path:file==='Product'?'/collection/:slug':'*',element:page})))));assert.ok(html.length>100,url);if(file==='Home'){assert.ok(!html.includes('<video'));assert.equal((html.match(/class="slider-dot"/g)||[]).length,4)}console.log('PASS',url)}
 console.log('PASS invalid cart, malformed catalogue, HTML API response and HTTP error regressions');
}finally{await server.close()}

