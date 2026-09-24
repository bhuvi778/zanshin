import React from 'react';
import {AbsoluteFill,Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const ease={...clamp,easing:Easing.bezier(.16,1,.3,1)};

const worlds={
  focused:{name:'FOCUSED',number:'01',label:'focused-label.png',base:'#edf4f1',wash:'#c9e3eb',warm:'#f6e8d3'},
  energised:{name:'ENERGISED',number:'02',label:'energised-label.png',base:'#eef2fb',wash:'#c9d5f6',warm:'#fae6c6'},
  connected:{name:'CONNECTED',number:'03',label:'connected-label.png',base:'#eff1e7',wash:'#cfdcc1',warm:'#f6e7d5'},
  magnetized:{name:'MAGNETIZED',number:'04',label:'magnetized-label.png',base:'#f7e9e8',wash:'#e8bdc6',warm:'#f5dfc9'}
};

const LightWorld=({identity,accent,data})=>{
  const frame=useCurrentFrame();
  const drift=interpolate(frame,[0,215],[-46,48],clamp);
  const breathe=1+Math.sin(frame/34)*.025;
  return <AbsoluteFill style={{background:`linear-gradient(122deg,#faf7f0 0%,${data.base} 44%,${data.wash} 100%)`}}>
    <div style={{position:'absolute',right:-150,top:-210,width:820,height:820,borderRadius:'50%',background:`radial-gradient(circle at 42% 55%,#fff 0 4%,${data.warm}aa 24%,${data.wash}55 48%,transparent 71%)`,filter:'blur(4px)',scale:breathe,translate:`${drift*.25}px 0`}}/>
    <div style={{position:'absolute',left:'38%',top:-130,width:240,height:980,background:'linear-gradient(90deg,transparent,#fff9,transparent)',filter:'blur(16px)',rotate:'24deg',translate:`${drift}px 0`,opacity:.72}}/>
    {identity==='focused'&&<div style={{position:'absolute',right:34,top:-90,width:740,height:740,borderRadius:'50%',background:`repeating-radial-gradient(circle,transparent 0 54px,${accent}4a 55px 56px,transparent 57px 88px)`,translate:`${drift*.35}px ${-drift*.12}px`}}/>}
    {identity==='energised'&&Array.from({length:7},(_,i)=><div key={i} style={{position:'absolute',left:`${38+i*8}%`,top:-140,width:2,height:940,background:`linear-gradient(transparent,${accent}5c,transparent)`,rotate:'27deg',translate:`${drift*(i%2?1:-.4)}px 0`,opacity:.45}}/>)}
    {identity==='connected'&&<><div style={{position:'absolute',right:230,top:96,width:470,height:470,borderRadius:'50%',border:`1px solid ${accent}88`,background:'#fff2',translate:`${drift*.28}px 0`}}/><div style={{position:'absolute',right:-50,top:96,width:470,height:470,borderRadius:'50%',border:`1px solid ${accent}72`,background:'#fff2',translate:`${-drift*.28}px 0`}}/></>}
    {identity==='magnetized'&&<div style={{position:'absolute',right:-40,top:44,width:690,height:590,borderRadius:'50%',border:`2px solid ${accent}66`,boxShadow:`inset 0 0 100px ${accent}38,0 0 120px #fff`,rotate:`${interpolate(frame,[0,215],[-6,8],clamp)}deg`,scale:breathe}}/>}
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:178,background:'linear-gradient(transparent,#f9f5ecb8)'}}/>
  </AbsoluteFill>;
};

const SprayMist=({accent})=>{
  const frame=useCurrentFrame();
  const progress=interpolate(frame,[84,118],[0,1],clamp);
  const opacity=interpolate(frame,[78,88,112,126],[0,1,.8,0],clamp);
  return <div style={{position:'absolute',left:164,top:144,width:1,height:1,opacity}}>
    <div style={{position:'absolute',left:-245,top:-84,width:280,height:165,borderRadius:'50%',background:`radial-gradient(ellipse,#fff 0,${accent}6b 28%,transparent 72%)`,filter:'blur(10px)',scale:.55+progress*.6,translate:`${-progress*70}px ${-progress*6}px`}}/>
    {Array.from({length:42},(_,i)=>{
      const lane=(i%11)-5;
      const distance=55+(i*41)%250;
      const size=1+(i%4)*.7;
      return <i key={i} style={{position:'absolute',display:'block',width:size,height:size,borderRadius:'50%',background:i%5===0?'#fff':accent,boxShadow:`0 0 ${4+size*2}px #fff`,opacity:.4+(i%4)*.14,translate:`${-progress*distance}px ${lane*(4+progress*6)+Math.sin((frame+i)/5)*5}px`}}/>;
    })}
  </div>;
};

const HeroBottle=({data,accent})=>{
  const frame=useCurrentFrame();
  const opacity=interpolate(frame,[0,14,204,215],[0,1,1,0],clamp);
  const x=interpolate(frame,[0,45,170,215],[125,0,-6,-22],ease);
  const y=interpolate(frame,[0,50,170,215],[20,0,-8,-18],ease);
  const scale=interpolate(frame,[0,54,170,215],[.9,1,1.025,1.045],ease);
  const rotateY=interpolate(frame,[0,52,148,205],[14,-3,2,0],ease);
  const capLift=interpolate(frame,[60,82,118,140],[0,-78,-78,0],ease);
  const press=interpolate(frame,[79,88,96],[0,7,0],clamp);
  const sheen=interpolate(frame,[20,110,196],[-170,100,350],clamp);
  return <div style={{position:'absolute',right:104,top:74,width:410,height:618,opacity,translate:`${x}px ${y}px`,scale,transform:`perspective(1200px) rotateY(${rotateY}deg)`,transformStyle:'preserve-3d'}}>
    <div style={{position:'absolute',left:48,right:37,bottom:5,height:42,borderRadius:'50%',background:`radial-gradient(ellipse,${accent}6b,transparent 68%)`,filter:'blur(11px)',opacity:.85}}/>
    <div style={{position:'absolute',left:171,top:151,width:67,height:31,borderRadius:'8px 8px 3px 3px',background:'linear-gradient(90deg,#74431e,#f3ce8d 45%,#8d5828)',boxShadow:'0 0 24px #fff9'}}/>
    <div style={{position:'absolute',left:178,top:139,width:54,height:19,borderRadius:'5px 5px 2px 2px',background:'linear-gradient(90deg,#8b5423,#f8dfad 48%,#78451e)',translate:`0 ${press}px`}}/>
    <Img src={staticFile('concept-bottle.webp')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',clipPath:'inset(28% 0 0 0)',filter:'drop-shadow(0 25px 24px #604b3030)'}}/>
    <Img src={staticFile(data.label)} style={{position:'absolute',left:'24.2%',top:'35.5%',width:'53.6%',height:'49.8%',objectFit:'fill',filter:'saturate(.94) contrast(1.02)'}}/>
    <div style={{position:'absolute',left:`${sheen}px`,top:176,width:48,height:370,background:'linear-gradient(90deg,transparent,#fff,transparent)',filter:'blur(10px)',rotate:'9deg',opacity:.58,mixBlendMode:'screen'}}/>
    <Img src={staticFile('concept-bottle.webp')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',clipPath:'inset(0 0 68% 0)',translate:`0 ${capLift}px`,filter:'drop-shadow(0 14px 13px #70593a45)'}}/>
    <SprayMist accent={accent}/>
  </div>;
};

export const HeroFilm=({identity,accent})=>{
  const frame=useCurrentFrame();
  const data=worlds[identity];
  const markOpacity=interpolate(frame,[8,28,190,214],[0,.1,.1,0],clamp);
  return <AbsoluteFill style={{overflow:'hidden',background:data.base,color:'#202521'}}>
    <LightWorld identity={identity} accent={accent} data={data}/>
    <div style={{position:'absolute',right:495,top:120,fontFamily:'Georgia,serif',fontSize:270,lineHeight:1,color:accent,opacity:markOpacity}}>残心</div>
    <HeroBottle data={data} accent={accent}/>
    <div style={{position:'absolute',inset:0,opacity:.035,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%270 0 160 160%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.8%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',mixBlendMode:'multiply'}}/>
  </AbsoluteFill>;
};
