import React from 'react';
import {Composition} from 'remotion';
import {CampaignFilm} from './CampaignFilm';

const films=[
  {id:'FocusedCampaign',identity:'focused',accent:'#8ab5ca'},
  {id:'EnergisedCampaign',identity:'energised',accent:'#6688e1'},
  {id:'ConnectedCampaign',identity:'connected',accent:'#a5b48b'},
  {id:'MagnetizedCampaign',identity:'magnetized',accent:'#bf6a78'}
];

export const RemotionRoot=()=>films.map((film)=><Composition key={film.id} id={film.id} component={CampaignFilm} width={1280} height={720} fps={24} durationInFrames={240} defaultProps={film}/>);
