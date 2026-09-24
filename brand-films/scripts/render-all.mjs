import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const here=dirname(fileURLToPath(import.meta.url));
const project=resolve(here,'..');
const output=resolve(project,'../client/public/films');
mkdirSync(output,{recursive:true});
for(const id of ['Focused','Energised','Connected','Magnetized']){
  for(const variant of ['', 'Hero']){
    const target=resolve(output,`${id.toLowerCase()}${variant?'-hero':''}.mp4`);
    const composition=`${id}${variant}`;
    const args=['remotion','render','src/index.jsx',composition,target,'--public-dir','../client/public','--codec','h264','--crf','24','--concurrency','50%','--log','error'];
    console.log(`Rendering ${composition}...`);
    const result=spawnSync('npx',args,{cwd:project,stdio:'inherit',shell:process.platform==='win32'});
    if(result.error)console.error(result.error.message);
    if(result.status!==0)process.exit(result.status??1);
  }
}
