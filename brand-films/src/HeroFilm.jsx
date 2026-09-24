import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

export const HeroFilm=({image,accent})=>{
  const frame=useCurrentFrame();
  const {fps,durationInFrames}=useVideoConfig();
  const entrance=spring({frame,fps,config:{damping:28,stiffness:55,mass:1.2}});
  const loopProgress=frame/(durationInFrames-1);
  const scale=interpolate(loopProgress,[0,.5,1],[1.08,1.13,1.08]);
  const driftX=interpolate(loopProgress,[0,.5,1],[-1.8,1.8,-1.8]);
  const driftY=interpolate(loopProgress,[0,.5,1],[1,-1,1]);
  const glow=interpolate(Math.sin(loopProgress*Math.PI*2),[-1,1],[.12,.28]);
  const sweep=interpolate(frame,[0,durationInFrames],[-35,135]);

  return <AbsoluteFill style={{background:'#080807',overflow:'hidden'}}>
    <Img
      src={staticFile(`assets/${image}`)}
      style={{
        width:'100%',height:'100%',objectFit:'cover',
        transform:`translate(${driftX}%, ${driftY}%) scale(${scale})`,
        filter:`saturate(${.78+.18*entrance}) contrast(1.06) brightness(${.72+.11*entrance})`
      }}
    />
    <AbsoluteFill style={{background:`radial-gradient(circle at 72% 42%, ${accent}${Math.round(glow*255).toString(16).padStart(2,'0')} 0%, transparent 47%), linear-gradient(90deg, rgba(5,5,4,.78) 0%, rgba(5,5,4,.28) 48%, rgba(5,5,4,.18) 100%)`}}/>
    <AbsoluteFill style={{background:`linear-gradient(108deg, transparent ${sweep-22}%, rgba(255,255,255,.09) ${sweep}%, transparent ${sweep+18}%)`,mixBlendMode:'screen'}}/>
    <AbsoluteFill style={{opacity:.12,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%270 0 160 160%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.42%27/%3E%3C/svg%3E")',mixBlendMode:'soft-light'}}/>
  </AbsoluteFill>;
};
