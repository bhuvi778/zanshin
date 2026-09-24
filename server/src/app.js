import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import catalog from './routes/catalog.js';
import contact from './routes/contact.js';
import orders from './routes/orders.js';
export function createApp(){const app=express();app.disable('x-powered-by');app.use(helmet({contentSecurityPolicy:false}));app.use(cors({origin:process.env.CLIENT_ORIGIN?.split(',')||true}));app.use(express.json({limit:'100kb'}));if(process.env.NODE_ENV!=='test')app.use(morgan('dev'));app.get('/api/health',(_req,res)=>res.json({ok:true,database:'connected'}));app.use('/api',catalog,contact,orders);const here=path.dirname(fileURLToPath(import.meta.url)),dist=path.resolve(here,'../../client/dist');if(process.env.NODE_ENV==='production'){app.use(express.static(dist));app.use((req,res,next)=>req.method==='GET'?res.sendFile(path.join(dist,'index.html')):next())}app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({message:'Something went wrong'})});return app}
