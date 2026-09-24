import 'dotenv/config';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {connectDatabase} from './db.js';
import Product from './models/Product.js';
import Recommendation from './models/Recommendation.js';
import {products} from './data/products.js';

export async function seed(){
 const rows=JSON.parse(await readFile(new URL('./data/recommendations.json',import.meta.url),'utf8'));
 await Promise.all(products.map(p=>Product.findOneAndUpdate({slug:p.slug},{$set:p},{upsert:true,new:true,setDefaultsOnInsert:true})));
 await Promise.all(rows.map(row=>Recommendation.findOneAndUpdate({category:row.category,moment:row.moment},{$set:{productSlug:row.fragrance.toLowerCase()}},{upsert:true,new:true,setDefaultsOnInsert:true})));
 return {products:await Product.countDocuments(),recommendations:await Recommendation.countDocuments()};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){await connectDatabase(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/zanshin');console.log(await seed());process.exit(0)}
