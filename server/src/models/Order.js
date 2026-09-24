import mongoose from 'mongoose';
const itemSchema=new mongoose.Schema({product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},slug:String,name:String,quantity:{type:Number,min:1,max:20},unitPrice:Number},{_id:false});
const schema=new mongoose.Schema({orderNumber:{type:String,required:true,unique:true,index:true},customer:{name:String,email:{type:String,lowercase:true,index:true}},items:[itemSchema],subtotal:Number,status:{type:String,enum:['demo_received','confirmed','dispatched','delivered','cancelled'],default:'demo_received'},paymentStatus:{type:String,enum:['not_collected','paid','refunded'],default:'not_collected'}},{timestamps:true});
export default mongoose.model('Order',schema);
