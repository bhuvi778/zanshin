import React from 'react';
import {Composition} from 'remotion';
import {CampaignFilm} from './CampaignFilm';
import {HeroFilm} from './HeroFilm';
import {EmotionEdit} from './EmotionEdit';
import {EnsoFilm} from './EnsoFilm';

const films=[
  {id:'FocusedCampaign',identity:'focused',accent:'#8ab5ca'},
  {id:'EnergisedCampaign',identity:'energised',accent:'#6688e1'},
  {id:'ConnectedCampaign',identity:'connected',accent:'#a5b48b'},
  {id:'MagnetizedCampaign',identity:'magnetized',accent:'#bf6a78'}
];

export const RemotionRoot=()=>[
 <Composition key="EnsoEffect" id="EnsoEffect" component={EnsoFilm} width={1280} height={720} fps={24} durationInFrames={336}/>,
 <Composition key="EnsoEffectPortrait" id="EnsoEffectPortrait" component={EnsoFilm} width={720} height={1280} fps={24} durationInFrames={336}/>,
 <Composition key="ZanshinBrand" id="ZanshinBrand" component={EnsoFilm} width={1280} height={720} fps={24} durationInFrames={336} defaultProps={{brand:true}}/>,
 <Composition key="ZanshinBrandPortrait" id="ZanshinBrandPortrait" component={EnsoFilm} width={720} height={1280} fps={24} durationInFrames={336} defaultProps={{brand:true}}/>,
 ...films.flatMap((film)=>[
  <Composition key={film.id} id={film.id} component={CampaignFilm} width={1280} height={720} fps={24} durationInFrames={240} defaultProps={film}/>,
  <Composition key={`${film.id}Hero`} id={`${film.id.replace('Campaign','')}Hero`} component={HeroFilm} width={1280} height={720} fps={24} durationInFrames={216} defaultProps={film}/>
] ),...['Focused','Energised'].map(name=><Composition key={name+'Emotion'} id={name+'Emotion'} component={EmotionEdit} width={1280} height={720} fps={24} durationInFrames={192} defaultProps={{identity:name.toLowerCase()}}/>)];
