import {Router} from 'express';
import Product from '../models/Product.js';
import Recommendation from '../models/Recommendation.js';
const router=Router();
router.get('/products',async(_req,res,next)=>{try{res.json(await Product.find({active:true}).sort({name:1}).lean())}catch(e){next(e)}});
router.get('/products/:slug',async(req,res,next)=>{try{const item=await Product.findOne({slug:req.params.slug,active:true}).lean();if(!item)return res.status(404).json({message:'Product not found'});res.json(item)}catch(e){next(e)}});
router.get('/recommendations/categories',async(_req,res,next)=>{try{const rows=await Recommendation.aggregate([{$group:{_id:'$category',moments:{$push:'$moment'}}},{$sort:{_id:1}}]);res.json(rows.map(x=>({category:x._id,moments:x.moments.sort()})))}catch(e){next(e)}});
router.get('/recommendations',async(req,res,next)=>{try{const {category,moment}=req.query;if(!category||!moment)return res.status(400).json({message:'category and moment are required'});const match=await Recommendation.findOne({category,moment}).lean();if(!match)return res.status(404).json({message:'No recommendation found'});const product=await Product.findOne({slug:match.productSlug,active:true}).lean();res.json({category,moment,product})}catch(e){next(e)}});
export default router;
