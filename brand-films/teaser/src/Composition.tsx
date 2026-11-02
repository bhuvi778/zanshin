import {AbsoluteFill, CanvasImage, Composition, Easing, Interactive, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const Petals = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  return <AbsoluteFill style={{pointerEvents:'none'}}>{Array.from({length:42}, (_, i) => {
    const depth = random('depth'+i);
    const x = random('x'+i)*2050-100;
    const y = ((random('y'+i)*1300+time*(23+depth*29))%1300)-110;
    const size=9+depth*17;
    return <svg key={i} viewBox="0 0 40 28" style={{position:'absolute',left:x+Math.sin(time*.48+i)*(45+depth*65)+time*5,top:y,width:size,height:size*.7,rotate:(i*31+time*(13+depth*30))+'deg',scale:(.6+Math.abs(Math.sin(time*.55+i))*.4)+' 1',opacity:.38+depth*.44,filter:depth<.2?'blur(2px)':'none'}}><path d="M1 14Q11-6 23 6Q37 3 39 14Q23 34 1 14" fill={i%3===0?'#f3c1bd':'#fce1d3'}/><path d="M4 14Q22 15 33 11" fill="none" stroke="#c98d85" strokeWidth=".7" opacity=".5"/></svg>;
  })}</AbsoluteFill>;
};
export const BrandTeaser = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const t=frame/fps;
  return <AbsoluteFill style={{background:'#1c2417',overflow:'hidden',color:'#f8efdf'}}>
    <style>{"@font-face{font-family:TeaserSans;src:url('"+staticFile('Poppins-Regular.ttf')+"')}*{box-sizing:border-box}"}</style>
    <CanvasImage src={staticFile('sakura-scene.png')} premountFor={fps} style={{width:'100%',height:'100%',objectFit:'cover',scale:interpolate(frame,[0,18*fps],[1.015,1.065]),translate:interpolate(frame,[0,18*fps],['0px 0px','-19px -9px']),opacity:interpolate(frame,[0,1.2*fps],[.25,1],clamp)}}/>
    <AbsoluteFill style={{background:'linear-gradient(90deg,transparent 29%,rgba(17,29,20,.08) 44%,rgba(17,27,18,.4) 70%,rgba(12,22,16,.48))'}}/>
    <Interactive.Div name="Moving sunlight" premountFor={fps} style={{position:'absolute',width:1500,height:1600,left:-170,top:-700,rotate:(-24+Math.sin(t*.19)*3)+'deg',background:'conic-gradient(from 166deg at 54% 12%,transparent 0deg,#ffe5ba20 9deg,transparent 13deg,#ffe8bf12 20deg,transparent 29deg)',mixBlendMode:'screen',opacity:.45+Math.sin(t*.4)*.17}}/>
    <Interactive.Div name="Drifting low mist" premountFor={fps} style={{position:'absolute',bottom:-100,left:-450,width:2650,height:350,background:'radial-gradient(ellipse at 30% 70%,#e7dfce23,transparent 50%),radial-gradient(ellipse at 75% 80%,#cad2c41b,transparent 46%)',filter:'blur(28px)',translate:(Math.sin(t*.19)*100)+'px '+(Math.cos(t*.24)*15)+'px'}}/>
    <Petals/>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 46%,transparent 45%,#08120d40 100%)'}}/>
    <Interactive.Div name="Zanshin wordmark" premountFor={fps} style={{position:'absolute',left:1060,top:154,opacity:interpolate(frame,[.7*fps,2*fps],[0,1],clamp)}}>
      <div style={{fontFamily:'Georgia,serif',fontSize:34,letterSpacing:13,color:'#e5d2a8'}}>ZANSHIN</div>
      <div style={{width:52,height:1,background:'#d2b385',marginTop:35}}/>
    </Interactive.Div>
    <Interactive.Div name="Some Moments Deserve a Story." premountFor={fps} style={{position:'absolute',left:1050,top:304,width:740,fontFamily:'Georgia,serif',fontSize:96,letterSpacing:-2.6,lineHeight:1.11,opacity:interpolate(frame,[1.1*fps,2.9*fps],[0,1],clamp),translate:interpolate(frame,[1.1*fps,2.9*fps],['0px 22px','0px 0px'],{...clamp,easing:Easing.bezier(.16,1,.3,1)})}}>Some Moments<br/>Deserve a Story.</Interactive.Div>
    <Interactive.Div name="Brand film announcement" premountFor={fps} style={{position:'absolute',left:1056,top:564,width:650,fontFamily:'TeaserSans,sans-serif',fontSize:32,lineHeight:1.85,color:'#e7e3d4',opacity:interpolate(frame,[3.2*fps,4.7*fps],[0,1],clamp),translate:interpolate(frame,[3.2*fps,4.7*fps],['0px 14px','0px 0px'],clamp)}}>Our brand film is in the making. A story of fragrance, feelings and the moments that make life meaningful.</Interactive.Div>
    <Interactive.Div name="Coming soon." premountFor={fps} style={{position:'absolute',left:1058,top:842,fontFamily:'Georgia,serif',fontStyle:'italic',fontSize:45,color:'#ead3a9',opacity:interpolate(frame,[7*fps,8.8*fps],[0,1],clamp)}}>Coming soon.</Interactive.Div>
    <AbsoluteFill style={{background:'#0b160f',opacity:interpolate(frame,[17*fps,18*fps],[0,.88],clamp)}}/>
  </AbsoluteFill>;
};
export const MyComposition = () => <Composition id="Zanshin-Brand-Teaser" component={BrandTeaser} durationInFrames={540} fps={30} width={1920} height={1080}/>;
