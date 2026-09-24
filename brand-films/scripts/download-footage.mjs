import {createWriteStream,existsSync,mkdirSync} from 'node:fs';
import {Readable} from 'node:stream';
import {finished} from 'node:stream/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const here=dirname(fileURLToPath(import.meta.url));
const output=resolve(here,'../source-footage');
mkdirSync(output,{recursive:true});

const footage={
  'focused-work.mp4':'https://videos.pexels.com/video-files/6337301/6337301-uhd_3840_2160_25fps.mp4',
  'focused-stress.mp4':'https://videos.pexels.com/video-files/6189264/6189264-hd_1096_720_25fps.mp4',
  'energised-morning.mp4':'https://videos.pexels.com/video-files/4049556/4049556-hd_1920_1080_30fps.mp4',
  'energised-run.mp4':'https://videos.pexels.com/video-files/3191933/3191933-hd_1920_1080_25fps.mp4',
  'connected-work.mp4':'https://videos.pexels.com/video-files/8939327/8939327-hd_1920_1080_25fps.mp4',
  'connected-together.mp4':'https://videos.pexels.com/video-files/5101161/5101161-hd_1920_1080_25fps.mp4',
  'magnetized-mirror.mp4':'https://videos.pexels.com/video-files/7271351/7271351-hd_1920_1080_25fps.mp4',
  'magnetized-night.mp4':'https://videos.pexels.com/video-files/7062425/7062425-hd_1920_1080_24fps.mp4'
};

for(const [name,url] of Object.entries(footage)){
  const target=resolve(output,name);
  if(existsSync(target)){console.log(`Keeping ${name}`);continue;}
  console.log(`Downloading ${name}`);
  const response=await fetch(url);
  if(!response.ok||!response.body)throw new Error(`${response.status} ${url}`);
  await finished(Readable.fromWeb(response.body).pipe(createWriteStream(target)));
}
