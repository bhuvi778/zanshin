import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:String,email:{type:String,lowercase:true},message:String,status:{type:String,default:'new'}},{timestamps:true});
export default mongoose.model('Contact',schema);
