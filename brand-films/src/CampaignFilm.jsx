import React from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const ease={...clamp,easing:Easing.bezier(.16,1,.3,1)};
const footageStyle={position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'};

const identities={
  focused:{number:'01',name:'FOCUSED',descriptor:'CLARITY · DISCIPLINE · DEEP WORK',promise:'MAKE ROOM FOR ONE THING',label:'focused-label.png'},
  energised:{number:'02',name:'ENERGISED',descriptor:'ENERGY · MOMENTUM · VITALITY',promise:'MOVE BEFORE THE MOMENT PASSES',label:'energised-label.png'},
  connected:{number:'03',name:'CONNECTED',descriptor:'HARMONY · RELATIONSHIPS · BELONGING',promise:'ARRIVE FOR WHO MATTERS',label:'connected-label.png'},
  magnetized:{number:'04',name:'MAGNETIZED',descriptor:'CONFIDENCE · PRESENCE · ATTRACTION',promise:'ENTER AS YOURSELF',label:'magnetized-label.png'}
};

const EmotionLayer=({identity})=>{
  const frame=useCurrentFrame();
  const introOpacity=interpolate(frame,[0,10,43,68],[0,1,1,0],clamp);
  const outroOpacity=interpolate(frame,[174,194,229,239],[0,.28,.28,0],clamp);
  const common={...footageStyle,filter:'saturate(.48) contrast(1.15) brightness(.62)'};
  if(identity==='connected')return <>
    <Video src={staticFile('connected-work.mp4')} loop muted durationInFrames={72} style={{...common,opacity:introOpacity}}/>
    <Video src={staticFile('connected-together.mp4')} loop muted from={168} durationInFrames={72} style={{...common,opacity:outroOpacity,filter:'saturate(.72) contrast(1.08) brightness(.62)'}}/>
  </>;
  if(identity==='magnetized')return <>
    <Video src={staticFile('magnetized-mirror.mp4')} loop muted durationInFrames={72} style={{...common,opacity:introOpacity}}/>
    <Video src={staticFile('magnetized-night.mp4')} loop muted from={168} durationInFrames={72} style={{...common,opacity:outroOpacity,filter:'saturate(.75) contrast(1.12) brightness(.56)'}}/>
  </>;
  const src=identity==='focused'?'focused-work.mp4':'energised-run.mp4';
  return <Video src={staticFile(src)} loop muted style={{...common,opacity:introOpacity+outroOpacity}}/>;
};

const IdentityWorld=({identity,accent})=>{
  const frame=useCurrentFrame();
  const reveal=interpolate(frame,[42,72],[0,1],ease);
  const drift=interpolate(frame,[42,239],[-26,24],clamp);
  const orbit=interpolate(frame,[42,239],[-7,11],clamp);
  const connected=identity==='connected';
  const energised=identity==='energised';
  const magnetized=identity==='magnetized';
  return <AbsoluteFill style={{opacity:reveal,background:`radial-gradient(circle at 72% 46%,${accent}55,transparent 31%),linear-gradient(112deg,#060807 8%,#101713 55%,#060706)`}}>
    <div style={{position:'absolute',inset:-140,background:`repeating-radial-gradient(circle at 72% 47%,transparent 0 48px,${accent}24 49px 50px,transparent 51px 90px)`,opacity:identity==='focused'?.75:.34,transform:`translateX(${drift}px) rotate(${orbit}deg)`}}/>
    {energised&&Array.from({length:9},(_,i)=><div key={i} style={{position:'absolute',left:`${45+i*7}%`,top:-120,width:2,height:960,background:`linear-gradient(transparent,${accent}aa,transparent)`,opacity:.18+(i%3)*.08,transform:`translateX(${drift*(i%2?1:-1)}px) rotate(28deg)`}}/>)}
    {connected&&<><div style={{position:'absolute',width:470,height:470,border:`1px solid ${accent}88`,borderRadius:'50%',right:160,top:128,transform:`translateX(${drift}px)`}}/><div style={{position:'absolute',width:470,height:470,border:`1px solid ${accent}66`,borderRadius:'50%',right:-80,top:128,transform:`translateX(${-drift}px)`}}/></>}
    {magnetized&&<div style={{position:'absolute',right:-130,top:60,width:760,height:600,border:`1px solid ${accent}aa`,borderRadius:'50%',boxShadow:`inset 0 0 90px ${accent}33,0 0 90px ${accent}22`,transform:`rotate(${orbit}deg) scale(${1+Math.sin(frame/35)*.018})`}}/>}
    <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(4,6,5,.94),rgba(4,6,5,.35) 52%,transparent 78%)'}}/>
  </AbsoluteFill>;
};

const Mist=({accent})=>{
  const frame=useCurrentFrame();
  const progress=interpolate(frame,[124,156],[0,1],clamp);
  const opacity=interpolate(frame,[119,128,151,165],[0,1,.85,0],clamp);
  return <div style={{position:'absolute',left:150,top:137,width:1,height:1,opacity}}>
    <div style={{position:'absolute',left:-235,top:-76,width:260,height:150,borderRadius:'50%',background:`radial-gradient(ellipse,${accent}66,${accent}22 35%,transparent 72%)`,filter:'blur(12px)',scale:.65+progress*.55,translate:`${-progress*58}px ${-progress*8}px`}}/>
    {Array.from({length:34},(_,i)=>{
      const lane=(i%9)-4;
      const distance=42+(i*37)%230;
      const size=1+(i%4)*.75;
      return <i key={i} style={{position:'absolute',display:'block',width:size,height:size,borderRadius:'50%',background:i%4===0?'#fff':accent,boxShadow:`0 0 ${3+size*2}px ${accent}`,opacity:.35+(i%5)*.12,translate:`${-progress*distance}px ${lane*(4+progress*7)+Math.sin((frame+i)/6)*6}px`}}/>;
    })}
  </div>;
};

const BottleStage=({label,accent})=>{
  const frame=useCurrentFrame();
  const opacity=interpolate(frame,[48,68,222,239],[0,1,1,0],clamp);
  const x=interpolate(frame,[48,82,205,239],[150,0,0,-25],ease);
  const y=interpolate(frame,[48,90,205,239],[30,0,-5,-16],ease);
  const scale=interpolate(frame,[48,90,205,239],[.84,1,1.025,1.04],ease);
  const rotateY=interpolate(frame,[48,92,165,230],[18,-3,3,0],ease);
  const capLift=interpolate(frame,[98,120,154,176],[0,-82,-82,0],ease);
  const atomizerPress=interpolate(frame,[118,126,134],[0,7,0],clamp);
  const sheen=interpolate(frame,[70,132,190],[-160,120,330],clamp);
  return <div style={{position:'absolute',right:102,top:80,width:390,height:588,opacity,translate:`${x}px ${y}px`,scale,transform:`perspective(1100px) rotateY(${rotateY}deg)`,transformStyle:'preserve-3d'}}>
    <div style={{position:'absolute',left:47,right:34,bottom:2,height:42,borderRadius:'50%',background:'#000',filter:'blur(16px)',opacity:.72,scale:`${1.1-scale*.08} 1`}}/>
    <div style={{position:'absolute',left:163,top:143,width:64,height:30,borderRadius:'8px 8px 3px 3px',background:'linear-gradient(90deg,#704019,#f3ce8d 45%,#8b5423)',boxShadow:'0 0 22px #dfb16a66'}}/>
    <div style={{position:'absolute',left:169,top:132,width:52,height:18,borderRadius:'5px 5px 2px 2px',background:'linear-gradient(90deg,#8b5423,#f8dfad 48%,#78451e)',translate:`0 ${atomizerPress}px`}}/>
    <Img src={staticFile('concept-bottle.webp')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',clipPath:'inset(28% 0 0 0)'}}/>
    <Img src={staticFile(label)} style={{position:'absolute',left:'24.2%',top:'35.5%',width:'53.6%',height:'49.8%',objectFit:'fill',filter:'saturate(.9) contrast(1.02)',boxShadow:'inset 0 0 18px #fff8'}}/>
    <div style={{position:'absolute',left:`${sheen}px`,top:168,width:42,height:360,background:'linear-gradient(90deg,transparent,#fff9,transparent)',filter:'blur(10px)',rotate:'9deg',opacity:.45,mixBlendMode:'screen'}}/>
    <Img src={staticFile('concept-bottle.webp')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',clipPath:'inset(0 0 68% 0)',translate:`0 ${capLift}px`,filter:'drop-shadow(0 16px 16px #0007)'}}/>
    <Mist accent={accent}/>
  </div>;
};

const BrandCopy=({data,accent})=>{
  const frame=useCurrentFrame();
  const introOpacity=interpolate(frame,[4,14,40,54],[0,1,1,0],clamp);
  const reveal=interpolate(frame,[62,82],[0,1],ease);
  const outro=interpolate(frame,[208,230],[1,0],clamp);
  const y=interpolate(frame,[62,86],[26,0],ease);
  return <>
    <div style={{position:'absolute',left:66,top:60,color:'#f4eee4',fontFamily:'Arial,sans-serif',fontSize:11,letterSpacing:6,opacity:.8}}>ZANSHIN · BEGIN WITH THE MOMENT</div>
    <div style={{position:'absolute',left:66,top:258,width:560,color:'#f4eee4',opacity:introOpacity,fontFamily:'Georgia,serif'}}>
      <div style={{fontFamily:'Arial,sans-serif',fontSize:11,letterSpacing:5,color:accent}}>THE MOMENT BEFORE / {data.number}</div>
      <div style={{marginTop:22,fontSize:54,lineHeight:1.08,letterSpacing:-1.5}}>{data.promise}</div>
    </div>
    <div style={{position:'absolute',left:66,top:178,width:530,color:'#f4eee4',opacity:reveal*outro,translate:`0 ${y}px`}}>
      <div style={{fontFamily:'Arial,sans-serif',fontSize:11,letterSpacing:6,color:accent}}>ZANSHIN / EAU DE PARFUM / {data.number}</div>
      <div style={{marginTop:24,fontFamily:'Georgia,serif',fontSize:82,lineHeight:.96,letterSpacing:-2.5}}>{data.name}</div>
      <div style={{marginTop:28,width:410,height:1,background:`linear-gradient(90deg,${accent},transparent)`}}/>
      <div style={{marginTop:20,fontFamily:'Arial,sans-serif',fontSize:12,letterSpacing:4,color:'#d9d6cf'}}>{data.descriptor}</div>
      <div style={{marginTop:82,display:'flex',alignItems:'center',gap:18,fontFamily:'Arial,sans-serif',fontSize:10,letterSpacing:4,color:accent}}><span style={{width:36,height:1,background:accent}}/>SPRAY · PAUSE · ENTER</div>
      <div style={{marginTop:14,fontFamily:'Arial,sans-serif',fontSize:9,letterSpacing:4,color:'#bcbdb8'}}>50 ML · 1.7 FL.OZ.</div>
    </div>
  </>;
};

export const CampaignFilm=({identity,accent})=>{
  const frame=useCurrentFrame();
  const data=identities[identity];
  const finalGlow=interpolate(frame,[118,132,162],[0,.18,0],clamp);
  return <AbsoluteFill style={{background:'#050706',overflow:'hidden'}}>
    <EmotionLayer identity={identity}/>
    <IdentityWorld identity={identity} accent={accent}/>
    <BottleStage label={data.label} accent={accent}/>
    <AbsoluteFill style={{background:'#fff',opacity:finalGlow,mixBlendMode:'soft-light'}}/>
    <BrandCopy data={data} accent={accent}/>
    <AbsoluteFill style={{opacity:.07,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%270 0 160 160%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.45%27/%3E%3C/svg%3E")',mixBlendMode:'soft-light'}}/>
    <div style={{position:'absolute',left:66,right:66,bottom:30,height:1,background:`linear-gradient(90deg,${accent},#ffffff33,transparent)`,scale:`${interpolate(frame,[0,239],[0,1],clamp)} 1`,transformOrigin:'left'}}/>
  </AbsoluteFill>;
};
