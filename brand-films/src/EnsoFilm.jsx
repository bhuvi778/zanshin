import React from 'react';
import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

// A motion-graphics film built from the approved Japanese artwork, not live-action footage.
export const EnsoFilm=({brand=false})=>{
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig();
 const portrait=height>width;
 const seconds=frame/fps;
 const line=brand?(seconds<5?'Begin with the moment.':seconds<9?'How do you want to feel?':'A little more of you.'):(seconds<5?'The moment, complete.':seconds<9?'Stillness can hold movement.':'Carry the moment with you.');
 const phase=seconds<5?0:seconds<9?5:9;
 return <AbsoluteFill style={{background:'#f3ede1',color:'#263e3d',overflow:'hidden',fontFamily:'Georgia, serif'}}>
  <Img src={staticFile('assets/enso-home/enso-story-original.png')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:portrait?'48% center':'center',scale:interpolate(frame,[0,14*fps],[1.08,1]),opacity:portrait?.72:1}}/>
  <AbsoluteFill style={{background:portrait?'linear-gradient(#f9f3e5ee,transparent 42%,#f9f3e5 78%)':'linear-gradient(90deg,#f8f2e8 0%,#f8f2e8f5 28%,#f8f2e875 45%,transparent 66%)'}}/>
  <div style={{position:'absolute',top:portrait?65:40,left:portrait?48:60,letterSpacing:5,font:'16px Arial',color:'#80663d'}}>ZANSHIN / {brand?'BEGIN WITH THE MOMENT':'THE ART OF BEING HERE'}</div>
  <svg viewBox="0 0 500 500" style={{position:'absolute',width:100,height:100,right:40,top:portrait?110:85,opacity:.42,rotate:'-12deg'}}>
   <path d="M300 55 C160 15 35 125 50 275 C62 420 245 480 370 395 C493 310 475 140 370 76" fill="none" stroke="#214447" strokeWidth="7" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame,[0,4*fps],[1,0],{extrapolateRight:'clamp'})}/>
  </svg>
  <div style={{position:'absolute',left:portrait?48:60,right:portrait?48:'auto',top:portrait?830:170,width:portrait?'auto':470,opacity:interpolate(seconds-phase,[0,.8],[.2,1],{extrapolateRight:'clamp'}),translate:`0 ${interpolate(seconds-phase,[0,.8],[16,0],{extrapolateRight:'clamp'})}px`}}>
   <span style={{font:'15px Arial',letterSpacing:5,color:'#8a6e42'}}>{brand?'FOUR EXPRESSIONS. ONE YOU.':'THE ENSŌ EFFECT'}</span>
   <h1 style={{fontSize:portrait?61:66,lineHeight:1.08,fontWeight:400,margin:'22px 0'}}>{line}</h1>
   <p style={{fontSize:portrait?25:24,lineHeight:1.55,margin:0}}>{brand?'Focused. Energised. Connected. Magnetized.':seconds<9?'Movement and stillness. Intention and presence.':'If Ensō is the moment, Zanshin is what remains.'}</p>
  </div>
  <div style={{position:'absolute',bottom:portrait?32:35,right:portrait?40:50,font:'13px Arial',letterSpacing:4,color:'#80663d'}}>BE HERE. BE YOURSELF.</div>
 </AbsoluteFill>;
};
