import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('.',import.meta.url));
const python=cwd+(process.platform==='win32'?'.venv/Scripts/python.exe':'.venv/bin/python');
if(!existsSync(python)){console.error('Create backend/.venv and install backend/requirements.txt first. See backend/README.md.');process.exit(1)}
const child=spawn(python,['-m','uvicorn','app.main:app','--host','127.0.0.1','--port','8001',...(process.argv.includes('--reload')?['--reload']:[])],{cwd,stdio:'inherit'});
child.on('exit',code=>process.exit(code??1));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
