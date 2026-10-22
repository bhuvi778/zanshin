// Public free demos only. No paid API, credential handling, automatic retries or quota bypass.
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve,basename} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../..',import.meta.url)));
const take=process.argv.find(arg=>arg.startsWith('--take='))?.slice(7);
if(take&&!/^[a-z0-9-]+$/.test(take))throw Error('Invalid take name');
const output=resolve(root,'../../design-review/fragrance-free-oct22'+(take?'-'+take:''));
const slug=process.argv[2]||'focused';
const light=process.argv.includes('--light-test');
const preview=process.argv.includes('--free-preview');
const wan=process.argv.includes('--wan');
const heroQuality=process.argv.includes('--hero-quality');
const source=process.argv.find(arg=>arg.startsWith('--source='))?.slice(9);
const base=wan?'https://zerogpu-aoti-wan2-2-fp8da-aoti-faster.hf.space':'https://lightricks-ltx-video-distilled.hf.space';
const jobs={
 focused:{image:'brand-films/artwork/original-focused.png',width:896,height:512,prompt:'A cinematic live action fragrance scene. The adult man in the blue linen shirt calmly lowers his perfume bottle onto the desk and opens his eyes. His expression shifts from contemplation to attentive focus. He gently leans toward the architectural sketch and draws a deliberate pencil line, then pauses with a small satisfied exhale. Natural blinking, breathing and coordinated hand movement. Preserve the same face, room, outfit, Zanshin bottle label and bottle geometry. The bottle rests upright and remains still. The camera makes a very slow lateral move; the person must genuinely move, not remain a still photograph. Bright natural light, realistic skin texture.'},
 energised:{image:'client/public/assets/enso-home/sku-energised-v2.webp',width:512,height:768,prompt:'A realistic live action workout scene in a sunlit Japanese cedar gym overlooking Mount Fuji. The same adult athlete in blue performs one controlled kettlebell deadlift: she extends her hips and knees to stand, lowers the weight safely, exhales and gives a small proud breathless smile. Genuine physical effort, steady feet, natural sweat, realistic anatomy. Preserve the same face, hair, outfit, kettlebell and room. No new person, no added text. Locked camera. The athlete must move naturally.'},
 connected:{image:'brand-films/artwork/original-connected.png',width:896,height:512,prompt:'A realistic live action intimate conversation. The adult couple in cream linen make warm eye contact. The woman gently tilts her head and smiles as she finishes a thought; the man listens, blinks naturally and returns a warm smile. He softly squeezes her hand once. Their shoulders and breathing move naturally. The perfume bottle remains completely still and upright on the table, with its shape and label unchanged. Preserve both identities, clothes, lighting and setting. No kissing or exaggerated laughter. Very restrained camera drift, real facial expressions and hand movement.'},
 magnetized:{image:'brand-films/artwork/original-magnetized.png',width:896,height:512,prompt:'A realistic live action luxury fragrance scene in a bright art gallery. The adult woman in burgundy gently lowers the perfume bottle a little while holding it upright, relaxes her shoulders, lifts her chin slightly and turns her eyes toward someone just off camera. A small confident warm smile forms, conveying self assured presence and chemistry. Natural blinking, breathing, hand movement and gentle fabric movement. Preserve her identity, outfit, fingers, bottle shape and exact label. No walking, no crowd, no sudden body turn. Camera slowly moves sideways; genuine expressive character motion rather than a zoom on a still.'}
};
const job=jobs[slug];if(!job)throw Error('Unknown fragrance');
if(light||preview){if(slug==='energised')job.image=resolve(output,'energised-input.png');job.width=slug==='energised'?512:768;job.height=slug==='energised'?768:448;}
if(heroQuality){job.width=1088;job.height=608;}
if(source)job.image=source;
await mkdir(output,{recursive:true});
if(slug==='energised'&&(light||preview)&&!source){
 const converted=spawnSync(resolve(root,'brand-films/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'),['-y','-v','error','-i',resolve(root,'client/public/assets/enso-home/sku-energised-v2.webp'),job.image],{stdio:'inherit'});
 if(converted.status!==0)throw Error('Could not prepare PNG input');
}
const suffix=wan?'-wan':light?'-light':preview?'-preview':'';
const state={provider:base,slug,status:'preparing',createdAt:new Date().toISOString(),prompt:job.prompt};
const save=()=>writeFile(resolve(output,slug+suffix+'-ltx-status.json'),JSON.stringify(state,null,2));
try{
 await save();
 const form=new FormData();form.append('files',new Blob([await readFile(resolve(root,job.image))]),basename(job.image));
 const upload=await fetch(base+'/gradio_api/upload',{method:'POST',body:form,signal:AbortSignal.timeout(60000)});
 if(!upload.ok)throw Error('Upload failed '+upload.status+': '+(await upload.text()).slice(0,1200));
 const paths=await upload.json();if(!paths[0])throw Error('No uploaded file path');
 const image={path:paths[0],orig_name:basename(job.image),meta:{_type:'gradio.FileData'}};
 const data=[job.prompt,'still image, frozen person, slideshow, zoom only, distorted faces, warped fingers, extra limbs, bottle morphing, captions, watermark',image,null,job.height,job.width,'image-to-video',light?4:preview?6:8,heroQuality?12:9,42,false,1,!(light||preview)];
 const endpoint=wan?'generate_video':'image_to_video';
 const requestData=wan?[image,job.prompt,6,'static still image, slideshow, zoom only, deformed fingers, distorted face, warped bottle, captions',5,1,1,42,false]:data;
 const response=await fetch(base+'/gradio_api/call/'+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:requestData}),signal:AbortSignal.timeout(60000)});
 const submitted=await response.json();if(!response.ok||!submitted.event_id)throw Error(JSON.stringify(submitted));
 state.status='submitted';state.eventId=submitted.event_id;await save();console.log('Submitted',slug,state.eventId);
 const stream=await fetch(base+'/gradio_api/call/'+endpoint+'/'+state.eventId,{signal:AbortSignal.timeout(15*60*1000)});
 if(!stream.ok)throw Error('Result stream failed '+stream.status);
 let buffer='';for await(const chunk of stream.body){const text=Buffer.from(chunk).toString();buffer+=text;if(text.includes('event:'))console.log(text.slice(0,1800));}
 state.response=buffer;
 const complete=buffer.match(/event: complete\s+data: (.+)/);
 if(!complete)throw Error(buffer.slice(-3000)||'No completed generation');
 const values=JSON.parse(complete[1]),file=values[0]?.video||values[0];
 if(!file?.url)throw Error('No result video URL');
 state.videoUrl=file.url;await save();
 const download=await fetch(file.url,{signal:AbortSignal.timeout(120000)});if(!download.ok)throw Error('Download failed '+download.status);
 const bytes=Buffer.from(await download.arrayBuffer());if(bytes.subarray(4,8).toString()!=='ftyp')throw Error('Response is not an MP4');
 state.output=resolve(output,slug+suffix+'-ltx-trial.mp4');await writeFile(state.output,bytes);state.status='completed';await save();console.log('Saved',state.output);
}catch(error){state.status='failed';state.error=error.message;await save();console.error(error.message);process.exitCode=1;}
