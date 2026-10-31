import {createServer} from 'vite';
import {fileURLToPath} from 'node:url';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import assert from 'node:assert/strict';
const server=await createServer({root:fileURLToPath(new URL('..',import.meta.url)),configLoader:'native',server:{middlewareMode:true,hmr:false}});
try{
 const Label=(await server.ssrLoadModule('/src/components/LabelPack.jsx')).default;
 const {fallbackProducts}=await server.ssrLoadModule('/src/data.js');
 for(const p of fallbackProducts){const html=renderToString(React.createElement(Label,{product:{...p,image:'/assets/retired-white-background.webp'},bottleOnly:true}));assert.ok(html.includes('bottle-'+p.slug+'-hd.webp'));assert.ok(!html.includes('retired-white-background.webp'));}
 const Voices=(await server.ssrLoadModule('/src/components/CustomerVoices.jsx')).default;
 const render=reviews=>renderToString(React.createElement(MemoryRouter,null,React.createElement(Voices,{creators:[],reviews})));
 assert.ok(render([]).includes('zv-first-story'));assert.ok(!render([]).includes('zv-review-list'));
 const html=render([{id:'qa',name:'QA author',rating:4,title:'QA title',body:'QA review body',productSlug:'focused'}]);assert.ok(html.includes('QA review body'));assert.ok(html.includes('4 out of 5 stars'));assert.ok(!html.includes('zv-first-story'));
 console.log('PASS canonical bottle artwork overrides retired product photos; empty and published-review states');
}finally{await server.close()}
