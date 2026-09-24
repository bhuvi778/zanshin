import {Router} from 'express';
import {z} from 'zod';
import Contact from '../models/Contact.js';
const router=Router(),schema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email().max(160),message:z.string().trim().min(10).max(2000)});
router.post('/contact',async(req,res,next)=>{try{const parsed=schema.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Please check the form fields',issues:parsed.error.issues});const saved=await Contact.create(parsed.data);res.status(201).json({message:'Message received',reference:String(saved._id)})}catch(e){next(e)}});
export default router;
