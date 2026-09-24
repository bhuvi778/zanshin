import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Video} from '@remotion/media';
import {staticFile} from 'remotion';
// An eight-second slow-motion edit of a verified 3.5625 second generated take.
// This adjusts pacing; it does not claim new generated action or extra story scenes.
export const EmotionEdit=({identity})=><AbsoluteFill style={{background:'#f2eee5'}}><Video src={staticFile(`${identity}-emotion-video.mp4`)} muted playbackRate={3.5625/8} style={{width:'100%',height:'100%',objectFit:'cover'}}/></AbsoluteFill>;
