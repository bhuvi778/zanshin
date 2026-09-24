import mongoose from 'mongoose';
const schema=new mongoose.Schema({category:{type:String,required:true,index:true},moment:{type:String,required:true},productSlug:{type:String,required:true}},{timestamps:true});
schema.index({category:1,moment:1},{unique:true});
export default mongoose.model('Recommendation',schema);
