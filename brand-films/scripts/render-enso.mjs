import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const cli=resolve(root,'node_modules/@remotion/cli/remotion-cli.js');
for(const [composition,file] of [['EnsoEffect','enso-effect-v1'],['EnsoEffectPortrait','enso-effect-portrait-v1'],['ZanshinBrand','zanshin-brand-v1'],['ZanshinBrandPortrait','zanshin-brand-portrait-v1']]){
 const run=spawnSync(process.execPath,[cli,'render','src/index.jsx',composition,`../client/public/films/${file}.mp4`,'--public-dir','../client/public','--codec','h264','--crf','22','--concurrency','2'],{cwd:root,stdio:'inherit'});
 if(run.status!==0)process.exit(run.status??1);
 if(!composition.endsWith('Portrait')){
  const poster=spawnSync(process.execPath,[cli,'still','src/index.jsx',composition,`../client/public/films/${file}-poster.jpg`,'--public-dir','../client/public','--frame','50'],{cwd:root,stdio:'inherit'});
  if(poster.status!==0)process.exit(poster.status??1);
 }
}
