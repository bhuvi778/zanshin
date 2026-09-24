import {copyFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const here=dirname(fileURLToPath(import.meta.url));
const project=resolve(here,'..');
const output=resolve(project,'../client/public/films');
const publicDir=resolve(project,'source-footage');
mkdirSync(output,{recursive:true});
for(const asset of ['concept-bottle.webp','focused-label.png','energised-label.png','connected-label.png','magnetized-label.png']){
  copyFileSync(resolve(project,'../client/public/assets',asset),resolve(publicDir,asset));
}
for(const id of ['Focused','Energised','Connected','Magnetized']){
  const composition=`${id}Campaign`;
  const target=resolve(output,`${id.toLowerCase()}-campaign.mp4`);
  const poster=resolve(output,`${id.toLowerCase()}-poster.png`);
  const heroComposition=`${id}Hero`;
  const heroTarget=resolve(output,`${id.toLowerCase()}-hero.mp4`);
  const heroPoster=resolve(output,`${id.toLowerCase()}-hero-poster.png`);
  const args=['remotion','render','src/index.jsx',composition,target,'--public-dir','source-footage','--codec','h264','--crf','23','--concurrency','50%','--log','error'];
  console.log(`Rendering ${composition}...`);
  const cli=resolve(project,'node_modules/@remotion/cli/remotion-cli.js');
  const result=spawnSync(process.execPath,[cli,...args.slice(1)],{cwd:project,stdio:'inherit'});
  if(result.error)console.error(result.error.message);
  if(result.status!==0)process.exit(result.status??1);
  const still=spawnSync(process.execPath,[cli,'still','src/index.jsx',composition,poster,'--public-dir','source-footage','--frame','188','--log','error'],{cwd:project,stdio:'inherit'});
  if(still.error)console.error(still.error.message);
  if(still.status!==0)process.exit(still.status??1);
  const hero=spawnSync(process.execPath,[cli,'render','src/index.jsx',heroComposition,heroTarget,'--public-dir','source-footage','--codec','h264','--crf','22','--concurrency','50%','--log','error'],{cwd:project,stdio:'inherit'});
  if(hero.error)console.error(hero.error.message);
  if(hero.status!==0)process.exit(hero.status??1);
  const heroStill=spawnSync(process.execPath,[cli,'still','src/index.jsx',heroComposition,heroPoster,'--public-dir','source-footage','--frame','164','--log','error'],{cwd:project,stdio:'inherit'});
  if(heroStill.error)console.error(heroStill.error.message);
  if(heroStill.status!==0)process.exit(heroStill.status??1);
}
