import React from 'react';
import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';

// Original AI campaign photographs animated locally; no paid video service.
// These are motion photographs, not generated live-action actor footage.
export const HeroFilm=({identity})=>{
 const frame=useCurrentFrame();
 const progress=frame/215;
 const drift=Math.sin(progress*Math.PI);
 return <AbsoluteFill style={{background:'#efece5',overflow:'hidden'}}>
   <Img src={staticFile(`original-${identity}.png`)} style={{width:'100%',height:'100%',objectFit:'cover',transformOrigin:'70% 48%',scale:1+drift*.055,translate:`${drift*-12}px 0`}}/>
   <AbsoluteFill style={{pointerEvents:'none',background:'linear-gradient(115deg,transparent 35%,rgba(255,246,218,.12) 58%,transparent 77%)',translate:`${interpolate(frame,[0,215],[-180,180])}px 0`,opacity:Math.sin(progress*Math.PI)*.6}}/>
 </AbsoluteFill>;
};
