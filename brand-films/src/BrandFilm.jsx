import React from 'react';
import {AbsoluteFill,Easing,Img,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};

export const BrandFilm=({identity,image,accent,before,after,cue,number})=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const shift=interpolate(frame,[0,8*fps],['2.5% 0px','-2.5% 0px'],{...clamp,easing:Easing.bezier(.22,.61,.36,1)});
  const beforeOpacity=interpolate(frame,[0,.8*fps,3.6*fps,4.4*fps],[0,1,1,0],clamp);
  const afterOpacity=interpolate(frame,[4.2*fps,5.4*fps,8.5*fps,9.4*fps],[0,1,1,0],clamp);
  const lineX=interpolate(frame,[3.6*fps,5.2*fps],[-10,110],clamp);
  const washOpacity=interpolate(frame,[3.6*fps,5.5*fps],[.08,.3],clamp);
  const endOpacity=interpolate(frame,[8.7*fps,9.6*fps],[0,1],clamp);
  const identityTrack=interpolate(frame,[4.3*fps,5.6*fps],[.28,.08],clamp);
  return <AbsoluteFill style={{background:'#0b0d0d',fontFamily:'Poppins,Arial,sans-serif',color:'#f5f0e7',overflow:'hidden'}}>
    <style>{`@font-face{font-family:Cinzel;src:url('${staticFile('assets/Cinzel.ttf')}')}@font-face{font-family:Poppins;src:url('${staticFile('assets/Poppins-Regular.ttf')}')}`}</style>
    <Img src={staticFile(`assets/${image}`)} style={{position:'absolute',inset:'-4%',width:'108%',height:'108%',objectFit:'cover',scale:interpolate(frame,[0,10*fps],[1.035,1.12],clamp),translate:shift,filter:`saturate(${interpolate(frame,[0,5.5*fps],[.68,1.05],clamp)}) contrast(1.04)`}}/>
    <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(5,8,10,.76) 0%,rgba(5,8,10,.16) 47%,rgba(5,8,10,.28) 100%)'}}/>
    <AbsoluteFill style={{background:accent,mixBlendMode:'color',opacity:washOpacity}}/>
    <div style={{position:'absolute',left:`${lineX}%`,top:0,bottom:0,width:170,background:`linear-gradient(90deg,transparent,${accent}55,transparent)`,filter:'blur(18px)',opacity:interpolate(frame,[3.5*fps,4.1*fps,5.2*fps,5.8*fps],[0,1,1,0],clamp)}}/>
    <div style={{position:'absolute',inset:0,opacity:.2,backgroundImage:'repeating-radial-gradient(circle at 30% 40%,transparent 0 2px,rgba(255,255,255,.08) 3px 4px)',backgroundSize:'7px 7px',mixBlendMode:'soft-light'}}/>
    <div style={{position:'absolute',top:58,left:72,right:72,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:13,letterSpacing:5,textTransform:'uppercase'}}>
      <span>ZANSHIN / {number}</span><span style={{color:accent}}>BEGIN WITH THE MOMENT</span>
    </div>
    <div style={{position:'absolute',left:76,bottom:86,width:650,opacity:beforeOpacity}}>
      <div style={{fontSize:13,letterSpacing:5,color:accent,marginBottom:22}}>BEFORE THE SHIFT</div>
      <div style={{fontFamily:'Cinzel,serif',fontSize:48,lineHeight:1.18,letterSpacing:-1.5}}>{before}</div>
    </div>
    <div style={{position:'absolute',left:76,bottom:75,width:810,opacity:afterOpacity}}>
      <div style={{fontSize:13,letterSpacing:5,color:accent,marginBottom:16}}>{cue}</div>
      <div style={{fontFamily:'Cinzel,serif',fontSize:86,lineHeight:1,letterSpacing:`${identityTrack}em`}}>{identity}</div>
      <div style={{fontFamily:'Cinzel,serif',fontSize:29,lineHeight:1.35,marginTop:20,maxWidth:690}}>{after}</div>
    </div>
    <AbsoluteFill style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#101714',opacity:endOpacity}}>
      <div style={{textAlign:'center'}}><div style={{fontFamily:'Cinzel,serif',fontSize:83,letterSpacing:16}}>ZANSHIN</div><div style={{fontSize:15,letterSpacing:8,color:accent,marginTop:20}}>BEGIN WITH THE MOMENT</div></div>
    </AbsoluteFill>
  </AbsoluteFill>;
};
