const jwt=require('jsonwebtoken');
function auth(req,res,next){const header=req.headers.authorization||'';const token=header.startsWith('Bearer ')?header.slice(7):null;if(!token)return res.status(401).json({message:'Login required'});try{req.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch{return res.status(401).json({message:'Invalid or expired token'})}}
const role=(name)=>(req,res,next)=>req.user.role===name?next():res.status(403).json({message:'Not permitted'});
module.exports={auth,role};
