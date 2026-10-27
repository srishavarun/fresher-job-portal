const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({title:{type:String,required:true,trim:true},company:{type:String,required:true,trim:true},location:{type:String,required:true,trim:true},type:{type:String,enum:['Full-time','Internship','Part-time'],default:'Full-time'},salary:{type:String,default:'Not disclosed'},description:{type:String,required:true},recruiter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}}, {timestamps:true});
module.exports=mongoose.model('Job',jobSchema);
