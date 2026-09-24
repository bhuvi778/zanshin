import React from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';

const scenes={
  focused:{name:'Focused',src:'focused-work.mp4',line:'Make room for what matters.',tone:'#e5eceb'},
  energised:{name:'Energised',src:'energised-run.mp4',line:'A new rhythm. A new beginning.',tone:'#e8edf3'},
  connected:{name:'Connected',src:'connected-together.mp4',line:'Be here. With them.',tone:'#e8ece2'},
  magnetized:{name:'Magnetized',src:'magnetized-mirror.mp4',line:'Arrive as yourself.',tone:'#f0e5e2'}
};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};

// One continuous human moment, followed by a quiet branded pack shot.
// Avoid fabricated hands, floating caps and mismatched before/after actors.
export const HeroFilm=({identity})=>{
 const frame=useCurrentFrame();
 const scene=scenes[identity];
 const reveal=interpolate(frame,[136,160],[0,1],clamp);
 return <AbsoluteFill style={{background:scene.tone,overflow:'hidden'}}>
  <AbsoluteFill style={{opacity:1-reveal}}>
   <Video src={staticFile(scene.src)} muted loop style={{width:'100%',height:'100%',objectFit:'cover'}}/>
   <AbsoluteFill style={{background:'linear-gradient(0deg,rgba(15,22,19,.48),transparent 45%)'}}/>
   <div style={{position:'absolute',left:64,bottom:62,color:'#fff',fontFamily:'Georgia,serif',fontSize:38,letterSpacing:-.5}}>{scene.line}</div>
  </AbsoluteFill>
  <AbsoluteFill style={{opacity:reveal,background:`linear-gradient(115deg,#faf8f3,${scene.tone})`}}>
   <div style={{position:'absolute',left:90,top:244,color:'#28332c'}}>
    <div style={{fontFamily:'Arial,sans-serif',fontSize:18,letterSpacing:9}}>ZANSHIN</div>
    <div style={{fontFamily:'Georgia,serif',fontSize:68,marginTop:28}}>{scene.name}</div>
    <div style={{fontFamily:'Arial,sans-serif',fontSize:13,letterSpacing:3,marginTop:24}}>BEGIN WITH THE MOMENT</div>
   </div>
   <div style={{position:'absolute',width:360,height:544,right:110,top:88,scale:interpolate(frame,[136,215],[.97,1],clamp)}}>
    <Img src={staticFile('concept-bottle.webp')} style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(12px 22px 18px #41331d26)'}}/>
    <Img src={staticFile(`${identity}-label.png`)} style={{position:'absolute',left:'24.2%',top:'35.5%',width:'53.6%',height:'49.8%'}}/>
   </div>
  </AbsoluteFill>
 </AbsoluteFill>;
};
