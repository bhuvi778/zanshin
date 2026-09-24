import mongoose from 'mongoose';
const schema=new mongoose.Schema({slug:{type:String,required:true,unique:true,index:true},name:{type:String,required:true},descriptor:String,mood:String,story:String,moments:[String],color:String,scene:String,label:String,lifestyle:String,size:String,price:Number,active:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Product',schema);
