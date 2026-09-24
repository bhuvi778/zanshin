import React from 'react';
import {Composition} from 'remotion';
import {BrandFilm} from './BrandFilm';
import {HeroFilm} from './HeroFilm';

const films=[
  {id:'Focused',identity:'FOCUSED',image:'emotion-focused-v1.png',accent:'#8ab5ca',before:'THE NOISE WAS EVERYWHERE.',after:'THEN ATTENTION FOUND ITS PLACE.',cue:'CLARITY / DISCIPLINE / DEEP WORK',number:'01'},
  {id:'Energised',identity:'ENERGISED',image:'emotion-energised-v1.png',accent:'#6688e1',before:'THE DAY HAD NOT STARTED YET.',after:'THEN THE BODY REMEMBERED FORWARD.',cue:'ENERGY / MOMENTUM / VITALITY',number:'02'},
  {id:'Connected',identity:'CONNECTED',image:'emotion-connected-v1.png',accent:'#a5b48b',before:'HE CARRIED THE WHOLE DAY WITH HIM.',after:'THEN SOMEONE MADE THE MOMENT LIGHTER.',cue:'HARMONY / RELATIONSHIPS / BELONGING',number:'03'},
  {id:'Magnetized',identity:'MAGNETIZED',image:'emotion-magnetized-v1.png',accent:'#bf6a78',before:'SHE PAUSED AT THE EDGE OF THE NIGHT.',after:'THEN PRESENCE BECAME ENOUGH.',cue:'CONFIDENCE / PRESENCE / ATTRACTION',number:'04'}
];

export const RemotionRoot=()=>films.flatMap((film)=>[
  <Composition key={film.id} id={film.id} component={BrandFilm} width={1280} height={720} fps={24} durationInFrames={240} defaultProps={film}/>,
  <Composition key={`${film.id}Hero`} id={`${film.id}Hero`} component={HeroFilm} width={1280} height={720} fps={24} durationInFrames={240} defaultProps={film}/>
]);
