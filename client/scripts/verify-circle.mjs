import {createServer} from 'vite';
import {fileURLToPath} from 'node:url';
import React from 'react';
import {renderToString} from 'react-dom/server';
import assert from 'node:assert/strict';
const server=await createServer({root:fileURLToPath(new URL('..',import.meta.url)),configLoader:'native',server:{middlewareMode:true,hmr:false}});
try{
 const {siteLinks,socialDestination}=await server.ssrLoadModule('/src/siteLinks.js');
 const Circle=(await server.ssrLoadModule('/src/components/CircleInvitation.jsx')).default;
 const original=siteLinks.circleSocial;
 try{
  siteLinks.circleSocial='';assert.equal(socialDestination(),'');assert.ok(renderToString(React.createElement(Circle)).includes('<button class="circle-enter"'));
  for(const value of ['javascript:alert(1)','http://example.com','not-a-url',''])assert.equal(socialDestination(value),'');
  for(const value of ['https://www.instagram.com/zanshin-example/','https://www.youtube.com/@zanshin-example']){
   siteLinks.circleSocial=value;const html=renderToString(React.createElement(Circle));assert.ok(html.includes('href="'+value+'"'));assert.ok(html.includes('target="_blank"'));assert.ok(html.includes('rel="noopener noreferrer"'));assert.ok(!html.includes('<button class="circle-enter"'));
  }
 }finally{siteLinks.circleSocial=original}
 console.log('PASS Circle pending state, configured external social links and URL validation');
}finally{await server.close()}
