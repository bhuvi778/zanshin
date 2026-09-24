import React from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,interpolate,staticFile,useCurrentFrame} from 'remotion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const footageStyle={position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'};

const SingleScene=({src,tone})=>{
  const frame=useCurrentFrame();
  const fade=interpolate(frame,[0,14,225,239],[0,1,1,0],clamp);
  const contrast=interpolate(frame,[0,120,239],[1.04,1.13,1.06],clamp);
  return <Video src={staticFile(src)} loop muted style={{...footageStyle,opacity:fade,filter:`saturate(${tone}) contrast(${contrast}) brightness(.84)`}}/>;
};

const RitualScene=({identity,accent,start=52,end=118})=>{
  const frame=useCurrentFrame();
  const opacity=interpolate(frame,[start,start+10,end-12,end],[0,1,1,0],clamp);
  const copyOpacity=interpolate(frame,[start+7,start+18,end-16,end-7],[0,1,1,0],clamp);
  const copyY=interpolate(frame,[start+6,start+22],[24,0],clamp);
  return <>
    <Video name="Zanshin fragrance ritual" src={staticFile('fragrance-ritual.mp4')} loop muted from={start} durationInFrames={end-start} style={{...footageStyle,opacity,filter:'saturate(.55) contrast(1.15) brightness(.62)'}}/>
    <AbsoluteFill style={{opacity,background:`linear-gradient(90deg,rgba(5,7,6,.86),rgba(5,7,6,.12) 66%),radial-gradient(circle at 66% 48%,${accent}66,transparent 34%)`}}/>
    <div style={{position:'absolute',left:68,top:54,opacity:copyOpacity,transform:`translateY(${copyY}px)`,color:'#f5efe5',fontFamily:'Arial,sans-serif'}}>
      <div style={{fontSize:12,letterSpacing:6}}>ZANSHIN / EAU DE PARFUM</div>
      <div style={{marginTop:120,fontFamily:'Georgia,serif',fontSize:76,lineHeight:1,letterSpacing:-3,textTransform:'uppercase'}}>{identity}</div>
      <div style={{marginTop:22,width:365,height:1,background:accent}}/>
      <div style={{marginTop:18,fontSize:12,letterSpacing:5,color:accent}}>SPRAY · PAUSE · ENTER THE MOMENT</div>
    </div>
  </>;
};

const ConnectedScenes=()=>{
  const frame=useCurrentFrame();
  const workOpacity=interpolate(frame,[0,12,62,82],[0,1,1,0],clamp);
  const togetherOpacity=interpolate(frame,[106,128,226,239],[0,1,1,0],clamp);
  return <>
    <Video name="The weight of the day" src={staticFile('connected-work.mp4')} loop muted durationInFrames={84} style={{...footageStyle,opacity:workOpacity,filter:'saturate(.52) contrast(1.13) brightness(.68)'}}/>
    <Video name="Arrival and connection" src={staticFile('connected-together.mp4')} loop muted from={106} durationInFrames={134} style={{...footageStyle,opacity:togetherOpacity,filter:'saturate(.9) contrast(1.06) brightness(.78)'}}/>
  </>;
};

const MagnetizedScenes=()=>{
  const frame=useCurrentFrame();
  const mirrorOpacity=interpolate(frame,[0,12,62,82],[0,1,1,0],clamp);
  const nightOpacity=interpolate(frame,[106,128,226,239],[0,1,1,0],clamp);
  return <>
    <Video name="Quiet preparation" src={staticFile('magnetized-mirror.mp4')} loop muted durationInFrames={84} style={{...footageStyle,opacity:mirrorOpacity,filter:'saturate(.72) contrast(1.08) brightness(.74)'}}/>
    <Video name="Owning the night" src={staticFile('magnetized-night.mp4')} loop muted from={106} durationInFrames={134} style={{...footageStyle,opacity:nightOpacity,filter:'saturate(.82) contrast(1.12) brightness(.67)'}}/>
  </>;
};

export const CampaignFilm=({identity,accent})=>{
  const frame=useCurrentFrame();
  const transitionGlow=interpolate(frame,[48,84,128],[0,.24,0],clamp);
  const pulse=.05+Math.max(0,Math.sin(frame/34))*.045;
  return <AbsoluteFill style={{background:'#070908',overflow:'hidden'}}>
    {identity==='focused'&&<SingleScene src="focused-work.mp4" tone={.62}/>}
    {identity==='energised'&&<SingleScene src="energised-run.mp4" tone={.88}/>}
    {identity==='connected'&&<ConnectedScenes/>}
    {identity==='magnetized'&&<MagnetizedScenes/>}
    <RitualScene identity={identity} accent={accent}/>
    <AbsoluteFill style={{background:`linear-gradient(90deg,rgba(5,8,7,.72),rgba(5,8,7,.1) 56%,rgba(5,8,7,.18)),radial-gradient(circle at 72% 44%,${accent},transparent 48%)`,mixBlendMode:'multiply',opacity:.36}}/>
    <AbsoluteFill style={{background:accent,opacity:pulse,mixBlendMode:'color'}}/>
    <AbsoluteFill style={{background:'white',opacity:transitionGlow,mixBlendMode:'soft-light'}}/>
    <AbsoluteFill style={{opacity:.1,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%270 0 160 160%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.45%27/%3E%3C/svg%3E")',mixBlendMode:'soft-light'}}/>
  </AbsoluteFill>;
};
