import 'dotenv/config';
import {connectDatabase} from './db.js';
import {seed} from './seed.js';
import {createApp} from './app.js';
const port=Number(process.env.PORT||5000),uri=process.env.MONGO_URI||'mongodb://127.0.0.1:27017/zanshin';
try{await connectDatabase(uri);const counts=await seed();createApp().listen(port,()=>console.log(`Zanshin API http://localhost:${port}`,counts))}catch(error){console.error('Unable to start Zanshin API:',error.message);process.exit(1)}
